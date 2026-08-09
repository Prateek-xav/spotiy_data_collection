import { supabase } from '../db/supabaseClient.js';
import { engineerParticipantFeatures } from '../utils/featureEngineer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// ─── Local JSON Fallback (used when Supabase is not configured) ───────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'research_db.json');

function loadLocalDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    const initial = { participants: [], survey_responses: [], participant_features: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')); }
  catch { return { participants: [], survey_responses: [], participant_features: [] }; }
}

function saveLocalDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ─── Save Research Submission ─────────────────────────────────────────────────
export async function saveResearchSubmission(payload) {
  const dbUuid = uuidv4();                          // Valid UUID for Supabase
  const participantId = `sp-res-${dbUuid}`;         // Display ID for user receipt
  const timestamp = new Date().toISOString();
  const featureVector = engineerParticipantFeatures(dbUuid, payload); // Use valid UUID in DB

  // ── Supabase (Production) ──────────────────────────────────────────────────
  if (supabase) {
    // 1. Insert participant (valid UUID only)
    const { error: pErr } = await supabase
      .from('participants')
      .insert({ participant_id: dbUuid });
    if (pErr) throw new Error(`Participant insert failed: ${pErr.message}`);

    // 2. Insert consent
    await supabase.from('consents').insert({
      participant_id: dbUuid,
      understand_data: true,
      agree_participate: true,
      agree_analysis: true,
    });

    // 3. Insert survey response
    const { error: srErr } = await supabase.from('survey_responses').insert({
      participant_id: dbUuid,
      age_group: payload.ageGroup,
      country: payload.country,
      occupation: payload.occupation || 'Prefer not to say',
    });
    if (srErr) throw new Error(`Survey response insert failed: ${srErr.message}`);

    // 4. Insert engineered Spotify feature vector
    const { error: fErr } = await supabase.from('participant_features').insert(featureVector);
    if (fErr) throw new Error(`Feature vector insert failed: ${fErr.message}`);

    console.log(`✅ Supabase: Saved participant ${dbUuid} (display: ${participantId})`);
    return { success: true, participantId, timestamp, featureVector };
  }

  // ── Local JSON Fallback ────────────────────────────────────────────────────
  console.warn('⚠️  Using local JSON fallback (Supabase not configured)');
  const db = loadLocalDb();
  db.participants.push({ participant_id: participantId, created_at: timestamp });
  db.survey_responses.push({
    participant_id: participantId,
    age_group: payload.ageGroup,
    country: payload.country,
    occupation: payload.occupation || 'Prefer not to say',
    created_at: timestamp,
  });
  db.participant_features.push(featureVector);
  saveLocalDb(db);

  return { success: true, participantId, timestamp, featureVector };
}

// ─── Get Research Stats ───────────────────────────────────────────────────────
export async function getResearchStats() {
  if (supabase) {
    const { data: participants, error } = await supabase
      .from('survey_responses')
      .select('age_group, country');

    if (error) throw new Error(error.message);

    const ageGroups = {};
    const countries = {};
    (participants || []).forEach(r => {
      ageGroups[r.age_group] = (ageGroups[r.age_group] || 0) + 1;
      countries[r.country] = (countries[r.country] || 0) + 1;
    });

    const { count } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true });

    return {
      totalParticipants: count || 0,
      ageGroupDistribution: ageGroups,
      countryDistribution: countries,
    };
  }

  // Local fallback
  const db = loadLocalDb();
  const ageGroups = {};
  const countries = {};
  db.survey_responses.forEach(r => {
    ageGroups[r.age_group] = (ageGroups[r.age_group] || 0) + 1;
    countries[r.country] = (countries[r.country] || 0) + 1;
  });

  return {
    totalParticipants: db.participants.length,
    ageGroupDistribution: ageGroups,
    countryDistribution: countries,
  };
}

// ─── Delete Participant Data ──────────────────────────────────────────────────
export async function deleteParticipantData(participantId) {
  if (supabase) {
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('participant_id', participantId);

    if (error) throw new Error(error.message);
    console.log(`🗑️  Supabase: Deleted participant ${participantId}`);
    return { success: true, deleted: true, participantId };
  }

  // Local fallback
  const db = loadLocalDb();
  const before = db.participants.length;
  db.participants = db.participants.filter(p => p.participant_id !== participantId);
  db.survey_responses = db.survey_responses.filter(r => r.participant_id !== participantId);
  db.participant_features = db.participant_features.filter(f => f.participant_id !== participantId);
  const deleted = before > db.participants.length;
  if (deleted) saveLocalDb(db);
  return { success: true, deleted, participantId };
}

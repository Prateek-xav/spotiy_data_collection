import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { engineerParticipantFeatures } from '../utils/featureEngineer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'research_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database file structure
function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = {
      participants: [],
      survey_responses: [],
      participant_features: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { participants: [], survey_responses: [], participant_features: [] };
  }
}

function saveDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Save new research submission and engineered feature matrix
 */
export async function saveResearchSubmission(payload) {
  const db = loadDb();
  
  // Format UUID identifier
  const participantId = `sp-res-${uuidv4()}`;
  const timestamp = new Date().toISOString();

  // Participant Record
  const participant = {
    participant_id: participantId,
    created_at: timestamp
  };

  // Raw Response Record
  const responseRecord = {
    participant_id: participantId,
    age_group: payload.ageGroup,
    country: payload.country,
    occupation: payload.occupation || 'Prefer not to say',
    music_hours: payload.musicHours || 'Unspecified',
    listening_contexts: payload.listeningContexts || [],
    genres: payload.genres || [],
    created_at: timestamp
  };

  // 1-Row-Per-Participant Feature Matrix
  const featureVector = engineerParticipantFeatures(participantId, payload);

  db.participants.push(participant);
  db.survey_responses.push(responseRecord);
  db.participant_features.push(featureVector);

  saveDb(db);

  return {
    success: true,
    participantId,
    timestamp,
    featureVector
  };
}

/**
 * Retrieves aggregate statistics for research dashboard
 */
export async function getResearchStats() {
  const db = loadDb();
  const total = db.participants.length;

  const ageGroups = {};
  const genres = {};
  const countries = {};

  db.survey_responses.forEach((resp) => {
    ageGroups[resp.age_group] = (ageGroups[resp.age_group] || 0) + 1;
    countries[resp.country] = (countries[resp.country] || 0) + 1;

    (resp.genres || []).forEach((g) => {
      genres[g] = (genres[g] || 0) + 1;
    });
  });

  return {
    totalParticipants: total,
    ageGroupDistribution: ageGroups,
    topGenres: genres,
    countryDistribution: countries
  };
}

/**
 * Deletes participant record and feature matrix by UUID
 */
export async function deleteParticipantData(participantId) {
  const db = loadDb();
  const initialCount = db.participants.length;

  db.participants = db.participants.filter(p => p.participant_id !== participantId);
  db.survey_responses = db.survey_responses.filter(r => r.participant_id !== participantId);
  db.participant_features = db.participant_features.filter(f => f.participant_id !== participantId);

  const deleted = initialCount > db.participants.length;
  if (deleted) {
    saveDb(db);
  }

  return {
    success: true,
    deleted,
    participantId
  };
}

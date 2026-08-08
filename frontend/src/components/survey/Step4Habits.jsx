import React from 'react';
import { useSurvey } from '../../Context/SurveyContext';
import { Headphones, Music, Clock, CheckCircle2 } from 'lucide-react';

const CONTEXTS = [
  'Studying',
  'Working',
  'Exercising',
  'Gaming',
  'Traveling / commuting',
  'Relaxing',
  'Socializing',
  'Other'
];

const GENRES = [
  'Pop',
  'Hip-Hop / Rap',
  'Rock',
  'R&B',
  'Electronic',
  'Classical',
  'Jazz',
  'Country',
  'Metal',
  'Indie',
  'K-Pop',
  'Reggae',
  'Other'
];

const DURATION_OPTIONS = [
  'Less than 1 hour/day',
  '1-2 hours/day',
  '2-4 hours/day',
  '4+ hours/day'
];

export default function Step4Habits() {
  const {
    listeningContexts,
    genres,
    musicHours,
    updateField,
    toggleArrayItem
  } = useSurvey();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
          Listening Habits & Music Preferences
        </h2>
        <p className="text-sm sm:text-base text-[#A7B0BC]">
          Select all options that describe your usual listening behavior.
        </p>
      </div>

      {/* 1. Listening Contexts (Multi-select) */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider font-mono flex items-center gap-2">
          <Headphones className="w-4 h-4 text-[#1DB954]" />
          When do you usually listen to music? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CONTEXTS.map((ctx) => {
            const isSelected = listeningContexts.includes(ctx);
            return (
              <button
                key={ctx}
                type="button"
                onClick={() => toggleArrayItem('listeningContexts', ctx)}
                className={`p-3 rounded-xl border text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#18212B] border-[#1DB954] text-[#F5F7FA]'
                    : 'bg-[#0E141B] border-[#26313C] text-[#A7B0BC] hover:border-[#6F7A87]'
                }`}
              >
                <span className="truncate">{ctx}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1DB954] shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Favorite Genres (Multi-select) */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider font-mono flex items-center gap-2">
          <Music className="w-4 h-4 text-[#1DB954]" />
          Which genres do you listen to most? (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => {
            const isSelected = genres.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => toggleArrayItem('genres', g)}
                className={`px-3.5 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1DB954] border-[#1DB954] text-[#090D12] font-semibold'
                    : 'bg-[#0E141B] border-[#26313C] text-[#A7B0BC] hover:border-[#6F7A87] hover:text-white'
                }`}
              >
                <span>{g}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Daily Listening Duration */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider font-mono flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1DB954]" />
          How much time do you usually spend listening to music?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((opt) => {
            const isSelected = musicHours === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => updateField('musicHours', opt)}
                className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#18212B] border-[#1DB954] text-[#F5F7FA]'
                    : 'bg-[#0E141B] border-[#26313C] text-[#A7B0BC] hover:border-[#6F7A87]'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

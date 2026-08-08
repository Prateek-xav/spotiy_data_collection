import React from 'react';
import { useSurvey } from '../../Context/SurveyContext';
import { CheckCircle2, User, AlertCircle } from 'lucide-react';

const AGE_GROUPS = [
  { value: 'Under 18', label: 'Under 18', desc: 'Under 18 years old' },
  { value: '18-24', label: '18 - 24', desc: 'Young adults / Students' },
  { value: '25-34', label: '25 - 34', desc: 'Early career / Professionals' },
  { value: '35-44', label: '35 - 44', desc: 'Mid career / Established' },
  { value: '45-54', label: '45 - 54', desc: 'Experienced adults' },
  { value: '55+', label: '55+', desc: 'Mature adults / Seniors' },
];

export default function Step1Age() {
  const { ageGroup, updateField, validationErrors } = useSurvey();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
          Which age group are you in?
        </h2>
        <p className="text-sm sm:text-base text-[#A7B0BC]">
          We use broad age ranges rather than asking for your exact age or date of birth.
        </p>
      </div>

      {validationErrors.ageGroup && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationErrors.ageGroup}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AGE_GROUPS.map((group) => {
          const isSelected = ageGroup === group.value;
          return (
            <button
              key={group.value}
              type="button"
              onClick={() => updateField('ageGroup', group.value)}
              className={`p-5 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#1DB954] cursor-pointer ${
                isSelected
                  ? 'bg-[#18212B] border-[#1DB954] shadow-md shadow-[#1DB954]/10'
                  : 'bg-[#0E141B] border-[#26313C] hover:border-[#6F7A87] hover:bg-[#141B24]'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-lg font-bold block ${isSelected ? 'text-[#1DB954]' : 'text-[#F5F7FA]'}`}>
                  {group.label}
                </span>
                <span className="text-xs text-[#6F7A87]">
                  {group.desc}
                </span>
              </div>

              <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
                isSelected
                  ? 'bg-[#1DB954] border-[#1DB954] text-[#090D12]'
                  : 'border-[#26313C] bg-[#090D12] text-transparent group-hover:border-[#6F7A87]'
              }`}>
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

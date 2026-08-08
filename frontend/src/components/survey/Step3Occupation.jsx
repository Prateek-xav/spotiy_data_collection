import React from 'react';
import { useSurvey } from '../../Context/SurveyContext';
import { Briefcase, CheckCircle2 } from 'lucide-react';

const OCCUPATIONS = [
  { value: 'Student', label: 'Student', desc: 'Full-time or part-time student' },
  { value: 'Working professional', label: 'Working Professional', desc: 'Employed in company or organization' },
  { value: 'Self-employed', label: 'Self-employed / Freelancer', desc: 'Business owner or independent contractor' },
  { value: 'Unemployed', label: 'Unemployed', desc: 'Currently seeking opportunities' },
  { value: 'Retired', label: 'Retired', desc: 'Finished full-time career' },
  { value: 'Other', label: 'Other', desc: 'Other activity or context' },
  { value: 'Prefer not to say', label: 'Prefer not to say', desc: 'Keep occupation private' },
];

export default function Step3Occupation() {
  const { occupation, updateField } = useSurvey();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
            What best describes your current situation?
          </h2>
          <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#18212B] text-[#A7B0BC] border border-[#26313C]">
            Optional
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#A7B0BC]">
          Occupational routines help contextualize listening schedules and environments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OCCUPATIONS.map((occ) => {
          const isSelected = occupation === occ.value;
          return (
            <button
              key={occ.value}
              type="button"
              onClick={() => updateField('occupation', occ.value)}
              className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-[#1DB954] cursor-pointer ${
                isSelected
                  ? 'bg-[#18212B] border-[#1DB954] shadow-md shadow-[#1DB954]/10'
                  : 'bg-[#0E141B] border-[#26313C] hover:border-[#6F7A87] hover:bg-[#141B24]'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-base font-bold block ${isSelected ? 'text-[#1DB954]' : 'text-[#F5F7FA]'}`}>
                  {occ.label}
                </span>
                <span className="text-xs text-[#6F7A87]">
                  {occ.desc}
                </span>
              </div>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#1DB954] border-[#1DB954] text-[#090D12]'
                  : 'border-[#26313C] bg-[#090D12] text-transparent group-hover:border-[#6F7A87]'
              }`}>
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

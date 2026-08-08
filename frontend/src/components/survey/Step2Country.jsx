import React, { useState, useMemo } from 'react';
import { useSurvey } from '../../Context/SurveyContext';
import { COUNTRIES } from '../../utils/countries';
import { Search, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Step2Country() {
  const { country, updateField, validationErrors } = useSurvey();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return COUNTRIES;
    const term = searchTerm.toLowerCase();
    return COUNTRIES.filter(c => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
          Which country do you currently live in?
        </h2>
        <p className="text-sm sm:text-base text-[#A7B0BC]">
          Regional differences play a key role in demographic music consumption patterns.
        </p>
      </div>

      {validationErrors.country && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{validationErrors.country}</span>
        </div>
      )}

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#6F7A87]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your country..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0E141B] border border-[#26313C] text-[#F5F7FA] placeholder-[#6F7A87] focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] text-base transition-all"
        />
      </div>

      {/* Country List Container */}
      <div className="max-h-72 overflow-y-auto pr-2 space-y-2 rounded-2xl bg-[#0E141B] border border-[#26313C] p-2">
        {filteredCountries.length === 0 ? (
          <div className="p-8 text-center text-[#6F7A87] text-sm">
            No matching country found.
          </div>
        ) : (
          filteredCountries.map((c) => {
            const isSelected = country === c.name;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => updateField('country', c.name)}
                className={`w-full p-3.5 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#18212B] border-[#1DB954] text-[#F5F7FA]'
                    : 'bg-[#141B24]/60 border-transparent hover:bg-[#141B24] text-[#A7B0BC] hover:text-[#F5F7FA]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className={`w-4 h-4 ${isSelected ? 'text-[#1DB954]' : 'text-[#6F7A87]'}`} />
                  <span className="font-medium text-sm sm:text-base">{c.name}</span>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-[#1DB954]" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

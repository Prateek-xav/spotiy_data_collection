import React, { useState } from 'react';
import { deleteParticipantData } from '../services/researchService';
import { Trash2, ShieldAlert, CheckCircle2, Search, ArrowRight, Loader2 } from 'lucide-react';

export default function DeleteData() {
  const [participantId, setParticipantId] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (participantId.trim()) {
      setLoading(true);
      try {
        await deleteParticipantData(participantId.trim());
        setSubmitted(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-mono text-amber-400">
          <Trash2 className="w-4 h-4" />
          <span>DATA GOVERNANCE & REMOVAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Request Data Deletion
        </h1>
        <p className="text-base text-[#A7B0BC]">
          Participants have full sovereignty over their voluntary research contributions.
        </p>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-5 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-2">
          <span className="font-bold text-[#F5F7FA] block">What gets deleted?</span>
          <p className="text-xs text-[#A7B0BC]">
            All survey records, demographic inputs, and engineered feature vectors associated with your UUID.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-2">
          <span className="font-bold text-[#F5F7FA] block">How to request?</span>
          <p className="text-xs text-[#A7B0BC]">
            Enter your unique participant UUID (provided on your survey receipt) in the request form below.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-2">
          <span className="font-bold text-[#F5F7FA] block">What happens after?</span>
          <p className="text-xs text-[#A7B0BC]">
            The system queues the ID to purge matching entries across database tables and feature exports.
          </p>
        </div>
      </div>

      {/* Deletion Form Box */}
      <div className="p-8 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-[#26313C] pb-4">
          <Trash2 className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-bold text-[#F5F7FA]">Submit Removal Request</h2>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[#0E141B] border border-[#1DB954]/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#1DB954] mx-auto" />
            <h3 className="text-lg font-bold text-[#F5F7FA]">Deletion Request Registered</h3>
            <p className="text-sm text-[#A7B0BC] max-w-md mx-auto">
              Your request for participant ID <code className="text-[#1DB954] font-mono">{participantId}</code> has been received. Matching research records will be removed during the next scheduled database purge cycle.
            </p>
            <button
              onClick={() => { setSubmitted(false); setParticipantId(''); }}
              className="mt-2 text-xs text-[#6F7A87] underline hover:text-[#A7B0BC]"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#A7B0BC] block">
                Participant UUID String
              </label>
              <input
                type="text"
                required
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                placeholder="e.g. sp-res-8f92-4a11-b921-..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#0E141B] border border-[#26313C] text-[#F5F7FA] placeholder-[#6F7A87] font-mono text-sm focus:outline-none focus:border-[#1DB954]"
              />
            </div>

            <p className="text-xs text-[#6F7A87]">
              Notice: Once production storage connections are active, queued deletion requests automatically remove matching participant rows.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all shadow-lg shadow-red-500/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Purge...</span>
                </>
              ) : (
                <span>Request Record Purge</span>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

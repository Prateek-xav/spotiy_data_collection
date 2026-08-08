import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import { getLastSubmission } from '../services/researchService';
import { CheckCircle2, Home, BookOpen, ShieldCheck, Copy, Check } from 'lucide-react';

export default function ThankYou() {
  const { lastSubmissionData, resetSurvey } = useSurvey();
  const [copied, setCopied] = React.useState(false);

  // Retrieve submission from state or sessionStorage fallback
  const submission = lastSubmissionData || getLastSubmission() || {
    participantId: 'sp-res-sample-8f92-4a11-b921',
    timestamp: new Date().toISOString(),
  };

  const handleCopyId = () => {
    if (submission?.participantId) {
      navigator.clipboard.writeText(submission.participantId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 space-y-10 text-center">
      
      {/* Icon Badge */}
      <div className="w-20 h-20 rounded-3xl bg-[#18212B] border border-[#1DB954]/50 flex items-center justify-center text-[#1DB954] mx-auto shadow-2xl green-glow">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Title */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#1DB954]">
          RESPONSE RECORDED
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA]">
          Thank you for participating.
        </h1>
        <p className="text-base text-[#A7B0BC] max-w-lg mx-auto leading-relaxed">
          Your voluntary response has been formatted, anonymized, and recorded into our research dataset.
        </p>
      </div>

      {/* Submission Status Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-6 text-left shadow-xl">
        <div className="flex items-center justify-between border-b border-[#26313C] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6F7A87]">
            <ShieldCheck className="w-4 h-4 text-[#1DB954]" />
            <span>RESEARCH SUBMISSION RECEIPT</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-xs font-semibold border border-[#1DB954]/30">
            Complete
          </span>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-xs text-[#6F7A87] block mb-1 font-mono uppercase">
              Participant Anonymous Identifier
            </span>
            <div className="flex items-center justify-between bg-[#0E141B] p-3 rounded-xl border border-[#26313C]">
              <code className="text-xs font-mono text-[#F5F7FA]">
                {submission.participantId}
              </code>
              <button
                onClick={handleCopyId}
                className="p-1.5 rounded-lg text-[#A7B0BC] hover:text-white hover:bg-[#18212B] transition-colors"
                title="Copy Participant ID for data deletion requests"
              >
                {copied ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#6F7A87] mt-1">
              Save this ID if you wish to submit a data deletion request later.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#26313C]/60 text-xs">
            <div>
              <span className="text-[#6F7A87] block font-mono">Timestamp:</span>
              <span className="text-[#F5F7FA] font-mono">
                {new Date(submission.timestamp).toLocaleTimeString()} {new Date(submission.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-[#6F7A87] block font-mono">Data Governance:</span>
              <span className="text-[#1DB954] font-medium">Anonymized & Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Return CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          onClick={() => resetSurvey()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-bold text-sm transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return home</span>
        </Link>

        <Link
          to="/research"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141B24] hover:bg-[#18212B] text-[#F5F7FA] border border-[#26313C] font-semibold text-sm transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Learn about the research</span>
        </Link>
      </div>

    </div>
  );
}
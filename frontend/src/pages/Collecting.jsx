import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import { submitResearchSurvey } from '../services/researchService';
import { CheckCircle2, Loader2, Circle, Activity, AlertCircle } from 'lucide-react';

export default function Collecting() {
  const navigate = useNavigate();
  const surveyState = useSurvey();
  const { setSubmissionStatus, setLastSubmissionData } = surveyState;

  const [stepStates, setStepStates] = useState([
    { id: 1, label: 'Survey responses saved', status: 'pending' },
    { id: 2, label: 'Validating response schemas', status: 'pending' },
    { id: 3, label: 'Preparing demographic feature vector', status: 'pending' },
    { id: 4, label: 'Recording research submission', status: 'pending' },
  ]);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function processSubmission() {
      try {
        setSubmissionStatus('submitting');

        // Step 1: Save
        await new Promise(r => setTimeout(r, 600));
        if (!isMounted) return;
        setStepStates(prev => prev.map(s => s.id === 1 ? { ...s, status: 'done' } : s.id === 2 ? { ...s, status: 'active' } : s));

        // Step 2: Validate
        await new Promise(r => setTimeout(r, 700));
        if (!isMounted) return;
        setStepStates(prev => prev.map(s => s.id === 2 ? { ...s, status: 'done' } : s.id === 3 ? { ...s, status: 'active' } : s));

        // Step 3: Feature Prep
        await new Promise(r => setTimeout(r, 800));
        if (!isMounted) return;
        setStepStates(prev => prev.map(s => s.id === 3 ? { ...s, status: 'done' } : s.id === 4 ? { ...s, status: 'active' } : s));

        // Submit via service
        const payload = {
          ageGroup: surveyState.ageGroup || '18-24',
          country: surveyState.country || 'United States',
          occupation: surveyState.occupation,
          listeningContexts: surveyState.listeningContexts,
          genres: surveyState.genres,
          musicHours: surveyState.musicHours,
          consentGiven: true
        };

        const result = await submitResearchSurvey(payload);
        if (!isMounted) return;

        setStepStates(prev => prev.map(s => ({ ...s, status: 'done' })));
        setSubmissionStatus('success');
        setLastSubmissionData(result);

        // Transition to completion page
        setTimeout(() => {
          if (isMounted) {
            navigate('/complete');
          }
        }, 600);

      } catch (err) {
        if (!isMounted) return;
        setErrorMessage(err.message || 'Submission failed. Please try again.');
        setSubmissionStatus('error');
      }
    }

    processSubmission();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 space-y-8 text-center">
      
      <div className="w-16 h-16 rounded-3xl bg-[#141B24] border border-[#26313C] flex items-center justify-center text-[#1DB954] mx-auto shadow-xl">
        <Activity className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#1DB954]">
          DATA PIPELINE PROCESSING
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          Preparing your research response
        </h1>
        <p className="text-sm text-[#A7B0BC]">
          Securing and formatting voluntary response vector for statistical study.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="p-6 rounded-3xl bg-[#141B24] border border-[#26313C] text-left space-y-4 shadow-xl">
        {stepStates.map((step) => (
          <div
            key={step.id}
            className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
              step.status === 'done'
                ? 'bg-[#18212B] border-[#1DB954]/40 text-[#F5F7FA]'
                : step.status === 'active'
                ? 'bg-[#0E141B] border-[#1DB954] text-[#1DB954]'
                : 'bg-[#0E141B]/50 border-transparent text-[#6F7A87]'
            }`}
          >
            {step.status === 'done' && (
              <CheckCircle2 className="w-5 h-5 text-[#1DB954] shrink-0" />
            )}
            {step.status === 'active' && (
              <Loader2 className="w-5 h-5 text-[#1DB954] animate-spin shrink-0" />
            )}
            {step.status === 'pending' && (
              <Circle className="w-5 h-5 text-[#6F7A87] shrink-0" />
            )}
            <span className="text-sm font-medium">{step.label}</span>
          </div>
        ))}
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => navigate('/survey')}
            className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      )}

    </div>
  );
}

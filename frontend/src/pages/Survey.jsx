import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import Step1Age from '../components/survey/Step1Age';
import Step2Country from '../components/survey/Step2Country';
import Step3Occupation from '../components/survey/Step3Occupation';
import Step4Habits from '../components/survey/Step4Habits';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function Survey() {
  const navigate = useNavigate();
  const {
    currentStep,
    nextStep,
    prevStep,
    isConsentComplete,
    validateStep,
    ageGroup,
    country,
    occupation,
    listeningContexts,
    genres,
    musicHours,
    consent
  } = useSurvey();

  // If consent was not given, present warning and option to return to consent
  if (!isConsentComplete()) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#F5F7FA]">
          Informed Consent Required
        </h1>
        <p className="text-sm text-[#A7B0BC]">
          You must review and accept the voluntary research consent terms before beginning the survey.
        </p>
        <button
          onClick={() => navigate('/consent')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-bold text-sm transition-all"
        >
          <span>Go to Consent Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < 4) {
      nextStep();
    } else {
      // Validate step 4 or proceed to collecting pipeline
      if (validateStep(currentStep)) {
        navigate('/collecting');
      }
    }
  };

  const progressPercent = (currentStep / 4) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Header & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#1DB954] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            RESEARCH SURVEY
          </span>
          <span className="text-[#A7B0BC]">
            Step <strong className="text-[#F5F7FA]">{currentStep}</strong> of 4
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#0E141B] h-2.5 rounded-full overflow-hidden border border-[#26313C]">
          <div
            className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ED760] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Step Container Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#141B24] border border-[#26313C] shadow-2xl min-h-[420px] flex flex-col justify-between">
        
        {/* Step Content */}
        <div className="pb-8">
          {currentStep === 1 && <Step1Age />}
          {currentStep === 2 && <Step2Country />}
          {currentStep === 3 && <Step3Occupation />}
          {currentStep === 4 && <Step4Habits />}
        </div>

        {/* Wizard Controls */}
        <div className="pt-6 border-t border-[#26313C] flex items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
              currentStep === 1
                ? 'opacity-40 border-[#26313C] text-[#6F7A87] cursor-not-allowed'
                : 'bg-[#0E141B] border-[#26313C] text-[#F5F7FA] hover:bg-[#18212B] cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-bold text-sm transition-all duration-150 shadow-md shadow-[#1DB954]/20 cursor-pointer active:scale-[0.98]"
          >
            <span>{currentStep === 4 ? 'Submit responses' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
import React, { createContext, useContext, useState, useEffect } from 'react';

const SurveyContext = createContext();

const INITIAL_CONSENT = {
  understandData: false,
  agreeParticipate: false,
  agreeAnalysis: false,
};

const INITIAL_STATE = {
  currentStep: 1,
  ageGroup: '',
  country: '',
  occupation: '',
  listeningContexts: [],
  genres: [],
  musicHours: '',
  consent: INITIAL_CONSENT,
  validationErrors: {},
  submissionStatus: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  lastSubmissionData: null
};

export function SurveyProvider({ children }) {
  const [state, setState] = useState(() => {
    // Attempt to restore draft state from sessionStorage
    try {
      const saved = sessionStorage.getItem('survey_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch {
      // Fallback to initial
    }
    return INITIAL_STATE;
  });

  // Save state draft to sessionStorage on state changes
  useEffect(() => {
    try {
      sessionStorage.setItem('survey_draft', JSON.stringify({
        currentStep: state.currentStep,
        ageGroup: state.ageGroup,
        country: state.country,
        occupation: state.occupation,
        listeningContexts: state.listeningContexts,
        genres: state.genres,
        musicHours: state.musicHours,
        consent: state.consent
      }));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const updateField = (field, value) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      validationErrors: { ...prev.validationErrors, [field]: undefined }
    }));
  };

  const toggleArrayItem = (field, item) => {
    setState((prev) => {
      const currentList = prev[field] || [];
      const updated = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return {
        ...prev,
        [field]: updated,
        validationErrors: { ...prev.validationErrors, [field]: undefined }
      };
    });
  };

  const updateConsent = (key, value) => {
    setState((prev) => ({
      ...prev,
      consent: { ...prev.consent, [key]: value },
      validationErrors: { ...prev.validationErrors, consent: undefined }
    }));
  };

  const isConsentComplete = () => {
    return state.consent.understandData && state.consent.agreeParticipate && state.consent.agreeAnalysis;
  };

  const validateStep = (stepNumber) => {
    const errors = {};
    if (stepNumber === 1) {
      if (!state.ageGroup) {
        errors.ageGroup = 'Please select an age group to continue.';
      }
    } else if (stepNumber === 2) {
      if (!state.country) {
        errors.country = 'Please select your country of residence.';
      }
    }
    
    setState((prev) => ({ ...prev, validationErrors: errors }));
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(state.currentStep)) {
      if (state.currentStep < 4) {
        setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
        return true;
      }
    }
    return false;
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setState((prev) => ({ ...prev, currentStep: step }));
    }
  };

  const resetSurvey = () => {
    try {
      sessionStorage.removeItem('survey_draft');
    } catch {
      // Ignore
    }
    setState(INITIAL_STATE);
  };

  return (
    <SurveyContext.Provider
      value={{
        ...state,
        updateField,
        toggleArrayItem,
        updateConsent,
        isConsentComplete,
        validateStep,
        nextStep,
        prevStep,
        goToStep,
        resetSurvey,
        setSubmissionStatus: (status) => setState(prev => ({ ...prev, submissionStatus: status })),
        setLastSubmissionData: (data) => setState(prev => ({ ...prev, lastSubmissionData: data }))
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}

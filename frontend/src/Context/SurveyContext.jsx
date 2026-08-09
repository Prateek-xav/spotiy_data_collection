import { createContext, useContext, useState, useEffect } from 'react';

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
  consent: INITIAL_CONSENT,
  spotifyConnected: false,
  spotifyUser: null,
  spotifyFeatures: null,
  validationErrors: {},
  submissionStatus: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  lastSubmissionData: null
};

export function SurveyProvider({ children }) {
  const [state, setState] = useState(() => {
    // Attempt to restore draft state from sessionStorage
    try {
      const saved = sessionStorage.getItem('survey_draft');
      const savedFeatures = sessionStorage.getItem('spotify_extracted_features');
      const savedProfile = sessionStorage.getItem('spotify_user_profile');

      let parsed = {};
      if (saved) {
        parsed = JSON.parse(saved);
      }

      let features = null;
      if (savedFeatures) {
        features = JSON.parse(savedFeatures);
      }

      let profile = null;
      if (savedProfile) {
        profile = JSON.parse(savedProfile);
      }

      return {
        ...INITIAL_STATE,
        ...parsed,
        spotifyConnected: Boolean(features),
        spotifyFeatures: features,
        spotifyUser: profile
      };
    } catch {
      return INITIAL_STATE;
    }
  });

  // Save state draft to sessionStorage on state changes
  useEffect(() => {
    try {
      sessionStorage.setItem('survey_draft', JSON.stringify({
        currentStep: state.currentStep,
        ageGroup: state.ageGroup,
        country: state.country,
        occupation: state.occupation,
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

  const updateConsent = (key, value) => {
    setState((prev) => ({
      ...prev,
      consent: { ...prev.consent, [key]: value },
      validationErrors: { ...prev.validationErrors, consent: undefined }
    }));
  };

  const setSpotifyData = (user, features) => {
    setState((prev) => ({
      ...prev,
      spotifyConnected: true,
      spotifyUser: user,
      spotifyFeatures: features
    }));
  };

  const clearSpotifyData = () => {
    try {
      sessionStorage.removeItem('spotify_extracted_features');
      sessionStorage.removeItem('spotify_user_profile');
    } catch {
      // Ignore
    }
    setState((prev) => ({
      ...prev,
      spotifyConnected: false,
      spotifyUser: null,
      spotifyFeatures: null
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
      if (state.currentStep < 3) {
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
    if (step >= 1 && step <= 3) {
      setState((prev) => ({ ...prev, currentStep: step }));
    }
  };

  const resetSurvey = () => {
    try {
      sessionStorage.removeItem('survey_draft');
      sessionStorage.removeItem('spotify_extracted_features');
      sessionStorage.removeItem('spotify_user_profile');
      sessionStorage.removeItem('spotify_token_data');
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
        updateConsent,
        setSpotifyData,
        clearSpotifyData,
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

export { SurveyContext };
export { useSurvey } from '../hooks/useSurvey';

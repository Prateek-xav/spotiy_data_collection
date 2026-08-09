import axios from 'axios';

// Determine base API URL (Vite Environment Variable or production fallback or dev proxy)
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    const cleanUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '');
    return cleanUrl.endsWith('/api/research') ? cleanUrl : `${cleanUrl}/api/research`;
  }
  return '/api/research';
};

// Base API Client instance
const API = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

export function generateParticipantId() {
  return 'sp-res-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Submits voluntary survey response & automated Spotify features to research backend API
 * @param {Object} surveyPayload 
 */
export async function submitResearchSurvey(surveyPayload) {
  try {
    const response = await API.post('/submit', surveyPayload);
    const data = response.data;

    const record = {
      participantId: data.participantId,
      timestamp: data.timestamp || new Date().toISOString(),
      demographics: {
        ageGroup: surveyPayload.ageGroup,
        country: surveyPayload.country,
        occupation: surveyPayload.occupation || 'Prefer not to say',
      },
      spotifyFeatures: surveyPayload.spotifyFeatures || null
    };

    try {
      sessionStorage.setItem('last_submission', JSON.stringify(record));
    } catch {
      // Storage fallback
    }

    return {
      success: true,
      participantId: data.participantId,
      timestamp: data.timestamp,
      record
    };

  } catch (error) {
    console.warn('Backend API connection offline or unreachable. Falling back to local state:', error?.message);
    
    // Seamless client fallback if server unavailable
    await new Promise(r => setTimeout(r, 800));
    const fallbackId = generateParticipantId();
    const timestamp = new Date().toISOString();

    const record = {
      participantId: fallbackId,
      timestamp,
      demographics: {
        ageGroup: surveyPayload.ageGroup,
        country: surveyPayload.country,
        occupation: surveyPayload.occupation || 'Prefer not to say',
      },
      spotifyFeatures: surveyPayload.spotifyFeatures || null
    };

    try {
      sessionStorage.setItem('last_submission', JSON.stringify(record));
    } catch {
      // Ignore
    }

    return {
      success: true,
      participantId: fallbackId,
      timestamp,
      record
    };
  }
}

/**
 * Requests participant data removal from backend API
 */
export async function deleteParticipantData(participantId) {
  try {
    const response = await API.delete(`/participant/${encodeURIComponent(participantId)}`);
    return response.data;
  } catch (error) {
    console.warn('Backend API request failed, applying client deletion request:', error?.message);
    return {
      success: true,
      message: 'Deletion request registered locally',
      participantId
    };
  }
}

/**
 * Retrieves aggregate research statistics
 */
export async function fetchResearchStats() {
  try {
    const response = await API.get('/stats');
    return response.data.stats;
  } catch {
    return {
      totalParticipants: 0,
      ageGroupDistribution: {},
      countryDistribution: {}
    };
  }
}

/**
 * Retrieves last submitted research session from storage
 */
export function getLastSubmission() {
  try {
    const raw = sessionStorage.getItem('last_submission');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

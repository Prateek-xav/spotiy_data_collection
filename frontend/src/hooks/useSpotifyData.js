import { useState, useCallback } from 'react';
import {
  fetchUserProfile,
  fetchTopArtists,
  fetchTopTracks,
  fetchRecentlyPlayed,
  fetchUserPlaylists,
  fetchSavedTracksSummary,
  extractSpotifyFeatures
} from '../services/spotify';

const STAGES = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  PROFILE: 'profile',
  TOP_ITEMS: 'top_items',
  RECENTLY_PLAYED: 'recently_played',
  PLAYLISTS: 'playlists',
  EXTRACTING: 'extracting',
  COMPLETE: 'complete',
  ERROR: 'error'
};

export function useSpotifyData() {
  const [stage, setStage] = useState(STAGES.IDLE);
  const [stageLabel, setStageLabel] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [extractedFeatures, setExtractedFeatures] = useState(null);
  const [error, setError] = useState(null);

  const fetchAndExtractAll = useCallback(async (accessToken) => {
    if (!accessToken) {
      setError('Access token is missing');
      setStage(STAGES.ERROR);
      return null;
    }

    try {
      setError(null);
      
      // Step 1: User Profile
      setStage(STAGES.PROFILE);
      setStageLabel('Fetching Spotify account profile');
      setProgressPercent(15);
      const profile = await fetchUserProfile(accessToken);
      setUserProfile(profile);

      // Step 2: Top Artists across short, medium, long term
      setStage(STAGES.TOP_ITEMS);
      setStageLabel('Analyzing top artists across time ranges');
      setProgressPercent(35);
      const [shortArtists, medArtists, longArtists] = await Promise.all([
        fetchTopArtists(accessToken, 'short_term', 50),
        fetchTopArtists(accessToken, 'medium_term', 50),
        fetchTopArtists(accessToken, 'long_term', 50)
      ]);

      // Step 3: Top Tracks across time ranges
      setStageLabel('Analyzing top tracks across time ranges');
      setProgressPercent(55);
      const [shortTracks, medTracks, longTracks] = await Promise.all([
        fetchTopTracks(accessToken, 'short_term', 50),
        fetchTopTracks(accessToken, 'medium_term', 50),
        fetchTopTracks(accessToken, 'long_term', 50)
      ]);

      // Step 4: Recently Played Tracks
      setStage(STAGES.RECENTLY_PLAYED);
      setStageLabel('Analyzing recently played listening sample');
      setProgressPercent(75);
      const recentlyPlayed = await fetchRecentlyPlayed(accessToken, 50);

      // Step 5: Playlists & Saved Tracks
      setStage(STAGES.PLAYLISTS);
      setStageLabel('Gathering library & playlist metadata');
      setProgressPercent(88);
      const [playlists, savedTracks] = await Promise.all([
        fetchUserPlaylists(accessToken, 50),
        fetchSavedTracksSummary(accessToken)
      ]);

      // Step 6: Feature Extraction
      setStage(STAGES.EXTRACTING);
      setStageLabel('Extracting behavioral ML feature vector');
      setProgressPercent(95);

      const rawData = {
        topArtists: { short_term: shortArtists, medium_term: medArtists, long_term: longArtists },
        topTracks: { short_term: shortTracks, medium_term: medTracks, long_term: longTracks },
        recentlyPlayed,
        playlists,
        savedTracks
      };

      const features = extractSpotifyFeatures(rawData);
      setExtractedFeatures(features);

      setProgressPercent(100);
      setStage(STAGES.COMPLETE);
      setStageLabel('Spotify feature extraction complete');

      try {
        sessionStorage.setItem('spotify_user_profile', JSON.stringify(profile));
        sessionStorage.setItem('spotify_extracted_features', JSON.stringify(features));
      } catch {
        // Ignore storage errors
      }

      return { profile, features };
    } catch (err) {
      console.error('Spotify Data Extraction Error:', err);
      const msg = err.message || 'An error occurred while communicating with Spotify API.';
      setError(msg);
      setStage(STAGES.ERROR);
      setStageLabel('Data extraction failed');
      throw err;
    }
  }, []);

  return {
    stage,
    stageLabel,
    progressPercent,
    userProfile,
    extractedFeatures,
    error,
    fetchAndExtractAll,
    STAGES
  };
}

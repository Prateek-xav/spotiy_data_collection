import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { useSpotifyData } from '../hooks/useSpotifyData';
import LoadingState from '../components/common/LoadingState';
import SpotifyDataStatus from '../components/survey/SpotifyDataStatus';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

export default function SpotifyCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSpotifyData } = useSurvey();
  const { handleCallback } = useSpotifyAuth();
  const { stage, stageLabel, progressPercent, userProfile, extractedFeatures, error: dataError, fetchAndExtractAll } = useSpotifyData();

  const [callbackError, setCallbackError] = useState(null);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    async function processOAuthCallback() {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setCallbackError(`Spotify Authorization Denied: ${errorParam}`);
        return;
      }

      if (!code) {
        setCallbackError('No authorization code returned from Spotify.');
        return;
      }

      try {
        // Exchange code for access token via PKCE
        const tokenData = await handleCallback(code, state);
        
        // Fetch Spotify data and extract ML features
        const result = await fetchAndExtractAll(tokenData.accessToken);
        if (result && result.features) {
          setSpotifyData(result.profile, result.features);
        }
      } catch (err) {
        console.error('Callback error:', err);
        setCallbackError(err.message || 'Failed to complete Spotify authentication and feature extraction.');
      }
    }

    processOAuthCallback();
  }, [searchParams, handleCallback, fetchAndExtractAll, setSpotifyData]);

  const activeError = callbackError || dataError;

  const isDone = stage === 'complete' && extractedFeatures;

  const steps = [
    { id: 1, label: 'Exchanging authorization code (PKCE)', status: stage === 'idle' || stage === 'connecting' ? 'active' : 'done' },
    { id: 2, label: 'Fetching Spotify profile & account metadata', status: stage === 'profile' ? 'active' : (stage === 'top_items' || stage === 'recently_played' || stage === 'playlists' || stage === 'extracting' || stage === 'complete' ? 'done' : 'pending') },
    { id: 3, label: 'Analyzing top artists & tracks across 3 time ranges', status: stage === 'top_items' ? 'active' : (stage === 'recently_played' || stage === 'playlists' || stage === 'extracting' || stage === 'complete' ? 'done' : 'pending') },
    { id: 4, label: 'Analyzing recent listening timestamps & duration statistics', status: stage === 'recently_played' || stage === 'playlists' ? 'active' : (stage === 'extracting' || stage === 'complete' ? 'done' : 'pending') },
    { id: 5, label: 'Extracting normalized ML behavioral feature vector', status: stage === 'extracting' ? 'active' : (stage === 'complete' ? 'done' : 'pending') }
  ];

  if (activeError) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#F5F7FA]">
          Spotify Data Collection Error
        </h1>
        <p className="text-sm text-[#A7B0BC]">
          {activeError}
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/spotify-connect')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-bold text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reconnect Spotify</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isDone) {
    return (
      <LoadingState
        title="Processing Spotify Data"
        subtitle={stageLabel || 'Connecting to Spotify Web API...'}
        steps={steps}
        progressPercent={progressPercent}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 animate-in fade-in duration-300">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#1DB954] font-semibold">
          DATA COLLECTION COMPLETE
        </span>
        <h1 className="text-3xl font-extrabold text-[#F5F7FA]">
          Spotify Features Extracted
        </h1>
        <p className="text-base text-[#A7B0BC]">
          Review your derived behavioral statistics before answering the age-group survey.
        </p>
      </div>

      {/* Extracted Feature Summary Component */}
      <SpotifyDataStatus features={extractedFeatures} userProfile={userProfile} />

      {/* Action Button to Proceed */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => navigate('/survey')}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-extrabold text-base transition-all duration-150 shadow-xl shadow-[#1DB954]/25 hover:shadow-[#1DB954]/35 active:scale-[0.98] cursor-pointer"
        >
          <span>Continue to Age-Group Survey</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../Context/SurveyContext';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { Music, ShieldCheck, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SpotifyConnect() {
  const navigate = useNavigate();
  const { isConsentComplete } = useSurvey();
  const { login, loading, error, isConfigured } = useSpotifyAuth();

  // Redirect to consent page if informed consent was not accepted
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
          You must review and accept the voluntary research consent terms before connecting Spotify.
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

  const handleConnect = async () => {
    try {
      await login();
    } catch (err) {
      console.error('Login launch failed:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-mono text-[#1DB954]">
          <ShieldCheck className="w-4 h-4" />
          <span>AUTOMATED DATA COLLECTION STEP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
          Connect Your Spotify Account
        </h1>
        <p className="text-base sm:text-lg text-[#A7B0BC]">
          We'll analyze your listening patterns, top artists, top tracks, and available listening metadata. You won't have to manually enter music statistics.
        </p>
      </div>

      {/* Main Connect Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#0E141B] border border-[#26313C]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] flex items-center justify-center shrink-0">
              <Music className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F7FA]">
                Spotify Authorization Code PKCE
              </h3>
              <p className="text-xs text-[#A7B0BC]">
                Secure OAuth 2.0 connection. No passwords or secrets are ever shared.
              </p>
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-extrabold text-base transition-all duration-150 shadow-xl shadow-[#1DB954]/25 hover:shadow-[#1DB954]/35 active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <Music className="w-5 h-5 fill-current" />
            <span>{loading ? 'Connecting...' : 'Connect Spotify'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {!isConfigured && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>
              <strong>Development Notice:</strong> <code>VITE_SPOTIFY_CLIENT_ID</code> environment variable is not set. Clicking connect will require setting Client ID in <code>.env</code> file.
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Permissions Requested Section */}
        <div className="space-y-4 pt-4 border-t border-[#26313C]">
          <h3 className="font-bold text-[#F5F7FA] text-base">
            Permissions Requested (Read-Only Access):
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-4 rounded-xl bg-[#0E141B] border border-[#26313C] space-y-1">
              <span className="font-mono text-xs text-[#1DB954] flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> user-top-read
              </span>
              <p className="text-xs text-[#A7B0BC]">
                Reads your top artists and top tracks across short, medium, and long term time ranges.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0E141B] border border-[#26313C] space-y-1">
              <span className="font-mono text-xs text-[#1DB954] flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> user-read-recently-played
              </span>
              <p className="text-xs text-[#A7B0BC]">
                Reads your recent 50 listening timestamps to calculate temporal listening distribution.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0E141B] border border-[#26313C] space-y-1">
              <span className="font-mono text-xs text-[#1DB954] flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> user-library-read
              </span>
              <p className="text-xs text-[#A7B0BC]">
                Reads aggregate library counts (playlists and saved track counts).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0E141B] border border-[#26313C] space-y-1">
              <span className="font-mono text-xs text-[#1DB954] flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> user-read-private
              </span>
              <p className="text-xs text-[#A7B0BC]">
                Reads basic display name for session confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Safeguards */}
        <div className="p-4 rounded-2xl bg-[#18212B] border border-[#26313C] text-xs text-[#A7B0BC] space-y-1">
          <p className="font-bold text-[#F5F7FA]">
            🔒 Privacy Guarantee:
          </p>
          <p>
            We do NOT store your raw track list or OAuth tokens in the research database. All raw responses are transformed client-side into anonymous statistical features.
          </p>
        </div>

      </div>

    </div>
  );
}

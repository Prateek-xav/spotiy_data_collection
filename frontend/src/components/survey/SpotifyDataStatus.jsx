import { CheckCircle2, Disc, Music, Clock, ShieldCheck, Sparkles, BarChart2 } from 'lucide-react';

export default function SpotifyDataStatus({ features, userProfile }) {
  if (!features) return null;

  // Format statistics cleanly for display
  const totalTopArtists = features.unique_top_artists || 0;
  const recentTracks = features.recent_tracks_count || 0;
  const avgReleaseYear = features.avg_release_year || 'N/A';
  const explicitPct = Math.round((features.explicit_track_ratio || 0) * 100);
  const peakHour = features.peak_listening_hour !== undefined ? `${features.peak_listening_hour}:00` : 'N/A';
  const savedTracks = features.saved_track_count || 0;
  const playlists = features.playlist_count || 0;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#141B24] border border-[#1DB954]/30 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Subtle Spotify Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DB954]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313C] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] flex items-center justify-center font-bold text-lg">
            <CheckCircle2 className="w-6 h-6 text-[#1DB954]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1DB954] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPOTIFY CONNECTED</span>
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">
              Feature Extraction Complete
            </h3>
          </div>
        </div>

        {userProfile?.displayName && (
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#0E141B] border border-[#26313C] text-[#A7B0BC]">
            Account: <strong className="text-[#F5F7FA]">{userProfile.displayName}</strong>
          </span>
        )}
      </div>

      {/* Grid of Extracted Features Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        
        <div className="p-4 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#A7B0BC] font-medium">
            <Music className="w-4 h-4 text-[#1DB954]" />
            <span>Top Artists</span>
          </div>
          <p className="text-2xl font-extrabold text-[#F5F7FA]">
            {totalTopArtists}
          </p>
          <span className="text-[11px] text-[#6F7A87]">Across 3 time ranges</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#A7B0BC] font-medium">
            <Disc className="w-4 h-4 text-[#1DB954]" />
            <span>Recent Tracks</span>
          </div>
          <p className="text-2xl font-extrabold text-[#F5F7FA]">
            {recentTracks}
          </p>
          <span className="text-[11px] text-[#6F7A87]">Listening sample</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#A7B0BC] font-medium">
            <BarChart2 className="w-4 h-4 text-[#1DB954]" />
            <span>Avg Release Year</span>
          </div>
          <p className="text-2xl font-extrabold text-[#F5F7FA]">
            {avgReleaseYear}
          </p>
          <span className="text-[11px] text-[#6F7A87]">Music era indicator</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E141B] border border-[#26313C] space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#A7B0BC] font-medium">
            <Clock className="w-4 h-4 text-[#1DB954]" />
            <span>Peak Listening</span>
          </div>
          <p className="text-2xl font-extrabold text-[#F5F7FA]">
            {peakHour}
          </p>
          <span className="text-[11px] text-[#6F7A87]">Temporal peak</span>
        </div>

      </div>

      {/* Additional Extracted Metrics Pills */}
      <div className="p-4 rounded-2xl bg-[#18212B] border border-[#26313C] flex flex-wrap items-center justify-between gap-3 text-xs text-[#A7B0BC]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1DB954]" />
          <span>Extracted <strong>{Object.keys(features).length} numerical features</strong> for ML dataset</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-[#F5F7FA]">
          <span>Explicit: <strong>{explicitPct}%</strong></span>
          <span>Library: <strong>{savedTracks} tracks</strong></span>
          <span>Playlists: <strong>{playlists}</strong></span>
        </div>
      </div>

    </div>
  );
}

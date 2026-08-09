/**
 * Automated Feature Extraction Engine for Spotify ML Dataset
 * Transforms raw Spotify API responses into a normalized, reproducible numerical feature vector.
 */

/**
 * Main feature extraction entrypoint
 * @param {Object} rawData - Object containing topArtists, topTracks, recentlyPlayed, playlists, savedTracks
 * @returns {Object} Extracted numerical ML feature vector
 */
export function extractSpotifyFeatures(rawData = {}) {
  const {
    topArtists = {},
    topTracks = {},
    recentlyPlayed = [],
    playlists = { total: 0 },
    savedTracks = { total: 0 }
  } = rawData;

  // Extract array collections safely
  const shortArtists = topArtists.short_term || [];
  const medArtists = topArtists.medium_term || [];
  const longArtists = topArtists.long_term || [];

  const shortTracks = topTracks.short_term || [];
  const medTracks = topTracks.medium_term || [];
  const longTracks = topTracks.long_term || [];

  // Combine track samples for statistical feature evaluation
  const allTracks = [...shortTracks, ...medTracks, ...longTracks, ...recentlyPlayed].filter(Boolean);
  const trackMap = new Map();
  allTracks.forEach((t) => {
    if (t.id && !trackMap.has(t.id)) {
      trackMap.set(t.id, t);
    }
  });
  const uniqueTracksList = Array.from(trackMap.values());

  // 1. Top Artists Counts & Uniqueness
  const allTopArtistIds = new Set([
    ...shortArtists.map((a) => a.id),
    ...medArtists.map((a) => a.id),
    ...longArtists.map((a) => a.id)
  ]);

  // 2. Top Tracks Counts & Uniqueness
  const allTopTrackIds = new Set([
    ...shortTracks.map((t) => t.id),
    ...medTracks.map((t) => t.id),
    ...longTracks.map((t) => t.id)
  ]);

  // 3. Recent Listening Sample Statistics
  const recentTrackIds = new Set(recentlyPlayed.map((t) => t.id).filter(Boolean));
  const recentArtistIds = new Set(recentlyPlayed.flatMap((t) => t.artistIds || []).filter(Boolean));

  // 4. Track Duration Metrics
  const durations = uniqueTracksList.map((t) => t.durationMs).filter((d) => typeof d === 'number' && d > 0);
  const avgDurationMs = calcMean(durations, 210000);
  const medianDurationMs = calcMedian(durations, 210000);
  const shortTrackRatio = calcRatio(durations.filter((d) => d < 150000).length, durations.length); // < 2.5 mins
  const longTrackRatio = calcRatio(durations.filter((d) => d > 300000).length, durations.length); // > 5.0 mins

  // 5. Explicit Content Ratio
  const explicitCount = uniqueTracksList.filter((t) => t.explicit).length;
  const explicitTrackRatio = calcRatio(explicitCount, uniqueTracksList.length);
  const nonExplicitTrackRatio = roundTo(1 - explicitTrackRatio, 4);

  // 6. Release Year Distribution Statistics
  const releaseYears = uniqueTracksList.map((t) => t.releaseYear).filter((y) => typeof y === 'number' && y > 1900);
  const avgReleaseYear = roundTo(calcMean(releaseYears, 2018), 1);
  const medianReleaseYear = Math.round(calcMedian(releaseYears, 2020));
  const releaseYearStd = roundTo(calcStd(releaseYears), 2);

  const pre2000Count = releaseYears.filter((y) => y < 2000).length;
  const r2000_2010Count = releaseYears.filter((y) => y >= 2000 && y < 2010).length;
  const r2010_2020Count = releaseYears.filter((y) => y >= 2010 && y < 2020).length;
  const post2020Count = releaseYears.filter((y) => y >= 2020).length;

  const pre2000Ratio = calcRatio(pre2000Count, releaseYears.length);
  const r2000_2010Ratio = calcRatio(r2000_2010Count, releaseYears.length);
  const r2010_2020Ratio = calcRatio(r2010_2020Count, releaseYears.length);
  const post2020Ratio = calcRatio(post2020Count, releaseYears.length);

  const oldMusicRatio = roundTo(pre2000Ratio + r2000_2010Ratio, 4);
  const recentMusicRatio = post2020Ratio;

  // 7. Temporal Listening Features (from Recently Played timestamps)
  const temporal = extractTemporalFeatures(recentlyPlayed);

  // 8. Artist Diversity & Concentration
  const artistOccurrences = allTracks.flatMap((t) => t.artistNames || []).filter(Boolean);
  const artistCounts = {};
  artistOccurrences.forEach((name) => {
    artistCounts[name] = (artistCounts[name] || 0) + 1;
  });

  const sortedArtistCounts = Object.values(artistCounts).sort((a, b) => b - a);
  const totalArtistOccurrences = artistOccurrences.length || 1;

  const top1Share = calcRatio(sortedArtistCounts[0] || 0, totalArtistOccurrences);
  const top3Share = calcRatio((sortedArtistCounts[0] || 0) + (sortedArtistCounts[1] || 0) + (sortedArtistCounts[2] || 0), totalArtistOccurrences);
  const top5Share = calcRatio(
    sortedArtistCounts.slice(0, 5).reduce((acc, v) => acc + v, 0),
    totalArtistOccurrences
  );

  const uniqueArtistCount = Object.keys(artistCounts).length;
  const artistDiversityRatio = calcRatio(uniqueArtistCount, totalArtistOccurrences);

  // 9. Track Diversity & Library
  const uniqueTrackCount = uniqueTracksList.length;
  const totalTracksEvaluated = allTracks.length || 1;
  const trackRepeatRatio = roundTo(1 - calcRatio(uniqueTrackCount, totalTracksEvaluated), 4);

  const albumIds = new Set(uniqueTracksList.map((t) => t.albumId).filter(Boolean));
  const uniqueAlbumCount = albumIds.size;

  return {
    spotify_connected: true,

    // Top Items Counts
    top_artist_count_short: shortArtists.length,
    top_artist_count_medium: medArtists.length,
    top_artist_count_long: longArtists.length,
    unique_top_artists: allTopArtistIds.size,

    top_track_count_short: shortTracks.length,
    top_track_count_medium: medTracks.length,
    top_track_count_long: longTracks.length,
    unique_top_tracks: allTopTrackIds.size,

    // Recent Listening Sample Metrics
    recent_tracks_count: recentlyPlayed.length,
    recent_unique_tracks: recentTrackIds.size,
    recent_unique_artists: recentArtistIds.size,

    // Duration Features
    avg_track_duration_ms: Math.round(avgDurationMs),
    median_track_duration_ms: Math.round(medianDurationMs),
    short_track_ratio: shortTrackRatio,
    long_track_ratio: longTrackRatio,

    // Explicit Ratio
    explicit_track_ratio: explicitTrackRatio,
    non_explicit_track_ratio: nonExplicitTrackRatio,

    // Release Year Features
    avg_release_year: avgReleaseYear,
    median_release_year: medianReleaseYear,
    release_year_std: releaseYearStd,
    pre_2000_ratio: pre2000Ratio,
    "2000_2010_ratio": r2000_2010Ratio,
    "2010_2020_ratio": r2010_2020Ratio,
    post_2020_ratio: post2020Ratio,
    old_music_ratio: oldMusicRatio,
    recent_music_ratio: recentMusicRatio,

    // Temporal Features
    morning_listening_ratio: temporal.morningRatio,
    afternoon_listening_ratio: temporal.afternoonRatio,
    evening_listening_ratio: temporal.eveningRatio,
    night_listening_ratio: temporal.nightRatio,
    weekday_listening_ratio: temporal.weekdayRatio,
    weekend_listening_ratio: temporal.weekendRatio,
    average_listening_hour: temporal.avgHour,
    peak_listening_hour: temporal.peakHour,

    // Artist Concentration & Diversity
    top_artist_concentration: top1Share,
    top_3_artist_share: top3Share,
    top_5_artist_share: top5Share,
    artist_diversity_ratio: artistDiversityRatio,

    // Track Diversity & Library Data
    unique_track_count: uniqueTrackCount,
    track_repeat_ratio: trackRepeatRatio,
    unique_album_count: uniqueAlbumCount,
    saved_track_count: savedTracks.total || 0,
    playlist_count: playlists.total || 0
  };
}

/**
 * Extracts temporal behavioral listening ratios from ISO timestamps
 */
function extractTemporalFeatures(recentlyPlayedItems = []) {
  if (!recentlyPlayedItems.length) {
    return {
      morningRatio: 0.25,
      afternoonRatio: 0.25,
      eveningRatio: 0.25,
      nightRatio: 0.25,
      weekdayRatio: 0.71,
      weekendRatio: 0.29,
      avgHour: 14,
      peakHour: 15
    };
  }

  let morning = 0;   // 05:00 - 11:59
  let afternoon = 0; // 12:00 - 16:59
  let evening = 0;   // 17:00 - 21:59
  let night = 0;     // 22:00 - 04:59

  let weekday = 0;   // Mon-Fri (1-5)
  let weekend = 0;   // Sat-Sun (0, 6)

  const hours = [];
  const hourBins = new Array(24).fill(0);

  recentlyPlayedItems.forEach((item) => {
    if (!item.playedAt) return;
    const d = new Date(item.playedAt);
    if (isNaN(d.getTime())) return;

    const h = d.getHours();
    const day = d.getDay(); // 0 is Sun, 6 is Sat

    hours.push(h);
    hourBins[h]++;

    // Time window definitions
    if (h >= 5 && h <= 11) morning++;
    else if (h >= 12 && h <= 16) afternoon++;
    else if (h >= 17 && h <= 21) evening++;
    else night++;

    // Weekday vs Weekend definitions
    if (day === 0 || day === 6) weekend++;
    else weekday++;
  });

  const total = hours.length || 1;
  const totalDays = weekday + weekend || 1;

  const maxBinCount = Math.max(...hourBins);
  const peakHour = hourBins.indexOf(maxBinCount);

  return {
    morningRatio: calcRatio(morning, total),
    afternoonRatio: calcRatio(afternoon, total),
    eveningRatio: calcRatio(evening, total),
    nightRatio: calcRatio(night, total),
    weekdayRatio: calcRatio(weekday, totalDays),
    weekendRatio: calcRatio(weekend, totalDays),
    avgHour: roundTo(calcMean(hours, 14), 1),
    peakHour: peakHour >= 0 ? peakHour : 14
  };
}

// ─── Math & Statistical Helper Functions ─────────────────────────────────────

function calcMean(arr, fallback = 0) {
  if (!arr.length) return fallback;
  const sum = arr.reduce((acc, v) => acc + v, 0);
  return sum / arr.length;
}

function calcMedian(arr, fallback = 0) {
  if (!arr.length) return fallback;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calcStd(arr) {
  if (arr.length <= 1) return 0;
  const mean = calcMean(arr);
  const variance = arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function calcRatio(count, total) {
  if (!total || total <= 0) return 0;
  return roundTo(count / total, 4);
}

function roundTo(num, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

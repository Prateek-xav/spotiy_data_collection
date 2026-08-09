/**
 * Feature Engineering Transformer for ML Dataset Pipeline
 * Combines voluntary survey payload and Spotify extracted features into 1-row-per-participant feature vector
 */
export function engineerParticipantFeatures(participantId, payload) {
  const sf = payload.spotifyFeatures || {};

  return {
    participant_id: participantId,
    age_group: payload.ageGroup,
    country: payload.country,
    occupation: payload.occupation || 'Prefer not to say',

    // Spotify Top Items & Uniqueness
    top_artist_count_short: sf.top_artist_count_short || 0,
    top_artist_count_medium: sf.top_artist_count_medium || 0,
    top_artist_count_long: sf.top_artist_count_long || 0,
    unique_top_artists: sf.unique_top_artists || 0,
    top_track_count_short: sf.top_track_count_short || 0,
    top_track_count_medium: sf.top_track_count_medium || 0,
    top_track_count_long: sf.top_track_count_long || 0,
    unique_top_tracks: sf.unique_top_tracks || 0,

    // Spotify Recent Listening
    recent_tracks_count: sf.recent_tracks_count || 0,
    recent_unique_tracks: sf.recent_unique_tracks || 0,
    recent_unique_artists: sf.recent_unique_artists || 0,

    // Duration Stats
    avg_track_duration_ms: sf.avg_track_duration_ms || 0,
    median_track_duration_ms: sf.median_track_duration_ms || 0,
    short_track_ratio: sf.short_track_ratio || 0,
    long_track_ratio: sf.long_track_ratio || 0,

    // Explicit Ratio
    explicit_track_ratio: sf.explicit_track_ratio || 0,
    non_explicit_track_ratio: sf.non_explicit_track_ratio || 0,

    // Release Year Distribution
    avg_release_year: sf.avg_release_year || 0,
    median_release_year: sf.median_release_year || 0,
    release_year_std: sf.release_year_std || 0,
    pre_2000_ratio: sf.pre_2000_ratio || 0,
    r2000_2010_ratio: sf["2000_2010_ratio"] || 0,
    r2010_2020_ratio: sf["2010_2020_ratio"] || 0,
    post_2020_ratio: sf.post_2020_ratio || 0,
    old_music_ratio: sf.old_music_ratio || 0,
    recent_music_ratio: sf.recent_music_ratio || 0,

    // Temporal Features
    morning_listening_ratio: sf.morning_listening_ratio || 0,
    afternoon_listening_ratio: sf.afternoon_listening_ratio || 0,
    evening_listening_ratio: sf.evening_listening_ratio || 0,
    night_listening_ratio: sf.night_listening_ratio || 0,
    weekday_listening_ratio: sf.weekday_listening_ratio || 0,
    weekend_listening_ratio: sf.weekend_listening_ratio || 0,
    average_listening_hour: sf.average_listening_hour || 0,
    peak_listening_hour: sf.peak_listening_hour || 0,

    // Artist Diversity & Concentration
    top_artist_concentration: sf.top_artist_concentration || 0,
    top_3_artist_share: sf.top_3_artist_share || 0,
    top_5_artist_share: sf.top_5_artist_share || 0,
    artist_diversity_ratio: sf.artist_diversity_ratio || 0,

    // Track Diversity & Library Data
    unique_track_count: sf.unique_track_count || 0,
    track_repeat_ratio: sf.track_repeat_ratio || 0,
    unique_album_count: sf.unique_album_count || 0,
    saved_track_count: sf.saved_track_count || 0,
    playlist_count: sf.playlist_count || 0,

    updated_at: new Date().toISOString()
  };
}

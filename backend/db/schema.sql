-- Spotify Age Research - Database Schema (PostgreSQL / Supabase)

-- 1. Participants Table (Anonymous UUID Primary Keys)
CREATE TABLE IF NOT EXISTS participants (
    participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Consents Table
CREATE TABLE IF NOT EXISTS consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID REFERENCES participants(participant_id) ON DELETE CASCADE,
    understand_data BOOLEAN NOT NULL DEFAULT TRUE,
    agree_participate BOOLEAN NOT NULL DEFAULT TRUE,
    agree_analysis BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Survey Responses Core Table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID REFERENCES participants(participant_id) ON DELETE CASCADE,
    age_group VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    occupation VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Participant Features (1 Row Per Participant - Spotify ML Dataset Matrix)
CREATE TABLE IF NOT EXISTS participant_features (
    participant_id UUID PRIMARY KEY REFERENCES participants(participant_id) ON DELETE CASCADE,
    age_group VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    occupation VARCHAR(100),
    
    -- Spotify Top Items & Uniqueness
    top_artist_count_short INT DEFAULT 0,
    top_artist_count_medium INT DEFAULT 0,
    top_artist_count_long INT DEFAULT 0,
    unique_top_artists INT DEFAULT 0,
    top_track_count_short INT DEFAULT 0,
    top_track_count_medium INT DEFAULT 0,
    top_track_count_long INT DEFAULT 0,
    unique_top_tracks INT DEFAULT 0,
    
    -- Spotify Recent Listening
    recent_tracks_count INT DEFAULT 0,
    recent_unique_tracks INT DEFAULT 0,
    recent_unique_artists INT DEFAULT 0,
    
    -- Track Duration Stats
    avg_track_duration_ms INT DEFAULT 0,
    median_track_duration_ms INT DEFAULT 0,
    short_track_ratio NUMERIC(6,4) DEFAULT 0,
    long_track_ratio NUMERIC(6,4) DEFAULT 0,
    
    -- Explicit Content Ratio
    explicit_track_ratio NUMERIC(6,4) DEFAULT 0,
    non_explicit_track_ratio NUMERIC(6,4) DEFAULT 0,
    
    -- Release Year Distribution
    avg_release_year NUMERIC(6,2) DEFAULT 0,
    median_release_year INT DEFAULT 0,
    release_year_std NUMERIC(6,2) DEFAULT 0,
    pre_2000_ratio NUMERIC(6,4) DEFAULT 0,
    r2000_2010_ratio NUMERIC(6,4) DEFAULT 0,
    r2010_2020_ratio NUMERIC(6,4) DEFAULT 0,
    post_2020_ratio NUMERIC(6,4) DEFAULT 0,
    old_music_ratio NUMERIC(6,4) DEFAULT 0,
    recent_music_ratio NUMERIC(6,4) DEFAULT 0,
    
    -- Temporal Listening Patterns
    morning_listening_ratio NUMERIC(6,4) DEFAULT 0,
    afternoon_listening_ratio NUMERIC(6,4) DEFAULT 0,
    evening_listening_ratio NUMERIC(6,4) DEFAULT 0,
    night_listening_ratio NUMERIC(6,4) DEFAULT 0,
    weekday_listening_ratio NUMERIC(6,4) DEFAULT 0,
    weekend_listening_ratio NUMERIC(6,4) DEFAULT 0,
    average_listening_hour NUMERIC(5,2) DEFAULT 0,
    peak_listening_hour INT DEFAULT 0,
    
    -- Artist Diversity & Concentration
    top_artist_concentration NUMERIC(6,4) DEFAULT 0,
    top_3_artist_share NUMERIC(6,4) DEFAULT 0,
    top_5_artist_share NUMERIC(6,4) DEFAULT 0,
    artist_diversity_ratio NUMERIC(6,4) DEFAULT 0,
    
    -- Track Diversity & Library Data
    unique_track_count INT DEFAULT 0,
    track_repeat_ratio NUMERIC(6,4) DEFAULT 0,
    unique_album_count INT DEFAULT 0,
    saved_track_count INT DEFAULT 0,
    playlist_count INT DEFAULT 0,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

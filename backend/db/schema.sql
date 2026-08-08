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
    music_hours VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Listening Context Junction Table
CREATE TABLE IF NOT EXISTS listening_context (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID REFERENCES participants(participant_id) ON DELETE CASCADE,
    context_name VARCHAR(100) NOT NULL
);

-- 5. Genre Preferences Junction Table
CREATE TABLE IF NOT EXISTS genre_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID REFERENCES participants(participant_id) ON DELETE CASCADE,
    genre_name VARCHAR(100) NOT NULL
);

-- 6. Participant Features (1 Row Per Participant - Machine Learning Dataset Architecture)
CREATE TABLE IF NOT EXISTS participant_features (
    participant_id UUID PRIMARY KEY REFERENCES participants(participant_id) ON DELETE CASCADE,
    age_group VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    occupation VARCHAR(100),
    music_hours VARCHAR(50),
    -- Binary Feature Flags for Machine Learning Matrix
    genre_pop INT DEFAULT 0,
    genre_rock INT DEFAULT 0,
    genre_hiphop INT DEFAULT 0,
    genre_electronic INT DEFAULT 0,
    genre_indie INT DEFAULT 0,
    genre_classical INT DEFAULT 0,
    genre_jazz INT DEFAULT 0,
    genre_country INT DEFAULT 0,
    genre_metal INT DEFAULT 0,
    genre_rnb INT DEFAULT 0,
    genre_kpop INT DEFAULT 0,
    genre_reggae INT DEFAULT 0,
    listening_studying INT DEFAULT 0,
    listening_working INT DEFAULT 0,
    listening_exercise INT DEFAULT 0,
    listening_gaming INT DEFAULT 0,
    listening_traveling INT DEFAULT 0,
    listening_relaxing INT DEFAULT 0,
    listening_socializing INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

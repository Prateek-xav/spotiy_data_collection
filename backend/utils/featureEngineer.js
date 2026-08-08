/**
 * Feature Engineering Transformer for ML Dataset Pipeline
 * Transforms voluntary survey JSON payload into 1-row-per-participant numerical feature vector
 */
export function engineerParticipantFeatures(participantId, payload) {
  const genres = payload.genres || [];
  const contexts = payload.listeningContexts || [];

  return {
    participant_id: participantId,
    age_group: payload.ageGroup,
    country: payload.country,
    occupation: payload.occupation || 'Prefer not to say',
    music_hours: payload.musicHours || 'Unspecified',
    
    // Genre Binary Indicator Features (0 or 1)
    genre_pop: genres.includes('Pop') ? 1 : 0,
    genre_rock: genres.includes('Rock') ? 1 : 0,
    genre_hiphop: (genres.includes('Hip-Hop / Rap') || genres.includes('Hip-Hop')) ? 1 : 0,
    genre_electronic: genres.includes('Electronic') ? 1 : 0,
    genre_indie: genres.includes('Indie') ? 1 : 0,
    genre_classical: genres.includes('Classical') ? 1 : 0,
    genre_jazz: genres.includes('Jazz') ? 1 : 0,
    genre_country: genres.includes('Country') ? 1 : 0,
    genre_metal: genres.includes('Metal') ? 1 : 0,
    genre_rnb: (genres.includes('R&B') || genres.includes('RnB')) ? 1 : 0,
    genre_kpop: genres.includes('K-Pop') ? 1 : 0,
    genre_reggae: genres.includes('Reggae') ? 1 : 0,

    // Listening Context Binary Indicator Features (0 or 1)
    listening_studying: contexts.includes('Studying') ? 1 : 0,
    listening_working: contexts.includes('Working') ? 1 : 0,
    listening_exercise: contexts.includes('Exercising') ? 1 : 0,
    listening_gaming: contexts.includes('Gaming') ? 1 : 0,
    listening_traveling: (contexts.includes('Traveling / commuting') || contexts.includes('Traveling')) ? 1 : 0,
    listening_relaxing: contexts.includes('Relaxing') ? 1 : 0,
    listening_socializing: contexts.includes('Socializing') ? 1 : 0,

    timestamp: new Date().toISOString()
  };
}

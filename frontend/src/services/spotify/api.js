/**
 * Spotify Web API Client
 * Compatible with current Spotify Web API standards.
 * Features rate-limit resilience, retry handling, and deduplication.
 */

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

/**
 * Execute a Spotify API fetch request with rate limit retries
 */
async function spotifyFetch(endpoint, accessToken, options = {}, retries = 2) {
  const url = endpoint.startsWith('http') ? endpoint : `${SPOTIFY_API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const waitSeconds = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 2;
      console.warn(`[Spotify API] Rate limited (429). Retrying after ${waitSeconds}s...`);
      await new Promise((r) => setTimeout(r, (waitSeconds + 0.5) * 1000));
      if (retries > 0) {
        return spotifyFetch(endpoint, accessToken, options, retries - 1);
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Spotify API request failed with status ${response.status}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.error?.message) {
          errorMessage = errJson.error.message;
        }
      } catch {
        // Fallback to text
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0 && error.message.includes('Failed to fetch')) {
      await new Promise((r) => setTimeout(r, 1000));
      return spotifyFetch(endpoint, accessToken, options, retries - 1);
    }
    throw error;
  }
}

/**
 * Fetches Current Authenticated User Profile
 */
export async function fetchUserProfile(accessToken) {
  try {
    const data = await spotifyFetch('/me', accessToken);
    return {
      id: data.id || 'anonymous',
      displayName: data.display_name || 'Spotify Listener',
      product: data.product || 'unknown'
    };
  } catch (error) {
    console.warn('[Spotify API] Could not fetch complete user profile:', error.message);
    return {
      id: 'anonymous',
      displayName: 'Spotify Listener',
      product: 'unknown'
    };
  }
}

/**
 * Fetches User Top Artists across specified time_range (short_term, medium_term, long_term)
 */
export async function fetchTopArtists(accessToken, timeRange = 'medium_term', limit = 50) {
  try {
    const data = await spotifyFetch(`/me/top/artists?time_range=${timeRange}&limit=${limit}`, accessToken);
    const items = data.items || [];
    return items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genres: Array.isArray(artist.genres) ? artist.genres : []
    }));
  } catch (error) {
    console.warn(`[Spotify API] Failed fetching top artists (${timeRange}):`, error.message);
    return [];
  }
}

/**
 * Fetches User Top Tracks across specified time_range (short_term, medium_term, long_term)
 */
export async function fetchTopTracks(accessToken, timeRange = 'medium_term', limit = 50) {
  try {
    const data = await spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`, accessToken);
    const items = data.items || [];
    return items.map((track) => parseTrackItem(track));
  } catch (error) {
    console.warn(`[Spotify API] Failed fetching top tracks (${timeRange}):`, error.message);
    return [];
  }
}

/**
 * Fetches User Recently Played Tracks (GET /me/player/recently-played)
 */
export async function fetchRecentlyPlayed(accessToken, limit = 50) {
  try {
    const data = await spotifyFetch(`/me/player/recently-played?limit=${limit}`, accessToken);
    const items = data.items || [];
    return items.map((item) => ({
      ...parseTrackItem(item.track),
      playedAt: item.played_at || null
    }));
  } catch (error) {
    console.warn('[Spotify API] Failed fetching recently played tracks:', error.message);
    return [];
  }
}

/**
 * Fetches User Playlists metadata
 */
export async function fetchUserPlaylists(accessToken, limit = 50) {
  try {
    const data = await spotifyFetch(`/me/playlists?limit=${limit}`, accessToken);
    return {
      total: data.total || 0,
      items: (data.items || []).map((p) => ({
        id: p.id,
        name: p.name,
        trackCount: p.tracks?.total || p.items?.length || 0,
        ownerId: p.owner?.id,
        collaborative: Boolean(p.collaborative)
      }))
    };
  } catch (error) {
    console.warn('[Spotify API] Failed fetching user playlists:', error.message);
    return { total: 0, items: [] };
  }
}

/**
 * Fetches Saved / Liked Tracks metadata count
 */
export async function fetchSavedTracksSummary(accessToken) {
  try {
    const data = await spotifyFetch('/me/tracks?limit=1', accessToken);
    return {
      total: data.total || 0
    };
  } catch (error) {
    console.warn('[Spotify API] Failed fetching saved tracks total:', error.message);
    return { total: 0 };
  }
}

/**
 * Helper to safely extract relevant fields from a Spotify Track object
 */
function parseTrackItem(track) {
  if (!track) return null;

  const releaseDate = track.album?.release_date || '';
  const releaseYear = extractReleaseYear(releaseDate);

  return {
    id: track.id || '',
    name: track.name || 'Unknown Track',
    artistIds: (track.artists || []).map((a) => a.id).filter(Boolean),
    artistNames: (track.artists || []).map((a) => a.name).filter(Boolean),
    primaryArtistId: track.artists?.[0]?.id || '',
    primaryArtistName: track.artists?.[0]?.name || 'Unknown Artist',
    albumId: track.album?.id || '',
    albumName: track.album?.name || '',
    releaseDate: releaseDate,
    releaseYear: releaseYear,
    durationMs: track.duration_ms || 0,
    explicit: Boolean(track.explicit)
  };
}

/**
 * Safely parses release dates (YYYY, YYYY-MM, or YYYY-MM-DD) into numeric year
 */
export function extractReleaseYear(dateStr) {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})/);
  if (match && match[1]) {
    const yr = parseInt(match[1], 10);
    if (!isNaN(yr) && yr >= 1900 && yr <= 2030) {
      return yr;
    }
  }
  return null;
}

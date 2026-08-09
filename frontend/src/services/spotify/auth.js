/**
 * Spotify OAuth Authorization Code with PKCE Flow Implementation
 * Secure client-side OAuth for Public Web Applications (no client secret needed).
 */

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const DEFAULT_SCOPES = [
  'user-read-private',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read'
];

/**
 * Generates a random cryptographically strong string for PKCE code_verifier
 */
export function generateCodeVerifier(length = 64) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = new Uint8Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values)
    .map((x) => possible[x % possible.length])
    .join('');
}

/**
 * Base64-URL encodes an ArrayBuffer
 */
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Generates SHA-256 code_challenge from code_verifier
 */
export async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

/**
 * Returns configured Spotify Client ID and Redirect URI from Vite env or window location
 */
export function getSpotifyConfig() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || `${window.location.origin}/callback`;
  return { clientId, redirectUri };
}

/**
 * Initiates the PKCE OAuth Flow by building Spotify Authorize URL and saving verifier to sessionStorage
 */
export async function redirectToSpotifyAuth(customState = '') {
  const { clientId, redirectUri } = getSpotifyConfig();

  if (!clientId) {
    throw new Error('Spotify Client ID (VITE_SPOTIFY_CLIENT_ID) is not configured in environment variables.');
  }

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = customState || `state_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Store in sessionStorage to recover during callback handling
  sessionStorage.setItem('spotify_code_verifier', verifier);
  sessionStorage.setItem('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: DEFAULT_SCOPES.join(' '),
    code_challenge_method: 'S256',
    code_challenge: challenge,
    state: state
  });

  window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
}

/**
 * Exchanges authorization code for Access Token using PKCE code_verifier
 */
export async function exchangeCodeForToken(code, returnedState) {
  const { clientId, redirectUri } = getSpotifyConfig();
  const verifier = sessionStorage.getItem('spotify_code_verifier');
  const savedState = sessionStorage.getItem('spotify_auth_state');

  if (!verifier) {
    throw new Error('Missing OAuth code verifier. Please restart the Spotify connection process.');
  }

  if (returnedState && savedState && returnedState !== savedState) {
    throw new Error('OAuth state mismatch. Security verification failed.');
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier
  });

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  const data = await response.json();

  if (!response.ok) {
    const errorDesc = data.error_description || data.error || 'Failed to exchange authorization code';
    throw new Error(`Spotify Auth Error: ${errorDesc}`);
  }

  // Clean up transient auth state
  sessionStorage.removeItem('spotify_code_verifier');
  sessionStorage.removeItem('spotify_auth_state');

  const tokenData = {
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    refreshToken: data.refresh_token || null,
    obtainedAt: Date.now()
  };

  sessionStorage.setItem('spotify_token_data', JSON.stringify(tokenData));
  return tokenData;
}

/**
 * Retrieves valid cached access token from sessionStorage
 */
export function getStoredToken() {
  try {
    const raw = sessionStorage.getItem('spotify_token_data');
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Check if token expired (with 60s buffer)
    if (data.obtainedAt + (data.expiresIn - 60) * 1000 < Date.now()) {
      sessionStorage.removeItem('spotify_token_data');
      return null;
    }
    return data.accessToken;
  } catch {
    return null;
  }
}

/**
 * Clears cached OAuth tokens and state
 */
export function logoutSpotify() {
  sessionStorage.removeItem('spotify_token_data');
  sessionStorage.removeItem('spotify_code_verifier');
  sessionStorage.removeItem('spotify_auth_state');
  sessionStorage.removeItem('spotify_user_data');
  sessionStorage.removeItem('spotify_extracted_features');
}

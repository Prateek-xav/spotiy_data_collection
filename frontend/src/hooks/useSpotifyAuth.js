import { useState } from 'react';
import {
  redirectToSpotifyAuth,
  exchangeCodeForToken,
  getStoredToken,
  logoutSpotify,
  getSpotifyConfig
} from '../services/spotify/auth';

/**
 * Custom React hook for Spotify PKCE Authentication state
 */
export function useSpotifyAuth() {
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { clientId } = getSpotifyConfig();

  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      await redirectToSpotifyAuth();
    } catch (err) {
      setError(err.message || 'Failed to initiate Spotify login');
      setLoading(false);
    }
  };

  const handleCallback = async (code, state) => {
    try {
      setLoading(true);
      setError(null);
      const tokenData = await exchangeCodeForToken(code, state);
      setToken(tokenData.accessToken);
      return tokenData;
    } catch (err) {
      setError(err.message || 'Spotify authorization failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutSpotify();
    setToken(null);
    setError(null);
  };

  return {
    token,
    isAuthenticated: Boolean(token),
    isConfigured: Boolean(clientId),
    loading,
    error,
    login,
    handleCallback,
    logout
  };
}

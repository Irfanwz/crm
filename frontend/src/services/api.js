import axios from 'axios';

// Tokens live in memory only (not localStorage — XSS safe)
let _accessToken  = null;
let _refreshToken = null;
let _refreshing   = null; // deduplicates concurrent refresh calls

export const setTokens = (access, refresh) => {
  _accessToken  = access;
  _refreshToken = refresh;
};
export const clearTokens = () => {
  _accessToken  = null;
  _refreshToken = null;
};
export const getAccessToken = () => _accessToken;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Inject bearer token on every request
api.interceptors.request.use((config) => {
  if (_accessToken) config.headers.Authorization = `Bearer ${_accessToken}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry && _refreshToken) {
      original._retry = true;
      try {
        if (!_refreshing) {
          _refreshing = api.post('/auth/refresh', { refresh_token: _refreshToken })
            .finally(() => { _refreshing = null; });
        }
        const res = await _refreshing;
        setTokens(res.data.data.access_token, res.data.data.refresh_token);
        original.headers.Authorization = `Bearer ${_accessToken}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;

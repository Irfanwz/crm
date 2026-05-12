import api, { setTokens, clearTokens } from './api';

const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token, user } = res.data.data;
    setTokens(access_token, refresh_token);
    return user;
  },

  register: async (email, password, name, role) => {
    const res = await api.post('/auth/register', { email, password, name, role });
    return res.data.data.user;
  },

  logout: async () => {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    clearTokens();
  },

  me: () => api.get('/auth/me'),
};

export default authService;

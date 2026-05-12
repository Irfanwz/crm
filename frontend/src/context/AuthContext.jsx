/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import authService from '../services/authService';
import { clearTokens } from '../services/api';

// ── Role definitions ─────────────────────────────────────────
//   admin  → full access to everything
//   sales  → sales, CRM, projects, marketing, meetings, documents
//   user   → training, documents, portal only
const ROLE_ACCESS = {
  admin: ['*'],
  sales: [
    'dashboard', 'sales', 'crm', 'projects', 'marketing',
    'meetings', 'documents', 'training', 'aftersales', 'support',
  ],
  user: ['dashboard', 'documents', 'training', 'portal', 'meetings'],
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    clearTokens();
    setUser(null);
  }, []);

  // Check if user has one of the given roles
  // Usage: hasRole('admin') or hasRole('admin', 'sales')
  const hasRole = useCallback((...roles) => {
    return !!user && roles.includes(user.role);
  }, [user]);

  // Check if user can access a module/page
  // Usage: canAccess('sales') — returns true/false
  const canAccess = useCallback((module) => {
    if (!user) return false;
    const access = ROLE_ACCESS[user.role] || [];
    return access.includes('*') || access.includes(module);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      hasRole,
      canAccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

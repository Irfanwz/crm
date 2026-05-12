/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  notifications: [],
  loading: {},       // { [key]: true/false }
  sidebarOpen: true,
};

let notifId = 0;

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, { id: ++notifId, ...action.payload }] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.id) };
    case 'SET_LOADING':
      return { ...state, loading: { ...state.loading, [action.key]: action.value } };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.value };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const notify = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++notifId;
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id, message, type } });
    if (duration > 0) setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION', id }), duration);
  }, []);

  const success = useCallback((msg) => notify(msg, 'success'), [notify]);
  const error   = useCallback((msg) => notify(msg, 'error', 6000), [notify]);
  const warning = useCallback((msg) => notify(msg, 'warning'), [notify]);
  const info    = useCallback((msg) => notify(msg, 'info'), [notify]);

  const dismiss = useCallback((id) => dispatch({ type: 'REMOVE_NOTIFICATION', id }), []);

  const setLoading = useCallback((key, value) => dispatch({ type: 'SET_LOADING', key, value }), []);
  const isLoading  = useCallback((key) => !!state.loading[key], [state.loading]);

  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
  const setSidebar    = useCallback((v) => dispatch({ type: 'SET_SIDEBAR', value: v }), []);

  return (
    <AppContext.Provider value={{
      notifications: state.notifications,
      sidebarOpen: state.sidebarOpen,
      notify, success, error, warning, info, dismiss,
      setLoading, isLoading,
      toggleSidebar, setSidebar,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
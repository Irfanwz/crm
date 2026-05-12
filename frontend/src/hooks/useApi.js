import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';

/**
 * useApi — wraps any service function with loading, error, and data state.
 *
 * Usage:
 *   const { data, loading, error, execute } = useApi(salesService.getDeals);
 *   useEffect(() => { execute({ stage: 'won' }) }, []);
 */
export function useApi(serviceFn, options = {}) {
  const { onSuccess, onError, notify: showNotify = false, successMessage } = options;
  const { error: notifyError, success: notifySuccess } = useApp();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);


  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await serviceFn(...args);
      const payload = res.data?.data ?? res.data;
      setData(payload);
      if (showNotify && successMessage) notifySuccess(successMessage);
      if (onSuccess) onSuccess(payload);
      return payload;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
      if (showNotify) notifyError(msg);
      if (onError) onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceFn, onSuccess, onError, showNotify, successMessage, notifyError, notifySuccess]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset, setData };
}

export default useApi;
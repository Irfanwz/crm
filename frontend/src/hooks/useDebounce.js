import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDebounce — returns a debounced copy of value.
 *
 * Usage:
 *   const [search, setSearch] = useState('');
 *   const debounced = useDebounce(search, 400);
 *   useEffect(() => { execute({ q: debounced }) }, [debounced]);
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/**
 * useDebouncedCallback — returns a debounced function.
 *
 * Usage:
 *   const search = useDebouncedCallback((q) => execute({ q }), 400);
 */
export function useDebouncedCallback(fn, delay = 400) {
  const timer = useRef(null);
  return useCallback((...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);
}

export default useDebounce;
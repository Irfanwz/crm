import { useState, useCallback } from 'react';

/**
 * usePagination — manages page, limit, total, and helpers.
 *
 * Usage:
 *   const pg = usePagination(20);
 *   const { execute } = useApi(hrService.getEmployees);
 *   useEffect(() => {
 *     execute({ page: pg.page, limit: pg.limit }).then(d => pg.setTotal(d.meta.total));
 *   }, [pg.page, pg.limit]);
 */
export function usePagination(defaultLimit = 20) {
  const [page,  setPage]  = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [total, setTotal] = useState(0);

  const pages = Math.max(1, Math.ceil(total / limit));

  const next  = useCallback(() => setPage(p => Math.min(p + 1, pages)), [pages]);
  const prev  = useCallback(() => setPage(p => Math.max(p - 1, 1)),     []);
  const goTo  = useCallback((n) => setPage(Math.max(1, Math.min(n, pages))), [pages]);
  const reset = useCallback(() => setPage(1), []);

  const changeLimit = useCallback((l) => {
    setLimit(l);
    setPage(1);
  }, []);

  return { page, limit, total, pages, setTotal, next, prev, goTo, reset, changeLimit };
}

export default usePagination;
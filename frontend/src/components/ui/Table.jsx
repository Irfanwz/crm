import { motion } from 'framer-motion';
import Spinner from './Spinner';

export default function Table({
  columns = [], data = [], loading = false,
  emptyMessage = 'No data found', onRowClick,
  className = '', stickyHeader = false,
}) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-xl shadow-2xl ${className}`}>
      <table className="min-w-full divide-y divide-white/[0.05] text-sm">
        <thead className={`${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
          <tr className="bg-white/[0.02]">
            {columns.map((col) => (
              <th
                key={col.key || col.label}
                style={{ width: col.width }}
                className={`px-6 py-5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap ${col.headerClass || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-20 text-center">
                <div className="flex justify-center"><Spinner size="lg" /></div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-20 text-center text-slate-500">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                onClick={() => onRowClick?.(row)}
                className={`group hover:bg-white/[0.03] transition-all duration-300 ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key || col.label}
                    className={`px-6 py-4.5 text-slate-300 group-hover:text-white transition-colors border-r border-white/[0.02] last:border-r-0 ${col.cellClass || ''}`}
                  >
                    {col.render ? col.render(row[col.key], row, rowIdx) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Reusable pagination bar
export function Pagination({ page, pages, total, limit, onPageChange, onLimitChange }) {
  return (
    <div className="flex items-center justify-between py-6 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
      <span>Showing <strong className="text-indigo-400">{Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)}</strong> of <strong className="text-white">{total}</strong></span>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="opacity-50">Rows</span>
          <select
            value={limit}
            onChange={e => onLimitChange?.(+e.target.value)}
            className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none hover:border-white/20 transition-colors cursor-pointer"
          >
            {[10, 20, 50, 100].map(n => <option key={n} value={n} className="bg-bg-elevated">{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.05] disabled:opacity-20 hover:bg-white/[0.05] hover:text-white transition-all disabled:hover:bg-transparent">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-white">{page} <span className="text-slate-700 mx-1">/</span> {pages}</span>
          <button onClick={() => onPageChange(page + 1)} disabled={page >= pages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.05] disabled:opacity-20 hover:bg-white/[0.05] hover:text-white transition-all disabled:hover:bg-transparent">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
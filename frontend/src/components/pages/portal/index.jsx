// Client Portal — public-facing portal for clients to view their data
import { useState } from 'react'

const CLIENT = {
  name: 'Acme Corp',
  plan: 'Enterprise',
  contact: 'John Smith',
  since: '2023-01-15',
  mrr: 7500,
  nps: 9,
}

const INVOICES = [
  { id: 'INV-001', amount: 18500, status: 'paid', date: '2025-04-15' },
  { id: 'INV-002', amount: 7200, status: 'pending', date: '2025-05-10' },
]

const TICKETS = [
  { id: 'TKT-1042', subject: 'Login issue post-update', status: 'open', priority: 'high', date: '2025-05-20' },
  { id: 'TKT-1039', subject: 'Report generation slow', status: 'resolved', priority: 'low', date: '2025-05-18' },
]

const DOCS = [
  { name: 'Service Agreement.pdf', date: '2023-01-15', size: '480 KB' },
  { name: 'Q1 2025 Report.pdf', date: '2025-04-01', size: '1.2 MB' },
  { name: 'Onboarding Guide.pdf', date: '2023-01-20', size: '2.1 MB' },
]

const STATUS_STYLE = {
  paid: 'text-emerald-400 bg-emerald-400/10',
  pending: 'text-amber-400 bg-amber-400/10',
  open: 'text-blue-400 bg-blue-400/10',
  resolved: 'text-emerald-400 bg-emerald-400/10',
}

export default function Portal() {
  const [tab, setTab] = useState('overview')

  return (
    <div className="min-h-screen ">
      {/* Portal Header */}
      {/* <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">TG Sales Ai Client Portal</p>
            <p className="text-slate-400 text-xs">{CLIENT.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm">{CLIENT.contact}</span>
          <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 text-xs font-bold">JS</div>
        </div>
      </div> */}

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-6">
          <h1 className="text-xl font-bold text-white mb-1">Welcome back, {CLIENT.contact} 👋</h1>
          <p className="text-slate-400 text-sm">Here's an overview of your account with us.</p>
          <div className="flex gap-6 mt-4">
            <div>
              <p className="text-slate-400 text-xs">Plan</p>
              <p className="text-indigo-300 font-semibold">{CLIENT.plan}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Monthly</p>
              <p className="text-white font-semibold">${CLIENT.mrr.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Customer since</p>
              <p className="text-white font-semibold">{new Date(CLIENT.since).toLocaleDateString('en', { year: 'numeric', month: 'short' })}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit">
          {['overview', 'invoices', 'support', 'documents'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition
                ${tab === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-xs mb-1">Open Tickets</p>
              <p className="text-2xl font-bold text-white">{TICKETS.filter(t => t.status === 'open').length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-xs mb-1">Pending Invoices</p>
              <p className="text-2xl font-bold text-amber-400">{INVOICES.filter(i => i.status === 'pending').length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-xs mb-1">NPS Score</p>
              <p className="text-2xl font-bold text-emerald-400">{CLIENT.nps}/10</p>
            </div>
          </div>
        )}

        {tab === 'invoices' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-slate-800">
                {['Invoice', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-slate-800">
                {INVOICES.map(inv => (
                  <tr key={inv.id}>
                    <td className="px-5 py-4 text-indigo-400 text-sm font-medium">{inv.id}</td>
                    <td className="px-5 py-4 text-white font-semibold text-sm">${inv.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{new Date(inv.date).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${STATUS_STYLE[inv.status]}`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'support' && (
          <div className="space-y-4">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">
              + Submit Ticket
            </button>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-slate-800">
                  {['Ticket', 'Subject', 'Priority', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-slate-800">
                  {TICKETS.map(t => (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-5 py-4 text-indigo-400 text-sm font-medium">{t.id}</td>
                      <td className="px-5 py-4 text-white text-sm">{t.subject}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize
                          ${t.priority === 'high' ? 'text-rose-400' : 'text-slate-400'}`}>{t.priority}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800">
            {DOCS.map(d => (
              <div key={d.name} className="flex items-center justify-between px-5 py-4 hover:bg-slate-800/40 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-white text-sm font-medium">{d.name}</p>
                    <p className="text-slate-500 text-xs">{d.size} · {new Date(d.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300 text-sm transition">↓ Download</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
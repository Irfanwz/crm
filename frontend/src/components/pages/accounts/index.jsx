import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PnLChart from '../../charts/PnLChart'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import Counter from '../../ui/Counter'
import Modal from '../../ui/Modal'
import { Input, Select } from '../../ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  CreditCard, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  FileText, 
  BarChart3, 
  MoreHorizontal,
  Target,
  Megaphone,
  Briefcase,
  Activity,
  Zap,
  Search,
  LayoutGrid,
  List,
  TrendingUp,
  Receipt,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react'

const INVOICES = [
  { id: 'INV-001', client: 'Acme Corp', amount: 18500, status: 'paid', due: '2025-05-01', issued: '2025-04-15' },
  { id: 'INV-002', client: 'TechFlow Inc', amount: 7200, status: 'pending', due: '2025-06-01', issued: '2025-05-10' },
  { id: 'INV-003', client: 'Global Logistics', amount: 32000, status: 'overdue', due: '2025-04-20', issued: '2025-04-01' },
  { id: 'INV-004', client: 'RetailMax', amount: 9750, status: 'paid', due: '2025-05-15', issued: '2025-04-28' },
  { id: 'INV-005', client: 'HealthSync', amount: 5400, status: 'draft', due: '2025-06-30', issued: '2025-05-20' },
  { id: 'INV-006', client: 'EduTrack', amount: 12300, status: 'pending', due: '2025-06-10', issued: '2025-05-15' },
]

const STATUS_STYLE = {
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  overdue: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20 shadow-[0_0_15px_rgba(100,116,139,0.15)]',
}

const ACCOUNTS_MODULES = {
  'Invoices': { icon: Receipt, color: 'cyan', title: 'Billing & Receivables' },
  'Expenses': { icon: Wallet, color: 'rose', title: 'Accounts Payable' },
  'P&L Analysis': { icon: TrendingUp, color: 'emerald', title: 'Profit & Loss' },
  'Budgeting': { icon: PiggyBank, color: 'indigo', title: 'Financial Planning' },
  'Tax & Audit': { icon: ShieldCheck, color: 'amber', title: 'Compliance Hub' }
}

export default function Accounts() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Invoices')
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [showNewInvoice, setShowNewInvoice] = useState(false)

  const totalPaid = INVOICES.filter(i => i.status === 'paid').reduce((a, i) => a + i.amount, 0)
  const totalPending = INVOICES.filter(i => i.status === 'pending').reduce((a, i) => a + i.amount, 0)
  const totalOverdue = INVOICES.filter(i => i.status === 'overdue').reduce((a, i) => a + i.amount, 0)

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Operations', path: '/operations', icon: Activity }
  ]

  const filtered = INVOICES.filter(inv => 
    inv.id.toLowerCase().includes(search.toLowerCase()) || 
    inv.client.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CreditCard size={18} className="text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">{ACCOUNTS_MODULES[subTab]?.title || 'Financial Management'}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Accounts</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Track invoices, manage client payments, and monitor your overall financial performance. Seamlessly connected with sales and operations.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connects with:</span>
            <div className="flex flex-wrap gap-2">
              {integrations.map(int => (
                <span 
                  key={int.name} 
                  onClick={() => navigate(int.path)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-emerald-500/10 hover:text-emerald-400 transition-all flex items-center gap-2"
                >
                  <int.icon size={12} />
                  {int.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:pt-2 whitespace-nowrap flex-shrink-0">
          <Button 
            variant="cyan" 
            size="md" 
            icon={<Plus size={18} />} 
            onClick={() => setShowNewInvoice(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-cyan-500/20"
          >
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Collected', value: `$${(totalPaid / 1000).toFixed(1)}k`, icon: DollarSign, color: 'emerald', trend: '+12.4%' },
          { label: 'Pending Payment', value: `$${(totalPending / 1000).toFixed(1)}k`, icon: Clock, color: 'amber', trend: '4 Invoices' },
          { label: 'Overdue Balance', value: `$${(totalOverdue / 1000).toFixed(1)}k`, icon: AlertCircle, color: 'rose', trend: '-2.1%' },
          { label: 'Avg. Payment', value: '8 Days', icon: BarChart3, color: 'indigo', trend: 'Optimal' },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="group relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.05] transition-all" />
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-${k.color}-500/10 border border-${k.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <k.icon size={20} className={`text-${k.color}-400`} />
                </div>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${k.trend.includes('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-white/[0.05]'} border border-white/[0.05]`}>
                  {k.trend}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{k.label}</p>
              <p className="text-4xl font-black text-white tracking-tightest group-hover:text-emerald-400 transition-colors">
                <Counter value={k.value} />
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Module Navigator Sidebar */}
        <div className="xl:w-80 space-y-6 flex-shrink-0">
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-white font-bold text-lg tracking-tight">Management</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-1">Module Navigator</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(ACCOUNTS_MODULES).map(([tag, config]) => (
                    <motion.button 
                      key={tag} 
                      onClick={() => setSubTab(tag)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-3 rounded-xl border transition-all cursor-pointer text-[10px] font-black uppercase tracking-widest flex items-center gap-3 relative overflow-hidden group
                        ${subTab === tag 
                          ? `bg-${config.color}-500/10 border-${config.color}-500/30 text-${config.color}-400 shadow-lg` 
                          : 'bg-white/[0.02] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.04]'}`}
                    >
                      <config.icon size={16} className={subTab === tag ? `text-${config.color}-400` : 'text-slate-500'} />
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/[0.05]">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-1">Quick Filters</p>
                <div className="space-y-4">
                  <div className="relative group/input">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors" />
                    <input 
                      value={search} 
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search invoices..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-emerald-400" />
              AI Finance Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Projected cash flow for next month is $42k. You have $32k in overdue balances that need collection.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <AnimatePresence mode="wait">
            {subTab === 'Invoices' ? (
              <motion.div key="invoices" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                  </div>
                </div>

                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filtered.map(inv => (
                      <motion.div
                        layoutId={`inv-${inv.id}`}
                        key={inv.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-cyan-500/50 hover:from-cyan-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="space-y-1">
                            <h3 className="text-white font-black text-lg tracking-tight group-hover:text-cyan-400 transition-colors leading-tight">{inv.id}</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{inv.client}</p>
                          </div>
                          <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_STYLE[inv.status]}`}>
                            {inv.status}
                          </span>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                            <div>
                              <p className="text-white font-black text-2xl tracking-tighter leading-none">${inv.amount.toLocaleString()}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Invoice Amount</p>
                            </div>
                            <div className="text-right">
                              <p className="text-slate-400 font-black text-xs tracking-tighter leading-none">{new Date(inv.due).toLocaleDateString()}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Due Date</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <ArrowUpRight size={14} className="text-cyan-400" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Issued {new Date(inv.issued).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <GlassCard className="overflow-hidden" glow>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/[0.05]">
                          {['Invoice', 'Client', 'Amount', 'Status', 'Issued', 'Due'].map(h => (
                            <th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {filtered.map(inv => (
                          <tr key={inv.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                            <td className="px-8 py-8">
                              <span className="text-cyan-400 font-black tracking-tight text-sm group-hover:scale-105 transition-transform inline-block">{inv.id}</span>
                            </td>
                            <td className="px-8 py-8">
                              <span className="text-white font-black text-sm tracking-tight">{inv.client}</span>
                            </td>
                            <td className="px-8 py-8 text-white font-black text-sm tracking-tighter">${inv.amount.toLocaleString()}</td>
                            <td className="px-8 py-8">
                              <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_STYLE[inv.status]}`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="px-8 py-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">{new Date(inv.issued).toLocaleDateString()}</td>
                            <td className="px-8 py-8 text-slate-400 font-black text-[10px] uppercase tracking-widest">{new Date(inv.due).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                )}
              </motion.div>
            ) : subTab === 'P&L Analysis' ? (
              <motion.div key="pnl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <GlassCard className="p-10" glow>
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-white font-black text-xl uppercase tracking-tighter">Profit & Loss Trajectory</h3>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Revenue vs Expenses Forecast</p>
                    </div>
                  </div>
                  <div className="min-h-[400px]">
                    <PnLChart height={400} />
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div key="module" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-[2rem] bg-${ACCOUNTS_MODULES[subTab]?.color || 'indigo'}-500/10 border border-${ACCOUNTS_MODULES[subTab]?.color || 'indigo'}-500/20 flex items-center justify-center`}>
                  {(() => { const Icon = ACCOUNTS_MODULES[subTab]?.icon || DollarSign; return <Icon size={40} className={`text-${ACCOUNTS_MODULES[subTab]?.color || 'indigo'}-400`} /> })()}
                </div>
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{ACCOUNTS_MODULES[subTab]?.title || 'Module Initialized'}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">This module is currently being synchronized with your financial data stack.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Invoice Modal */}
      <Modal 
        open={showNewInvoice} 
        onClose={() => setShowNewInvoice(false)} 
        title="Generate New Invoice"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowNewInvoice(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowNewInvoice(false)}>Generate & Send</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Client Name</label>
            <Input placeholder="e.g. Acme Corp" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Invoice Amount ($)</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
              <Input type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Payment Terms</label>
            <Select>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 60</option>
              <option>Due on Receipt</option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  )
}

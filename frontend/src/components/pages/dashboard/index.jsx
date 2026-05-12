import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PnLChart from '../../charts/PnLChart'
import GaugeChart from '../../charts/GaugeChart'
import { GlassCard } from '../../ui/GlassCard'
import Counter from '../../ui/Counter'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  LayoutDashboard, 
  Target, 
  DollarSign, 
  Megaphone, 
  Briefcase, 
  Users, 
  BarChart3, 
  ArrowUpRight 
} from 'lucide-react'

const KPI = [
  { label: 'Revenue YTD', value: '$6.2M', change: '+18%', up: true, delay: 0.1, icon: TrendingUp, color: 'indigo' },
  { label: 'Gross Margin', value: '64%', change: '+3pp', up: true, delay: 0.2, icon: Activity, color: 'cyan' },
  { label: 'Customer Count', value: '1,284', change: '+124', up: true, delay: 0.3, icon: Zap, color: 'purple' },
  { label: 'Churn Rate', value: '5.8%', change: '+0.3pp', up: false, delay: 0.4, icon: TrendingDown, color: 'rose' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 },
    { name: 'Operations', path: '/operations', icon: Zap }
  ]

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <LayoutDashboard size={18} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Executive Summary</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Comprehensive overview of your business performance, financial health, and growth metrics. Real-time data visualization from all integrated modules.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connects with:</span>
            <div className="flex flex-wrap gap-2">
              {integrations.map(int => (
                <span 
                  key={int.name} 
                  onClick={() => navigate(int.path)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400/80 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-indigo-500/10 hover:text-indigo-400 transition-all flex items-center gap-2"
                >
                  <int.icon size={12} />
                  {int.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:pt-2 whitespace-nowrap flex-shrink-0">
          <button className="h-14 px-8 rounded-2xl bg-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-3">
            Export Report
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI.map(k => (
          <GlassCard key={k.label} glow delay={k.delay} className="group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-${k.color}-500/10 border border-${k.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                <k.icon size={20} className={`text-${k.color}-400`} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${k.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                {k.change}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{k.label}</p>
            <p className="text-4xl font-black text-white tracking-tighter">
              <Counter value={k.value} />
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className={`h-full bg-${k.color}-500/50 shadow-[0_0_10px_rgba(99,102,241,0.3)]`}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase">Target</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-px">
        <div className="flex gap-10">
          {['overview', 'analytics', 'financials'].map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative group
                ${tab === t ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {t}
              {tab === t && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4"
          >
            <GlassCard delay={0.1} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-white font-bold text-xl tracking-tight">Financial Performance</h3>
                <select className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest focus:outline-none">
                  <option>Last 12 Months</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div className="min-h-[300px]">
                 <PnLChart height={300} />
              </div>
            </GlassCard>
            <GlassCard delay={0.2} className="flex flex-col items-center justify-center">
              <div className="mb-10 text-center">
                <h3 className="text-white font-bold text-xl tracking-tight mb-2">Health Index</h3>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Global Stability Score</p>
              </div>
              <GaugeChart value={78} label="Health Score" color="#6366f1" size={240} />
              <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Stability</p>
                  <p className="text-lg font-bold text-emerald-400">High</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Risk</p>
                  <p className="text-lg font-bold text-indigo-400">Low</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {tab === 'analytics' && (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-4"
          >
            <GlassCard delay={0.1} className="p-12 text-center">
               <Zap size={48} className="text-indigo-400 mx-auto mb-6 opacity-20" />
               <h3 className="text-white font-bold text-xl mb-2">Advanced Analytics</h3>
               <p className="text-slate-500 text-sm">Real-time behavior tracking and predictive modeling engine coming soon.</p>
            </GlassCard>
          </motion.div>
        )}

        {tab === 'financials' && (
          <motion.div 
            key="financials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-4"
          >
            <GlassCard delay={0.1}>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-white font-bold text-2xl tracking-tight mb-1">Profit & Loss Analysis</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Full Year Financial Projection</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Expenses</span>
                  </div>
                </div>
              </div>
              <div className="min-h-[400px]">
                 <PnLChart height={400} />
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

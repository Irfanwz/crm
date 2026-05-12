import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PnLChart from '../../charts/PnLChart'
import GaugeChart from '../../charts/GaugeChart'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Counter from '../../ui/Counter'
import Modal from '../../ui/Modal'
import { Input, Select } from '../../ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Activity,
  BookOpen,
  ShieldCheck,
  Flag,
  ListChecks,
  Briefcase,
  Megaphone,
  BarChart3,
  DollarSign,
  Search,
  AlertCircle,
  LayoutGrid,
  ChevronRight,
  List
} from 'lucide-react'

const GOALS = [
  { id: 1, title: 'Grow Revenue to $10M', progress: 68, due: 'Dec 2025', status: 'on-track' },
  { id: 2, title: 'Expand to 3 New Markets', progress: 33, due: 'Sep 2025', status: 'at-risk' },
  { id: 3, title: 'Reduce Churn to <5%', progress: 82, due: 'Jun 2025', status: 'on-track' },
  { id: 4, title: 'Hire 20 Engineers', progress: 55, due: 'Nov 2025', status: 'on-track' },
  { id: 5, title: 'Launch Mobile App', progress: 15, due: 'Jan 2026', status: 'behind' },
]

const STATUS_COLOR = {
  'on-track': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  'at-risk': 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  'behind': 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
}

const KPI = [
  { label: 'Revenue YTD', value: '$6.2M', change: '+18%', up: true, delay: 0.1, icon: TrendingUp, color: 'indigo' },
  { label: 'Gross Margin', value: '64%', change: '+3pp', up: true, delay: 0.2, icon: Activity, color: 'cyan' },
  { label: 'Customer Count', value: '1,284', change: '+124', up: true, delay: 0.3, icon: Zap, color: 'purple' },
  { label: 'Churn Rate', value: '5.8%', change: '+0.3pp', up: false, delay: 0.4, icon: TrendingDown, color: 'rose' },
]

const STRATEGY_MODULES = {
  'Vision & mission': { icon: BookOpen, color: 'rose', title: 'Company Core Identity' },
  'Core values': { icon: ShieldCheck, color: 'emerald', title: 'Our Principles' },
  'Objectives': { icon: Flag, color: 'amber', title: 'Strategic Goals' },
  'OKRs': { icon: ListChecks, color: 'blue', title: 'Objectives & Key Results' },
  'KPIs': { icon: Activity, color: 'indigo', title: 'Performance Indicators' },
  'SOPs': { icon: Zap, color: 'cyan', title: 'Standard Procedures' }
}

const STRATEGY_CONTENT = {
  'Vision & mission': {
    title: 'Company Core Identity',
    items: [
      { label: 'Vision', content: 'To become the world\'s most intelligent CRM ecosystem for growing enterprises.' },
      { label: 'Mission', content: 'Empowering teams with TG Sales Ai 3D data visualization and AI-driven strategic insights.' }
    ]
  },
  'Core values': {
    title: 'Our Principles',
    items: [
      { label: 'Innovation', content: 'Pushing boundaries in data visualization.' },
      { label: 'Transparency', content: 'Clear metrics for every stakeholder.' },
      { label: 'Growth', content: 'Continuous improvement in every module.' }
    ]
  },
  'Objectives': {
    title: 'Strategic Goals',
    items: [
      { label: 'Market Share', content: 'Capture 15% of the mid-market CRM segment by Q4.' },
      { label: 'Efficiency', content: 'Reduce customer onboarding time by 40%.' }
    ]
  },
  'OKRs': {
    title: 'Objectives & Key Results',
    items: [
      { label: 'O1', content: 'Achieve $10M ARR milestone.' },
      { label: 'KR1', content: 'Upsell 20% of existing client base to Enterprise.' }
    ]
  },
  'KPIs': {
    title: 'Performance Indicators',
    items: [
      { label: 'CAC', content: 'Target < $500 per enterprise account.' },
      { label: 'LTV', content: 'Increase average lifetime value to $45k.' }
    ]
  },
  'SOPs': {
    title: 'Standard Procedures',
    items: [
      { label: 'Sales Playbook', content: 'Standardized discovery and demo flow.' },
      { label: 'Support SLA', content: 'Response time under 2 hours for critical issues.' }
    ]
  }
}

export default function Strategy() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Vision & mission')
  const [view, setView] = useState('grid')
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showDeepDive, setShowDeepDive] = useState(false)

  const integrations = [
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 },
    { name: 'Operations', path: '/operations', icon: Zap }
  ]

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Target size={18} className="text-rose-500" />
              </div>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.3em]">{STRATEGY_MODULES[subTab].title}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Strategy</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Define and cascade your company's direction — from vision and mission down to OKRs, KPIs, SOPs, and core values. Seamlessly connected with all enterprise modules.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connects with:</span>
            <div className="flex flex-wrap gap-2">
              {integrations.map(int => (
                <span 
                  key={int.name} 
                  onClick={() => navigate(int.path)}
                  className="px-4 py-1.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-400/80 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 transition-all flex items-center gap-2"
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
            variant="primary" 
            size="md" 
            icon={<Plus size={18} />} 
            onClick={() => setShowAddGoal(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-rose-500/20"
          >
            Add Goal
          </Button>
          <button 
            onClick={() => setShowDeepDive(true)}
            className="h-14 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-white hover:bg-white/[0.05] transition-all group"
          >
            <ChevronRight size={20} className="text-slate-500 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI.map((k, i) => (
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
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${k.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'} border border-white/[0.05]`}>
                  {k.change}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{k.label}</p>
              <p className="text-4xl font-black text-white tracking-tightest group-hover:text-rose-400 transition-colors">
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
                  {Object.entries(STRATEGY_MODULES).map(([tag, config]) => (
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
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400" />
              AI Strategy Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Market expansion objectives are 12% ahead of schedule. Consider accelerating hiring plans in Q3.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
              <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard className="p-8 border-white/[0.05] hover:border-rose-500/30 transition-all rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/10 transition-colors" />
                    <h3 className="text-rose-400 font-black text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3 relative z-10">
                      <Activity size={18} />
                      {STRATEGY_CONTENT[subTab].title}
                    </h3>
                    <div className="space-y-4 relative z-10">
                      {STRATEGY_CONTENT[subTab].items.map((item, idx) => (
                        <div key={idx} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.04] hover:border-rose-500/20 transition-all group/item">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover/item:text-rose-400 transition-colors">{item.label}</p>
                          <p className="text-white text-sm leading-relaxed font-medium">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border-indigo-500/20 flex flex-col items-center text-center space-y-6 justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center shadow-2xl shadow-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                      <Target size={40} className="text-rose-500" />
                    </div>
                    <h4 className="text-white font-black text-xl uppercase tracking-tighter">Strategic Alignment</h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">All {subTab} are automatically cascaded across your enterprise department hierarchy.</p>
                    <Button variant="secondary" size="sm" className="rounded-xl font-black uppercase tracking-widest text-[10px]">Manage {subTab}</Button>
                  </GlassCard>
                </div>

                <div className="pt-10 border-t border-white/[0.05] space-y-8">
                  <h3 className="text-white font-black text-2xl tracking-tight uppercase tracking-tighter">Active Objectives</h3>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                    {GOALS.map((g, i) => (
                      <motion.div
                        key={g.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-rose-500/30 transition-all shadow-xl relative overflow-hidden group"
                      >
                        <div className="flex justify-between items-start mb-8">
                          <div className="space-y-1">
                            <h4 className="text-white font-black text-lg tracking-tight group-hover:text-rose-400 transition-colors leading-tight">{g.title}</h4>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Deadline: {g.due}</p>
                          </div>
                          <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[g.status]}`}>
                            {g.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <span>Objective Progress</span>
                            <span className="text-white">{g.progress}%</span>
                          </div>
                          <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${g.progress}%` }}
                              className="h-full bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <GlassCard className="overflow-hidden" glow>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.05]">
                        {['Objective', 'Status', 'Progress', 'Deadline', 'Team'].map(h => (
                          <th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {GOALS.map(g => (
                        <tr key={g.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="px-8 py-8">
                            <div className="flex flex-col">
                              <span className="text-white font-black tracking-tight text-sm group-hover:text-rose-400 transition-colors leading-tight">{g.title}</span>
                              <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">Strategic Goal</span>
                            </div>
                          </td>
                          <td className="px-8 py-8">
                            <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[g.status]}`}>
                              {g.status.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="px-8 py-8">
                            <div className="flex items-center gap-4">
                              <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${g.progress}%` }} className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                              </div>
                              <span className="text-white font-black text-[10px] tracking-widest">{g.progress}%</span>
                            </div>
                          </td>
                          <td className="px-8 py-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">{g.due}</td>
                          <td className="px-8 py-8 text-white font-black text-xs">Executive</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Goal Modal */}
      <Modal 
        open={showAddGoal} 
        onClose={() => setShowAddGoal(false)} 
        title="Create New Strategic Goal"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowAddGoal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => {
              toast.success('Goal created successfully!')
              setShowAddGoal(false)
            }}>Create Goal</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <Input label="Goal Title" placeholder="e.g. Expand to European Market" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </Select>
            <Input label="Target Date" type="date" />
          </div>
          <Input label="Target Value" placeholder="e.g. $1,000,000" />
        </div>
      </Modal>

      {/* Deep Dive Modal */}
      <Modal
        open={showDeepDive}
        onClose={() => setShowDeepDive(false)}
        title="Strategy Module: Deep Dive"
        size="lg"
        footer={<Button variant="primary" onClick={() => setShowDeepDive(false)}>Close Overview</Button>}
      >
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Vision', desc: 'Long-term aspirations and market positioning.' },
              { icon: ShieldCheck, title: 'Core Values', desc: 'Fundamental beliefs that guide behavior.' },
              { icon: Flag, title: 'Objectives', desc: 'Specific, measurable targets for the fiscal year.' },
            ].map((box, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center">
                  <box.icon size={24} className="text-rose-500" />
                </div>
                <h5 className="text-white font-bold">{box.title}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10">
            <div className="flex items-center gap-4 mb-6">
              <ListChecks className="text-indigo-400" />
              <h5 className="text-white font-bold text-lg">Integrated Framework</h5>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The strategy module is the central nervous system of NexCRM. It ensures that every task in **Projects**, every deal in **Sales**, and every hiring decision in **HR** is aligned with the company's top-level OKRs.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cross-department Sync', 'Real-time OKR Tracking', 'Automated KPI Reporting', 'SOP Governance'].map(feat => (
                <span key={feat} className="px-3 py-1 rounded-lg bg-white/[0.03] text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/[0.05]">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
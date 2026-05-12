import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Users,
  Calendar,
  ExternalLink,
  Target,
  DollarSign,
  Megaphone,
  BarChart3,
  Settings as SettingsIcon,
  ChevronDown,
  LayoutDashboard,
  RefreshCcw,
  TrendingUp
} from 'lucide-react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input } from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import Counter from '../../ui/Counter'
import { GlassCard } from '../../ui/GlassCard'
import salesService from '../../../services/salesService'
import { useNavigate } from 'react-router-dom'

const STATUS_COLOR = {
  active: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
  review: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  done: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  planned: 'bg-slate-500/10 text-slate-400 border border-slate-500/20 shadow-[0_0_15px_rgba(100,116,139,0.15)]',
}

const PROGRESS_COLOR = (p) => p >= 80 ? '#10b981' : p >= 50 ? '#6366f1' : '#f59e0b'

const PROJECT_MODULES = {
  'Overview': { icon: LayoutDashboard, color: 'indigo', title: 'Execution Core' },
  'Team Tasks': { icon: Users, color: 'emerald', title: 'Workforce Allocation' },
  'Milestones': { icon: Target, color: 'amber', title: 'Strategic Roadmap' },
  'Analytics': { icon: BarChart3, color: 'cyan', title: 'Performance Metrics' },
  'Settings': { icon: SettingsIcon, color: 'slate', title: 'Module Configuration' }
}

export default function Projects() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Overview')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showDeepDive, setShowDeepDive] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    client_name: '',
    progress: 0,
    status: 'active',
    due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tasks: 10
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await salesService.getProjects()
      if (res.data.success) {
        setProjects(res.data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const statuses = ['All', 'active', 'review', 'done', 'planned']
  
  const filtered = projects.filter(p => 
    (filter === 'All' || p.status === filter) &&
    (p.name?.toLowerCase().includes(search.toLowerCase()) || 
     p.client_name?.toLowerCase().includes(search.toLowerCase()))
  )

  const handleAddProject = async (e) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error('Please enter a project name')
      return
    }

    try {
      const res = await salesService.createProject({
        name: formData.name,
        client_name: formData.client_name,
        status: formData.status,
        start_date: new Date().toISOString(),
        end_date: formData.due
      })

      if (res.data.success) {
        setProjects([res.data.data, ...projects])
        setShowModal(false)
        setFormData({
          name: '',
          client_name: '',
          progress: 0,
          status: 'active',
          due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tasks: 10
        })
        toast.success('Project added successfully!')
      }
    } catch (err) {
      console.error('Failed to create project:', err)
      toast.error('Failed to save project to database')
    }
  }

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 },
    { name: 'Operations', path: '/operations', icon: SettingsIcon }
  ]

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Briefcase size={18} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">{PROJECT_MODULES[subTab].title}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Projects</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Manage and track your active projects, deliverables, and team performance. Seamlessly connected with sales and account modules.
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
          <Button 
            variant="primary" 
            size="md" 
            icon={<Plus size={18} />} 
            onClick={() => setShowModal(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-indigo-500/20"
          >
            New Project
          </Button>
          <button 
            onClick={() => setShowDeepDive(true)}
            className="h-14 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-white hover:bg-white/[0.05] transition-all group"
          >
            <ExternalLink size={20} className="text-slate-500 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: Briefcase, color: 'indigo', trend: '+5%' },
          { label: 'Total Tasks', value: projects.reduce((acc, p) => acc + (p.tasks || 0), 0), icon: CheckCircle2, color: 'emerald', trend: '+12%' },
          { label: 'Pending Reviews', value: projects.filter(p => p.status === 'review').length, icon: Clock, color: 'amber', trend: '-2' },
          { label: 'Risk Projects', value: 0, icon: AlertCircle, color: 'rose', trend: 'Stable' },
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
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${k.trend.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : k.trend.startsWith('-') ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 bg-white/[0.05]'} border border-white/[0.05]`}>
                  {k.trend}
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{k.label}</p>
              <p className="text-4xl font-black text-white tracking-tightest group-hover:text-indigo-400 transition-colors">
                <Counter value={k.value} />
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="xl:w-80 space-y-6 flex-shrink-0">
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-white font-bold text-lg tracking-tight">Management</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-1">Module Navigator</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(PROJECT_MODULES).map(([tag, config]) => (
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
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                    <input 
                      value={search} 
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {statuses.map(s => (
                        <button 
                          key={s} 
                          onClick={() => setFilter(s)}
                          className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all
                            ${filter === s 
                              ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                              : 'bg-white/[0.02] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.05]'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-indigo-400" />
              AI Project Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Based on current task velocity, 3 projects are ahead of schedule. Consider reallocating resources to high-priority deliverables.
            </p>
          </GlassCard>
        </div>

        <div className="flex-1 space-y-6 min-w-0">
          <AnimatePresence mode="wait">
            {subTab === 'Overview' ? (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button 
                      onClick={() => setView('grid')}
                      className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button 
                      onClick={() => setView('list')}
                      className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>

                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filtered.map(p => (
                      <motion.div
                        layoutId={`project-${p.id}`}
                        key={p.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-indigo-500/50 hover:from-indigo-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="space-y-1">
                            <h3 className="text-white font-black text-lg tracking-tight group-hover:text-indigo-400 transition-colors leading-tight">{p.name}</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{p.client_name || 'Internal Execution'}</p>
                          </div>
                          <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[p.status]}`}>
                            {p.status}
                          </span>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                              <span className="text-slate-500">Milestone Progress</span>
                              <span className="text-white">{p.progress}%</span>
                            </div>
                            <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${p.progress}%` }}
                                className="h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                style={{ backgroundColor: PROGRESS_COLOR(p.progress) }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                            <div className="flex -space-x-3">
                              {p.team?.slice(0, 3).map((m, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-[#0B0F17] flex items-center justify-center text-[11px] font-black text-indigo-400 shadow-xl">
                                  {m[0]}
                                </div>
                              )) || (
                                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0B0F17] flex items-center justify-center text-[11px] font-black text-slate-600 shadow-xl">
                                  ?
                                </div>
                              )}
                              {(p.team?.length > 3) && (
                                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0B0F17] flex items-center justify-center text-[11px] font-black text-white shadow-xl">
                                  +{p.team.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-white font-black text-base tracking-tighter leading-none">{p.done || 0}/{p.tasks || 10}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Deliverables</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] pt-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <Calendar size={12} className="text-indigo-400" />
                              {new Date(p.due || p.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <Clock size={12} className="text-amber-400" />
                              Active
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <GlassCard className="overflow-hidden" glow>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/[0.05]">
                          {['Project', 'Status', 'Progress', 'Tasks', 'Due Date', 'Team'].map(h => (
                            <th key={h} className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest px-8 py-8">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {filtered.map(p => (
                          <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                            <td className="px-8 py-8">
                              <div className="flex flex-col">
                                <span className="text-white font-black tracking-tight text-sm group-hover:text-indigo-400 transition-colors leading-tight">{p.name}</span>
                                <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">{p.client_name || 'Internal Execution'}</span>
                              </div>
                            </td>
                            <td className="px-8 py-8">
                              <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[p.status]}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-4">
                                <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${p.progress}%` }}
                                    className="h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    style={{ backgroundColor: PROGRESS_COLOR(p.progress) }}
                                  />
                                </div>
                                <span className="text-white font-black text-[10px] tracking-widest">{p.progress}%</span>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-white font-black text-sm tracking-tighter">{p.done || 0}/{p.tasks || 10}</td>
                            <td className="px-8 py-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">{new Date(p.due || p.end_date).toLocaleDateString()}</td>
                            <td className="px-8 py-8">
                              <div className="flex -space-x-2">
                                {p.team?.slice(0, 3).map((m, i) => (
                                  <div key={i} className="w-8 h-8 rounded-full bg-indigo-500/20 border border-[#0B0F17] flex items-center justify-center text-[10px] font-black text-indigo-400">
                                    {m[0]}
                                  </div>
                                )) || <span className="text-slate-700 font-black">?</span>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                )}
              </motion.div>
            ) : subTab === 'Analytics' ? (
              <motion.div key="analytics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <GlassCard className="p-8">
                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-8">Performance Velocity</h4>
                    <div className="h-64 flex items-center justify-center text-slate-600 italic">
                      [Interactive Chart Placeholder]
                    </div>
                  </GlassCard>
                  <GlassCard className="p-8">
                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-8">Resource Heatmap</h4>
                    <div className="h-64 flex items-center justify-center text-slate-600 italic">
                      [Resource Map Placeholder]
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ) : (
              <motion.div key="module" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-[2rem] bg-${PROJECT_MODULES[subTab].color}-500/10 border border-${PROJECT_MODULES[subTab].color}-500/20 flex items-center justify-center`}>
                  {(() => { const Icon = PROJECT_MODULES[subTab].icon; return <Icon size={40} className={`text-${PROJECT_MODULES[subTab].color}-400`} /> })()}
                </div>
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{PROJECT_MODULES[subTab].title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">This module is currently being synchronized with your enterprise data stack.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Project Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Initialize New Project"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddProject}>Launch Project</Button>
          </div>
        }
      >
        <form onSubmit={handleAddProject} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Project Name</label>
            <Input 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. CRM Revamp" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Client Name</label>
            <Input 
              value={formData.client_name}
              onChange={e => setFormData({...formData, client_name: e.target.value})}
              placeholder="e.g. Acme Corp" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Progress (%)</label>
              <Input 
                type="number"
                value={formData.progress}
                onChange={e => setFormData({...formData, progress: e.target.value})}
                placeholder="0" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Total Tasks</label>
              <Input 
                type="number"
                value={formData.tasks}
                onChange={e => setFormData({...formData, tasks: e.target.value})}
                placeholder="10" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                {statuses.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Due Date</label>
              <Input 
                type="date" 
                value={formData.due}
                onChange={e => setFormData({...formData, due: e.target.value})}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Deep Dive Modal */}
      <Modal
        open={showDeepDive}
        onClose={() => setShowDeepDive(false)}
        title="Execution Core: Strategic Deep Dive"
        size="lg"
        footer={<Button variant="primary" onClick={() => setShowDeepDive(false)}>Close Overview</Button>}
      >
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Milestones', desc: 'Critical path tracking for every project deliverable.' },
              { icon: Users, title: 'Resource Allocation', desc: 'Optimize workforce utilization across active projects.' },
              { icon: BarChart3, title: 'Velocity Tracking', desc: 'Real-time monitoring of task completion speed.' },
            ].map((box, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] space-y-5 group hover:bg-white/[0.04] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <box.icon size={28} className="text-indigo-400" />
                </div>
                <h5 className="text-white font-black uppercase tracking-widest text-xs">{box.title}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <CheckCircle2 className="text-indigo-400" size={24} />
              <h5 className="text-white font-black text-xl uppercase tracking-tighter">Connected Execution Layer</h5>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
              The Projects module acts as the fulfillment engine of your CRM. It synchronizes with **Sales** to ingest won deals and communicates with **Accounts** for milestone-based billing.
            </p>
            <div className="flex flex-wrap gap-3 relative z-10">
              {['Automated Ingestion', 'Milestone Sync', 'Resource Heatmaps', 'Delivery Forecasting'].map(feat => (
                <span key={feat} className="px-4 py-2 rounded-xl bg-white/[0.03] text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/[0.05] shadow-lg">
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
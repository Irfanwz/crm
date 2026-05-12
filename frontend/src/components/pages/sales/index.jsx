import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Target,
  MoreVertical,
  Calendar,
  Briefcase,
  Users,
  Activity,
  GraduationCap,
  User,
  MessageSquare,
  FileText,
  ChevronDown,
  LayoutDashboard,
  Megaphone,
  BarChart3,
  RefreshCcw,
  ExternalLink,
  AlertCircle,
  LayoutGrid,
  List,
  Clock,
  ArrowUpRight
} from 'lucide-react'

import CustomFunnelChart from '../../charts/FunnelChart'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { Input } from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import Counter from '../../ui/Counter'
import salesService from '../../../services/salesService'

const SALES_CONTENT = {
  'Deals': {
    title: 'Opportunity Management',
    icon: DollarSign,
    isDeals: true,
    buttonText: 'New Deal',
    color: 'orange'
  },
  'Sales training': {
    title: 'Sales Enablement & Training',
    icon: GraduationCap,
    buttonText: 'Add Training Material',
    color: 'indigo'
  },
  'Individual dashboard': {
    title: 'Individual Performance',
    icon: User,
    hideGeneric: true,
    color: 'cyan'
  },
  'Team dashboard': {
    title: 'Regional Sales Overview',
    icon: Users,
    hideGeneric: true,
    color: 'emerald'
  },
  'Sales activities': {
    title: 'Daily Operations',
    icon: Activity,
    buttonText: 'Log Activity',
    color: 'rose'
  },
  'Follow-up module': {
    title: 'Retention & Nurturing',
    icon: MessageSquare,
    buttonText: 'New Follow-up',
    color: 'purple'
  },
  'Meeting minutes': {
    title: 'Call Summaries',
    icon: FileText,
    buttonText: 'Add Minutes',
    color: 'blue'
  },
  'Sales strategies': {
    title: 'Strategic Playbooks',
    icon: Target,
    buttonText: 'Add Playbook',
    color: 'amber'
  }
}

const STAGE_COLOR = { 
  Discovery: 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]', 
  Qualified: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
  Proposal: 'bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]', 
  Negotiation: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]', 
  'Closed Won': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]', 
  'Closed Lost': 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]', 
}

const KANBAN_STAGES = ['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']

const FUNNEL_DATA = [ 
  { id: 'leads', value: 500, label: 'Leads' }, 
  { id: 'qualified', value: 280, label: 'Qualified' }, 
  { id: 'proposal', value: 140, label: 'Proposal' }, 
  { id: 'negotiation', value: 62, label: 'Negotiation' }, 
  { id: 'won', value: 28, label: 'Closed Won' }, 
]

export default function Sales() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Deals')
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('kanban')
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All')
  const [showNewDeal, setShowNewDeal] = useState(false)
  
  const [newDealData, setNewDealData] = useState({
    name: '', contact: '', value: '', stage: 'Discovery', probability: 30,
    close: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchSalesData()
  }, [])

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 },
    { name: 'Operations', path: '/operations', icon: Activity }
  ]

  const fetchSalesData = async () => {
    try {
      const res = await salesService.getQuotes()
      if (res.data.success) {
        const transformed = res.data.data.map(d => {
          let contact = 'N/A';
          let probability = 30;
          let close = d.created_at;
          if (Array.isArray(d.activities)) {
            d.activities.forEach(act => {
              if (typeof act === 'string') {
                if (act.startsWith('Contact: ')) contact = act.replace('Contact: ', '');
                if (act.startsWith('Probability: ')) probability = parseInt(act.replace('Probability: ', '').replace('%', ''));
                if (act.startsWith('Expected Close: ')) close = act.replace('Expected Close: ', '');
              }
            });
          }
          return { id: d.id, name: d.client_name, contact, value: d.amount || 0, stage: d.status || 'Discovery', probability, close }
        })
        setDeals(transformed)
      }
    } catch (err) {
      console.error('Failed to fetch sales data:', err)
      toast.error('Failed to load sales data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDeal = async (e) => {
    e.preventDefault()
    if (!newDealData.name || !newDealData.value) {
      toast.error('Please fill in required fields')
      return
    }

    const loadingToast = toast.loading('Synchronizing with database...')
    try {
      const res = await salesService.createQuote({
        client_name: newDealData.name,
        amount: parseFloat(newDealData.value),
        status: newDealData.stage,
        activities: [
          `Contact: ${newDealData.contact}`,
          `Expected Close: ${newDealData.close}`,
          `Probability: ${newDealData.probability}%`
        ]
      })

      if (res.data.success) {
        fetchSalesData()
        setShowNewDeal(false)
        setNewDealData({ name: '', contact: '', value: '', stage: 'Discovery', probability: 30, close: new Date().toISOString().split('T')[0] })
        toast.success('Deal finalized and deployed!', { id: loadingToast })
      }
    } catch (err) {
      toast.error('Deployment failed', { id: loadingToast })
    }
  }

  const pipelineValue = deals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage))
    .reduce((a, d) => a + d.value * d.probability / 100, 0)
  
  const winRate = deals.filter(d => d.stage.startsWith('Closed')).length > 0 
    ? Math.round(deals.filter(d => d.stage === 'Closed Won').length / deals.filter(d => d.stage.startsWith('Closed')).length * 100)
    : 0

  const filtered = deals.filter(d => 
    (stageFilter === 'All' || d.stage === stageFilter) &&
    (d.name?.toLowerCase().includes(search.toLowerCase()) || 
     d.contact?.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <DollarSign size={18} className="text-orange-500" />
              </div>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em]">{SALES_CONTENT[subTab].title}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Sales</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Full sales stack — manage deals, individual funnels, activities, and strategy playbooks. Seamlessly connected with projects and account modules.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connects with:</span>
            <div className="flex flex-wrap gap-2">
              {integrations.map(int => (
                <span 
                  key={int.name} 
                  onClick={() => navigate(int.path)}
                  className="px-4 py-1.5 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-400/80 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-orange-500/10 hover:text-orange-400 transition-all flex items-center gap-2"
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
            onClick={() => setShowNewDeal(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-orange-500/20"
          >
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Deals', value: deals.length, icon: LayoutGrid, color: 'indigo', trend: '+12%' },
          { label: 'Weighted Pipeline', value: `$${(pipelineValue / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'cyan', trend: '+18.4%' },
          { label: 'Closed Won', value: `$${(deals.filter(d => d.stage === 'Closed Won').reduce((a, d) => a + d.value, 0) / 1000).toFixed(0)}k`, icon: CheckCircle2, color: 'emerald', trend: '+24.1%' },
          { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: 'purple', trend: '+5%' },
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
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${k.trend.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'} border border-white/[0.05]`}>
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
        {/* Module Navigator Sidebar */}
        <div className="xl:w-80 space-y-6 flex-shrink-0">
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-white font-bold text-lg tracking-tight">Management</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-1">Module Navigator</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(SALES_CONTENT).map(([tag, config]) => (
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
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-orange-400 transition-colors" />
                    <input 
                      value={search} 
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search deals..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...KANBAN_STAGES].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setStageFilter(s)}
                        className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all
                          ${stageFilter === s 
                            ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' 
                            : 'bg-white/[0.02] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.05]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-400" />
              AI Sales Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Pipeline velocity is 15% higher this month. Consider prioritizing deals in the Proposal stage.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <AnimatePresence mode="wait">
            {subTab === 'Deals' ? (
              <motion.div key="deals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button onClick={() => setView('kanban')} className={`p-2 rounded-lg transition-all ${view === 'kanban' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                  <div className="xl:col-span-1">
                    <GlassCard className="p-8 relative overflow-hidden group h-full" glow>
                      <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-8">Sales Funnel</h3>
                      <div className="min-h-[300px] flex items-center justify-center">
                        <CustomFunnelChart data={FUNNEL_DATA} height={300} />
                      </div>
                    </GlassCard>
                  </div>

                  <div className="xl:col-span-3">
                    {view === 'kanban' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {KANBAN_STAGES.map((stage) => {
                          const stageDeals = deals.filter(d => d.stage === stage)
                          const stageTotal = stageDeals.reduce((a, d) => a + d.value, 0)
                          return (
                            <div key={stage} className="space-y-4">
                              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${STAGE_COLOR[stage]?.split(' ')[1] || 'bg-slate-500'}`} />
                                  <h4 className="text-white font-black text-[9px] uppercase tracking-widest">{stage}</h4>
                                </div>
                                <span className="text-orange-400 text-[10px] font-black">${(stageTotal / 1000).toFixed(0)}k</span>
                              </div>
                              <div className="space-y-4 min-h-[200px]">
                                {stageDeals.map(deal => (
                                  <motion.div layoutId={`deal-${deal.id}`} key={deal.id} whileHover={{ y: -5, scale: 1.02 }} className="group p-5 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] hover:border-orange-500/50 transition-all cursor-pointer shadow-xl relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                      <h5 className="text-white font-bold text-sm group-hover:text-orange-400 transition-colors tracking-tight">{deal.name}</h5>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                                      <span className="text-white font-black text-sm">${deal.value.toLocaleString()}</span>
                                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <TrendingUp size={10} className="text-emerald-400" />
                                        <span className="text-emerald-400 text-[10px] font-black">{deal.probability}%</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                                {stageDeals.length === 0 && <div className="h-20 rounded-3xl border-2 border-dashed border-white/[0.03] flex items-center justify-center text-[9px] font-black uppercase text-slate-700">Empty</div>}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <GlassCard className="overflow-hidden" glow>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/[0.05]">
                              {['Deal', 'Stage', 'Value', 'Probability', 'Close'].map(h => (<th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.02]">
                            {filtered.map(d => (
                              <tr key={d.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <td className="px-8 py-8">
                                  <div className="flex flex-col">
                                    <span className="text-white font-black tracking-tight text-sm group-hover:text-orange-400 transition-colors leading-tight">{d.name}</span>
                                    <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">{d.contact}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-8"><span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STAGE_COLOR[d.stage] || 'bg-slate-500/10 text-slate-400'}`}>{d.stage}</span></td>
                                <td className="px-8 py-8"><span className="text-white font-black text-sm tracking-tighter">${d.value.toLocaleString()}</span></td>
                                <td className="px-8 py-8">
                                  <div className="flex items-center gap-4">
                                    <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                                      <motion.div initial={{ width: 0 }} animate={{ width: `${d.probability}%` }} className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                    </div>
                                    <span className="text-white font-black text-[10px] tracking-widest">{d.probability}%</span>
                                  </div>
                                </td>
                                <td className="px-8 py-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">{new Date(d.close).toLocaleDateString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </GlassCard>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : subTab === 'Sales training' ? (
              <motion.div key="training" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {[
                    { title: 'Closing Masterclass', category: 'Techniques', duration: '45m', students: 124, progress: 85 },
                    { title: 'Objection Handling', category: 'Soft Skills', duration: '30m', students: 89, progress: 40 },
                    { title: 'CRM Efficiency', category: 'Operations', duration: '20m', students: 210, progress: 100 },
                  ].map((course, i) => (
                    <GlassCard key={i} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-orange-500/50 hover:from-orange-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <GraduationCap className="text-orange-400" size={24} />
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/[0.05]">{course.category}</span>
                      </div>
                      <h4 className="text-white font-black text-lg tracking-tight mb-2 group-hover:text-orange-400 transition-colors leading-tight relative z-10">{course.title}</h4>
                      <div className="flex items-center gap-4 mb-8 text-slate-500 text-[10px] font-black uppercase tracking-widest relative z-10">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"><Clock size={12} className="text-orange-400" /> {course.duration}</span>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"><Users size={12} className="text-indigo-400" /> {course.students}</span>
                      </div>
                      <div className="space-y-3 relative z-10">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          <span>Mastery Progress</span>
                          <span className="text-white">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            ) : subTab === 'Sales activities' ? (
              <motion.div key="activities" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex flex-col gap-4">
                  {[
                    { type: 'Call', client: 'Nexus Corp', time: '10:30 AM', status: 'Completed', detail: 'Discussed Q3 budget' },
                    { type: 'Meeting', client: 'Skyline Ltd', time: '02:00 PM', status: 'Upcoming', detail: 'Product demo for stakeholders' },
                    { type: 'Email', client: 'Innovate AI', time: 'Yesterday', status: 'Follow-up', detail: 'Sent pricing structure' },
                  ].map((act, i) => (
                    <GlassCard key={i} className="p-6 flex items-center justify-between group hover:bg-white/[0.03] transition-all border-white/[0.05] hover:border-orange-500/30 rounded-[2rem]">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${act.type === 'Call' ? 'bg-blue-500/10 text-blue-400' : act.type === 'Meeting' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {act.type === 'Call' ? <Activity size={24} /> : act.type === 'Meeting' ? <Users size={24} /> : <MessageSquare size={24} />}
                        </div>
                        <div>
                          <h5 className="text-white font-black tracking-tight text-base group-hover:text-orange-400 transition-colors">{act.client}</h5>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1.5">{act.detail}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-black text-xs uppercase tracking-widest">{act.time}</p>
                        <span className={`text-[9px] font-black uppercase tracking-[0.15em] mt-2 inline-block px-3 py-1 rounded-xl backdrop-blur-md ${act.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-orange-400 bg-orange-500/10 border border-orange-500/20'}`}>{act.status}</span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="subtab" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-8">
                  <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                    {(() => { const Icon = SALES_CONTENT[subTab].icon; return <Icon size={24} className={`text-${SALES_CONTENT[subTab].color}-400`} /> })()}
                    {SALES_CONTENT[subTab].title}
                  </h3>
                  <div className="flex flex-col items-center justify-center py-20 text-slate-600 italic">No detailed records found for this module.</div>
                </GlassCard>
                <GlassCard className="p-8 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border-indigo-500/20 flex flex-col items-center text-center space-y-6">
                  <div className={`w-20 h-20 rounded-3xl bg-${SALES_CONTENT[subTab].color}-500/10 flex items-center justify-center`}>
                    {(() => { const Icon = SALES_CONTENT[subTab].icon; return <Icon size={40} className={`text-${SALES_CONTENT[subTab].color}-400`} /> })()}
                  </div>
                  <h4 className="text-white font-black text-xl uppercase tracking-tighter">Module Initialized</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">Access enterprise-grade tools to maximize conversion and streamline performance.</p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Deal Modal */}
      <Modal open={showNewDeal} onClose={() => setShowNewDeal(false)} title="Register New Sales Deal" footer={<div className="flex gap-3 justify-end w-full"><Button variant="secondary" onClick={() => setShowNewDeal(false)}>Cancel</Button><Button variant="primary" onClick={handleCreateDeal}>Create Deal</Button></div>}>
        <form onSubmit={handleCreateDeal} className="space-y-6">
          <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Deal Name</label><Input value={newDealData.name} onChange={e => setNewDealData({...newDealData, name: e.target.value})} placeholder="e.g. Global Logistics Suite" /></div>
          <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contact Person</label><Input value={newDealData.contact} onChange={e => setNewDealData({...newDealData, contact: e.target.value})} placeholder="Client Name" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Value ($)</label><Input type="number" value={newDealData.value} onChange={e => setNewDealData({...newDealData, value: e.target.value})} placeholder="0.00" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Stage</label>
              <select value={newDealData.stage} onChange={e => setNewDealData({...newDealData, stage: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer">
                {['Discovery', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Probability (%)</label><Input type="number" value={newDealData.probability} onChange={e => setNewDealData({...newDealData, probability: e.target.value})} placeholder="30" /></div>
            <div className="space-y-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Expected Close Date</label><Input type="date" value={newDealData.close} onChange={e => setNewDealData({...newDealData, close: e.target.value})} /></div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

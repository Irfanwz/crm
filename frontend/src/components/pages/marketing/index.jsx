import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import Counter from '../../ui/Counter'
import Modal from '../../ui/Modal'
import { Input, Select } from '../../ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  Target, 
  PieChart, 
  BarChart3, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  Globe, 
  Zap, 
  Briefcase, 
  Search, 
  Filter, 
  AlertCircle,
  Activity,
  Layers,
  MessageSquare,
  Mail,
  Share2,
  LayoutGrid,
  List
} from 'lucide-react'

const CAMPAIGNS = [
  { id: 1, name: 'Q2 Email Blast', channel: 'Email', status: 'active', budget: 5000, spent: 3200, leads: 142, conv: 8.4 },
  { id: 2, name: 'LinkedIn Ads', channel: 'Social', status: 'active', budget: 8000, spent: 6100, leads: 89, conv: 5.1 },
  { id: 3, name: 'Google Search', channel: 'PPC', status: 'paused', budget: 12000, spent: 12000, leads: 310, conv: 12.3 },
  { id: 4, name: 'Webinar Series', channel: 'Events', status: 'planned', budget: 3500, spent: 0, leads: 0, conv: 0 },
  { id: 5, name: 'Content SEO', channel: 'Organic', status: 'active', budget: 2000, spent: 900, leads: 67, conv: 4.2 },
]

const CHANNEL_DATA = [
  { channel: 'Email', leads: 142, revenue: 48000 },
  { channel: 'Social', leads: 89, revenue: 31000 },
  { channel: 'PPC', leads: 310, revenue: 112000 },
  { channel: 'Events', leads: 0, revenue: 0 },
  { channel: 'Organic', leads: 67, revenue: 22000 },
]

const STATUS_COLOR = {
  active: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]',
  paused: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  planned: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
}

const MARKETING_MODULES = {
  'Campaigns': { icon: Megaphone, color: 'purple', title: 'Growth Engine' },
  'Channel Insights': { icon: PieChart, color: 'cyan', title: 'Attribution Analytics' },
  'Email Marketing': { icon: Mail, color: 'blue', title: 'Retention Hub' },
  'Social Media': { icon: Share2, color: 'rose', title: 'Engagement Core' },
  'Automation': { icon: Zap, color: 'amber', title: 'Conversion Workflows' }
}

export default function Marketing() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Campaigns')
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [showNewCampaign, setShowNewCampaign] = useState(false)

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 },
    { name: 'Operations', path: '/operations', icon: Activity }
  ]

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Megaphone size={18} className="text-purple-400" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.3em]">{MARKETING_MODULES[subTab].title}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Marketing</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Orchestrate your campaigns, track channel performance, and optimize conversion funnels. Seamlessly connected with sales and account modules.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Connects with:</span>
            <div className="flex flex-wrap gap-2">
              {integrations.map(int => (
                <span 
                  key={int.name} 
                  onClick={() => navigate(int.path)}
                  className="px-4 py-1.5 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400/80 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-purple-500/10 hover:text-purple-400 transition-all flex items-center gap-2"
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
            onClick={() => setShowNewCampaign(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-purple-500/20"
          >
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Global Reach', value: '1.2M', icon: Target, color: 'indigo', trend: '+15.2%' },
          { label: 'Total Budget', value: '$30.5k', icon: DollarSign, color: 'cyan', trend: '84% Spent' },
          { label: 'Conversion', value: '7.5%', icon: TrendingUp, color: 'emerald', trend: '+1.2pp' },
          { label: 'Active Leads', value: '608', icon: BarChart3, color: 'purple', trend: '+124 new' },
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
              <p className="text-4xl font-black text-white tracking-tightest group-hover:text-purple-400 transition-colors">
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
                  {Object.entries(MARKETING_MODULES).map(([tag, config]) => (
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
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                    <input 
                      value={search} 
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search campaigns..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-400" />
              AI Growth Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              LinkedIn Ads are performing 22% better than average. Consider reallocating $2k from the PPC budget.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <AnimatePresence mode="wait">
            {subTab === 'Campaigns' ? (
              <motion.div key="campaigns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                  </div>
                </div>

                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {CAMPAIGNS.map(camp => (
                      <motion.div
                        layoutId={`camp-${camp.id}`}
                        key={camp.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-purple-500/50 hover:from-purple-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="space-y-1">
                            <h3 className="text-white font-black text-lg tracking-tight group-hover:text-purple-400 transition-colors leading-tight">{camp.name}</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{camp.channel} Strategy</p>
                          </div>
                          <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[camp.status]}`}>
                            {camp.status}
                          </span>
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                              <span className="text-slate-500">Budget Utilization</span>
                              <span className="text-white">{Math.round((camp.spent / camp.budget) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(camp.spent / camp.budget) * 100}%` }}
                                className="h-full bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                            <div>
                              <p className="text-white font-black text-base tracking-tighter leading-none">{camp.leads}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Net Leads</p>
                            </div>
                            <div className="text-right">
                              <p className="text-cyan-400 font-black text-base tracking-tighter leading-none">{camp.conv}%</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Conversion</p>
                            </div>
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
                          {['Campaign', 'Status', 'Budget', 'Spent', 'Leads', 'Conv.'].map(h => (
                            <th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {CAMPAIGNS.map(camp => (
                          <tr key={camp.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                            <td className="px-8 py-8">
                              <div className="flex flex-col">
                                <span className="text-white font-black tracking-tight text-sm group-hover:text-purple-400 transition-colors leading-tight">{camp.name}</span>
                                <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">{camp.channel}</span>
                              </div>
                            </td>
                            <td className="px-8 py-8">
                              <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_COLOR[camp.status]}`}>
                                {camp.status}
                              </span>
                            </td>
                            <td className="px-8 py-8"><span className="text-white font-black text-sm tracking-tighter">${camp.budget.toLocaleString()}</span></td>
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-4">
                                <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(camp.spent / camp.budget) * 100}%` }}
                                    className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                  />
                                </div>
                                <span className="text-white font-black text-[10px] tracking-widest">${camp.spent.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-slate-300 font-black text-sm tracking-tighter">{camp.leads}</td>
                            <td className="px-8 py-8 text-cyan-400 font-black text-sm tracking-tighter">{camp.conv}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                )}
              </motion.div>
            ) : subTab === 'Channel Insights' ? (
              <motion.div key="insights" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <GlassCard className="p-10" glow>
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-white font-black text-xl uppercase tracking-tighter">Attribution Model</h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
                      </div>
                    </div>
                  </div>
                  <div className="min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={CHANNEL_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis 
                          dataKey="channel" 
                          tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={15} 
                        />
                        <YAxis 
                          tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} 
                          axisLine={false} 
                          tickLine={false} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(10, 10, 10, 0.9)', 
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.08)', 
                            borderRadius: '24px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                          }}
                          itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                          labelStyle={{ color: '#fff', marginBottom: '8px', fontWeight: 900, textTransform: 'uppercase' }}
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        />
                        <Bar dataKey="leads" name="Leads" fill="#22d3ee" radius={[10, 10, 0, 0]} barSize={40} />
                        <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div key="module" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-[2rem] bg-${MARKETING_MODULES[subTab].color}-500/10 border border-${MARKETING_MODULES[subTab].color}-500/20 flex items-center justify-center`}>
                  {(() => { const Icon = MARKETING_MODULES[subTab].icon; return <Icon size={40} className={`text-${MARKETING_MODULES[subTab].color}-400`} /> })()}
                </div>
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{MARKETING_MODULES[subTab].title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">This module is currently being synchronized with your growth data stack.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* New Campaign Modal */}
      <Modal 
        open={showNewCampaign} 
        onClose={() => setShowNewCampaign(false)} 
        title="Launch New Marketing Campaign"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowNewCampaign(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowNewCampaign(false)}>Launch Campaign</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Campaign Name</label>
            <Input placeholder="e.g. Summer Sale 2026" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Channel</label>
              <Select>
                <option>Email</option>
                <option>Social Media</option>
                <option>PPC (Google/Meta)</option>
                <option>Events</option>
                <option>Organic/SEO</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Budget ($)</label>
              <Input type="number" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">End Date</label>
              <Input type="date" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
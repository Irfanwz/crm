import { useState } from 'react'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import Counter from '../../ui/Counter'
import Modal from '../../ui/Modal'
import { Input, Select, Textarea } from '../../ui/Input'
import { motion } from 'framer-motion'
import { Plus, Headphones, AlertTriangle, CheckCircle2, Clock, MessageSquare, Search, MoreHorizontal } from 'lucide-react'

const TICKETS = [
  { id: 'TKT-1042', subject: 'Login not working after update', client: 'Acme Corp', priority: 'high', status: 'open', assigned: 'Sarah C.', created: '2025-05-20', sla: 4 },
  { id: 'TKT-1041', subject: 'Invoice export formatting issue', client: 'TechFlow Inc', priority: 'medium', status: 'in-progress', assigned: 'Marcus O.', created: '2025-05-19', sla: 12 },
  { id: 'TKT-1040', subject: 'API rate limit exceeded', client: 'Global Logistics', priority: 'high', status: 'open', assigned: 'James P.', created: '2025-05-19', sla: 2 },
  { id: 'TKT-1039', subject: 'Report generation slow', client: 'RetailMax', priority: 'low', status: 'resolved', assigned: 'Aisha N.', created: '2025-05-18', sla: 48 },
  { id: 'TKT-1038', subject: 'Unable to add new users', client: 'HealthSync', priority: 'medium', status: 'in-progress', assigned: 'Sarah C.', created: '2025-05-17', sla: 8 },
  { id: 'TKT-1037', subject: 'Dashboard charts not loading', client: 'EduTrack', priority: 'low', status: 'closed', assigned: 'Ravi K.', created: '2025-05-16', sla: 24 },
]

const PRIORITY_STYLE = {
  high: 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
  low: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
}

const STATUS_STYLE = {
  open: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'in-progress': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  resolved: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  closed: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
}

export default function Support() {
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const statuses = ['All', 'open', 'in-progress', 'resolved', 'closed']
  const filtered = TICKETS.filter(t => 
    (status === 'All' || t.status === status) &&
    (t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()))
  )

  const columns = [
    {
      label: 'Ticket',
      key: 'id',
      render: (val) => <span className="text-indigo-400 font-bold tracking-tight">{val}</span>
    },
    {
      label: 'Subject',
      key: 'subject',
      render: (val) => <span className="text-white font-medium max-w-xs truncate block">{val}</span>
    },
    {
      label: 'Client',
      key: 'client',
      render: (val) => <span className="text-slate-400 font-medium">{val}</span>
    },
    {
      label: 'Priority',
      key: 'priority',
      render: (val) => (
        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-widest border ${PRIORITY_STYLE[val]}`}>
          {val}
        </span>
      )
    },
    {
      label: 'Status',
      key: 'status',
      render: (val) => (
        <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-widest border ${STATUS_STYLE[val]}`}>
          {val.replace('-', ' ')}
        </span>
      )
    },
    {
      label: 'Assigned',
      key: 'assigned',
      render: (val) => <span className="text-slate-300 font-bold text-xs">{val}</span>
    },
    {
      label: 'SLA',
      key: 'sla',
      render: (val) => (
        <div className="flex items-center gap-2">
          <Clock size={12} className={val < 10 ? 'text-rose-400' : 'text-slate-500'} />
          <span className={`font-bold ${val < 10 ? 'text-rose-400' : 'text-slate-300'}`}>{val}h</span>
        </div>
      )
    },
    {
      label: '',
      key: 'actions',
      render: () => (
        <button className="p-2 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-white transition-all">
          <MoreHorizontal size={16} />
        </button>
      )
    }
  ]

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Headphones size={18} className="text-indigo-400" />
            </div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Customer Experience</span>
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tightest">Support</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium max-w-md">Manage customer tickets, track SLA compliance, and resolve critical issues in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="md" onClick={() => alert('SLA Report functionality coming soon!')}>SLA Analytics</Button>
          <Button variant="primary" size="md" icon={<Plus size={18} />} onClick={() => setShowNewTicket(true)}>New Ticket</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Tickets', value: TICKETS.filter(t => t.status === 'open' || t.status === 'in-progress').length, icon: MessageSquare, color: 'indigo' },
          { label: 'Critical Issues', value: TICKETS.filter(t => t.priority === 'high').length, icon: AlertTriangle, color: 'rose' },
          { label: 'Resolved Today', value: TICKETS.filter(t => t.status === 'resolved').length, icon: CheckCircle2, color: 'emerald' },
          { label: 'Avg. SLA Time', value: '6.4h', icon: Clock, color: 'cyan' },
        ].map((k, i) => (
          <GlassCard key={k.label} delay={i * 0.1}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg bg-${k.color}-500/10 border border-${k.color}-500/20`}>
                <k.icon size={16} className={`text-${k.color}-400`} />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{k.label}</p>
            </div>
            <p className="text-3xl font-black text-white tracking-tighter">
              <Counter value={k.value} />
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-x-auto scrollbar-hide">
            {statuses.map(s => (
              <button 
                key={s} 
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap
                  ${status === s ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'}`}
              >
                {s.replace('-', ' ')}
              </button>
            ))}
          </div>
          <div className="relative group min-w-[300px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tickets..."
              className="w-full pl-12 pr-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <Table columns={columns} data={filtered} />
      </div>

      {/* New Ticket Modal */}
      <Modal 
        open={showNewTicket} 
        onClose={() => setShowNewTicket(false)} 
        title="Open Support Ticket"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowNewTicket(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowNewTicket(false)}>Create Ticket</Button>
          </>
        }
      >
        <div className="space-y-6">
          <Input label="Subject" placeholder="e.g. System slow response time" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </Select>
            <Select label="Client">
              <option>Acme Corp</option>
              <option>TechFlow Inc</option>
              <option>Global Logistics</option>
            </Select>
          </div>
          <Textarea label="Issue Description" placeholder="Describe the issue in detail..." />
        </div>
      </Modal>
    </div>
  )
}
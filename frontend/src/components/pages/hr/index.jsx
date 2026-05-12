import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Table from '../../ui/Table'
import Counter from '../../ui/Counter'
import Modal from '../../ui/Modal'
import { Input, Select } from '../../ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Users, 
  UserCheck, 
  UserPlus, 
  Briefcase, 
  MoreHorizontal,
  LayoutDashboard,
  Target,
  DollarSign,
  Megaphone,
  BarChart3,
  Activity,
  Zap,
  Filter,
  AlertCircle,
  LayoutGrid,
  List,
  GraduationCap,
  Calendar,
  Building2
} from 'lucide-react'

const EMPLOYEES = [
  { id: 1, name: 'Sarah Chen', role: 'Product Manager', dept: 'Product', status: 'active', joined: '2022-03-15', salary: 95000, avatar: 'SC' },
  { id: 2, name: 'Marcus Obi', role: 'Senior Engineer', dept: 'Engineering', status: 'active', joined: '2021-07-01', salary: 115000, avatar: 'MO' },
  { id: 3, name: 'Priya Sharma', role: 'UX Designer', dept: 'Design', status: 'active', joined: '2023-01-10', salary: 88000, avatar: 'PS' },
  { id: 4, name: 'Tom Walsh', role: 'Sales Lead', dept: 'Sales', status: 'active', joined: '2020-11-20', salary: 72000, avatar: 'TW' },
  { id: 5, name: 'Aisha Noor', role: 'Data Analyst', dept: 'Analytics', status: 'on-leave', joined: '2022-08-05', salary: 82000, avatar: 'AN' },
  { id: 6, name: 'James Park', role: 'DevOps Engineer', dept: 'Engineering', status: 'active', joined: '2023-04-22', salary: 105000, avatar: 'JP' },
  { id: 7, name: 'Leila Costa', role: 'Marketing Manager', dept: 'Marketing', status: 'active', joined: '2021-02-14', salary: 91000, avatar: 'LC' },
  { id: 8, name: 'Ravi Kumar', role: 'QA Engineer', dept: 'Engineering', status: 'inactive', joined: '2022-06-30', salary: 78000, avatar: 'RK' },
]

const DEPT_COLORS = {
  Engineering: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Product: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Design: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Sales: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Analytics: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Marketing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const STATUS_COLOR = {
  active: 'bg-emerald-500',
  'on-leave': 'bg-amber-500',
  inactive: 'bg-slate-600',
}

const HR_MODULES = {
  'Directory': { icon: Users, color: 'indigo', title: 'Global Workforce' },
  'Departments': { icon: Building2, color: 'cyan', title: 'Organizational Structure' },
  'Payroll': { icon: DollarSign, color: 'emerald', title: 'Compensation Management' },
  'Recruitment': { icon: UserPlus, color: 'purple', title: 'Talent Acquisition' },
  'Training': { icon: GraduationCap, color: 'rose', title: 'Upskilling & Enablement' }
}

export default function HR() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Directory')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [dept, setDept] = useState('All')
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  const depts = ['All', ...new Set(EMPLOYEES.map(e => e.dept))]
  const filtered = EMPLOYEES.filter(e =>
    (dept === 'All' || e.dept === dept) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  )

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
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Users size={18} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">{HR_MODULES[subTab].title}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">HR</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Manage your global workforce, departments, and payroll analytics. Seamlessly connected with strategy and operations.
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
            onClick={() => setShowAddEmployee(true)}
            className="h-14 px-8 rounded-2xl shadow-2xl shadow-indigo-500/20"
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Staff', value: EMPLOYEES.length, icon: Users, color: 'indigo', trend: '+2 this month' },
          { label: 'Active Now', value: EMPLOYEES.filter(e => e.status === 'active').length, icon: UserCheck, color: 'emerald', trend: 'Stable' },
          { label: 'On Leave', value: EMPLOYEES.filter(e => e.status === 'on-leave').length, icon: Briefcase, color: 'amber', trend: '3 pending' },
          { label: 'New Hires', value: '3', icon: UserPlus, color: 'purple', trend: 'Q2 Target' },
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
                <span className="text-[9px] font-black px-2.5 py-1 rounded-lg text-slate-400 bg-white/[0.05] border border-white/[0.05]">
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
                  {Object.entries(HR_MODULES).map(([tag, config]) => (
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
                      placeholder="Search employees..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {depts.map(d => (
                      <button 
                        key={d} 
                        onClick={() => setDept(d)}
                        className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all
                          ${dept === d 
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                            : 'bg-white/[0.02] border-white/[0.05] text-slate-500 hover:text-white hover:bg-white/[0.05]'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-indigo-400" />
              AI HR Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Employee satisfaction is 15% higher in the Engineering dept. Consider cross-dept mentorship programs.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <AnimatePresence mode="wait">
            {subTab === 'Directory' ? (
              <motion.div key="directory" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                  </div>
                </div>

                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filtered.map(emp => (
                      <motion.div
                        layoutId={`emp-${emp.id}`}
                        key={emp.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-indigo-500/50 hover:from-indigo-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-black text-white shadow-2xl">
                              {emp.avatar}
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-white font-black text-lg tracking-tight group-hover:text-indigo-400 transition-colors leading-tight">{emp.name}</h3>
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{emp.role}</p>
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${STATUS_COLOR[emp.status]} shadow-[0_0_10px_currentColor]`} />
                        </div>

                        <div className="space-y-6 relative z-10">
                          <div className="flex flex-wrap gap-2">
                            <span className={`text-[9px] px-3 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${DEPT_COLORS[emp.dept] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                              {emp.dept}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                            <div>
                              <p className="text-white font-black text-base tracking-tighter leading-none">${emp.salary.toLocaleString()}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Annual Salary</p>
                            </div>
                            <div className="text-right">
                              <p className="text-slate-400 font-black text-xs tracking-tighter leading-none">{new Date(emp.joined).toLocaleDateString()}</p>
                              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Joined</p>
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
                          {['Employee', 'Department', 'Status', 'Joined', 'Salary'].map(h => (
                            <th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {filtered.map(emp => (
                          <tr key={emp.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-[10px] font-black text-white">
                                  {emp.avatar}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-white font-black tracking-tight text-sm group-hover:text-indigo-400 transition-colors leading-tight">{emp.name}</span>
                                  <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">{emp.role}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-8">
                              <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${DEPT_COLORS[emp.dept] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                {emp.dept}
                              </span>
                            </td>
                            <td className="px-8 py-8">
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${STATUS_COLOR[emp.status]} shadow-[0_0_8px_currentColor]`} />
                                <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">{emp.status.replace('-', ' ')}</span>
                              </div>
                            </td>
                            <td className="px-8 py-8 text-slate-500 font-black text-[10px] uppercase tracking-widest">{new Date(emp.joined).toLocaleDateString()}</td>
                            <td className="px-8 py-8 text-white font-black text-sm tracking-tighter">${emp.salary.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                )}
              </motion.div>
            ) : (
              <motion.div key="module" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-[2rem] bg-${HR_MODULES[subTab].color}-500/10 border border-${HR_MODULES[subTab].color}-500/20 flex items-center justify-center`}>
                  {(() => { const Icon = HR_MODULES[subTab].icon; return <Icon size={40} className={`text-${HR_MODULES[subTab].color}-400`} /> })()}
                </div>
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{HR_MODULES[subTab].title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">This module is currently being synchronized with your human capital data stack.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal 
        open={showAddEmployee} 
        onClose={() => setShowAddEmployee(false)} 
        title="Add New Employee"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowAddEmployee(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowAddEmployee(false)}>Register Employee</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <Input placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Department</label>
              <Select>
                {depts.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Designation</label>
              <Input placeholder="e.g. Software Engineer" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Salary ($)</label>
              <Input type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Joining Date</label>
              <Input type="date" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
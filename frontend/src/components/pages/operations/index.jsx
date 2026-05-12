import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input, Select } from '../../ui/Input'
import { GlassCard } from '../../ui/GlassCard'
import Counter from '../../ui/Counter'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Zap, 
  Package, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  LayoutDashboard,
  Target,
  DollarSign,
  Megaphone,
  Briefcase,
  Activity,
  Search,
  Filter,
  LayoutGrid,
  List,
  Box,
  Truck,
  Wrench,
  ShieldCheck,
  TrendingUp,
  MoreHorizontal,
  BarChart3
} from 'lucide-react'

const INVENTORY = [
  { id: 1, name: 'CRM Pro License', sku: 'SW-001', category: 'Software', stock: 248, reorder: 50, price: 299, status: 'in-stock' },
  { id: 2, name: 'API Access Token (Annual)', sku: 'SW-002', category: 'Software', stock: 8, reorder: 20, price: 999, status: 'low' },
  { id: 3, name: 'Office Desk - Ergonomic', sku: 'HW-101', category: 'Hardware', stock: 12, reorder: 5, price: 450, status: 'in-stock' },
  { id: 4, name: 'Laptop - Developer', sku: 'HW-102', category: 'Hardware', stock: 0, reorder: 3, price: 1800, status: 'out' },
  { id: 5, name: 'Server Rack Unit', sku: 'HW-103', category: 'Hardware', stock: 4, reorder: 2, price: 3200, status: 'in-stock' },
  { id: 6, name: 'Support Plan - Premium', sku: 'SV-001', category: 'Service', stock: 99, reorder: 10, price: 199, status: 'in-stock' },
]

const TASKS = [
  { id: 1, title: 'Reorder API tokens', priority: 'high', due: '2025-05-25', done: false },
  { id: 2, title: 'Audit server inventory', priority: 'medium', due: '2025-05-30', done: false },
  { id: 3, title: 'Update vendor contracts', priority: 'low', due: '2025-06-10', done: true },
  { id: 4, title: 'Procure developer laptops', priority: 'high', due: '2025-05-22', done: false },
]

const STATUS_STYLE = {
  'in-stock': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  low: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  out: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
}

const OPERATIONS_MODULES = {
  'Inventory': { icon: Box, color: 'indigo', title: 'Supply Chain Management' },
  'Procurement': { icon: ShoppingCart, color: 'cyan', title: 'Vendor Acquisition' },
  'Maintenance': { icon: Wrench, color: 'amber', title: 'System Reliability' },
  'Logistics': { icon: Truck, color: 'emerald', title: 'Fulfillment Flow' },
  'Compliance': { icon: ShieldCheck, color: 'rose', title: 'Operational Risk' }
}

export default function Operations() {
  const navigate = useNavigate()
  const [subTab, setSubTab] = useState('Inventory')
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [inventory, setInventory] = useState(INVENTORY)
  const [tasks, setTasks] = useState(TASKS)
  const [showModal, setShowModal] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    sku: 'SW-' + Math.floor(Math.random() * 1000),
    category: 'Software',
    stock: 0,
    reorder: 10,
    price: 0,
    status: 'out'
  })

  const integrations = [
    { name: 'Strategy', path: '/strategy', icon: Target },
    { name: 'Sales', path: '/sales', icon: DollarSign },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Accounts', path: '/accounts', icon: BarChart3 }
  ]

  const filtered = inventory.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.sku.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error('Please enter an item name')
      return
    }

    const newItem = {
      ...formData,
      id: inventory.length + 1,
      stock: parseInt(formData.stock),
      reorder: parseInt(formData.reorder),
      price: parseFloat(formData.price)
    }

    setInventory([newItem, ...inventory])
    setShowModal(false)
    setFormData({
      name: '',
      sku: 'SW-' + Math.floor(Math.random() * 1000),
      category: 'Software',
      stock: 0,
      reorder: 10,
      price: 0,
      status: 'out'
    })
    toast.success('Item added successfully!')
  }

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
        <div className="space-y-6 flex-1 min-w-0">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Zap size={18} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">{OPERATIONS_MODULES[subTab]?.title || 'Operational Excellence'}</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Operations</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Inventory, procurement, and task management. Orchestrate your physical and digital supply chain. Seamlessly connected with accounts and projects.
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
            Add Item
          </Button>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total SKUs', value: inventory.length, icon: Package, color: 'indigo', trend: 'Global' },
          { label: 'In Stock', value: inventory.filter(i => i.status === 'in-stock').length, icon: CheckCircle2, color: 'emerald', trend: 'Healthy' },
          { label: 'Low Stock', value: inventory.filter(i => i.status === 'low').length, icon: Clock, color: 'amber', trend: '2 Critical' },
          { label: 'Out of Stock', value: inventory.filter(i => i.status === 'out').length, icon: AlertCircle, color: 'rose', trend: 'Urgent' },
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
                  {Object.entries(OPERATIONS_MODULES).map(([tag, config]) => (
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
                      placeholder="Search inventory..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-indigo-400" />
              AI Ops Insight
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Lead times from hardware vendors have increased by 5 days. Consider reordering earlier for Q3.
            </p>
          </GlassCard>
        </div>

        {/* Workspace Area */}
        <div className="flex-1 min-w-0 space-y-6">
          <AnimatePresence mode="wait">
            {subTab === 'Inventory' ? (
              <motion.div key="inventory" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    <button onClick={() => setView('table')} className={`p-2 rounded-lg transition-all ${view === 'table' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {view === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map(item => (
                          <motion.div
                            layoutId={`item-${item.id}`}
                            key={item.id}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-indigo-500/50 hover:from-indigo-500/10 transition-all cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors" />
                            
                            <div className="flex justify-between items-start mb-8 relative z-10">
                              <div className="space-y-1">
                                <h3 className="text-white font-black text-lg tracking-tight group-hover:text-indigo-400 transition-colors leading-tight">{item.name}</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{item.category} • {item.sku}</p>
                              </div>
                              <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_STYLE[item.status]}`}>
                                {item.status.replace('-', ' ')}
                              </span>
                            </div>

                            <div className="space-y-6 relative z-10">
                              <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                                  <span className="text-slate-500">Stock Level</span>
                                  <span className="text-white">{item.stock} Units</span>
                                </div>
                                <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((item.stock / 200) * 100, 100)}%` }}
                                    className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                                <div>
                                  <p className="text-white font-black text-base tracking-tighter leading-none">${item.price.toLocaleString()}</p>
                                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Unit Price</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-slate-400 font-black text-xs tracking-tighter leading-none">{item.reorder} Units</p>
                                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1.5">Reorder At</p>
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
                              {['Item', 'Stock', 'Price', 'Status'].map(h => (
                                <th key={h} className="px-8 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.02]">
                            {filtered.map(item => (
                              <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                                <td className="px-8 py-8">
                                  <div className="flex flex-col">
                                    <span className="text-white font-black tracking-tight text-sm group-hover:text-indigo-400 transition-colors leading-tight">{item.name}</span>
                                    <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">{item.sku}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-8 text-white font-black text-sm tracking-tighter">{item.stock}</td>
                                <td className="px-8 py-8 text-white font-black text-sm tracking-tighter">${item.price.toLocaleString()}</td>
                                <td className="px-8 py-8">
                                  <span className={`text-[9px] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-[0.15em] backdrop-blur-md ${STATUS_STYLE[item.status]}`}>
                                    {item.status.replace('-', ' ')}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </GlassCard>
                    )}
                  </div>

                  <div className="space-y-6">
                    <GlassCard className="p-8" glow>
                      <h3 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-8">Ops Checklist</h3>
                      <div className="space-y-4">
                        {tasks.map(t => (
                          <div key={t.id} className={`flex items-start gap-4 p-5 rounded-2xl transition-all border
                            ${t.done ? 'bg-white/[0.01] border-white/[0.02] opacity-40' : 'bg-white/[0.03] border-white/[0.05] hover:border-indigo-500/30'}`}>
                            <button 
                              onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? { ...x, done: !x.done } : x))}
                              className={`mt-1 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all
                                ${t.done ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 hover:border-indigo-400'}`}
                            >
                              {t.done && <CheckCircle2 size={14} className="text-white" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-bold ${t.done ? 'line-through text-slate-500' : 'text-white'}`}>{t.title}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`text-[9px] font-black uppercase tracking-widest
                                  ${t.priority === 'high' ? 'text-rose-400' : t.priority === 'medium' ? 'text-amber-400' : 'text-slate-400'}`}>
                                  {t.priority}
                                </span>
                                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{new Date(t.due).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="module" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className={`w-24 h-24 rounded-[2rem] bg-${OPERATIONS_MODULES[subTab].color}-500/10 border border-${OPERATIONS_MODULES[subTab].color}-500/20 flex items-center justify-center`}>
                  {(() => { const Icon = OPERATIONS_MODULES[subTab].icon; return <Icon size={40} className={`text-${OPERATIONS_MODULES[subTab].color}-400`} /> })()}
                </div>
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{OPERATIONS_MODULES[subTab].title}</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">This module is currently being synchronized with your operational data stack.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Item Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Add New Inventory Item"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
          </div>
        }
      >
        <form onSubmit={handleAddItem} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Item Name</label>
            <Input 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. CRM Pro License" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">SKU</label>
              <Input 
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
                placeholder="SW-001" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
              <Select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Service">Service</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Stock</label>
              <Input 
                type="number"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                placeholder="0" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Reorder At</label>
              <Input 
                type="number"
                value={formData.reorder}
                onChange={e => setFormData({...formData, reorder: e.target.value})}
                placeholder="10" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Price ($)</label>
              <Input 
                type="number"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status</label>
            <Select
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="in-stock">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </Select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
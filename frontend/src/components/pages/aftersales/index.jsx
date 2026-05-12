

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input } from '../../ui/Input'

const RECORDS = [
  { id: 1, client: 'Acme Corp', product: 'ERP Suite', type: 'Renewal', status: 'active', nps: 9, mrr: 7500, since: '2023-01-15' },
  { id: 2, client: 'TechFlow Inc', product: 'CRM Pro', type: 'Upsell', status: 'at-risk', nps: 6, mrr: 2000, since: '2022-08-01' },
  { id: 3, client: 'Global Logistics', product: 'Analytics', type: 'Renewal', status: 'active', nps: 8, mrr: 5200, since: '2021-03-20' },
  { id: 4, client: 'RetailMax', product: 'POS Platform', type: 'Cross-sell', status: 'churned', nps: 4, mrr: 0, since: '2023-06-10' },
  { id: 5, client: 'HealthSync', product: 'Portal', type: 'Renewal', status: 'active', nps: 10, mrr: 3800, since: '2024-01-01' },
]

const STATUS_STYLE = {
  active: 'bg-emerald-400/10 text-emerald-400',
  'at-risk': 'bg-amber-400/10 text-amber-400',
  churned: 'bg-rose-400/10 text-rose-400',
}

const npsColor = (n) => n >= 9 ? '#10b981' : n >= 7 ? '#f59e0b' : '#f43f5e'

export default function AfterSales() {
  const [records, setRecords] = useState(RECORDS)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    client: '',
    product: 'ERP Suite',
    type: 'Renewal',
    status: 'active',
    nps: 10,
    mrr: 5000,
    since: new Date().toISOString().split('T')[0]
  })

  const totalMRR = records.reduce((a, r) => a + r.mrr, 0)
  const avgNPS = Math.round(records.reduce((a, r) => a + r.nps, 0) / records.length)

  const handleAddCustomer = (e) => {
    e.preventDefault()
    if (!formData.client) {
      toast.error('Please enter a customer name')
      return
    }

    const newRecord = {
      ...formData,
      id: records.length + 1,
      nps: parseInt(formData.nps),
      mrr: parseFloat(formData.mrr)
    }

    setRecords([newRecord, ...records])
    setShowModal(false)
    setFormData({
      client: '',
      product: 'ERP Suite',
      type: 'Renewal',
      status: 'active',
      nps: 10,
      mrr: 5000,
      since: new Date().toISOString().split('T')[0]
    })
    toast.success('Customer added successfully!')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">After Sales</h1>
          <p className="text-slate-400 text-sm mt-0.5">Customer success, renewals & NPS</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
        >
          + Add Customer
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total MRR', value: `$${(totalMRR / 1000).toFixed(1)}k` },
          { label: 'Active Accounts', value: records.filter(r => r.status === 'active').length },
          { label: 'At Risk', value: records.filter(r => r.status === 'at-risk').length },
          { label: 'Avg NPS', value: avgNPS },
        ].map(k => (
          <div key={k.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-xs mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {['Client', 'Product', 'Type', 'Status', 'MRR', 'NPS', 'Since'].map(h => (
                <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {records.map(r => (
              <tr key={r.id} className="hover:bg-slate-800/40 transition">
                <td className="px-5 py-4 text-white text-sm font-medium">{r.client}</td>
                <td className="px-5 py-4 text-slate-400 text-sm">{r.product}</td>
                <td className="px-5 py-4 text-slate-300 text-sm">{r.type}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-300 text-sm font-semibold">
                  {r.mrr > 0 ? `$${r.mrr.toLocaleString()}` : '—'}
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-bold" style={{ color: npsColor(r.nps) }}>{r.nps}/10</span>
                </td>
                <td className="px-5 py-4 text-slate-400 text-sm">{new Date(r.since).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Add New Customer"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCustomer}>Add Customer</Button>
          </div>
        }
      >
        <form onSubmit={handleAddCustomer} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Client Name</label>
            <Input 
              value={formData.client}
              onChange={e => setFormData({...formData, client: e.target.value})}
              placeholder="e.g. Acme Corp" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Product</label>
            <Input 
              value={formData.product}
              onChange={e => setFormData({...formData, product: e.target.value})}
              placeholder="e.g. ERP Suite" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="Renewal">Renewal</option>
                <option value="Upsell">Upsell</option>
                <option value="Cross-sell">Cross-sell</option>
                <option value="New">New</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">MRR ($)</label>
              <Input 
                type="number"
                value={formData.mrr}
                onChange={e => setFormData({...formData, mrr: e.target.value})}
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">NPS Score (0-10)</label>
              <Input 
                type="number"
                value={formData.nps}
                onChange={e => setFormData({...formData, nps: e.target.value})}
                placeholder="10" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Customer Since</label>
              <Input 
                type="date" 
                value={formData.since}
                onChange={e => setFormData({...formData, since: e.target.value})}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
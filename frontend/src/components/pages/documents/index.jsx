import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input } from '../../ui/Input'

const DOCS = [
  { id: 1, name: 'Q2 Sales Report.pdf', type: 'pdf', size: '2.4 MB', modified: '2025-05-20', folder: 'Sales', shared: true },
  { id: 2, name: 'Employee Handbook.docx', type: 'doc', size: '840 KB', modified: '2025-04-10', folder: 'HR', shared: false },
  { id: 3, name: 'Marketing Budget 2025.xlsx', type: 'sheet', size: '1.1 MB', modified: '2025-05-15', folder: 'Marketing', shared: true },
  { id: 4, name: 'NDA Template.docx', type: 'doc', size: '320 KB', modified: '2025-03-22', folder: 'Legal', shared: false },
  { id: 5, name: 'Product Roadmap.pptx', type: 'slide', size: '5.8 MB', modified: '2025-05-18', folder: 'Product', shared: true },
  { id: 6, name: 'Server Architecture.png', type: 'image', size: '3.2 MB', modified: '2025-04-30', folder: 'Engineering', shared: false },
  { id: 7, name: 'Client Proposal - Acme.pdf', type: 'pdf', size: '1.6 MB', modified: '2025-05-21', folder: 'Sales', shared: true },
  { id: 8, name: 'Support SLA Policy.pdf', type: 'pdf', size: '210 KB', modified: '2025-02-14', folder: 'Support', shared: false },
]

const FOLDERS = ['All', 'Sales', 'HR', 'Marketing', 'Legal', 'Product', 'Engineering', 'Support']

const TYPE_ICON = {
  pdf: { icon: '📄', color: 'text-rose-400 bg-rose-400/10' },
  doc: { icon: '📝', color: 'text-blue-400 bg-blue-400/10' },
  sheet: { icon: '📊', color: 'text-emerald-400 bg-emerald-400/10' },
  slide: { icon: '📑', color: 'text-amber-400 bg-amber-400/10' },
  image: { icon: '🖼️', color: 'text-violet-400 bg-violet-400/10' },
}

export default function Documents() {
  const [docs, setDocs] = useState(DOCS)
  const [folder, setFolder] = useState('All')
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    folder: 'Sales',
    shared: false
  })

  const filtered = docs.filter(d =>
    (folder === 'All' || d.folder === folder) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleUpload = (e) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error('Please enter a file name')
      return
    }

    const newDoc = {
      ...formData,
      id: docs.length + 1,
      type: formData.name.split('.').pop() || 'pdf',
      size: Math.floor(Math.random() * 10) + ' MB',
      modified: new Date().toISOString().split('T')[0],
    }

    setDocs([newDoc, ...docs])
    setShowModal(false)
    setFormData({
      name: '',
      folder: 'Sales',
      shared: false
    })
    toast.success('File uploaded successfully!')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-slate-400 text-sm mt-0.5">{docs.length} files across {FOLDERS.length - 1} folders</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
        >
          ↑ Upload
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search files…"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm
                     placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64" />
        <div className="flex gap-2 flex-wrap">
          {FOLDERS.map(f => (
            <button key={f} onClick={() => setFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-sm transition
                ${folder === f ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {['grid', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-sm transition
                ${view === v ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>
              {v === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(d => {
            const t = TYPE_ICON[d.type] || TYPE_ICON.doc
            return (
              <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4
                                         hover:border-slate-700 transition cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${t.color}`}>
                  {t.icon}
                </div>
                <p className="text-white text-sm font-medium truncate mb-1">{d.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">{d.size}</span>
                  {d.shared && <span className="text-indigo-400 text-xs">Shared</span>}
                </div>
                <p className="text-slate-600 text-xs mt-1">{new Date(d.modified).toLocaleDateString()}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {['Name', 'Folder', 'Size', 'Modified', 'Shared'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(d => {
                const t = TYPE_ICON[d.type] || TYPE_ICON.doc
                return (
                  <tr key={d.id} className="hover:bg-slate-800/40 transition cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.color}`}>{t.icon}</span>
                        <span className="text-white text-sm">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{d.folder}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{d.size}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{new Date(d.modified).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      {d.shared ? <span className="text-indigo-400 text-xs">✓ Shared</span> : <span className="text-slate-600 text-xs">Private</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">No files found.</div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Upload New Document"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpload}>Upload File</Button>
          </div>
        }
      >
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">File Name</label>
            <Input 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Q3 Sales Report.pdf" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Target Folder</label>
              <select 
                value={formData.folder}
                onChange={e => setFormData({...formData, folder: e.target.value})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                {FOLDERS.filter(f => f !== 'All').map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Visibility</label>
              <select 
                value={formData.shared}
                onChange={e => setFormData({...formData, shared: e.target.value === 'true'})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="false">Private</option>
                <option value="true">Shared</option>
              </select>
            </div>
          </div>
          <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 bg-white/[0.01]">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">Click or drag file to this area to upload</p>
          </div>
        </form>
      </Modal>
    </div>
  )
}
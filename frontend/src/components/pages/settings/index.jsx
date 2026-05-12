import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = ['Company', 'Team', 'Modules', 'Done']

const MODULES = [
  { id: 'sales', label: 'Sales', icon: '💰', desc: 'Pipeline, leads & deals' },
  { id: 'hr', label: 'HR', icon: '👥', desc: 'Employees & payroll' },
  { id: 'marketing', label: 'Marketing', icon: '📣', desc: 'Campaigns & analytics' },
  { id: 'projects', label: 'Projects', icon: '📋', desc: 'Tasks & milestones' },
  { id: 'support', label: 'Support', icon: '🎧', desc: 'Tickets & SLA' },
  { id: 'operations', label: 'Operations', icon: '⚙️', desc: 'Inventory & logistics' },
  { id: 'accounts', label: 'Accounts', icon: '📊', desc: 'Finance & invoicing' },
  { id: 'documents', label: 'Documents', icon: '📁', desc: 'File management' },
]

export default function Setup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    company: '', industry: '', size: '',
    team: [{ name: '', email: '', role: '' }],
    modules: [],
  })

  const next = () => step < STEPS.length - 1 ? setStep(s => s + 1) : navigate('/strategy')
  const back = () => setStep(s => s - 1)

  const toggleModule = (id) =>
    setData(d => ({
      ...d,
      modules: d.modules.includes(id) ? d.modules.filter(m => m !== id) : [...d.modules, id]
    }))

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition
                ${i < step ? 'bg-indigo-600 text-white' : i === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/30' : 'bg-slate-800 text-slate-500'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-indigo-600' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {/* Step 0: Company */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white">Tell us about your company</h2>
              <div>
                <label className="label">Company Name</label>
                <input className="input" value={data.company}
                  onChange={e => setData({ ...data, company: e.target.value })}
                  placeholder="Acme Corp" />
              </div>
              <div>
                <label className="label">Industry</label>
                <select className="input" value={data.industry}
                  onChange={e => setData({ ...data, industry: e.target.value })}>
                  <option value="">Select industry</option>
                  {['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 'Other'].map(i => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Company Size</label>
                <select className="input" value={data.size}
                  onChange={e => setData({ ...data, size: e.target.value })}>
                  <option value="">Select size</option>
                  {['1–10', '11–50', '51–200', '201–500', '500+'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Team */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white">Invite your team</h2>
              {data.team.map((m, i) => (
                <div key={i} className="grid grid-cols-3 gap-3">
                  <input className="input" placeholder="Name"
                    value={m.name} onChange={e => {
                      const t = [...data.team]; t[i].name = e.target.value; setData({ ...data, team: t })
                    }} />
                  <input className="input" placeholder="Email"
                    value={m.email} onChange={e => {
                      const t = [...data.team]; t[i].email = e.target.value; setData({ ...data, team: t })
                    }} />
                  <select className="input" value={m.role} onChange={e => {
                    const t = [...data.team]; t[i].role = e.target.value; setData({ ...data, team: t })
                  }}>
                    <option value="">Role</option>
                    {['Admin', 'Manager', 'User', 'Viewer'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={() => setData({ ...data, team: [...data.team, { name: '', email: '', role: '' }] })}
                className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1">
                + Add another member
              </button>
            </div>
          )}

          {/* Step 2: Modules */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white">Select modules</h2>
              <p className="text-slate-400 text-sm">Choose the features you want to activate</p>
              <div className="grid grid-cols-2 gap-3">
                {MODULES.map(m => (
                  <button key={m.id} onClick={() => toggleModule(m.id)}
                    className={`p-4 rounded-xl border text-left transition
                      ${data.modules.includes(m.id)
                        ? 'border-indigo-500 bg-indigo-600/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'}`}>
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <div className="font-semibold text-sm">{m.label}</div>
                    <div className="text-xs opacity-70 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto text-4xl">
                🎉
              </div>
              <h2 className="text-2xl font-bold text-white">You're all set!</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Your workspace is ready. Click below to start using NexCRM.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button onClick={back} disabled={step === 0}
              className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white disabled:opacity-0 transition text-sm">
              Back
            </button>
            <button onClick={next}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition">
              {step === STEPS.length - 1 ? 'Go to Dashboard' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .label { display:block; font-size:.8rem; font-weight:500; color:#94a3b8; margin-bottom:6px; }
        .input { width:100%; padding:10px 14px; border-radius:10px; background:#0f172a;
                 border:1px solid #1e293b; color:#fff; font-size:.875rem; outline:none;
                 transition:border-color .2s; }
        .input:focus { border-color:#6366f1; }
      `}</style>
    </div>
  )
}
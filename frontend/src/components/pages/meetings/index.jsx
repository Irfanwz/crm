import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input } from '../../ui/Input'

const MEETINGS = [
  { id: 1, title: 'Q2 Sales Review', date: '2025-05-22', time: '10:00', duration: 60, attendees: ['SC', 'TW', 'LC'], type: 'internal', status: 'upcoming' },
  { id: 2, title: 'Acme Corp Onboarding', date: '2025-05-22', time: '14:00', duration: 45, attendees: ['MO', 'PS'], type: 'client', status: 'upcoming' },
  { id: 3, title: 'Engineering Standup', date: '2025-05-21', time: '09:00', duration: 15, attendees: ['MO', 'JP', 'RK'], type: 'internal', status: 'done' },
  { id: 4, title: 'Product Roadmap Planning', date: '2025-05-23', time: '11:00', duration: 90, attendees: ['SC', 'PS', 'AN', 'MO'], type: 'internal', status: 'upcoming' },
  { id: 5, title: 'TechFlow Contract Review', date: '2025-05-24', time: '15:30', duration: 30, attendees: ['TW'], type: 'client', status: 'upcoming' },
  { id: 6, title: 'HR All-Hands', date: '2025-05-20', time: '16:00', duration: 60, attendees: ['SC', 'TW', 'JP', 'PS', 'MO'], type: 'internal', status: 'done' },
]

const TYPE_STYLE = {
  internal: 'bg-indigo-400/10 text-indigo-400',
  client: 'bg-emerald-400/10 text-emerald-400',
}

export default function Meetings() {
  const [meetings, setMeetings] = useState(MEETINGS)
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: 30,
    type: 'internal'
  })

  const filtered = meetings.filter(m => filter === 'all' || m.status === filter || m.type === filter)
  const upcoming = meetings.filter(m => m.status === 'upcoming')

  const today = new Date().toISOString().split('T')[0]

  const handleSchedule = (e) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error('Please enter a meeting title')
      return
    }

    const newMeeting = {
      ...formData,
      id: meetings.length + 1,
      attendees: ['MO'],
      status: 'upcoming'
    }

    setMeetings([newMeeting, ...meetings])
    setShowModal(false)
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: 30,
      type: 'internal'
    })
    toast.success('Meeting scheduled successfully!')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Meetings</h1>
          <p className="text-slate-400 text-sm mt-0.5">{upcoming.length} upcoming scheduled</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
        >
          + Schedule
        </button>
      </div>

      {/* Today's meetings */}
      {upcoming.filter(m => m.date === today || m.date === '2025-05-22').length > 0 && (
        <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-5">
          <h3 className="text-indigo-300 font-semibold text-sm mb-3">Today</h3>
          <div className="space-y-3">
            {upcoming.filter(m => m.date === '2025-05-22').map(m => (
              <div key={m.id} className="flex items-center gap-4 bg-slate-900/60 rounded-xl p-3">
                <div className="text-center w-16 shrink-0">
                  <p className="text-white font-bold text-base">{m.time}</p>
                  <p className="text-slate-500 text-xs">{m.duration}m</p>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{m.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${TYPE_STYLE[m.type]}`}>{m.type}</span>
                    <div className="flex -space-x-1">
                      {m.attendees.map(a => (
                        <div key={a} className="w-5 h-5 rounded-full bg-indigo-700 border border-slate-900
                                               flex items-center justify-center text-indigo-200 text-xs font-bold">
                          {a[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'upcoming', 'done', 'internal', 'client'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition
              ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* All meetings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800">
        {filtered.map(m => (
          <div key={m.id} className={`p-5 flex items-center gap-4 hover:bg-slate-800/30 transition
            ${m.status === 'done' ? 'opacity-60' : ''}`}>
            <div className="w-24 shrink-0 text-center">
              <p className="text-white text-sm font-semibold">{new Date(m.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
              <p className="text-slate-400 text-xs">{m.time}</p>
            </div>
            <div className="flex-1">
              <p className={`font-medium ${m.status === 'done' ? 'text-slate-400 line-through' : 'text-white'}`}>
                {m.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_STYLE[m.type]}`}>{m.type}</span>
                <span className="text-slate-500 text-xs">{m.duration} min</span>
                <div className="flex -space-x-1 ml-1">
                  {m.attendees.map(a => (
                    <div key={a} className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900
                                           flex items-center justify-center text-slate-300 text-xs font-bold">
                      {a[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {m.status === 'upcoming' && (
              <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs transition">
                View
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Meeting Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Schedule New Meeting"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSchedule}>Schedule Meeting</Button>
          </div>
        }
      >
        <form onSubmit={handleSchedule} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meeting Title</label>
            <Input 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Project Sync" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Date</label>
              <Input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Time</label>
              <Input 
                type="time" 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Duration (min)</label>
              <Input 
                type="number"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                placeholder="30" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meeting Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="internal">Internal</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
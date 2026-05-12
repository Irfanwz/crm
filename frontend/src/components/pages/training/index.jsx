import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import { Input } from '../../ui/Input'

const COURSES = [
  { id: 1, title: 'CRM Fundamentals', category: 'Onboarding', duration: '2h 30m', progress: 100, enrolled: 24, rating: 4.8 },
  { id: 2, title: 'Advanced Sales Techniques', category: 'Sales', duration: '4h 15m', progress: 65, enrolled: 18, rating: 4.6 },
  { id: 3, title: 'Data Privacy & GDPR', category: 'Compliance', duration: '1h 45m', progress: 0, enrolled: 31, rating: 4.2 },
  { id: 4, title: 'Leadership Essentials', category: 'Management', duration: '6h', progress: 30, enrolled: 9, rating: 4.9 },
  { id: 5, title: 'Customer Support Excellence', category: 'Support', duration: '3h', progress: 100, enrolled: 15, rating: 4.7 },
  { id: 6, title: 'Marketing Analytics', category: 'Marketing', duration: '5h', progress: 10, enrolled: 12, rating: 4.4 },
]

const CAT_COLOR = {
  Onboarding: 'bg-indigo-400/10 text-indigo-400',
  Sales: 'bg-emerald-400/10 text-emerald-400',
  Compliance: 'bg-rose-400/10 text-rose-400',
  Management: 'bg-violet-400/10 text-violet-400',
  Support: 'bg-cyan-400/10 text-cyan-400',
  Marketing: 'bg-amber-400/10 text-amber-400',
}

export default function Training() {
  const [courses, setCourses] = useState(COURSES)
  const [cat, setCat] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Onboarding',
    duration: '1h',
    rating: 5.0
  })

  const cats = ['All', ...new Set(courses.map(c => c.category))]
  const filtered = courses.filter(c => cat === 'All' || c.category === cat)
  const completed = courses.filter(c => c.progress === 100).length
  const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length

  const handleAddCourse = (e) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error('Please enter a course title')
      return
    }

    const newCourse = {
      ...formData,
      id: courses.length + 1,
      progress: 0,
      enrolled: 1,
      rating: parseFloat(formData.rating)
    }

    setCourses([newCourse, ...courses])
    setShowModal(false)
    setFormData({
      title: '',
      category: 'Onboarding',
      duration: '1h',
      rating: 5.0
    })
    toast.success('Course added successfully!')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Training</h1>
          <p className="text-slate-400 text-sm mt-0.5">Courses, learning paths & certifications</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
        >
          + Add Course
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: courses.length },
          { label: 'Completed', value: completed },
          { label: 'In Progress', value: inProgress },
          { label: 'Not Started', value: courses.filter(c => c.progress === 0).length },
        ].map(k => (
          <div key={k.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-400 text-xs mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-white">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold">Your Progress</p>
          <p className="text-slate-400 text-sm">{completed}/{courses.length} courses complete</p>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
            style={{ width: `${(completed / courses.length) * 100}%` }} />
        </div>
        <p className="text-slate-400 text-xs mt-2">{Math.round((completed / courses.length) * 100)}% overall completion</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-lg text-sm transition
              ${cat === c ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(course => (
          <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${CAT_COLOR[course.category]}`}>
                {course.category}
              </span>
              <span className="text-slate-400 text-xs">⏱ {course.duration}</span>
            </div>
            <h3 className="text-white font-semibold mb-4">{course.title}</h3>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Progress</span>
                <span className={course.progress === 100 ? 'text-emerald-400' : 'text-white'}>{course.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all
                  ${course.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                ★ {course.rating} <span className="text-slate-500">· {course.enrolled} enrolled</span>
              </div>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${course.progress === 100
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : course.progress > 0
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                {course.progress === 100 ? '✓ Done' : course.progress > 0 ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      <Modal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        title="Add New Training Course"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCourse}>Add Course</Button>
          </div>
        }
      >
        <form onSubmit={handleAddCourse} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Course Title</label>
            <Input 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Advanced React Patterns" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                {Object.keys(CAT_COLOR).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Duration</label>
              <Input 
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g. 2h 30m" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Rating (0-5)</label>
            <Input 
              type="number"
              step="0.1"
              value={formData.rating}
              onChange={e => setFormData({...formData, rating: e.target.value})}
              placeholder="5.0" 
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}
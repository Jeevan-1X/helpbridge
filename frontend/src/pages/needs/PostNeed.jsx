import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'

const CATEGORIES = ['Groceries','Repairs','Tutoring','Transport','Moving','Tech Help','Other']

export default function PostNeed() {
  const [form, setForm] = useState({ title:'', category:'', description:'', urgency:'low', location:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    setLoading(true)
    setError('')
    const result = await api.createNeed(form)
    if (result._id) {
      setSubmitted(true)
      setTimeout(() => navigate('/needs'), 2000)
    } else {
      setError(result.message || 'Failed to post need')
    }
    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-black text-3xl mb-2" style={{fontFamily:'Georgia,serif'}}>Need Posted!</h2>
        <p className="text-gray-500">Volunteers will be notified. Redirecting...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#1a472a] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📝</div>
          <h1 className="font-black text-4xl mb-2" style={{fontFamily:'Georgia,serif'}}>Post a Need</h1>
          <p className="text-gray-500">Tell the community what you need help with</p>
        </div>
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 shadow-sm">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input type="text" required placeholder="e.g. Need groceries delivered"
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
                value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select required className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] bg-white"
                value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea required rows={4} placeholder="Describe what you need in detail..."
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors resize-none"
                value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <input type="text" placeholder="e.g. Sector 4, Block B"
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
                value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Urgency</label>
              <div className="grid grid-cols-3 gap-3">
                {[['low','🟢 Flexible'],['med','🟡 Moderate'],['high','🔴 Urgent']].map(([val,label]) => (
                  <button type="button" key={val} onClick={() => setForm({...form, urgency: val})}
                    className={'py-3 rounded-xl border-2 text-sm font-semibold transition-all ' + (form.urgency === val ? 'border-[#1a472a] bg-[#1a472a]/5 text-[#1a472a]' : 'border-[#e8e2d9] text-gray-500')}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-[#f4a261] text-white font-semibold rounded-full hover:bg-[#e76f51] transition-all hover:-translate-y-0.5 disabled:opacity-50 text-base">
              {loading ? 'Posting...' : 'Post My Need'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

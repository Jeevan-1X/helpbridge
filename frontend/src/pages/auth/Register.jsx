import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await register(form.name, form.email, form.password, form.role)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4 pt-20 pb-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#f4a261] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🌱</div>
          <h1 className="font-black text-4xl mb-2" style={{fontFamily:'Georgia,serif'}}>Join HelpBridge</h1>
          <p className="text-gray-500">Create your account and start making a difference</p>
        </div>
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 shadow-sm">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input type="text" required placeholder="Your name"
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" required placeholder="you@example.com"
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input type="password" required placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#e8e2d9] rounded-xl text-sm focus:outline-none focus:border-[#1a472a] transition-colors"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">I want to join as</label>
              <div className="grid grid-cols-2 gap-3">
                {[['user','🙋 Member'],['volunteer','💪 Volunteer']].map(([val, label]) => (
                  <button type="button" key={val}
                    onClick={() => setForm({...form, role: val})}
                    className={'py-3 rounded-xl border-2 text-sm font-semibold transition-all ' + (form.role === val ? 'border-[#1a472a] bg-[#1a472a]/5 text-[#1a472a]' : 'border-[#e8e2d9] text-gray-500 hover:border-gray-300')}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#f4a261] text-white font-semibold rounded-full hover:bg-[#e76f51] transition-all hover:-translate-y-0.5 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="text-[#1a472a] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

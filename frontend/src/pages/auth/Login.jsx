import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(form.email, form.password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#1a472a] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🤝</div>
          <h1 className="font-black text-4xl mb-2" style={{fontFamily:'Georgia,serif'}}>Welcome back</h1>
          <p className="text-gray-500">Sign in to your HelpBridge account</p>
        </div>
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 shadow-sm">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#1a472a] text-white font-semibold rounded-full hover:bg-[#2d6a4f] transition-all hover:-translate-y-0.5 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account? <Link to="/register" className="text-[#1a472a] font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

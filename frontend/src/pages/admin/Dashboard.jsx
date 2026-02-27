import { useState, useEffect } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total:0, open:0, accepted:0, fulfilled:0 })

  useEffect(() => {
    if (authLoading) return
    if (!user) return navigate('/login')
    api.getNeeds({}).then(data => {
      if (Array.isArray(data)) {
        setNeeds(data)
        setStats({
          total: data.length,
          open: data.filter(n => n.status === 'Open').length,
          accepted: data.filter(n => n.status === 'Accepted').length,
          fulfilled: data.filter(n => n.status === 'Fulfilled').length,
        })
      }
      setLoading(false)
    })
  }, [user, authLoading])

  const urgencyColor = { high:'bg-red-100 text-red-600', med:'bg-amber-100 text-amber-600', low:'bg-green-100 text-green-600' }

  if (authLoading) return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="text-5xl mb-4">⏳</div>
        <p>Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="font-black text-4xl mb-1" style={{fontFamily:'Georgia,serif'}}>Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}! Here is your community overview.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label:'Total Needs', value:stats.total, icon:'📋', color:'bg-blue-50 text-blue-600' },
            { label:'Open', value:stats.open, icon:'🟢', color:'bg-green-50 text-green-600' },
            { label:'Accepted', value:stats.accepted, icon:'🤝', color:'bg-amber-50 text-amber-600' },
            { label:'Fulfilled', value:stats.fulfilled, icon:'✅', color:'bg-purple-50 text-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e8e2d9] rounded-2xl p-6">
              <div className={'w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ' + s.color}>{s.icon}</div>
              <div className="font-black text-3xl mb-1" style={{fontFamily:'Georgia,serif'}}>{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#e8e2d9] flex items-center justify-between">
            <h2 className="font-bold text-lg" style={{fontFamily:'Georgia,serif'}}>All Needs</h2>
            <span className="text-sm text-gray-400">{needs.length} total</span>
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <div className="divide-y divide-[#e8e2d9]">
              {needs.map(need => (
                <div key={need._id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-1 truncate">{need.title}</div>
                    <div className="text-xs text-gray-400">{need.category} · {need.postedBy?.name || 'Unknown'} · {new Date(need.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (urgencyColor[need.urgency] || 'bg-gray-100 text-gray-500')}>{need.urgency}</span>
                  <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (need.status === 'Open' ? 'bg-green-100 text-green-600' : need.status === 'Accepted' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500')}>{need.status}</span>
                </div>
              ))}
              {needs.length === 0 && (
                <div className="p-12 text-center text-gray-400">No needs posted yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'

const urgencyColor = { high:'bg-red-100 text-red-600', med:'bg-amber-100 text-amber-600', low:'bg-green-100 text-green-600' }
const urgencyLabel = { high:'Urgent', med:'Moderate', low:'Flexible' }

export default function NeedDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [need, setNeed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)

  useEffect(() => {
    api.getNeed(id).then(data => {
      setNeed(data)
      setLoading(false)
    })
  }, [id])

  const handleAccept = async () => {
    if (!user) return navigate('/login')
    setAccepting(true)
    const result = await api.acceptNeed(id)
    if (result._id) setNeed(result)
    setAccepting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center pt-20">
      <div className="text-center text-gray-400">
        <div className="text-5xl mb-4">⏳</div>
        <p>Loading...</p>
      </div>
    </div>
  )

  if (!need || need.message) return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center pt-20">
      <div className="text-center text-gray-400">
        <div className="text-5xl mb-4">😕</div>
        <p>Need not found</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-800 mb-8 flex items-center gap-2">← Back to needs</button>
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <span className="text-sm font-semibold text-[#1a472a]">{need.category}</span>
            <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (urgencyColor[need.urgency] || 'bg-gray-100 text-gray-600')}>{urgencyLabel[need.urgency] || need.urgency}</span>
          </div>
          <h1 className="font-black text-3xl mb-4" style={{fontFamily:'Georgia,serif'}}>{need.title}</h1>
          <p className="text-gray-500 leading-relaxed mb-6">{need.description}</p>
          {need.location && <p className="text-sm text-gray-400 mb-8">📍 {need.location}</p>}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#e8e2d9]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#f4a261] flex items-center justify-center text-white font-bold">
              {need.postedBy?.name?.split(' ').map(n=>n[0]).join('') || '?'}
            </div>
            <div>
              <div className="font-semibold text-sm">{need.postedBy?.name || 'Anonymous'}</div>
              <div className="text-xs text-gray-400">Posted {new Date(need.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          {need.status === 'Open' ? (
            <button onClick={handleAccept} disabled={accepting}
              className="w-full py-4 bg-[#1a472a] text-white font-semibold rounded-full hover:bg-[#2d6a4f] transition-all hover:-translate-y-0.5 disabled:opacity-50 text-base">
              {accepting ? 'Accepting...' : 'I will Help With This'}
            </button>
          ) : (
            <div className="w-full py-4 bg-gray-100 text-gray-500 font-semibold rounded-full text-center">
              {need.status === 'Accepted' ? '✅ Someone is already helping' : '🎉 This need has been fulfilled'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

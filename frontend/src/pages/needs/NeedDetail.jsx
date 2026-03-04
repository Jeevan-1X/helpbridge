import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
const catIcon = c => ({Moving:'📦',Education:'📚',Transport:'🚗',Home:'🏡',Pets:'🐾',Tech:'💻',Food:'🍱',Health:'❤️'}[c]||'📋')
export default function NeedDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [need, setNeed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [helping, setHelping] = useState(false)
  const [msg, setMsg] = useState('')
  useEffect(() => {
    api.getNeed(id).then(d => { setNeed(d); setLoading(false) })
  }, [id])
  const handleHelp = async () => {
    setHelping(true)
    await api.acceptNeed(id)
    setMsg('You offered to help! The poster will be notified. 🎉')
    api.getNeed(id).then(setNeed)
    setHelping(false)
  }
  const handleFulfill = async () => {
    await api.fulfillNeed(id)
    setMsg('Need marked as fulfilled! 🎉')
    api.getNeed(id).then(setNeed)
  }
  if (loading) return (
    <div style={{textAlign:'center',padding:'80px 20px',color:'#475569'}}>
      <div style={{fontSize:32,animation:'pulse 1.5s infinite',marginBottom:12}}>🤝</div>
      <p>Loading...</p>
    </div>
  )
  if (!need) return <div style={{textAlign:'center',padding:'80px 20px',color:'#475569'}}>Need not found</div>
  const isOwner = need.postedBy?._id === user?._id || need.postedBy === user?._id
  return (
    <div style={{maxWidth:680,margin:'0 auto',padding:'36px 20px'}}>
      <button className="btn-ghost" style={{marginBottom:24,fontSize:13}} onClick={()=>navigate(-1)}>← Back</button>
      <div className="card fade" style={{padding:32}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:20}}>
          <div style={{display:'flex',gap:8}}>
            <span className={`badge badge-${need.status==='fulfilled'?'fulfilled':need.urgency==='high'?'urgent':'open'}`}>
              {need.status==='fulfilled'?'✅ Fulfilled':need.urgency==='high'?'🔴 Urgent':'🟢 Open'}
            </span>
            <span style={{fontSize:13,color:'#475569'}}>{catIcon(need.category)} {need.category}</span>
          </div>
          <span style={{fontSize:12,color:'#475569'}}>{new Date(need.createdAt).toLocaleDateString()}</span>
        </div>
        <h1 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:16}}>{need.title}</h1>
        <p style={{fontSize:15,color:'#94A3B8',lineHeight:1.75,marginBottom:28}}>{need.description}</p>
        <div style={{display:'flex',alignItems:'center',gap:14,padding:'18px 0',borderTop:'1px solid #1E293B',borderBottom:'1px solid #1E293B',marginBottom:24}}>
          <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#14B8A6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,color:'white'}}>
            {need.postedBy?.name?.slice(0,2).toUpperCase()||'??'}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15}}>{need.postedBy?.name||'Anonymous'}</div>
            <div style={{fontSize:13,color:'#64748B'}}>Posted {new Date(need.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        {msg && <div style={{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#34D399',borderRadius:10,padding:'12px 16px',marginBottom:20,fontSize:13,fontWeight:600}}>{msg}</div>}
        {need.status !== 'fulfilled' && (
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            {!isOwner && (
              <button className="btn-accent" style={{padding:'12px 24px',fontSize:15}} onClick={handleHelp} disabled={helping}>
                {helping ? 'Sending...' : '🤝 Offer to Help'}
              </button>
            )}
            {isOwner && need.status === 'accepted' && (
              <button className="btn-primary" style={{padding:'12px 24px',fontSize:15}} onClick={handleFulfill}>
                ✅ Mark as Fulfilled
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
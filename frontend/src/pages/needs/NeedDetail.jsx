import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'

const urgencyClass = {high:'badge-high',med:'badge-med',low:'badge-low'}
const urgencyLabel = {high:'Urgent',med:'Moderate',low:'Flexible'}
const initials = (name) => name?.split(' ').map(n=>n[0]).join('').toUpperCase()||'?'

export default function NeedDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [need, setNeed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)

  useEffect(()=>{ api.getNeed(id).then(data=>{setNeed(data);setLoading(false)}) },[id])

  const handleAccept = async () => {
    if (!user) return navigate('/login')
    setAccepting(true)
    const result = await api.acceptNeed(id)
    if (result._id) setNeed(result)
    setAccepting(false)
  }

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center',color:'var(--text3)'}}><div style={{fontSize:'40px',marginBottom:'12px'}}>⏳</div><div>Loading...</div></div></div>
  if (!need||need.message) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center',color:'var(--text3)'}}><div style={{fontSize:'40px',marginBottom:'12px'}}>😕</div><div>Need not found</div></div></div>

  return (
    <div className="page">
      <div style={{background:'var(--primary)',padding:'52px 20px 32px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'160px',height:'160px',background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}/>
        <button onClick={()=>navigate(-1)} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'white',padding:'8px 16px',borderRadius:'20px',fontFamily:'Outfit,sans-serif',fontWeight:'600',cursor:'pointer',marginBottom:'16px',fontSize:'13px'}}>← Back</button>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
          <span style={{fontSize:'11px',fontWeight:'700',color:'rgba(255,255,255,0.7)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{need.category}</span>
          <span className={'badge '+(urgencyClass[need.urgency]||'badge-low')} style={{background:'rgba(255,255,255,0.2)',color:'white'}}>{urgencyLabel[need.urgency]||need.urgency}</span>
        </div>
        <div className="playfair" style={{fontSize:'24px',fontWeight:'900',color:'white',lineHeight:1.2}}>{need.title}</div>
      </div>
      <div style={{padding:'20px 16px'}}>
        <div className="card" style={{padding:'20px',marginBottom:'16px'}}>
          <div style={{fontSize:'14px',color:'var(--text2)',lineHeight:1.7,marginBottom:need.location?'16px':'0'}}>{need.description}</div>
          {need.location&&<div style={{fontSize:'13px',color:'var(--text3)',paddingTop:'16px',borderTop:'1px solid var(--border)'}}>📍 {need.location}</div>}
        </div>
        <div className="card" style={{padding:'16px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'14px'}}>
          <div className="avatar" style={{width:'48px',height:'48px',fontSize:'16px',borderRadius:'16px'}}>{initials(need.postedBy?.name)}</div>
          <div>
            <div style={{fontWeight:'700',fontSize:'15px'}}>{need.postedBy?.name||'Anonymous'}</div>
            <div style={{fontSize:'12px',color:'var(--text3)',marginTop:'2px'}}>Posted {new Date(need.createdAt).toLocaleDateString()}</div>
          </div>
          <span className={'badge '+(need.status==='Open'?'badge-open':need.status==='Accepted'?'badge-accepted':'badge-fulfilled')} style={{marginLeft:'auto'}}>{need.status}</span>
        </div>
        {need.status==='Open' ? (
          <button onClick={handleAccept} disabled={accepting} className="btn-primary" style={{width:'100%',padding:'18px',fontSize:'16px',opacity:accepting?0.7:1}}>
            {accepting?'Accepting...':'💪 I Will Help With This'}
          </button>
        ) : (
          <div style={{background:'var(--bg)',borderRadius:'20px',padding:'18px',textAlign:'center',fontSize:'15px',fontWeight:'600',color:'var(--text3)'}}>
            {need.status==='Accepted'?'✅ Someone is already helping':'🎉 This need has been fulfilled'}
          </div>
        )}
      </div>
    </div>
  )
}

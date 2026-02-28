import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

const initials = (name) => name?.split(' ').map(n=>n[0]).join('').toUpperCase()||'?'

export default function Dashboard() {
  const { user, loading:authLoading } = useAuth()
  const navigate = useNavigate()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({total:0,open:0,accepted:0,fulfilled:0})

  useEffect(()=>{
    if (authLoading) return
    if (!user) return navigate('/login')
    api.getNeeds({}).then(data=>{
      if (Array.isArray(data)) {
        setNeeds(data)
        setStats({total:data.length,open:data.filter(n=>n.status==='Open').length,accepted:data.filter(n=>n.status==='Accepted').length,fulfilled:data.filter(n=>n.status==='Fulfilled').length})
      }
      setLoading(false)
    })
  },[user,authLoading])

  if (authLoading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:'40px'}}>⏳</div></div>

  return (
    <div className="page">
      <div style={{background:'#1c1c1e',padding:'52px 20px 32px'}}>
        <div style={{display:'inline-block',background:'var(--accent)',color:'white',fontSize:'10px',fontWeight:'800',padding:'4px 12px',borderRadius:'20px',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'10px'}}>Admin Panel</div>
        <div className="playfair" style={{fontSize:'28px',fontWeight:'900',color:'white'}}>Dashboard</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.45)',marginTop:'4px'}}>Community overview</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',padding:'16px',marginTop:'-16px',position:'relative',zIndex:2}}>
        {[{icon:'📋',num:stats.total,label:'Total Needs'},{icon:'🟢',num:stats.open,label:'Open'},{icon:'🤝',num:stats.accepted,label:'Accepted'},{icon:'✅',num:stats.fulfilled,label:'Fulfilled'}].map(s=>(
          <div key={s.label} className="card" style={{padding:'16px'}}>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>{s.icon}</div>
            <div className="playfair" style={{fontSize:'28px',fontWeight:'900',color:'var(--text)'}}>{s.num}</div>
            <div style={{fontSize:'11px',color:'var(--text3)',fontWeight:'600',marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'0 16px 16px'}}>
        <div className="section-title" style={{marginBottom:'14px'}}>All Needs</div>
        <div className="card" style={{overflow:'hidden'}}>
          {loading ? (
            <div style={{padding:'40px',textAlign:'center',color:'var(--text3)'}}>Loading...</div>
          ) : needs.length===0 ? (
            <div style={{padding:'40px',textAlign:'center',color:'var(--text3)'}}>No needs yet</div>
          ) : needs.map((need,i)=>(
            <div key={need._id} style={{padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px',borderBottom:i<needs.length-1?'1px solid var(--border)':'none'}}>
              <div className="avatar" style={{width:'38px',height:'38px',fontSize:'12px',borderRadius:'12px',flexShrink:0}}>{initials(need.postedBy?.name)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:'700',fontSize:'13px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{need.title}</div>
                <div style={{fontSize:'11px',color:'var(--text3)',marginTop:'2px'}}>{need.category} · {need.postedBy?.name||'Unknown'}</div>
              </div>
              <span className={'badge '+(need.status==='Open'?'badge-open':need.status==='Accepted'?'badge-accepted':'badge-fulfilled')}>{need.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

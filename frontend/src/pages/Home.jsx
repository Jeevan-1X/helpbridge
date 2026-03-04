import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const catEmoji = c => ({Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📋'}[c]||'📋')

function StatCard({value,label,color,icon,delay}) {
  return (
    <div className={`fade ${delay}`} style={{
      background:'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))',
      border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,
      padding:'16px',textAlign:'center',flex:1
    }}>
      <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
      <div style={{fontSize:22,fontWeight:800,color,fontFamily:'Syne,sans-serif',lineHeight:1}}>{value}</div>
      <div style={{fontSize:11,color:'#7878a0',marginTop:4,fontWeight:500}}>{label}</div>
    </div>
  )
}

export default function Home({ onOpenChat }) {
  const { user } = useAuth()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getNeeds({}).then(d => { setNeeds(Array.isArray(d)?d:[]); setLoading(false) })
  }, [])

  const myNeeds = needs.filter(n => n.postedBy?._id === user?._id || n.postedBy === user?._id)
  const fulfilled = myNeeds.filter(n => n.status === 'Fulfilled').length
  const helped = needs.filter(n => n.acceptedBy?._id === user?._id || n.acceptedBy === user?._id).length
  const inProgress = needs.filter(n =>
    n.status === 'Accepted' && (n.postedBy?._id===user?._id || n.acceptedBy?._id===user?._id)
  )
  const rate = myNeeds.length ? Math.round(fulfilled/myNeeds.length*100) : 0
  const initials = user?.name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()||'?'

  return (
    <div style={{padding:'0 0 8px'}}>
      {/* Header */}
      <div style={{
        padding:'52px 20px 28px',
        background:'linear-gradient(180deg,rgba(124,92,252,0.12) 0%,transparent 100%)'
      }}>
        <div className="fade" style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
          <div style={{
            width:48,height:48,borderRadius:16,flexShrink:0,
            background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:17,fontWeight:800,color:'white',
            boxShadow:'0 4px 20px rgba(124,92,252,0.4)'
          }}>{initials}</div>
          <div>
            <p style={{fontSize:12,color:'#7878a0',marginBottom:2,fontWeight:500}}>Welcome back</p>
            <h2 style={{fontSize:20,fontWeight:800,fontFamily:'Syne,sans-serif',lineHeight:1}}>{user?.name}</h2>
          </div>
          <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',padding:'5px 10px',borderRadius:999}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',animation:'pulse 2s infinite'}}/>
            <span style={{fontSize:11,color:'#22c55e',fontWeight:600}}>Active</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'flex',gap:10}}>
          <StatCard value={myNeeds.length} label="Posted" color="#7c5cfc" icon="📋" delay="d1"/>
          <StatCard value={fulfilled} label="Fulfilled" color="#22c55e" icon="✅" delay="d2"/>
          <StatCard value={helped} label="Helped" color="#f97316" icon="🤝" delay="d3"/>
        </div>

        {/* Progress bar */}
        {myNeeds.length > 0 && (
          <div className="fade d4" style={{marginTop:16,background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'12px 16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontSize:12,color:'#7878a0',fontWeight:500}}>Fulfilment rate</span>
              <span style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>{rate}%</span>
            </div>
            <div style={{height:5,background:'rgba(255,255,255,0.06)',borderRadius:999,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${rate}%`,background:'linear-gradient(90deg,#7c5cfc,#22c55e)',borderRadius:999,transition:'width 1.2s ease'}}/>
            </div>
          </div>
        )}
      </div>

      <div style={{padding:'0 16px'}}>
        {/* In Progress */}
        {inProgress.length > 0 && (
          <div className="fade d3" style={{marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'#a78bfa',animation:'pulse 2s infinite'}}/>
              <h3 style={{fontSize:13,fontWeight:700,color:'#a78bfa',textTransform:'uppercase',letterSpacing:'0.08em'}}>In Progress</h3>
              <span style={{marginLeft:'auto',background:'rgba(124,92,252,0.15)',color:'#a78bfa',borderRadius:999,padding:'2px 8px',fontSize:11,fontWeight:700}}>{inProgress.length}</span>
            </div>
            {inProgress.map(n => (
              <div key={n._id} onClick={()=>onOpenChat(n)} className="card" style={{
                padding:'14px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12,
                cursor:'pointer',border:'1px solid rgba(124,92,252,0.2)',
                transition:'all 0.2s'
              }}>
                <div style={{fontSize:22}}>{catEmoji(n.category)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{n.title}</div>
                  <div style={{fontSize:11,color:'#7878a0'}}>Tap to open chat</div>
                </div>
                <div style={{background:'rgba(124,92,252,0.15)',padding:'6px 10px',borderRadius:10,fontSize:11,fontWeight:700,color:'#a78bfa'}}>Chat →</div>
              </div>
            ))}
          </div>
        )}

        {/* My Needs */}
        <div className="fade d4">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <h3 style={{fontSize:13,fontWeight:700,color:'#7878a0',textTransform:'uppercase',letterSpacing:'0.08em'}}>My Needs</h3>
            <span style={{fontSize:12,color:'#4a4a6a'}}>{myNeeds.length} total</span>
          </div>
          {loading ? [...Array(3)].map((_,i)=>(
            <div key={i} className="skeleton" style={{height:70,marginBottom:10,borderRadius:16}}/>
          )) : myNeeds.length === 0 ? (
            <div style={{textAlign:'center',padding:'32px 0',color:'#4a4a6a'}}>
              <div style={{fontSize:32,marginBottom:8}}>📭</div>
              <p style={{fontSize:13}}>No needs posted yet</p>
            </div>
          ) : myNeeds.slice(0,5).map((n,i) => (
            <div key={n._id} className={`card fade`} style={{
              padding:'14px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12,
              animationDelay:`${0.3+i*0.06}s`
            }}>
              <div style={{width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.04)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
                {catEmoji(n.category)}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{n.title}</div>
                <div style={{fontSize:11,color:'#7878a0'}}>{n.category}</div>
              </div>
              <span className={`badge badge-${n.status==='Fulfilled'?'fulfilled':n.status==='Accepted'?'progress':'open'}`}>
                {n.status==='Fulfilled'?'Done':n.status==='Accepted'?'Active':'Open'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

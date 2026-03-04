import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const catEmoji = c => ({Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📋'}[c]||'📋')

export default function Profile() {
  const { user, logout } = useAuth()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('mine')

  useEffect(() => {
    api.getNeeds({}).then(d => { setNeeds(Array.isArray(d)?d:[]); setLoading(false) })
  }, [])

  const mine = needs.filter(n => n.postedBy?._id===user?._id||n.postedBy===user?._id)
  const helped = needs.filter(n => n.acceptedBy?._id===user?._id||n.acceptedBy===user?._id)
  const fulfilled = mine.filter(n=>n.status==='Fulfilled').length
  const rate = mine.length ? Math.round(fulfilled/mine.length*100) : 0
  const initials = user?.name?.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()||'?'

  return (
    <div style={{paddingBottom:8}}>
      {/* Header */}
      <div style={{
        padding:'52px 20px 28px',
        background:'linear-gradient(180deg,rgba(79,172,254,0.1) 0%,transparent 100%)',
        textAlign:'center'
      }}>
        <div className="fade" style={{
          width:72,height:72,borderRadius:22,margin:'0 auto 16px',
          background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:24,fontWeight:800,color:'white',
          boxShadow:'0 8px 30px rgba(124,92,252,0.4)',
          animation:'float 3s ease-in-out infinite'
        }}>{initials}</div>
        <h2 className="fade d1" style={{fontSize:22,fontWeight:800,fontFamily:'Syne,sans-serif',marginBottom:4}}>{user?.name}</h2>
        <p className="fade d1" style={{fontSize:13,color:'#7878a0',marginBottom:20}}>{user?.email}</p>

        {/* Stats row */}
        <div className="fade d2" style={{display:'flex',gap:1,background:'rgba(255,255,255,0.04)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
          {[
            {v:mine.length,l:'Posted'},
            {v:fulfilled,l:'Fulfilled'},
            {v:helped.length,l:'Helped'},
            {v:`${rate}%`,l:'Rate'}
          ].map((s,i)=>(
            <div key={i} style={{flex:1,padding:'14px 8px',textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div style={{fontSize:18,fontWeight:800,fontFamily:'Syne,sans-serif',color:i===2?'#f97316':i===1?'#22c55e':i===3?'#4facfe':'#7c5cfc'}}>{s.v}</div>
              <div style={{fontSize:10,color:'#7878a0',fontWeight:600,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'0 16px'}}>
        {/* Tabs */}
        <div className="fade d3" style={{display:'flex',gap:6,marginBottom:20,background:'rgba(255,255,255,0.03)',borderRadius:12,padding:4}}>
          {[{id:'mine',l:'My Posts'},{id:'helped',l:'I Helped'}].map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
              flex:1,padding:'9px',borderRadius:9,fontSize:13,fontWeight:600,
              background:activeTab===t.id?'linear-gradient(135deg,#7c5cfc,#4facfe)':'transparent',
              color:activeTab===t.id?'white':'#7878a0',border:'none',cursor:'pointer',transition:'all 0.15s'
            }}>{t.l}</button>
          ))}
        </div>

        {/* List */}
        {loading ? [...Array(3)].map((_,i)=>(
          <div key={i} className="skeleton" style={{height:64,marginBottom:10,borderRadius:14}}/>
        )) : (activeTab==='mine'?mine:helped).length===0 ? (
          <div style={{textAlign:'center',padding:'40px 0',color:'#4a4a6a'}}>
            <div style={{fontSize:32,marginBottom:8}}>📭</div>
            <p style={{fontSize:13}}>Nothing here yet</p>
          </div>
        ) : (activeTab==='mine'?mine:helped).map((n,i)=>(
          <div key={n._id} className="card fade" style={{padding:'13px 14px',marginBottom:8,display:'flex',alignItems:'center',gap:12,animationDelay:`${i*0.05}s`}}>
            <div style={{width:34,height:34,borderRadius:10,background:'rgba(255,255,255,0.04)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>
              {catEmoji(n.category)}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{n.title}</div>
              <div style={{fontSize:11,color:'#7878a0',marginTop:1}}>{n.category}</div>
            </div>
            <span className={`badge badge-${n.status==='Fulfilled'?'fulfilled':n.status==='Accepted'?'progress':'open'}`}>
              {n.status==='Fulfilled'?'Done':n.status==='Accepted'?'Active':'Open'}
            </span>
          </div>
        ))}

        <button onClick={logout} className="btn-ghost" style={{width:'100%',marginTop:20,padding:'13px',color:'#ef4444',borderColor:'rgba(239,68,68,0.2)'}}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

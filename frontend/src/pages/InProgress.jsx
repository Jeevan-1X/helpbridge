import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const catEmoji = c => ({Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📋'}[c]||'📋')

export default function InProgress({ onOpenChat }) {
  const { user } = useAuth()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [fulfilling, setFulfilling] = useState(null)

  const load = () => {
    api.getNeeds({}).then(d => { setNeeds(Array.isArray(d)?d:[]); setLoading(false) })
  }
  useEffect(() => { load() }, [])

  const fulfill = async (id) => {
    setFulfilling(id)
    try { await api.fulfillNeed(id); load() } catch(e) { console.error(e) }
    setFulfilling(null)
  }

  const active = needs.filter(n =>
    n.status === 'Accepted' && (
      n.postedBy?._id === user?._id || n.postedBy === user?._id ||
      n.acceptedBy?._id === user?._id || n.acceptedBy === user?._id
    )
  )
  const done = needs.filter(n =>
    n.status === 'Fulfilled' && (
      n.postedBy?._id === user?._id || n.postedBy === user?._id ||
      n.acceptedBy?._id === user?._id || n.acceptedBy === user?._id
    )
  )

  return (
    <div style={{padding:'52px 16px 8px'}}>
      <h1 className="fade" style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',marginBottom:4}}>Active Helps</h1>
      <p className="fade d1" style={{fontSize:13,color:'#7878a0',marginBottom:24}}>Coordinate and complete</p>

      {loading ? [...Array(3)].map((_,i)=>(
        <div key={i} className="skeleton" style={{height:120,marginBottom:12,borderRadius:18}}/>
      )) : (
        <>
          {active.length === 0 && done.length === 0 && (
            <div style={{textAlign:'center',padding:'60px 0',color:'#4a4a6a'}}>
              <div style={{fontSize:40,marginBottom:12}}>✨</div>
              <p style={{fontSize:14,fontWeight:600,color:'#7878a0'}}>Nothing in progress</p>
              <p style={{fontSize:12,color:'#4a4a6a',marginTop:4}}>Offer help on Browse to get started</p>
            </div>
          )}

          {active.length > 0 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#a78bfa',animation:'pulse 2s infinite'}}/>
                <span style={{fontSize:11,fontWeight:700,color:'#a78bfa',textTransform:'uppercase',letterSpacing:'0.08em'}}>In Progress</span>
              </div>
              {active.map(n => {
                const isPoster = n.postedBy?._id===user?._id || n.postedBy===user?._id
                const helper = n.acceptedBy?.name || 'Helper'
                const poster = n.postedBy?.name || 'Someone'
                return (
                  <div key={n._id} className="card fade" style={{padding:'18px',marginBottom:12,border:'1px solid rgba(124,92,252,0.2)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                      <div style={{width:40,height:40,borderRadius:12,background:'rgba(124,92,252,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>
                        {catEmoji(n.category)}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:14,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{n.title}</div>
                        <div style={{fontSize:11,color:'#7878a0',marginTop:2}}>
                          {isPoster ? `${helper} is helping you` : `You're helping ${poster}`}
                        </div>
                      </div>
                      <span className="badge badge-progress">Active</span>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={()=>onOpenChat(n)} style={{
                        flex:1,padding:'10px',borderRadius:12,
                        background:'rgba(124,92,252,0.1)',color:'#a78bfa',
                        border:'1px solid rgba(124,92,252,0.2)',fontSize:13,fontWeight:600,cursor:'pointer'
                      }}>💬 Chat</button>
                      {isPoster && (
                        <button onClick={()=>fulfill(n._id)} disabled={fulfilling===n._id} style={{
                          flex:1,padding:'10px',borderRadius:12,
                          background:fulfilling===n._id?'rgba(34,197,94,0.05)':'rgba(34,197,94,0.1)',
                          color:'#22c55e',border:'1px solid rgba(34,197,94,0.2)',
                          fontSize:13,fontWeight:600,cursor:fulfilling===n._id?'wait':'pointer'
                        }}>{fulfilling===n._id?'…':'✅ Mark Done'}</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {done.length > 0 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,marginTop:8}}>
                <span style={{fontSize:11,fontWeight:700,color:'#7878a0',textTransform:'uppercase',letterSpacing:'0.08em'}}>Completed</span>
              </div>
              {done.map(n => (
                <div key={n._id} className="card fade" style={{padding:'14px 16px',marginBottom:8,display:'flex',alignItems:'center',gap:12,opacity:0.6}}>
                  <div style={{fontSize:18}}>{catEmoji(n.category)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{n.title}</div>
                  </div>
                  <span className="badge badge-fulfilled">Done</span>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}

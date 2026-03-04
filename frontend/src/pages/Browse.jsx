import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const catEmoji = c => ({Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📋'}[c]||'📋')

export default function Browse({ onOpenChat }) {
  const { user } = useAuth()
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [helpLoading, setHelpLoading] = useState(null)

  const load = () => {
    setLoading(true)
    api.getNeeds({}).then(d => { setNeeds(Array.isArray(d)?d:[]); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const offerHelp = async (n) => {
    setHelpLoading(n._id)
    try {
      await api.acceptNeed(n._id)
      load()
      const updated = { ...n, status:'Accepted', acceptedBy:{_id:user._id,name:user.name} }
      const fresh = await api.getNeed(n._id); onOpenChat(fresh)
    } catch(e) { console.error(e) }
    setHelpLoading(null)
  }

  const filtered = needs.filter(n =>
    n.status === 'Open' &&
    n.postedBy?._id !== user?._id &&
    (cat==='All'||n.category===cat) &&
    (n.title?.toLowerCase().includes(q.toLowerCase())||n.description?.toLowerCase().includes(q.toLowerCase()))
  )

  const cats = ['All','Groceries','Repairs','Tutoring','Transport','Moving','Tech Help','Other']

  return (
    <div style={{padding:'52px 0 8px'}}>
      <div style={{padding:'0 16px 16px'}}>
        <h1 className="fade" style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',marginBottom:4}}>Explore</h1>
        <p className="fade d1" style={{fontSize:13,color:'#7878a0',marginBottom:20}}>Help someone in your community</p>

        <div className="fade d1" style={{position:'relative',marginBottom:12}}>
          <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:15}}>🔍</span>
          <input className="input" style={{paddingLeft:40}} placeholder="Search needs…" value={q} onChange={e=>setQ(e.target.value)}/>
        </div>

        <div className="fade d2" style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,scrollbarWidth:'none'}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{
              flexShrink:0,padding:'7px 14px',borderRadius:10,fontSize:12,fontWeight:600,
              background:cat===c?'linear-gradient(135deg,#7c5cfc,#4facfe)':'rgba(255,255,255,0.05)',
              color:cat===c?'white':'#7878a0',
              border:cat===c?'none':'1px solid rgba(255,255,255,0.07)',
              cursor:'pointer',transition:'all 0.15s'
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{padding:'0 16px'}}>
        {loading ? [...Array(4)].map((_,i)=>(
          <div key={i} className="skeleton" style={{height:130,marginBottom:12,borderRadius:18}}/>
        )) : filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'#4a4a6a'}}>
            <div style={{fontSize:36,marginBottom:12}}>🌟</div>
            <p style={{fontSize:14,fontWeight:600,color:'#7878a0'}}>No needs found</p>
            <p style={{fontSize:12,color:'#4a4a6a',marginTop:4}}>Check back later or adjust filters</p>
          </div>
        ) : filtered.map((n,i) => (
          <div key={n._id} className={`card fade`} style={{
            padding:'18px',marginBottom:12,
            animationDelay:`${i*0.05}s`,transition:'transform 0.2s',
            border:`1px solid ${n.urgency==='high'?'rgba(239,68,68,0.15)':'rgba(255,255,255,0.07)'}`
          }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:'rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17}}>
                  {catEmoji(n.category)}
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,lineHeight:1.2,marginBottom:2}}>{n.title}</div>
                  <div style={{fontSize:11,color:'#7878a0'}}>{n.category}</div>
                </div>
              </div>
              <span className={`badge badge-${n.urgency}`}>{n.urgency?.toUpperCase()}</span>
            </div>
            <p style={{fontSize:13,color:'#7878a0',lineHeight:1.6,marginBottom:14}}>
              {n.description?.slice(0,100)}{n.description?.length>100?'…':''}
            </p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{
                  width:26,height:26,borderRadius:8,
                  background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:10,fontWeight:800,color:'white'
                }}>{n.postedBy?.name?.slice(0,2).toUpperCase()||'??'}</div>
                <span style={{fontSize:12,color:'#7878a0'}}>{n.postedBy?.name||'Anonymous'}</span>
              </div>
              <button
                onClick={()=>offerHelp(n)}
                disabled={helpLoading===n._id}
                style={{
                  background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
                  color:'white',border:'none',borderRadius:10,
                  padding:'8px 16px',fontSize:12,fontWeight:700,
                  cursor:helpLoading===n._id?'wait':'pointer',
                  opacity:helpLoading===n._id?0.7:1,
                  transition:'all 0.2s',
                  boxShadow:'0 2px 12px rgba(124,92,252,0.3)'
                }}>
                {helpLoading===n._id?'…':'🤝 Help'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

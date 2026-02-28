import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

const initials = (name) => name?.split(' ').map(n=>n[0]).join('').toUpperCase() || '?'
const urgencyClass = { high:'badge-high', med:'badge-med', low:'badge-low' }
const urgencyLabel = { high:'Urgent', med:'Moderate', low:'Flexible' }

export default function Landing() {
  const { user } = useAuth()
  const [needs, setNeeds] = useState([])
  const [stats, setStats] = useState({ total:0, open:0, fulfilled:0 })

  useEffect(() => {
    api.getNeeds({}).then(data => {
      if (Array.isArray(data)) {
        setNeeds(data.slice(0,3))
        setStats({ total:data.length, open:data.filter(n=>n.status==='Open').length, fulfilled:data.filter(n=>n.status==='Fulfilled').length })
      }
    })
  }, [])

  return (
    <div className="page">
      <div style={{background:'var(--primary)',padding:'52px 20px 36px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'160px',height:'160px',background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:'-30px',left:'-20px',width:'120px',height:'120px',background:'rgba(244,162,97,0.12)',borderRadius:'50%'}}/>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.65)',marginBottom:'4px',fontWeight:'500'}}>
          {user ? 'Good day, ' + user.name.split(' ')[0] + ' 👋' : 'Welcome to'}
        </div>
        <div className="playfair" style={{fontSize:'30px',fontWeight:'900',color:'white',lineHeight:1.1}}>
          {user ? 'Your Community' : 'HelpBridge 🤝'}
        </div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.55)',marginTop:'6px'}}>
          {user ? stats.open + ' open needs in your area' : 'Connect · Help · Thrive'}
        </div>
        {!user && (
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
            <Link to="/register" style={{padding:'12px 24px',background:'var(--accent)',color:'white',borderRadius:'20px',fontWeight:'700',fontSize:'14px',textDecoration:'none'}}>Join Now</Link>
            <Link to="/login" style={{padding:'12px 24px',background:'rgba(255,255,255,0.15)',color:'white',borderRadius:'20px',fontWeight:'700',fontSize:'14px',textDecoration:'none'}}>Sign In</Link>
          </div>
        )}
      </div>

      <div style={{display:'flex',gap:'12px',padding:'0 16px',marginTop:'-20px',position:'relative',zIndex:2}} className="fade-up">
        {[{num:stats.open,label:'Open Needs'},{num:stats.total,label:'Total Posted'},{num:stats.fulfilled,label:'Fulfilled'}].map(s => (
          <div key={s.label} className="card" style={{flex:1,padding:'16px 12px',textAlign:'center'}}>
            <div className="playfair" style={{fontSize:'26px',fontWeight:'900',color:'var(--primary)'}}>{s.num}</div>
            <div style={{fontSize:'10px',fontWeight:'600',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',padding:'20px 16px 0'}} className="fade-up-2">
        <Link to="/needs/post" style={{background:'var(--primary)',borderRadius:'var(--r-md)',padding:'20px 16px',textDecoration:'none',position:'relative',overflow:'hidden'}}>
          <div style={{fontSize:'28px',marginBottom:'10px'}}>📝</div>
          <div className="playfair" style={{fontSize:'16px',fontWeight:'700',color:'white'}}>Post a Need</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',marginTop:'3px'}}>Ask for help</div>
        </Link>
        <Link to="/needs" style={{background:'linear-gradient(135deg,var(--accent),var(--accent2))',borderRadius:'var(--r-md)',padding:'20px 16px',textDecoration:'none',position:'relative'}}>
          <div style={{fontSize:'28px',marginBottom:'10px'}}>💪</div>
          <div className="playfair" style={{fontSize:'16px',fontWeight:'700',color:'white'}}>Volunteer</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',marginTop:'3px'}}>Give help</div>
        </Link>
      </div>

      <div style={{padding:'24px 16px 0'}}>
        <div className="section-header">
          <div className="section-title">Recent Needs</div>
          <Link to="/needs" className="see-all" style={{textDecoration:'none'}}>See all →</Link>
        </div>
        {needs.length === 0 ? (
          <div className="card" style={{padding:'40px',textAlign:'center',color:'var(--text3)'}}>
            <div style={{fontSize:'40px',marginBottom:'10px'}}>🌱</div>
            <div style={{fontWeight:'600'}}>No needs posted yet</div>
          </div>
        ) : needs.map(need => (
          <div key={need._id} className="card" style={{padding:'16px',marginBottom:'12px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'11px',fontWeight:'700',color:'var(--primary)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{need.category}</span>
              <span className={'badge ' + (urgencyClass[need.urgency] || 'badge-low')}>{urgencyLabel[need.urgency] || need.urgency}</span>
            </div>
            <div className="playfair" style={{fontSize:'16px',fontWeight:'700',marginBottom:'6px',lineHeight:1.3}}>{need.title}</div>
            <div style={{fontSize:'12px',color:'var(--text2)',lineHeight:1.6,marginBottom:'14px'}}>{(need.description||'').slice(0,80)}...</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div className="avatar" style={{width:'28px',height:'28px',fontSize:'10px'}}>{initials(need.postedBy?.name)}</div>
                <span style={{fontSize:'12px',fontWeight:'600',color:'var(--text2)'}}>{need.postedBy?.name||'Anonymous'}</span>
              </div>
              <Link to={'/needs/'+need._id} style={{background:'var(--primary)',color:'white',fontSize:'11px',fontWeight:'700',padding:'8px 16px',borderRadius:'20px',textDecoration:'none'}}>
                {need.status==='Open'?'Help Now':need.status}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

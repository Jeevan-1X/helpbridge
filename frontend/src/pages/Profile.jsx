import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const initials = (name) => name?.split(' ').map(n=>n[0]).join('').toUpperCase()||'?'

export default function Profile() {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:'40px'}}>⏳</div></div>

  if (!user) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding:'20px',textAlign:'center'}}>
      <div style={{fontSize:'60px',marginBottom:'16px'}}>👤</div>
      <div className="playfair" style={{fontSize:'24px',fontWeight:'900',marginBottom:'8px'}}>Sign In</div>
      <div style={{color:'var(--text2)',marginBottom:'24px'}}>Join the HelpBridge community</div>
      <Link to="/login" className="btn-primary" style={{padding:'14px 32px',fontSize:'15px',textDecoration:'none',display:'inline-block'}}>Sign In</Link>
      <Link to="/register" style={{marginTop:'12px',color:'var(--accent)',fontWeight:'600',textDecoration:'none',fontSize:'14px'}}>Create Account →</Link>
    </div>
  )

  return (
    <div className="page">
      <div style={{background:'var(--primary)',padding:'52px 20px 52px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'160px',height:'160px',background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}/>
        <div style={{width:'80px',height:'80px',borderRadius:'28px',background:'linear-gradient(135deg,var(--accent),var(--accent2))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',fontWeight:'900',color:'white',margin:'0 auto 12px',fontFamily:"Playfair Display,serif",boxShadow:'0 8px 24px rgba(0,0,0,0.2)'}}>
          {initials(user.name)}
        </div>
        <div className="playfair" style={{fontSize:'22px',fontWeight:'900',color:'white'}}>{user.name}</div>
        <div style={{display:'inline-block',background:'rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.9)',fontSize:'11px',fontWeight:'700',padding:'4px 14px',borderRadius:'20px',marginTop:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>{user.role}</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>{user.email}</div>
      </div>
      <div style={{padding:'0 16px',marginTop:'-24px',position:'relative',zIndex:2}}>
        <div className="card" style={{padding:'0',marginBottom:'14px',overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
            {[{num:'⭐',label:'Member'},{num:user.role,label:'Role'},{num:'Active',label:'Status'}].map((s,i)=>(
              <div key={s.label} style={{textAlign:'center',padding:'16px 8px',borderRight:i<2?'1px solid var(--border)':'none'}}>
                <div style={{fontSize:'14px',fontWeight:'800',color:'var(--primary)',marginBottom:'2px'}}>{s.num}</div>
                <div style={{fontSize:'10px',color:'var(--text3)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.06em'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{padding:'0 16px',marginBottom:'14px'}}>
          {[
            {icon:'🔍',title:'Browse Needs',sub:'Find needs to help with',link:'/needs'},
            {icon:'📝',title:'Post a Need',sub:'Ask community for help',link:'/needs/post'},
            {icon:'🔔',title:'Notifications',sub:'Manage alerts'},
            {icon:'🔒',title:'Privacy & Security',sub:'Manage your data'},
          ].map((item,i,arr)=>(
            <div key={item.title} onClick={()=>item.link&&navigate(item.link)}
              style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px 0',borderBottom:i<arr.length-1?'1px solid var(--border)':'none',cursor:item.link?'pointer':'default'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'14px',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{item.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:'14px',fontWeight:'600',color:'var(--text)'}}>{item.title}</div>
                <div style={{fontSize:'11px',color:'var(--text3)',marginTop:'1px'}}>{item.sub}</div>
              </div>
              <div style={{color:'var(--text3)',fontSize:'16px'}}>→</div>
            </div>
          ))}
        </div>
        {user.role==='admin'&&(
          <Link to="/admin" className="card" style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px',marginBottom:'14px',textDecoration:'none',background:'#1c1c1e'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'14px',background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🛡️</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:'700',color:'white'}}>Admin Dashboard</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginTop:'1px'}}>Manage community</div>
            </div>
            <div style={{color:'rgba(255,255,255,0.3)',fontSize:'16px'}}>→</div>
          </Link>
        )}
        <button onClick={()=>{logout();navigate('/')}}
          style={{width:'100%',padding:'16px',background:'#fee2e2',color:'#dc2626',border:'none',borderRadius:'20px',fontFamily:'Outfit,sans-serif',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

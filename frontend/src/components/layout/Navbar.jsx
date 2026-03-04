import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()
  const initials = user?.name?.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) || '?'
  return (
    <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(15,23,42,0.92)',backdropFilter:'blur(12px)',borderBottom:'1px solid #1E293B',height:60}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px',height:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#4F46E5,#14B8A6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🤝</div>
          <span style={{fontSize:17,fontWeight:800,color:'white',letterSpacing:'-0.02em'}}>HelpBridge</span>
        </Link>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {user ? (
            <>
              <Link to="/browse" className="btn-ghost" style={{padding:'8px 14px',fontSize:13,color:loc.pathname==='/browse'?'white':'#94A3B8'}}>Browse</Link>
              <Link to="/post" className="btn-ghost" style={{padding:'8px 14px',fontSize:13}}>+ Post Need</Link>
              <Link to="/profile" style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#14B8A6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white',boxShadow:'0 0 0 2px #0F172A,0 0 0 4px #4F46E5'}}>{initials}</Link>
              <button className="btn-ghost" style={{padding:'8px 12px',fontSize:13}} onClick={()=>{logout();navigate('/')}}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{padding:'8px 16px',fontSize:13}}>Sign in</Link>
              <Link to="/register" className="btn-primary" style={{padding:'8px 16px',fontSize:13}}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
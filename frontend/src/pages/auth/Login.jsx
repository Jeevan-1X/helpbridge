import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({email:'',password:''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    const result = await login(form.email, form.password)
    if (result.success) navigate('/')
    else { setError(result.message||'Login failed'); setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'#080810',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',position:'relative',overflow:'hidden'}}>
      {/* Ambient glow */}
      <div style={{position:'absolute',top:-100,left:-100,width:400,height:400,borderRadius:'50%',background:'rgba(124,92,252,0.08)',filter:'blur(80px)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:-100,right:-100,width:300,height:300,borderRadius:'50%',background:'rgba(79,172,254,0.06)',filter:'blur(60px)',pointerEvents:'none'}}/>

      <div className="fade" style={{width:'100%',maxWidth:380,position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{
            width:64,height:64,borderRadius:20,margin:'0 auto 16px',
            background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:26,boxShadow:'0 8px 32px rgba(124,92,252,0.4)',
            animation:'float 3s ease-in-out infinite'
          }}>🤝</div>
          <h1 style={{fontSize:28,fontWeight:800,fontFamily:'Syne,sans-serif',letterSpacing:'-0.02em',marginBottom:6}}>HelpBridge</h1>
          <p style={{fontSize:13,color:'#7878a0'}}>Connecting communities through help</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:24,padding:28}}>
          {error && (
            <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:'11px 14px',marginBottom:16,fontSize:12,color:'#ef4444'}}>
              {error}
            </div>
          )}
          <form onSubmit={handle}>
            <div style={{marginBottom:14}}>
              <label className="input-label">Email</label>
              <input type="email" required className="input" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>
            <div style={{marginBottom:22}}>
              <label className="input-label">Password</label>
              <input type="password" required className="input" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',padding:14,fontSize:14}}>
              {loading?'Signing in…':'Sign In'}
            </button>
          </form>
          <p style={{textAlign:'center',fontSize:12,color:'#7878a0',marginTop:18}}>
            No account? <Link to="/register" style={{color:'#a78bfa',fontWeight:700}}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

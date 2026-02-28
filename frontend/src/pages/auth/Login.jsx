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
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',flexDirection:'column'}}>
      <div style={{background:'var(--primary)',padding:'60px 20px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'160px',height:'160px',background:'rgba(255,255,255,0.05)',borderRadius:'50%'}}/>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🤝</div>
        <div className="playfair" style={{fontSize:'28px',fontWeight:'900',color:'white'}}>Welcome Back</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',marginTop:'6px'}}>Sign in to your account</div>
      </div>
      <div style={{flex:1,padding:'24px 16px'}}>
        <div className="card" style={{padding:'24px'}}>
          {error&&<div style={{background:'#fee2e2',border:'1px solid #fca5a5',color:'#dc2626',borderRadius:'12px',padding:'12px 16px',marginBottom:'16px',fontSize:'13px'}}>{error}</div>}
          <form onSubmit={handle}>
            <label className="input-label">Email</label>
            <input type="email" required className="input" style={{marginBottom:'16px'}} placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <label className="input-label">Password</label>
            <input type="password" required className="input" style={{marginBottom:'24px'}} placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',padding:'16px',fontSize:'15px',opacity:loading?0.7:1}}>
              {loading?'Signing in...':'Sign In'}
            </button>
          </form>
          <p style={{textAlign:'center',fontSize:'13px',color:'var(--text2)',marginTop:'20px'}}>
            No account? <Link to="/register" style={{color:'var(--primary)',fontWeight:'700',textDecoration:'none'}}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

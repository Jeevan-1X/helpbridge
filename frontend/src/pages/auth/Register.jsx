import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({name:'',email:'',password:'',role:'user'})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    const result = await register(form.name, form.email, form.password, form.role)
    if (result.success) navigate('/')
    else { setError(result.message||'Registration failed'); setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',flexDirection:'column'}}>
      <div style={{background:'linear-gradient(135deg,var(--accent),var(--accent2))',padding:'60px 20px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'160px',height:'160px',background:'rgba(255,255,255,0.1)',borderRadius:'50%'}}/>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🌱</div>
        <div className="playfair" style={{fontSize:'28px',fontWeight:'900',color:'white'}}>Join HelpBridge</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.75)',marginTop:'6px'}}>Make a difference today</div>
      </div>
      <div style={{flex:1,padding:'24px 16px'}}>
        <div className="card" style={{padding:'24px'}}>
          {error&&<div style={{background:'#fee2e2',border:'1px solid #fca5a5',color:'#dc2626',borderRadius:'12px',padding:'12px 16px',marginBottom:'16px',fontSize:'13px'}}>{error}</div>}
          <form onSubmit={handle}>
            <label className="input-label">Full Name</label>
            <input type="text" required className="input" style={{marginBottom:'16px'}} placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <label className="input-label">Email</label>
            <input type="email" required className="input" style={{marginBottom:'16px'}} placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <label className="input-label">Password</label>
            <input type="password" required className="input" style={{marginBottom:'16px'}} placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            <label className="input-label">Join as</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'24px'}}>
              {[['user','🙋 Member'],['volunteer','💪 Volunteer']].map(([val,label])=>(
                <button type="button" key={val} onClick={()=>setForm({...form,role:val})}
                  style={{padding:'14px',borderRadius:'var(--r-sm)',border:'2px solid '+(form.role===val?'var(--primary)':'var(--border)'),background:form.role===val?'rgba(26,71,42,0.06)':'white',color:form.role===val?'var(--primary)':'var(--text2)',fontSize:'13px',fontWeight:'700',cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
                  {label}
                </button>
              ))}
            </div>
            <button type="submit" disabled={loading} className="btn-accent" style={{width:'100%',padding:'16px',fontSize:'15px',opacity:loading?0.7:1}}>
              {loading?'Creating...':'Create Account 🚀'}
            </button>
          </form>
          <p style={{textAlign:'center',fontSize:'13px',color:'var(--text2)',marginTop:'20px'}}>
            Have an account? <Link to="/login" style={{color:'var(--primary)',fontWeight:'700',textDecoration:'none'}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

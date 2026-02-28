import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'

const CATS = ['Groceries','Repairs','Tutoring','Transport','Moving','Tech Help','Other']

export default function PostNeed() {
  const [form, setForm] = useState({title:'',category:'',description:'',urgency:'low',location:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    setLoading(true); setError('')
    const result = await api.createNeed(form)
    if (result._id) { setDone(true); setTimeout(()=>navigate('/needs'),2000) }
    else { setError(result.message||'Failed to post'); setLoading(false) }
  }

  if (done) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding:'20px',textAlign:'center'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
      <div className="playfair" style={{fontSize:'28px',fontWeight:'900',marginBottom:'8px'}}>Need Posted!</div>
      <div style={{color:'var(--text2)'}}>Redirecting to browse...</div>
    </div>
  )

  return (
    <div className="page">
      <div style={{background:'linear-gradient(135deg,var(--accent),var(--accent2))',padding:'52px 20px 32px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-30px',right:'-30px',width:'120px',height:'120px',background:'rgba(255,255,255,0.1)',borderRadius:'50%'}}/>
        <button onClick={()=>navigate(-1)} style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',padding:'8px 16px',borderRadius:'20px',fontFamily:'Outfit,sans-serif',fontWeight:'600',cursor:'pointer',marginBottom:'16px',fontSize:'13px'}}>← Back</button>
        <div className="playfair" style={{fontSize:'28px',fontWeight:'900',color:'white'}}>Post a Need</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.75)',marginTop:'4px'}}>Tell your community what you need</div>
      </div>
      <form onSubmit={handle} style={{padding:'20px 16px'}}>
        {error&&<div style={{background:'#fee2e2',border:'1px solid #fca5a5',color:'#dc2626',borderRadius:'12px',padding:'12px 16px',marginBottom:'16px',fontSize:'13px'}}>{error}</div>}
        <label className="input-label">Title</label>
        <input required className="input" style={{marginBottom:'16px'}} placeholder="e.g. Need groceries delivered" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <label className="input-label">Category</label>
        <select required className="input" style={{marginBottom:'16px'}} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
          <option value="">Select a category</option>
          {CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <label className="input-label">Description</label>
        <textarea required className="input" style={{marginBottom:'16px',height:'100px',resize:'none'}} placeholder="Describe what you need..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <label className="input-label">Location (optional)</label>
        <input className="input" style={{marginBottom:'16px'}} placeholder="e.g. Sector 4, Block B" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <label className="input-label">Urgency Level</label>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'24px'}}>
          {[['low','🟢 Flexible'],['med','🟡 Moderate'],['high','🔴 Urgent']].map(([val,label])=>(
            <button type="button" key={val} onClick={()=>setForm({...form,urgency:val})}
              style={{padding:'12px 8px',borderRadius:'var(--r-sm)',border:'2px solid '+(form.urgency===val?'var(--primary)':'var(--border)'),background:form.urgency===val?'rgba(26,71,42,0.06)':'white',color:form.urgency===val?'var(--primary)':'var(--text2)',fontSize:'12px',fontWeight:'700',cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
              {label}
            </button>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-accent" style={{width:'100%',padding:'16px',fontSize:'16px',opacity:loading?0.7:1}}>
          {loading?'Posting...':'Post My Need 🚀'}
        </button>
      </form>
    </div>
  )
}

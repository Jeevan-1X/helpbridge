import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
export default function PostNeed() {
  const [form, setForm] = useState({title:'',description:'',category:'Moving',urgency:'low'})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.createNeed(form)
      if (res._id) setDone(true)
      else setError(res.message || 'Failed to post')
    } catch(e) { setError('Something went wrong') }
    setLoading(false)
  }
  if (done) return (
    <div style={{maxWidth:480,margin:'80px auto',padding:'0 20px',textAlign:'center'}}>
      <div className="card" style={{padding:48}}>
        <div style={{fontSize:48,marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:24,fontWeight:800,marginBottom:10}}>Need Posted!</h2>
        <p style={{color:'#64748B',fontSize:14,marginBottom:28}}>Your need is live!</p>
        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
          <button className="btn-primary" onClick={()=>navigate('/browse')}>Browse Needs</button>
          <button className="btn-ghost" onClick={()=>setDone(false)}>Post Another</button>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{maxWidth:580,margin:'0 auto',padding:'36px 20px'}}>
      <div className="fade" style={{marginBottom:28}}>
        <h1 style={{fontSize:28,fontWeight:800,letterSpacing:'-0.02em',marginBottom:6}}>Post a Need</h1>
        <p style={{color:'#64748B',fontSize:15}}>Describe what you need help with</p>
      </div>
      <div className="card fade d1" style={{padding:32}}>
        {error && <div style={{background:'rgba(244,63,94,0.1)',border:'1px solid rgba(244,63,94,0.3)',color:'#F87171',borderRadius:10,padding:'10px 14px',marginBottom:16,fontSize:13}}>{error}</div>}
        <form onSubmit={handle}>
          <div style={{marginBottom:18}}>
            <label className="input-label">Title *</label>
            <input className="input" placeholder="e.g. Need help moving furniture" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
          </div>
          <div style={{marginBottom:18}}>
            <label className="input-label">Description *</label>
            <textarea className="input" rows={5} placeholder="Describe what you need, when, where..." style={{resize:'vertical'}} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:24}}>
            <div>
              <label className="input-label">Category</label>
              <select className="input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {['Groceries','Repairs','Tutoring','Transport','Moving','Tech Help','Other'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Urgency</label>
              <select className="input" value={form.urgency} onChange={e=>setForm({...form,urgency:e.target.value})}>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',padding:'13px',fontSize:15}}>
            {loading ? 'Posting...' : '🚀 Post Need'}
          </button>
        </form>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { api } from '../api'

const cats = [
  {name:'Groceries',emoji:'🛒'},{name:'Repairs',emoji:'🔧'},{name:'Tutoring',emoji:'📚'},
  {name:'Transport',emoji:'🚗'},{name:'Moving',emoji:'📦'},{name:'Tech Help',emoji:'💻'},{name:'Other',emoji:'📋'}
]
const urgencies = [{v:'low',l:'Low',c:'#22c55e'},{v:'med',l:'Medium',c:'#f97316'},{v:'high',l:'High',c:'#ef4444'}]

export default function PostNeed({ onDone }) {
  const [form, setForm] = useState({title:'',description:'',category:'Moving',urgency:'low'})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    if (!form.title.trim()||!form.description.trim()) return
    setLoading(true)
    try {
      await api.createNeed(form)
      setDone(true)
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  if (done) return (
    <div style={{padding:'52px 20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'80vh',textAlign:'center'}}>
      <div className="fade" style={{fontSize:60,marginBottom:20,animation:'float 2s ease-in-out infinite'}}>🎉</div>
      <h2 className="fade d1" style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',marginBottom:10}}>Need Posted!</h2>
      <p className="fade d2" style={{color:'#7878a0',fontSize:14,marginBottom:32}}>Your community can now offer to help</p>
      <div className="fade d3" style={{display:'flex',gap:12}}>
        <button className="btn-primary" onClick={onDone}>Browse Needs</button>
        <button className="btn-ghost" onClick={()=>{setDone(false);setForm({title:'',description:'',category:'Moving',urgency:'low'})}}>Post Another</button>
      </div>
    </div>
  )

  return (
    <div style={{padding:'52px 20px 20px'}}>
      <h1 className="fade" style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',marginBottom:4}}>Post a Need</h1>
      <p className="fade d1" style={{fontSize:13,color:'#7878a0',marginBottom:28}}>Your community is here to help</p>

      <form onSubmit={handle}>
        <div className="fade d1" style={{marginBottom:20}}>
          <label className="input-label">What do you need?</label>
          <input className="input" placeholder="e.g. Need help moving boxes" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
        </div>

        <div className="fade d2" style={{marginBottom:20}}>
          <label className="input-label">Describe in detail</label>
          <textarea className="input" rows={4} placeholder="When, where, how much help…" style={{resize:'vertical'}} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/>
        </div>

        <div className="fade d2" style={{marginBottom:20}}>
          <label className="input-label">Category</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {cats.map(c=>(
              <button key={c.name} type="button" onClick={()=>setForm({...form,category:c.name})} style={{
                padding:'10px 6px',borderRadius:14,
                background:form.category===c.name?'linear-gradient(135deg,rgba(124,92,252,0.2),rgba(79,172,254,0.2))':'rgba(255,255,255,0.04)',
                border:form.category===c.name?'1.5px solid #7c5cfc':'1.5px solid rgba(255,255,255,0.06)',
                cursor:'pointer',transition:'all 0.15s',
                display:'flex',flexDirection:'column',alignItems:'center',gap:4
              }}>
                <span style={{fontSize:20}}>{c.emoji}</span>
                <span style={{fontSize:9,fontWeight:600,color:form.category===c.name?'#a78bfa':'#7878a0',textAlign:'center',lineHeight:1.2}}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="fade d3" style={{marginBottom:32}}>
          <label className="input-label">Urgency</label>
          <div style={{display:'flex',gap:8}}>
            {urgencies.map(u=>(
              <button key={u.v} type="button" onClick={()=>setForm({...form,urgency:u.v})} style={{
                flex:1,padding:'10px 0',borderRadius:12,
                background:form.urgency===u.v?`rgba(${u.v==='low'?'34,197,94':u.v==='med'?'249,115,22':'239,68,68'},0.12)`:'rgba(255,255,255,0.04)',
                border:form.urgency===u.v?`1.5px solid ${u.c}`:'1.5px solid rgba(255,255,255,0.06)',
                color:form.urgency===u.v?u.c:'#7878a0',
                fontSize:12,fontWeight:700,cursor:'pointer',transition:'all 0.15s'
              }}>{u.l}</button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary fade d4" style={{width:'100%',padding:15,fontSize:15}}>
          {loading?'Posting…':'🚀 Post Need'}
        </button>
      </form>
    </div>
  )
}

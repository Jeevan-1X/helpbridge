import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
const catIcon = c => ({Moving:'📦',Education:'📚',Transport:'🚗',Home:'🏡',Pets:'🐾',Tech:'💻',Food:'🍱',Health:'❤️'}[c]||'📋')
export default function BrowseNeeds() {
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  useEffect(() => {
    fetch("https://helpbridge-b571.onrender.com/api/needs").then(r=>r.json()).then(d => { console.log("needs:",d); setNeeds(Array.isArray(d)?d:[]); setLoading(false) }).catch(e=>{ console.error(e); setLoading(false) })
  }, [])
  const filtered = needs.filter(n =>
    (n.title?.toLowerCase().includes(q.toLowerCase()) || n.description?.toLowerCase().includes(q.toLowerCase())) &&
    (cat === 'All' || n.category === cat)
  )
  return (
    <div style={{maxWidth:1000,margin:'0 auto',padding:'36px 20px'}}>
      <div className="fade" style={{marginBottom:28}}>
        <h1 style={{fontSize:28,fontWeight:800,letterSpacing:'-0.02em',marginBottom:6}}>Browse Needs</h1>
        <p style={{color:'#64748B',fontSize:15}}>Find ways to help your community</p>
      </div>
      <div className="fade d1" style={{display:'flex',gap:12,marginBottom:24,flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:200,position:'relative'}}>
          <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontSize:16}}>🔍</span>
          <input className="input" style={{paddingLeft:38}} placeholder="Search needs..." value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
        <select className="input" style={{width:160}} value={cat} onChange={e=>setCat(e.target.value)}>
          {['All','Moving','Education','Transport','Home','Pets','Tech','Food','Health'].map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      {loading ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:32,animation:'pulse 1.5s infinite',marginBottom:12}}>🤝</div>
          <p>Loading needs...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 0',color:'#475569'}}>
          <div style={{fontSize:32,marginBottom:12}}>📭</div>
          <p>No needs found</p>
          <Link to="/post" className="btn-primary" style={{marginTop:16,display:'inline-flex'}}>Post the first need</Link>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:16}}>
          {filtered.map((n,i)=>(
            <div key={n._id} className="card fade" style={{padding:22,animationDelay:`${i*0.05}s`}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                <span className={`badge badge-${n.status==='fulfilled'?'fulfilled':n.urgency==='high'?'urgent':n.urgency==='med'?'accepted':'open'}`}>
                  <span style={{width:5,height:5,borderRadius:'50%',background:'currentColor',display:'inline-block'}}/>
                  {n.status==='fulfilled'?'Fulfilled':n.urgency==='high'?'Urgent':n.urgency==='med'?'Medium':'Low'}
                </span>
                <span style={{fontSize:12,color:'#475569'}}>{catIcon(n.category)} {n.category}</span>
              </div>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:8,lineHeight:1.3}}>{n.title}</h3>
              <p style={{fontSize:13,color:'#64748B',lineHeight:1.6,marginBottom:16}}>{n.description?.slice(0,90)}...</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid #1E293B'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#14B8A6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'white'}}>
                    {n.postedBy?.name?.slice(0,2).toUpperCase()||'??'}
                  </div>
                  <span style={{fontSize:12,color:'#64748B'}}>{n.postedBy?.name||'Anonymous'}</span>
                </div>
                <Link to={`/needs/${n._id}`} className="btn-primary" style={{padding:'6px 14px',fontSize:12}}>View →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
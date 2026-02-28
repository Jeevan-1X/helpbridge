import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'

const CATS = ['All','Groceries','Repairs','Tutoring','Transport','Moving','Tech Help']
const catIcon = {Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📌'}
const urgencyClass = {high:'badge-high',med:'badge-med',low:'badge-low'}
const urgencyLabel = {high:'Urgent',med:'Moderate',low:'Flexible'}
const initials = (name) => name?.split(' ').map(n=>n[0]).join('').toUpperCase() || '?'

export default function BrowseNeeds() {
  const [needs, setNeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getNeeds({}).then(data => { setNeeds(Array.isArray(data)?data:[]); setLoading(false) })
  }, [])

  const filtered = needs.filter(n =>
    (cat==='All'||n.category===cat) &&
    ((n.title||'').toLowerCase().includes(search.toLowerCase())||(n.description||'').toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page">
      <div style={{background:'var(--bg2)',padding:'52px 16px 0',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:50}}>
        <div className="playfair" style={{fontSize:'26px',fontWeight:'900',marginBottom:'14px'}}>Community Needs</div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',background:'var(--bg)',borderRadius:'16px',padding:'12px 16px',marginBottom:'12px',border:'1px solid var(--border)'}}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search needs..."
            style={{background:'none',border:'none',outline:'none',fontFamily:'Outfit,sans-serif',fontSize:'14px',color:'var(--text)',flex:1}}/>
        </div>
        <div style={{display:'flex',gap:'8px',overflowX:'auto',paddingBottom:'14px',scrollbarWidth:'none'}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              style={{padding:'7px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap',cursor:'pointer',border:'none',
                background:cat===c?'var(--primary)':'var(--bg)',color:cat===c?'white':'var(--text2)'}}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:'16px'}}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'var(--text3)'}}><div style={{fontSize:'40px',marginBottom:'12px'}}>⏳</div><div style={{fontWeight:'600'}}>Loading needs...</div></div>
        ) : filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'60px 0',color:'var(--text3)'}}><div style={{fontSize:'40px',marginBottom:'12px'}}>🔍</div><div style={{fontWeight:'600'}}>No needs found</div></div>
        ) : filtered.map(need=>(
          <div key={need._id} className="card" style={{padding:'16px',marginBottom:'12px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'11px',fontWeight:'700',color:'var(--primary)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{catIcon[need.category]||'📌'} {need.category}</span>
              <span className={'badge '+(urgencyClass[need.urgency]||'badge-low')}>{urgencyLabel[need.urgency]||need.urgency}</span>
            </div>
            <div className="playfair" style={{fontSize:'16px',fontWeight:'700',marginBottom:'6px',lineHeight:1.3}}>{need.title}</div>
            <div style={{fontSize:'12px',color:'var(--text2)',lineHeight:1.6,marginBottom:'14px'}}>{(need.description||'').slice(0,90)}...</div>
            {need.location&&<div style={{fontSize:'11px',color:'var(--text3)',marginBottom:'10px'}}>📍 {need.location}</div>}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div className="avatar" style={{width:'28px',height:'28px',fontSize:'10px'}}>{initials(need.postedBy?.name)}</div>
                <span style={{fontSize:'12px',fontWeight:'600',color:'var(--text2)'}}>{need.postedBy?.name||'Anonymous'}</span>
              </div>
              <Link to={'/needs/'+need._id} style={{background:need.status==='Open'?'var(--primary)':'var(--bg)',color:need.status==='Open'?'white':'var(--text3)',fontSize:'11px',fontWeight:'700',padding:'8px 16px',borderRadius:'20px',textDecoration:'none'}}>
                {need.status==='Open'?'Help Now':need.status}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

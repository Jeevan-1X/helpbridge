import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

const BACKEND = 'https://helpbridge-b571.onrender.com/api'
const catEmoji = c => ({Groceries:'🛒',Repairs:'🔧',Tutoring:'📚',Transport:'🚗',Moving:'📦','Tech Help':'💻',Other:'📋'}[c]||'📋')

function getHeaders() {
  const token = localStorage.getItem('token')
  return { 'Content-Type': 'application/json', ...(token && { Authorization: 'Bearer ' + token }) }
}

export default function Chat({ need, onBack }) {
  const { user } = useAuth()
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const pollRef = useRef(null)
  const lastCountRef = useRef(0)

  const loadMsgs = async () => {
    try {
      const res = await fetch(`${BACKEND}/chat/${need._id}`, { headers: getHeaders() })
      const data = await res.json()
      if (Array.isArray(data) && data.length !== lastCountRef.current) {
        lastCountRef.current = data.length
        setMsgs(data)
      }
    } catch(e) { console.error(e) }
  }

  useEffect(() => {
    loadMsgs()
    pollRef.current = setInterval(loadMsgs, 2000)
    return () => clearInterval(pollRef.current)
  }, [need._id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = async () => {
    if (!text.trim() || sending) return
    setSending(true)
    const t = text.trim()
    setText('')
    try {
      await fetch(`${BACKEND}/chat/${need._id}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text: t })
      })
      await loadMsgs()
    } catch(e) { console.error(e) }
    setSending(false)
  }

  const isPoster = need.postedBy?._id === user?._id || need.postedBy === user?._id
  const otherName = isPoster ? (need.acceptedBy?.name||'Helper') : (need.postedBy?.name||'Poster')

  return (
    <div style={{maxWidth:430,margin:'0 auto',minHeight:'100vh',background:'#080810',display:'flex',flexDirection:'column'}}>
      {/* Header */}
      <div style={{
        padding:'52px 16px 16px',
        background:'rgba(124,92,252,0.06)',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        position:'sticky',top:0,zIndex:10,
        backdropFilter:'blur(10px)'
      }}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{
            width:36,height:36,borderRadius:12,background:'rgba(255,255,255,0.06)',
            border:'1px solid rgba(255,255,255,0.08)',color:'#f0f0ff',fontSize:16,
            cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0
          }}>←</button>
          <div style={{
            width:38,height:38,borderRadius:12,background:'rgba(255,255,255,0.05)',
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:18
          }}>{catEmoji(need.category)}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{need.title}</div>
            <div style={{fontSize:11,color:'#22c55e',display:'flex',alignItems:'center',gap:5}}>
              <div style={{width:5,height:5,borderRadius:'50%',background:'#22c55e',animation:'pulse 2s infinite'}}/>
              Chatting with {otherName}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:10}}>
        <div style={{textAlign:'center',marginBottom:4}}>
          <div style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'10px 14px',display:'inline-block'}}>
            <p style={{fontSize:11,color:'#7878a0',lineHeight:1.6}}>🔒 Private chat · Share address & timing here</p>
          </div>
        </div>

        {msgs.length === 0 && (
          <div style={{textAlign:'center',padding:'20px 0',color:'#4a4a6a',fontSize:12}}>
            Say hi to start coordinating 👋
          </div>
        )}

        {msgs.map((m, i) => {
          const isMe = m.sender?._id === user?._id || m.sender === user?._id
          return (
            <div key={i} style={{display:'flex',justifyContent:isMe?'flex-end':'flex-start'}}>
              <div style={{
                maxWidth:'75%',
                background:isMe?'linear-gradient(135deg,#7c5cfc,#6144e8)':'rgba(255,255,255,0.07)',
                borderRadius:isMe?'18px 18px 4px 18px':'18px 18px 18px 4px',
                padding:'10px 14px',
                boxShadow:isMe?'0 4px 16px rgba(124,92,252,0.25)':'none'
              }}>
                {!isMe && <div style={{fontSize:10,color:'#a78bfa',fontWeight:700,marginBottom:4}}>{m.sender?.name||otherName}</div>}
                <p style={{fontSize:13,lineHeight:1.5,color:'#f0f0ff'}}>{m.text}</p>
                <div style={{fontSize:10,color:isMe?'rgba(240,240,255,0.45)':'#4a4a6a',marginTop:3,textAlign:'right'}}>
                  {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : ''}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{padding:'12px 16px 28px',borderTop:'1px solid rgba(255,255,255,0.06)',background:'rgba(8,8,16,0.95)'}}>
        <div style={{display:'flex',gap:10,alignItems:'flex-end'}}>
          <input
            className="input"
            placeholder="Type a message…"
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }}
            style={{flex:1,borderRadius:14}}
          />
          <button onClick={send} disabled={!text.trim()||sending} style={{
            width:44,height:44,borderRadius:14,flexShrink:0,
            background:text.trim()?'linear-gradient(135deg,#7c5cfc,#4facfe)':'rgba(255,255,255,0.06)',
            border:'none',color:text.trim()?'white':'#4a4a6a',
            fontSize:18,cursor:text.trim()?'pointer':'not-allowed',
            transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center'
          }}>↑</button>
        </div>
      </div>
    </div>
  )
}

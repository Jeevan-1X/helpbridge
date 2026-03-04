import { useState } from 'react'
import Home from './Home'
import Browse from './Browse'
import PostNeed from './PostNeed'
import Profile from './Profile'
import InProgress from './InProgress'
import Chat from './Chat'

export default function MainApp() {
  const [tab, setTab] = useState('home')
  const [chatNeed, setChatNeed] = useState(null)

  if (chatNeed) return <Chat need={chatNeed} onBack={() => setChatNeed(null)} />

  return (
    <div style={{maxWidth:430,margin:'0 auto',minHeight:'100vh',background:'#080810',display:'flex',flexDirection:'column',position:'relative'}}>
      <div style={{flex:1,overflowY:'auto',paddingBottom:80}}>
        {tab === 'home' && <Home onOpenChat={n=>{setChatNeed(n);}} />}
        {tab === 'browse' && <Browse onOpenChat={n=>{setChatNeed(n);}} />}
        {tab === 'post' && <PostNeed onDone={()=>setTab('browse')} />}
        {tab === 'progress' && <InProgress onOpenChat={n=>{setChatNeed(n);}} />}
        {tab === 'profile' && <Profile />}
      </div>

      {/* Bottom Nav */}
      <nav style={{
        position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',
        width:'100%',maxWidth:430,
        background:'rgba(8,8,16,0.92)',
        backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'flex',alignItems:'center',
        padding:'8px 0 20px',zIndex:100
      }}>
        {[
          {id:'home',icon:'⊞',label:'Home'},
          {id:'browse',icon:'◎',label:'Explore'},
          {id:'post',icon:null,label:''},
          {id:'progress',icon:'↗',label:'Active'},
          {id:'profile',icon:'◉',label:'Profile'},
        ].map(item => item.id === 'post' ? (
          <div key="post" style={{flex:1,display:'flex',justifyContent:'center'}}>
            <button onClick={()=>setTab('post')} style={{
              width:52,height:52,borderRadius:16,
              background:'linear-gradient(135deg,#7c5cfc,#4facfe)',
              border:'none',cursor:'pointer',fontSize:22,
              display:'flex',alignItems:'center',justifyContent:'center',
              boxShadow:'0 4px 20px rgba(124,92,252,0.5)',
              transform:tab==='post'?'scale(0.95)':'scale(1)',
              transition:'all 0.2s',marginTop:-10
            }}>＋</button>
          </div>
        ) : (
          <button key={item.id} onClick={()=>setTab(item.id)} style={{
            flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,
            background:'none',border:'none',cursor:'pointer',padding:'4px 0',
            color:tab===item.id?'#7c5cfc':'#4a4a6a',
            transition:'color 0.15s',
          }}>
            <span style={{fontSize:18,lineHeight:1}}>{item.icon}</span>
            <span style={{fontSize:10,fontWeight:600,letterSpacing:'0.04em'}}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

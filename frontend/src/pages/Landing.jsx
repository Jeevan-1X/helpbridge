import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Landing() {
  const { user } = useAuth()
  return (
    <div>
      <section style={{padding:'80px 20px 90px',textAlign:'center',background:'radial-gradient(ellipse at top,#1E1B4B 0%,#0F172A 60%)'}}>
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <div className="fade" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#1E293B',border:'1px solid #334155',borderRadius:999,padding:'6px 16px',marginBottom:28,fontSize:13,color:'#94A3B8',fontWeight:500}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#14B8A6',display:'inline-block'}}/>
            Community-powered mutual aid
          </div>
          <h1 className="fade d1" style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:800,lineHeight:1.1,letterSpacing:'-0.03em',marginBottom:20}}>
            Help your neighbors,{' '}
            <span style={{background:'linear-gradient(135deg,#4F46E5,#14B8A6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              build your community
            </span>
          </h1>
          <p className="fade d2" style={{fontSize:17,color:'#94A3B8',lineHeight:1.7,maxWidth:480,margin:'0 auto 36px'}}>
            Post what you need, offer what you can. HelpBridge connects people who need help with those who can give it.
          </p>
          <div className="fade d3" style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            {user ? (
              <>
                <Link to="/browse" className="btn-primary" style={{padding:'13px 28px',fontSize:15}}>Browse Needs →</Link>
                <Link to="/post" className="btn-ghost" style={{padding:'13px 28px',fontSize:15}}>Post a Need</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn-primary" style={{padding:'13px 28px',fontSize:15}}>Get Started Free →</Link>
                <Link to="/login" className="btn-ghost" style={{padding:'13px 28px',fontSize:15}}>Sign In</Link>
              </>
            )}
          </div>
          <div className="fade d4" style={{display:'flex',justifyContent:'center',gap:40,marginTop:52,paddingTop:44,borderTop:'1px solid #1E293B'}}>
            {[['2,400+','Needs Posted'],['1,800+','People Helped'],['98%','Satisfaction']].map(([v,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontSize:26,fontWeight:800,color:'white',letterSpacing:'-0.02em'}}>{v}</div>
                <div style={{fontSize:13,color:'#64748B',marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:'72px 20px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'#14B8A6',marginBottom:10}}>How It Works</p>
          <h2 style={{fontSize:32,fontWeight:800,letterSpacing:'-0.02em'}}>Simple. Human. Powerful.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
          {[
            {icon:'📋',color:'#4F46E5',bg:'rgba(79,70,229,0.1)',title:'Post a Need',desc:'Share what you need help with. Add details, category, and urgency level.'},
            {icon:'🔍',color:'#14B8A6',bg:'rgba(20,184,166,0.1)',title:'Browse & Help',desc:'Find community needs near you. Filter by category and offer your help.'},
            {icon:'🤝',color:'#F59E0B',bg:'rgba(245,158,11,0.1)',title:'Connect & Fulfill',desc:'Connect with people, fulfill needs, and build a stronger community together.'},
          ].map(({icon,color,bg,title,desc})=>(
            <div key={title} className="card" style={{padding:28}}>
              <div style={{width:48,height:48,borderRadius:13,background:bg,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,fontSize:22}}>{icon}</div>
              <h3 style={{fontSize:17,fontWeight:700,marginBottom:8}}>{title}</h3>
              <p style={{fontSize:14,color:'#64748B',lineHeight:1.65}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:'0 20px 72px'}}>
        <div style={{maxWidth:1000,margin:'0 auto',background:'linear-gradient(135deg,#4F46E5,#6366F1 50%,#14B8A6)',borderRadius:20,padding:'52px 40px',textAlign:'center'}}>
          <h2 style={{fontSize:30,fontWeight:800,color:'white',letterSpacing:'-0.02em',marginBottom:12}}>Ready to make a difference?</h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.75)',marginBottom:28}}>Join thousands already helping each other every day.</p>
          <Link to="/register" style={{background:'white',color:'#4F46E5',padding:'13px 32px',borderRadius:10,fontWeight:700,fontSize:15,display:'inline-flex',alignItems:'center',gap:8,boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>
            Join HelpBridge →
          </Link>
        </div>
      </section>
    </div>
  )
}
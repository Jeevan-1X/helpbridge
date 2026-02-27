import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="bg-[#faf8f3]">

      {/* HERO */}
      <section className="min-h-screen bg-[#0f1f14] flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(45,106,79,0.35) 0%, transparent 60%)'}}></div>
        <div className="absolute inset-0" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',backgroundSize:'60px 60px'}}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f4a261]/15 border border-[#f4a261]/30 rounded-full px-4 py-1.5 text-[#f4a261] text-xs font-semibold uppercase tracking-widest mb-7">
                <span>●</span> Community Help Network
              </div>
              <h1 className="text-white font-black leading-none tracking-tight mb-7" style={{fontFamily:'Georgia,serif',fontSize:'clamp(3.2rem,7vw,6rem)'}}>
                Neighbors<br/><em className="text-[#f4a261]">helping</em><br/>neighbors.
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
                Post a need, find a volunteer, or offer your help — HelpBridge connects communities through simple, meaningful acts of kindness.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/needs/post" className="px-8 py-4 bg-[#f4a261] text-white font-semibold rounded-full hover:bg-[#e76f51] transition-all hover:-translate-y-1 hover:shadow-lg">Post a Need</Link>
                <Link to="/register" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 backdrop-blur-sm">Become a Volunteer →</Link>
              </div>
              <div className="flex gap-10 mt-12 pt-12 border-t border-white/10">
                {[['2.4k','Needs Fulfilled'],['840+','Active Volunteers'],['12','Communities']].map(([num,label]) => (
                  <div key={label}>
                    <div className="text-white font-black text-3xl" style={{fontFamily:'Georgia,serif'}}>{num}</div>
                    <div className="text-white/40 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              {[
                {tag:'New Need',title:'Need groceries delivered — elderly resident',badge:'Urgent',badgeColor:'bg-[#f4a261]/20 text-[#f4a261]',delay:'0s'},
                {tag:'✓ Accepted',title:'Help moving furniture to 3rd floor',badge:'Volunteer found',badgeColor:'bg-green-500/20 text-green-400',delay:'2s'},
                {tag:'📢 Community',title:'Free tutoring for kids — Math & Science',badge:'Ongoing',badgeColor:'bg-blue-500/20 text-blue-400',delay:'4s'},
              ].map((card) => (
                <div key={card.title} className="bg-white/7 border border-white/12 backdrop-blur-md rounded-2xl p-5 text-white" style={{animation:`float 6s ease-in-out ${card.delay} infinite`}}>
                  <div className="text-[#f4a261] text-xs font-semibold uppercase tracking-widest mb-2">{card.tag}</div>
                  <div className="font-semibold mb-3">{card.title}</div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.badgeColor}`}>{card.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#1a472a]/10 text-[#1a472a] rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">Simple Process</div>
            <h2 className="font-black text-5xl mb-4" style={{fontFamily:'Georgia,serif'}}>How HelpBridge works</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">Three simple steps to connect those who need help with those who can give it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {num:'1',icon:'📝',title:'Post Your Need',desc:'Describe what you need — groceries, transport, repairs, or just a helping hand. It takes less than 60 seconds.',color:'bg-[#1a472a]'},
              {num:'2',icon:'🔍',title:'Volunteers Browse',desc:'Local volunteers see your need and can accept it directly. You get notified instantly when someone steps up.',color:'bg-[#2d6a4f]'},
              {num:'3',icon:'🎉',title:'Help Happens',desc:'Connect, coordinate, and get things done. Rate your experience and build a stronger community together.',color:'bg-[#f4a261]'},
            ].map((step) => (
              <div key={step.num} className="bg-white border border-[#e8e2d9] rounded-3xl p-10 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-6`} style={{fontFamily:'Georgia,serif'}}>{step.num}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-xl mb-3" style={{fontFamily:'Georgia,serif'}}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-32 bg-[#0f1f14] relative overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(45,106,79,0.3) 0%, transparent 60%)'}}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-white/10 text-[#f4a261] rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-widest mb-4">Who It's For</div>
            <h2 className="font-black text-5xl text-white mb-4" style={{fontFamily:'Georgia,serif'}}>Built for your role</h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">Whether you need help, want to give it, or manage it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {icon:'🙋',title:'Community Member',desc:'Post needs, get help, and stay connected with your neighborhood.',features:['Post needs in seconds','Track request status','Rate volunteers','Browse community board']},
              {icon:'💪',title:'Volunteer',desc:'Browse open needs, accept tasks, and make a real difference.',features:['Filter by category & location','Accept tasks with one tap','Build your profile','Track impact history']},
              {icon:'🛡️',title:'Admin',desc:'Oversee activity, manage users, and keep the community safe.',features:['Full activity dashboard','User management','Moderate content','Analytics & reports']},
            ].map((role) => (
              <div key={role.title} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-5">{role.icon}</div>
                <h3 className="font-bold text-xl text-white mb-3" style={{fontFamily:'Georgia,serif'}}>{role.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{role.desc}</p>
                <ul className="space-y-2">
                  {role.features.map(f => (
                    <li key={f} className="text-white/70 text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-[#f4a261] font-bold">→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#1a472a] rounded-3xl p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(244,162,97,0.2) 0%, transparent 60%)'}}></div>
            <div className="relative z-10">
              <h2 className="font-black text-5xl text-white mb-4" style={{fontFamily:'Georgia,serif'}}>Ready to <em className="text-[#f4a261]">make a difference</em>?</h2>
              <p className="text-white/60 text-lg mb-10">Join thousands of community members already helping each other.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/needs/post" className="px-8 py-4 bg-[#f4a261] text-white font-semibold rounded-full hover:bg-[#e76f51] transition-all hover:-translate-y-1">Post a Need</Link>
                <Link to="/register" className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1">Volunteer Today</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0f1f14] text-white/50 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a472a] rounded-lg flex items-center justify-center text-sm">🤝</div>
          <span className="font-bold text-white/80" style={{fontFamily:'Georgia,serif'}}>HelpBridge</span>
        </div>
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
          <Link to="/needs" className="hover:text-white/80 transition-colors">Browse</Link>
          <Link to="/needs/post" className="hover:text-white/80 transition-colors">Post Need</Link>
        </div>
        <p className="text-xs w-full text-center border-t border-white/10 pt-4 mt-2">© 2026 HelpBridge. Built for communities.</p>
      </div>
    </footer>
  )
}

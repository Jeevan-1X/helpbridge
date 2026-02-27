import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf8f3]/90 backdrop-blur-md border-b border-[#e8e2d9] py-3' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#1a472a] rounded-xl flex items-center justify-center text-white text-lg">🤝</div>
            <span className="font-bold text-xl text-[#1a472a]" style={{fontFamily:'Georgia,serif'}}>HelpBridge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/needs" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Browse Needs</Link>
            <Link to="/needs/post" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Post a Need</Link>
            {user?.role === 'admin' && <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Admin</Link>}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500">Hi, {user.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold border-2 border-[#1a472a] text-[#1a472a] rounded-full hover:bg-[#1a472a] hover:text-white transition-all">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold border-2 border-[#1a472a] text-[#1a472a] rounded-full hover:bg-[#1a472a] hover:text-white transition-all">Sign In</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-[#f4a261] text-white rounded-full hover:bg-[#e76f51] transition-all">Get Started</Link>
              </>
            )}
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f3] flex flex-col p-6 pt-24">
          <button className="absolute top-5 right-6 text-2xl" onClick={() => setMenuOpen(false)}>✕</button>
          <div className="flex flex-col gap-6">
            <Link to="/needs" className="text-2xl font-bold" style={{fontFamily:'Georgia,serif'}} onClick={() => setMenuOpen(false)}>Browse Needs</Link>
            <Link to="/needs/post" className="text-2xl font-bold" style={{fontFamily:'Georgia,serif'}} onClick={() => setMenuOpen(false)}>Post a Need</Link>
            <Link to="/login" className="text-2xl font-bold" style={{fontFamily:'Georgia,serif'}} onClick={() => setMenuOpen(false)}>Sign In</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="px-6 py-3 bg-[#f4a261] text-white font-semibold rounded-full text-center">Get Started</Link>
          </div>
        </div>
      )}
    </>
  )
}

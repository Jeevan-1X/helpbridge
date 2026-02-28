import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Layout({ children }) {
  const location = useLocation()
  const { user } = useAuth()
  const path = location.pathname
  return (
    <div style={{maxWidth:'430px',margin:'0 auto',minHeight:'100vh',background:'var(--bg)'}}>
      {children}
      <nav className="bottom-nav">
        <Link to="/" className={'nav-item' + (path==='/' ? ' active' : '')}>
          <span className="nav-icon">🏠</span><span className="nav-label">Home</span>
        </Link>
        <Link to="/needs" className={'nav-item' + (path==='/needs' ? ' active' : '')}>
          <span className="nav-icon">🔍</span><span className="nav-label">Browse</span>
        </Link>
        <Link to="/needs/post" className="nav-post">＋</Link>
        <Link to="/profile" className={'nav-item' + (path==='/profile' ? ' active' : '')}>
          <span className="nav-icon">👤</span><span className="nav-label">Profile</span>
        </Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className={'nav-item' + (path==='/admin' ? ' active' : '')}>
            <span className="nav-icon">🛡️</span><span className="nav-label">Admin</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

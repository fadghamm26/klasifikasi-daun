import { Link } from 'react-router-dom'

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="navbar">
      <button className="navbar-toggle" onClick={onToggleSidebar} title={sidebarOpen ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {sidebarOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </>
          )}
        </svg>
      </button>
      <span className="navbar-brand">AgroScan AI</span>
      <nav className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/home">Diagnostic</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

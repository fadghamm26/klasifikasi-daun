import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <span className="navbar-brand">AgroScan AI</span>
      <nav className="navbar-links">
        <Link to="/home">Diagnostic</Link>
        <Link to="/home">History</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

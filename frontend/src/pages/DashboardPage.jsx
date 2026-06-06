import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DashboardSection from './DashboardSection'

export default function DashboardPage() {
  const navigate = useNavigate()

  const handleStartDiagnosis = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main page-enter">
        <Navbar />
        <DashboardSection onStartDiagnosis={handleStartDiagnosis} />
        <footer className="footer">
          <p>&copy; 2026 AgroScan Technologies &bull; AI-Powered Botanical Security</p>
        </footer>
      </div>
    </div>
  )
}

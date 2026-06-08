import { useNavigate } from 'react-router-dom'
import DashboardSection from './DashboardSection'

export default function DashboardPage() {
  const navigate = useNavigate()

  const handleStartDiagnosis = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <>
      <div className="page-enter">
        <DashboardSection onStartDiagnosis={handleStartDiagnosis} />
      </div>
      <footer className="footer">
        <p>&copy; 2026 AgroScan Technologies &bull; AI-Powered Botanical Security</p>
      </footer>
    </>
  )
}

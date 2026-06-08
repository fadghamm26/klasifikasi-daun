import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import LoadingScreen from './pages/LoadingScreen'
import DashboardPage from './pages/DashboardPage'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/*" element={
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      } />
    </Routes>
  )
}

export default App

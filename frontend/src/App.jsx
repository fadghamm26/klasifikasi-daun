import { Routes, Route, Navigate } from 'react-router-dom'
import LoadingScreen from './pages/LoadingScreen'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

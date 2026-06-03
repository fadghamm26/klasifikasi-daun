import { useState, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import UploadDropzone from '../components/UploadDropzone'
import CameraSection from '../components/CameraSection'
import ResultsPanel from '../components/ResultsPanel'
import ErrorBoundary from '../components/ErrorBoundary'
import { predictImage } from '../api/predict'

export default function Home() {
  const [predictionData, setPredictionData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cameraStatus, setCameraStatus] = useState('')

  const handleFileSelected = useCallback(async (file) => {
    if (!file) return
    setError(null)
    setPredictionData(null)
    setLoading(true)
    setCameraStatus('Mengklasifikasi...')

    try {
      const data = await predictImage(file)
      setPredictionData(data)
      setCameraStatus('Selesai')
    } catch (err) {
      setError(err.message || 'Gagal mengklasifikasi gambar')
      setCameraStatus('')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleReset = useCallback(() => {
    setPredictionData(null)
    setError(null)
    setCameraStatus('')
  }, [])

  return (
    <ErrorBoundary>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Navbar />

          <div className="content">
            <div className="content-left">
              <h1 className="page-title">Leaf Diagnostic Center</h1>
              <p className="page-subtitle">
                Deteksi penyakit pada daun tanaman secara real-time dengan akurasi berbasis AI
              </p>

              <UploadDropzone
                onFileSelected={handleFileSelected}
                onReset={handleReset}
              />

              <CameraSection onCapture={handleFileSelected} />

              {loading && (
                <div style={{ textAlign: 'center', padding: '16px', color: '#6C7A71' }}>
                  Mengklasifikasi... <span className="spinner"></span>
                </div>
              )}

              {cameraStatus && !loading && (
                <div style={{ textAlign: 'center', padding: '8px', fontSize: '12px', color: '#6C7A71' }}>
                  {cameraStatus}
                </div>
              )}
            </div>

            <div className="content-right">
              <ResultsPanel
                data={predictionData}
                error={error}
                loading={loading}
              />
            </div>
          </div>

          <footer className="footer">
            <p>&copy; 2026 AgroScan Technologies &bull; AI-Powered Botanical Security</p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  )
}

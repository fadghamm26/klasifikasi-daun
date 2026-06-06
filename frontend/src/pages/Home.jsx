import { useState, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import UploadDropzone from '../components/UploadDropzone'
import CameraSection from '../components/CameraSection'
import ResultsPanel from '../components/ResultsPanel'
import ErrorBoundary from '../components/ErrorBoundary'
import { predictImage } from '../api/predict'
import { validatePlantImage } from '../api/plantValidator'

export default function Home() {
  const [predictionData, setPredictionData] = useState(null)
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [cameraStatus, setCameraStatus] = useState('')

  const handleFileSelected = useCallback(async (file) => {
    if (!file) return
    setError(null)
    setWarning(null)
    setPredictionData(null)
    setLoading(true)
    setLoadingMsg('Memvalidasi gambar...')
    setCameraStatus('Memvalidasi...')

    try {
      // Langkah 1: Validasi apakah gambar tanaman/daun
      const validation = await validatePlantImage(file)

      if (!validation.isPlant) {
        setWarning(validation.message || 'Gambar yang diunggah bukan daun atau tanaman. Silakan unggah foto daun yang jelas untuk hasil diagnostik yang akurat.')
        setCameraStatus('')
        return
      }

      // Langkah 2: Klasifikasi penyakit
      setLoadingMsg('Mengklasifikasi penyakit...')
      setCameraStatus('Mengklasifikasi...')

      const data = await predictImage(file)
      setPredictionData(data)
      setCameraStatus('Selesai')
    } catch (err) {
      setError(err.message || 'Gagal mengklasifikasi gambar')
      setCameraStatus('')
    } finally {
      setLoading(false)
      setLoadingMsg('')
    }
  }, [])

  const handleReset = useCallback(() => {
    setPredictionData(null)
    setError(null)
    setWarning(null)
    setCameraStatus('')
  }, [])

  return (
    <ErrorBoundary>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Navbar />

          <div className="page-enter">
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
                <div className="status-message">
                  {loadingMsg || 'Memproses...'} <span className="spinner"></span>
                </div>
              )}

              {warning && !loading && (
                <div className="warning-modal-overlay" onClick={() => setWarning(null)}>
                  <div className="warning-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="warning-modal-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h3 className="warning-modal-title">Gambar Bukan Daun</h3>
                    <p className="warning-modal-desc">{warning}</p>
                    <button className="warning-modal-btn" onClick={() => setWarning(null)}>
                      Mengerti
                    </button>
                  </div>
                </div>
              )}

              {cameraStatus && !loading && !warning && (
                <div className="status-message status-message--subtle">
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
          </div>

          <footer className="footer">
            <p>&copy; 2026 AgroScan Technologies &bull; AI-Powered Botanical Security</p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  )
}

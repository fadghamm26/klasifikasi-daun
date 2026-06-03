import { useRef, useState, useCallback } from 'react'

export default function CameraSection({ onCapture }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const timerRef = useRef(null)

  const [cameraActive, setCameraActive] = useState(false)
  const [realtimeActive, setRealtimeActive] = useState(false)
  const [interval, setIntervalMs] = useState(1000)
  const [status, setStatus] = useState('')
  const [isCapturing, setIsCapturing] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      setCameraActive(true)
      setStatus('Kamera aktif')
    } catch (err) {
      setStatus('Gagal: ' + err.message)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setCameraActive(false)
    setRealtimeActive(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setStatus('')
  }

  const captureFrame = useCallback(() => {
    return new Promise((resolve) => {
      const video = videoRef.current
      const canvas = canvasRef.current
      const w = video.videoWidth || 640
      const h = video.videoHeight || 480
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(video, 0, 0, w, h)
      canvas.toBlob((blob) => resolve(blob), 'image/png')
    })
  }, [])

  const handleCapture = async () => {
    if (!streamRef.current) return
    setIsCapturing(true)
    try {
      const blob = await captureFrame()
      if (blob) {
        const file = new File([blob], 'camera.png', { type: 'image/png' })
        onCapture(file)
      }
    } finally {
      setIsCapturing(false)
    }
  }

  const toggleRealtime = () => {
    if (!streamRef.current) {
      alert('Kamera belum aktif. Klik "Mulai Kamera" dulu.')
      return
    }

    if (realtimeActive) {
      setRealtimeActive(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    } else {
      setRealtimeActive(true)
      const ms = Math.max(200, interval)
      let isProcessing = false

      timerRef.current = setInterval(async () => {
        if (isProcessing || !streamRef.current) return
        isProcessing = true
        try {
          const blob = await captureFrame()
          if (blob) {
            const file = new File([blob], 'camera_rt.png', { type: 'image/png' })
            onCapture(file)
          }
        } finally {
          isProcessing = false
        }
      }, ms)
    }
  }

  return (
    <div className="diagnostic-section">
      <div className="diagnostic-header">
        <div className="diagnostic-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
        <span className="diagnostic-title">Diagnostik langsung</span>
      </div>

      <div className="diagnostic-controls">
        <button className="camera-btn" onClick={startCamera} disabled={cameraActive}>
          Mulai Kamera
        </button>
        <button className="camera-btn stop" onClick={stopCamera} disabled={!cameraActive}>
          Berhenti
        </button>
        <button className="camera-btn" onClick={handleCapture} disabled={!cameraActive || isCapturing}>
          {isCapturing ? 'Mengambil...' : 'Ambil Foto'}
        </button>

        <div className="toggle-group">
          <span className="toggle-label">Real-time</span>
          <div
            className={`toggle-switch${realtimeActive ? ' active' : ''}`}
            onClick={toggleRealtime}
          />
        </div>

        <div className="interval-group">
          <span className="interval-label">Interval Ms</span>
          <input
            type="number"
            className="interval-input"
            min="200"
            value={interval}
            onChange={(e) => setIntervalMs(parseInt(e.target.value) || 1000)}
          />
        </div>

        <span style={{ fontSize: 12, color: '#6C7A71', marginLeft: 4 }}>
          {status}
        </span>
      </div>

      <div className="camera-container" style={{ display: cameraActive ? 'block' : 'none' }}>
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

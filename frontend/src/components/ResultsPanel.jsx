import { useState, useEffect, useRef } from 'react'
import PredictionCard from './PredictionCard'
import ProbabilityBars from './ProbabilityBars'

const descriptions = {
  'Healthy': 'Kondisi tanaman optimal dengan nutrisi yang cukup.',
  'Powdery': 'Terinfeksi embun tepung — jamur putih pada permukaan daun.',
  'Rust': 'Terinfeksi karat daun — bintik coklat/oranye pada daun.'
}

export default function ResultsPanel({ data, error, loading }) {
  const [animate, setAnimate] = useState(false)
  const [confBarWidth, setConfBarWidth] = useState(0)
  const prevDataRef = useRef(null)

  useEffect(() => {
    if (data && data !== prevDataRef.current) {
      prevDataRef.current = data
      setAnimate(false)
      setConfBarWidth(0)

      // Trigger animations after a small delay
      requestAnimationFrame(() => {
        setTimeout(() => setAnimate(true), 50)
        setTimeout(() => {
          const topLabel = data.top_label || 'Unknown'
          const probs = data.label_probabilities || {}
          const topProb = probs[topLabel] ?? 0
          setConfBarWidth(Math.round(topProb * 100))
        }, 300)
      })
    }
  }, [data])

  if (error) {
    return (
      <div className="results-panel">
        <ResultsHeader />
        <div className="results-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p>Unggah foto daun atau gunakan kamera<br/>untuk memulai diagnostik</p>
        </div>
        <div className="error-msg" style={{ display: 'block' }}>
          Error: {error}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="results-panel">
        <ResultsHeader />
        <div className="results-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p>Unggah foto daun atau gunakan kamera<br/>untuk memulai diagnostik</p>
        </div>
      </div>
    )
  }

  const topLabel = data.top_label || 'Unknown'
  const probs = data.label_probabilities || {}
  const topProb = probs[topLabel] ?? 0
  const pct = Math.round(topProb * 100)

  const labelText = topLabel === 'Healthy' ? 'Terdeteksi: Sehat' :
                    topLabel === 'Powdery' ? 'Terdeteksi: Embun Tepung' :
                    topLabel === 'Rust' ? 'Terdeteksi: Karat Daun' :
                    'Terdeteksi: ' + topLabel

  const descText = descriptions[topLabel] || 'Kondisi daun teridentifikasi oleh model AI.'

  let level = 'Rendah'
  if (pct >= 90) level = 'Sangat Tinggi'
  else if (pct >= 70) level = 'Tinggi'
  else if (pct >= 50) level = 'Sedang'

  return (
    <div className="results-panel">
      <ResultsHeader />

      <PredictionCard
        percent={pct}
        label={labelText}
        description={descText}
        animate={animate}
      />

      <div className={`confidence-section${animate ? ' animate-in' : ''}`}>
        <div className="confidence-header">
          <span className="confidence-text">Kepercayaan AI</span>
          <span className="confidence-text">{level}</span>
        </div>
        <div className="confidence-bar-bg">
          <div className="confidence-bar-fill" style={{ width: confBarWidth + '%' }}></div>
        </div>
      </div>

      <ProbabilityBars probs={probs} animate={animate} />
    </div>
  )
}

function ResultsHeader() {
  return (
    <div className="results-header">
      <svg className="results-header-icon" viewBox="0 0 24 24" fill="#006C49">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
      <span className="results-header-title">Hasil Prediksi</span>
    </div>
  )
}

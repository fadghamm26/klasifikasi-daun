import { useState, useEffect, useRef } from 'react'

export default function PredictionCard({ percent, label, description, animate }) {
  const [displayPercent, setDisplayPercent] = useState(0)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!animate) {
      setDisplayPercent(0)
      return
    }

    const startTime = performance.now()
    const duration = 1200

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPercent(Math.round(eased * percent))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick)
      }
    }

    animationRef.current = requestAnimationFrame(tick)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate, percent])

  return (
    <div className={`prediction-card${animate ? ' animate-in' : ''}`}>
      <div className={`prediction-confidence${animate ? ' pulse' : ''}`}>
        <span>{displayPercent}%</span>
      </div>
      <div className="prediction-info">
        <div className={`prediction-label${animate ? ' animate-in' : ''}`}>
          {label}
        </div>
        <div className={`prediction-desc${animate ? ' animate-in' : ''}`}>
          {description}
        </div>
      </div>
    </div>
  )
}

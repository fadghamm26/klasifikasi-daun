import { useState, useEffect, useRef } from 'react'

const labelOrder = ['Healthy', 'Powdery', 'Rust']

export default function ProbabilityBars({ probs, animate }) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (!animate) {
      setRows(labelOrder.map(lbl => ({
        label: lbl,
        value: 0,
        target: Math.round((probs[lbl] ?? 0) * 100),
        show: false
      })))
      return
    }

    const timers = []
    const frames = []
    let cancelled = false

    // Stagger each row
    labelOrder.forEach((lbl, i) => {
      const timer = setTimeout(() => {
        if (cancelled) return
        setRows(prev => {
          const newRows = [...prev]
          if (newRows[i]) newRows[i] = { ...newRows[i], show: true }
          return newRows
        })

        // Animate the value
        const target = Math.round((probs[lbl] ?? 0) * 100)
        const startTime = performance.now()
        const duration = 800

        function tick(now) {
          if (cancelled) return
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const currentValue = eased * target

          setRows(prev => {
            const newRows = [...prev]
            if (newRows[i]) newRows[i] = { ...newRows[i], value: currentValue }
            return newRows
          })

          if (progress < 1) {
            frames.push(requestAnimationFrame(tick))
          }
        }

        frames.push(requestAnimationFrame(tick))
      }, i * 120)
      timers.push(timer)
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      frames.forEach(cancelAnimationFrame)
    }
  }, [animate, probs])

  return (
    <div className={`prob-section${animate ? ' animate-in' : ''}`}>
      <div className="prob-title">Probabilitas per Label :</div>
      <div className="prob-box">
        {rows.map((row, i) => (
          <div
            key={row.label || i}
            className={`prob-row${row.show ? ' animate-in' : ''}`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <span className="prob-label">{row.label}</span>
            <div className="prob-bar-wrap">
              <div
                className={`prob-bar-fill ${(row.label || '').toLowerCase()}`}
                style={{ width: (row.show ? row.target : 0) + '%' }}
              />
            </div>
            <span className="prob-value">{row.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

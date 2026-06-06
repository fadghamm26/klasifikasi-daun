import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import VectorImg from '../assets/Vector.png'

const loadingSteps = [
  { target: 15, delay: 200, duration: 400 },
  { target: 35, delay: 100, duration: 600 },
  { target: 55, delay: 200, duration: 500 },
  { target: 75, delay: 150, duration: 400 },
  { target: 90, delay: 100, duration: 300 },
  { target: 100, delay: 200, duration: 500 }
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const navigate = useNavigate()
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    let currentProgress = 0
    let stepIndex = 0

    function animateStep() {
      if (stepIndex >= loadingSteps.length) {
        setTimeout(() => {
          setExiting(true)
          setTimeout(() => navigate('/dashboard'), 600)
        }, 300)
        return
      }

      const step = loadingSteps[stepIndex]
      const startProgress = currentProgress
      const startTime = performance.now()

      setTimeout(() => {
        function animate(currentTime) {
          const elapsed = currentTime - startTime
          const progressRatio = Math.min(elapsed / step.duration, 1)
          const eased = 1 - Math.pow(1 - progressRatio, 3)
          currentProgress = startProgress + (step.target - startProgress) * eased
          setProgress(currentProgress)

          if (progressRatio < 1) {
            requestAnimationFrame(animate)
          } else {
            currentProgress = step.target
            setProgress(currentProgress)
            stepIndex++
            animateStep()
          }
        }
        requestAnimationFrame(animate)
      }, step.delay)
    }

    setTimeout(animateStep, 800)

    // Safety redirect
    const safetyTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => navigate('/dashboard'), 600)
    }, 5000)

    return () => clearTimeout(safetyTimer)
  }, [navigate])

  return (
    <div className={`loading-screen-container${exiting ? ' exiting' : ''}`} style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #006C49 25%, #00D28E 100%)',
      overflow: 'hidden'
    }}>
      {/* Decorative Vector images */}
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '139px',
        height: '103px',
        left: '526px',
        top: '444px',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '139px',
        height: '103px',
        left: '879px',
        top: '810.79px',
        transform: 'rotate(-46deg)',
        transformOrigin: 'top left',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '139px',
        height: '103px',
        left: '575.93px',
        top: '263.53px',
        transform: 'rotate(145deg)',
        transformOrigin: 'top left',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '270.86px',
        height: '285.50px',
        left: '1222.02px',
        top: '-13px',
        transform: 'rotate(65deg)',
        transformOrigin: 'top left',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '362.93px',
        height: '395.77px',
        left: '56px',
        top: '902.54px',
        transform: 'rotate(-78deg)',
        transformOrigin: 'top left',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '328px',
        height: '278px',
        left: '1060px',
        top: '704px',
        objectFit: 'contain'
      }} />
      <img src={VectorImg} alt="" style={{
        position: 'absolute',
        width: '369px',
        height: '346px',
        left: '82.38px',
        top: '-111px',
        transform: 'rotate(24deg)',
        transformOrigin: 'top left',
        objectFit: 'contain'
      }} />

      {/* Centered content container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}>
        {/* Logo and text row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <img src={VectorImg} alt="Logo" style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain'
          }} />
          <span style={{
            color: 'white',
            fontSize: '36px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            lineHeight: '20px',
            letterSpacing: '0.14px'
          }}>
            AgroScan AI
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '372px',
          height: '11px',
          background: '#D9D9D9',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: progress + '%',
            height: '100%',
            background: '#006C49',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  )
}

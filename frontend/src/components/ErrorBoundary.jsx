import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontFamily: 'Inter, system-ui, sans-serif',
          gap: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#FEE2E2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ width: 32, height: 32 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#191C1E' }}>
            Terjadi Kesalahan
          </h2>
          <p style={{ fontSize: '14px', color: '#6C7A71', maxWidth: '400px' }}>
            {this.state.error?.message || 'Aplikasi mengalami error tak terduga.'}
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: '#10B981',
              color: '#fff',
              border: 'none',
              padding: '10px 28px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

import dashBg from '../assets/pict.svg'
import yaImg from '../assets/ya.png'

export default function DashboardSection({ onStartDiagnosis }) {
  return (
    <div className="dashboard-section">
      {/* Hero */}
      <div className="dashboard-hero" style={{ backgroundImage: `url(${dashBg})` }}>
        <div className="dashboard-hero-content">
          <h1 className="dashboard-hero-title">
            Ketahui penyakit pada daun tanamanmu dengan
          </h1>
          <h2 className="dashboard-hero-highlight">AgroScan AI</h2>
          <p className="dashboard-hero-desc">
            AgroScan AI mendeteksi jenis penyakit yang di alami daun pada tanaman
            anda, memastikan agar daun pada tanaman anda tetap terjaga.
          </p>
          <a href="#diagnostic" className="dashboard-hero-btn" onClick={onStartDiagnosis}>
            Start Diagnosis
          </a>
        </div>
      </div>

      {/* About */}
      <div className="dashboard-about">
        <div className="dashboard-about-inner">
          <div className="dashboard-about-text-wrap">
            <h2 className="dashboard-about-title">AgroScan AI</h2>
            <p className="dashboard-about-text">
              AgroScan AI adalah aplikasi berbasis kecerdasan buatan yang dirancang
              untuk membantu petani dan peneliti dalam mendeteksi penyakit pada
              tanaman secara cepat dan akurat. Dengan menggunakan model deep
              learning yang telah dilatih pada ribuan gambar daun, sistem ini dapat
              mengidentifikasi berbagai jenis penyakit tanaman.
            </p>
            <p className="dashboard-about-text">
              Aplikasi ini menggunakan teknologi Convolutional Neural Network (CNN)
              untuk menganalisis gambar daun dan memberikan diagnosis berdasarkan
              pola visual yang terdeteksi. Model AI kami dapat mengklasifikasikan
              daun ke dalam tiga kategori: Sehat, Embun Tepung (Powdery Mildew),
              dan Karat Daun (Leaf Rust).
            </p>
          </div>

          {/* Stats */}
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">97.5%</span>
              <span className="dashboard-stat-label">Detection Accuracy</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">5.5s</span>
              <span className="dashboard-stat-label">Analysis Speed</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">45k+</span>
              <span className="dashboard-stat-label">Species Indexed</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat-value">30%</span>
              <span className="dashboard-stat-label">Yield Increase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Precision Engineering */}
      <div className="dashboard-engineering">
        <div className="dashboard-engineering-header">
          <h2 className="dashboard-engineering-title">
            Precision Engineering for Agriculture
          </h2>
          <p className="dashboard-engineering-desc">
            Our platform integrates seamlessly into your workflow, providing
            real-time botanical insights through advanced neural networks.
          </p>
        </div>

        <div className="dashboard-features-grid">
          {/* 01 */}
          <div className="dashboard-feature-card dashboard-feature-card--light">
            <div className="dashboard-feature-icon dashboard-feature-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div className="dashboard-feature-text">
              <h3 className="dashboard-feature-name">01. Intelligent Capture</h3>
              <p className="dashboard-feature-desc">
                Simply scan any leaf, stem, or root using your mobile device or
                integrated greenhouse cameras. Our AI handles lighting and
                perspective correction automatically.
              </p>
            </div>
            <div className="dashboard-feature-image">
              <img src={yaImg} alt="Intelligent Capture" />
            </div>
          </div>

          {/* 02 */}
          <div className="dashboard-feature-card dashboard-feature-card--dark">
            <div className="dashboard-feature-icon dashboard-feature-icon--white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <div className="dashboard-feature-text">
              <h3 className="dashboard-feature-name">02. Neural Analysis</h3>
              <p className="dashboard-feature-desc">
                Every scan is processed through our Botanical Guard API,
                comparing features against a global database of known diseases
                and environmental stressors.
              </p>
            </div>
          </div>

          {/* 03 */}
          <div className="dashboard-feature-card dashboard-feature-card--light">
            <div className="dashboard-feature-icon dashboard-feature-icon--indigo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="dashboard-feature-text">
              <h3 className="dashboard-feature-name">03. Targeted Action</h3>
              <p className="dashboard-feature-desc">
                Receive specific protocols for treatment, reducing chemical usage
                by up to 60% through surgical application.
              </p>
            </div>
          </div>

          {/* 04 */}
          <div className="dashboard-feature-card dashboard-feature-card--light">
            <div className="dashboard-feature-chart">
              <div className="dashboard-chart-bars">
                <div className="dashboard-chart-bar" style={{ height: '48%' }} />
                <div className="dashboard-chart-bar" style={{ height: '64%' }} />
                <div className="dashboard-chart-bar" style={{ height: '64%' }} />
                <div className="dashboard-chart-bar" style={{ height: '100%' }} />
                <div className="dashboard-chart-bar" style={{ height: '80%' }} />
              </div>
            </div>
            <div className="dashboard-feature-text">
              <div className="dashboard-feature-icon dashboard-feature-icon--gray">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10"/>
                  <path d="M18 20V4"/>
                  <path d="M6 20v-4"/>
                </svg>
              </div>
              <h3 className="dashboard-feature-name">04. Health History</h3>
              <p className="dashboard-feature-desc">
                Track recovery progress and long-term health trends across your
                entire plantation with centralized dashboarding and predictive
                analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

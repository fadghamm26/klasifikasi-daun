import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar />

        <div className="content">
          <div className="about-content">
            <h1 className="about-title">Tentang AgroScan AI</h1>

            <p className="about-text">
              AgroScan AI adalah aplikasi berbasis kecerdasan buatan yang dirancang untuk membantu
              petani dan peneliti dalam mendeteksi penyakit pada tanaman secara cepat dan akurat.
              Dengan menggunakan model deep learning yang telah dilatih pada ribuan gambar daun,
              sistem ini dapat mengidentifikasi berbagai jenis penyakit tanaman.
            </p>

            <p className="about-text">
              Aplikasi ini menggunakan teknologi Convolutional Neural Network (CNN) untuk
              menganalisis gambar daun dan memberikan diagnosis berdasarkan pola visual yang
              terdeteksi. Model AI kami dapat mengklasifikasikan daun ke dalam tiga kategori:
              Sehat, Embun Tepung (Powdery Mildew), dan Karat Daun (Leaf Rust).
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
                <h3>Deteksi Cepat</h3>
                <p>Analisis gambar daun dalam hitungan detik dengan akurasi tinggi</p>
              </div>

              <div className="about-feature">
                <div className="about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Akurasi Tinggi</h3>
                <p>Model AI yang telah dilatih dengan dataset besar untuk hasil yang reliable</p>
              </div>

              <div className="about-feature">
                <div className="about-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </div>
                <h3>Akses Mudah</h3>
                <p>Dapat diakses dari berbagai perangkat dengan koneksi internet</p>
              </div>
            </div>

            <p className="about-text" style={{ marginTop: '32px' }}>
              <strong>Cara Penggunaan:</strong>
            </p>
            <ol style={{ paddingLeft: '24px', color: '#3C4A42', lineHeight: '2' }}>
              <li>Unggah foto daun tanaman yang ingin diperiksa</li>
              <li>Atau gunakan kamera untuk mengambil foto langsung</li>
              <li>Tunggu hasil analisis dari AI</li>
              <li>Lihat diagnosis dan tingkat kepercayaan hasil prediksi</li>
            </ol>
          </div>
        </div>

        <footer className="footer">
          <p>&copy; 2026 AgroScan Technologies &bull; AI-Powered Botanical Security</p>
        </footer>
      </div>
    </div>
  )
}

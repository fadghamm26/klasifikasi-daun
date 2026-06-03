import { useRef, useState } from 'react'

export default function UploadDropzone({ onFileSelected, onReset }) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [hasImage, setHasImage] = useState(false)

  const handleFile = async (file) => {
    if (!file) return
    try {
      // Revoke previous object URL to prevent memory leak
      if (preview) URL.revokeObjectURL(preview)
      const url = URL.createObjectURL(file)
      setPreview(url)
      setHasImage(true)
      await onFileSelected(file)
    } catch (err) {
      console.error('Gagal memproses file:', err)
    }
  }

  const handleClick = (e) => {
    if (e.target.closest('.upload-preview') || e.target.closest('.upload-actions')) return
    fileInputRef.current.value = ''
    fileInputRef.current?.click()
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('dragover')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setHasImage(false)
    fileInputRef.current.value = ''
    onReset?.()
  }

  const handleUploadNew = () => {
    fileInputRef.current.value = ''
    fileInputRef.current?.click()
  }

  return (
    <div className="upload-card">
      <div
        className={`upload-dropzone${hasImage ? ' has-image' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!hasImage ? (
          <>
            <div className="upload-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div className="upload-title">Unggah foto daun</div>
            <div className="upload-desc">
              Tarik dan lepas gambar di sini atau klik untuk<br/>
              memilih file dari komputer Anda (JPG, PNG)
            </div>
            <button className="upload-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
              Pilih berkas
            </button>
          </>
        ) : (
          <img src={preview} className="upload-preview" alt="Preview" />
        )}
      </div>

      {hasImage && (
        <div className="upload-actions">
          <button className="upload-new-btn" onClick={handleUploadNew}>Upload Foto Baru</button>
          <button className="reset-btn" onClick={handleReset}>Hapus</button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  )
}

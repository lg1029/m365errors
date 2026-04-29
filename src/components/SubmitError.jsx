import { useState, useRef } from 'react'

const CATEGORIES = [
  'Entra ID / Azure AD',
  'Intune',
  'Autopilot',
  'Exchange Online',
  'SharePoint',
  'OneDrive',
  'Teams',
  'Microsoft 365 Apps',
  'Azure',
  'Purview',
  'Graph API',
  'Licensing',
  'Other',
]

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

export default function SubmitError({ onBack }) {
  const [fields, setFields] = useState({
    name: '',
    category: '',
    errorCode: '',
    description: '',
    resolution: '',
  })
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef()

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const handleFile = (f) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      setErrorMsg('Only image files are accepted.')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg('Image must be under 5 MB.')
      return
    }
    setErrorMsg('')
    setFile(f)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fields.category || !fields.description || !fields.resolution) {
      setErrorMsg('Please fill in all required fields.')
      return
    }
    setStatus('submitting')
    setErrorMsg('')

    const data = new FormData()
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', `M365ErrorFinder: New Error Submission — ${fields.errorCode || 'No code'}`)
    data.append('from_name', fields.name || 'Anonymous')
    data.append('Category', fields.category)
    data.append('Error Code', fields.errorCode || '(not provided)')
    data.append('Error Description', fields.description)
    data.append('Resolution', fields.resolution)
    if (file) data.append('attachment', file)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(json.message || 'Submission failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <main className="max-w-[600px] mx-auto px-6 py-16" style={{ animation: 'fadeUp 0.3s ease both' }}>
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '48px 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#F3EEFF',
              border: '1px solid #DDD6FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '22px',
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>
            Submission received
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>
            Thanks for contributing! Your submission will be reviewed and may be added to M365ErrorFinder.
          </p>
          <button
            onClick={onBack}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              background: '#7C3AED',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Back to home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-[640px] mx-auto px-6 py-12" style={{ animation: 'fadeUp 0.3s ease both' }}>
      {/* Back */}
      <button
        onClick={onBack}
        className="action-btn mb-8"
        style={{ marginBottom: '28px' }}
      >
        <span style={{ fontSize: '15px', lineHeight: 1 }}>←</span>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#7C3AED',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED', display: 'inline-block',
          }} />
          Community Contribution
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.4px', marginBottom: '8px' }}>
          Submit an Error
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
          Know an M365 error that isn't listed here? Share the code, what it means, and how you fixed it.
          Submissions are reviewed before being added.
        </p>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Name */}
        <Field label="Your name or handle" optional>
          <input
            type="text"
            value={fields.name}
            onChange={set('name')}
            placeholder="e.g. helpdesk_hero (optional)"
            style={inputStyle}
          />
        </Field>

        {/* Category */}
        <Field label="M365 product / category" required>
          <select
            value={fields.category}
            onChange={set('category')}
            required
            style={{ ...inputStyle, color: fields.category ? 'var(--text)' : 'var(--text-muted)' }}
          >
            <option value="" disabled>Select a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        {/* Error code */}
        <Field label="Error code" optional>
          <input
            type="text"
            value={fields.errorCode}
            onChange={set('errorCode')}
            placeholder="e.g. AADSTS50126 or 0x80180014"
            style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}
          />
        </Field>

        {/* Description */}
        <Field label="Describe the error" required>
          <textarea
            value={fields.description}
            onChange={set('description')}
            required
            rows={4}
            placeholder="What error did you receive? Where did it appear? What were you trying to do?"
            style={{ ...inputStyle, resize: 'vertical', minHeight: '96px', lineHeight: 1.6 }}
          />
        </Field>

        {/* Resolution */}
        <Field label="How did you resolve it?" required>
          <textarea
            value={fields.resolution}
            onChange={set('resolution')}
            required
            rows={4}
            placeholder="Step-by-step: what fixed it? Include any settings, commands, or admin portal steps."
            style={{ ...inputStyle, resize: 'vertical', minHeight: '96px', lineHeight: 1.6 }}
          />
        </Field>

        {/* Screenshot upload */}
        <Field label="Screenshot" optional>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
            style={{
              border: `1.5px dashed ${dragOver ? '#7C3AED' : 'var(--border-hover)'}`,
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? '#F3EEFF' : 'var(--bg)',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            {file ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>🖼</span>
                <span style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 500 }}>{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '16px',
                    lineHeight: 1,
                    padding: '0 2px',
                  }}
                >×</button>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>📎</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                  Drag & drop an image or <span style={{ color: '#7C3AED', fontWeight: 600 }}>browse</span>
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>PNG, JPG, GIF up to 5 MB</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </Field>

        {/* Error message */}
        {errorMsg && (
          <p style={{ fontSize: '13px', color: '#C2410C', margin: 0 }}>{errorMsg}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            padding: '11px 20px',
            borderRadius: '9px',
            background: status === 'submitting' ? '#A78BFA' : '#7C3AED',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            transition: 'background 0.15s',
            letterSpacing: '-0.1px',
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Submit for review'}
        </button>
      </form>
    </main>
  )
}

function Field({ label, children, required, optional }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-mid)', display: 'flex', gap: '6px', alignItems: 'center' }}>
        {label}
        {optional && (
          <span style={{ fontWeight: 400, color: 'var(--text-dim)', fontSize: '12px' }}>optional</span>
        )}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg)',
  border: '1.5px solid var(--border-hover)',
  borderRadius: '8px',
  padding: '10px 13px',
  color: 'var(--text)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s, box-shadow 0.15s',
}

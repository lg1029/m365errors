export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between"
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--border)',
        padding: '20px 48px',
      }}
    >
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Built by{' '}
        <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
          Lauren Grassano
        </a>
        {' · '}
        <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
          GitHub
        </a>
        {' · '}
        <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
          LinkedIn
        </a>
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        M365ErrorFinder &nbsp;&middot;&nbsp; Not affiliated with Microsoft
      </div>
    </footer>
  )
}

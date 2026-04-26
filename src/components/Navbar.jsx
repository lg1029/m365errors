export default function Navbar({ onHome }) {
  return (
    <nav
      className="sticky top-0 z-10 flex items-center justify-between border-b"
      style={{
        background: 'var(--white)',
        borderColor: 'var(--border)',
        padding: '0 48px',
        height: '60px',
      }}
    >
      <div
        className="font-bold cursor-pointer"
        style={{ fontSize: '17px', letterSpacing: '-0.3px', color: 'var(--text)' }}
        onClick={onHome}
      >
        M365<span style={{ color: '#7C3AED' }}>ErrorFinder</span>
      </div>

      <ul className="hidden md:flex items-center list-none">
        {['Home', 'Browse', 'Categories', 'About'].map((link, i) => (
          <li key={link} className="flex items-center">
            {i > 0 && (
              <span className="px-1" style={{ color: 'var(--border-hover)' }}>|</span>
            )}
            <a
              href="#"
              className="nav-link px-4"
              onClick={(e) => { e.preventDefault(); if (link === 'Home') onHome() }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div
        className="font-mono font-semibold tracking-[0.04em]"
        style={{
          fontSize: '11px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        v1.0
      </div>
    </nav>
  )
}

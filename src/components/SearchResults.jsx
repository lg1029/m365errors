import { useMemo } from 'react'
import { CATEGORY_META, CATEGORY_COLORS } from '../data/errors'

export default function SearchResults({ query, errors, onSelect }) {
  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return errors.filter(
      (e) =>
        e.code.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    )
  }, [query, errors])

  const grouped = useMemo(() => {
    const g = {}
    results.forEach((e) => {
      if (!g[e.category]) g[e.category] = []
      g[e.category].push(e)
    })
    return g
  }, [results])

  return (
    <div
      className="search-results-wrap mt-3 rounded-xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      {results.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          No results for{' '}
          <span className="font-mono" style={{ color: 'var(--text)' }}>
            &ldquo;{query}&rdquo;
          </span>
          . Try a different code or browse a category below.
        </div>
      ) : (
        Object.entries(grouped).map(([cat, catErrors]) => {
          const c = CATEGORY_COLORS[cat]
          const meta = CATEGORY_META[cat]
          return (
            <div key={cat}>
              <div
                className="px-4 py-2 text-[11px] uppercase tracking-[0.1em] font-semibold"
                style={{
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--border)',
                  background: 'var(--bg2)',
                }}
              >
                {meta.name}
              </div>
              {catErrors.map((err) => (
                <button
                  key={err.id}
                  onClick={() => onSelect(err)}
                  className="w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors duration-150"
                  style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    className="font-mono text-sm font-medium shrink-0 mt-0.5"
                    style={{ color: c.color }}
                  >
                    {err.code}
                  </span>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {err.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {err.summary}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )
        })
      )}
    </div>
  )
}

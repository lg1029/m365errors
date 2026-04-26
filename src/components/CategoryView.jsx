import { useState, useEffect } from 'react'
import { CATEGORY_META, CATEGORY_COLORS } from '../data/errors'
import SearchBar from './SearchBar'
import ErrorCard from './ErrorCard'

export default function CategoryView({ category, errors, expandedCard, onToggleCard, onBack }) {
  const [scopedQuery, setScopedQuery] = useState('')
  const meta = CATEGORY_META[category]
  const c = CATEGORY_COLORS[category]

  const filtered = errors
    .filter((e) => e.category === category)
    .filter((e) => {
      if (!scopedQuery.trim()) return true
      const q = scopedQuery.toLowerCase()
      return (
        e.code.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      )
    })

  useEffect(() => {
    if (expandedCard) {
      const el = document.getElementById(expandedCard)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [expandedCard])

  return (
    <section className="max-w-[860px] mx-auto px-6 py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-8 font-medium transition-colors duration-150"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        All categories
      </button>

      {/* Category header */}
      <div className="flex items-center gap-4 mb-2 flex-wrap">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: c.bg15 }}
        >
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2
            className="font-bold text-3xl"
            style={{ color: c.color, letterSpacing: '-0.5px' }}
          >
            {meta.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {meta.desc}
          </p>
        </div>
        <span
          className="font-mono text-sm px-3 py-1 rounded-md shrink-0"
          style={{ background: c.bg15, color: c.color, border: `1px solid ${c.border25}` }}
        >
          {filtered.length} {filtered.length === 1 ? 'code' : 'codes'}
        </span>
      </div>

      {/* Scoped search */}
      <div className="mt-6 mb-8">
        <SearchBar
          value={scopedQuery}
          onChange={setScopedQuery}
          placeholder={`Search ${meta.name} errors...`}
        />
      </div>

      {/* Error cards */}
      <div>
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            No results for{' '}
            <span className="font-mono" style={{ color: 'var(--text)' }}>
              &ldquo;{scopedQuery}&rdquo;
            </span>
          </div>
        ) : (
          filtered.map((err) => (
            <ErrorCard
              key={err.id}
              error={err}
              isExpanded={expandedCard === err.id}
              onToggle={() => onToggleCard(err.id)}
            />
          ))
        )}
      </div>
    </section>
  )
}

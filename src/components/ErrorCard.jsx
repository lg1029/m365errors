import { useState } from 'react'
import { CATEGORY_META, CATEGORY_COLORS, REDDIT_SUBS } from '../data/errors'

export default function ErrorCard({ error, isExpanded, onToggle }) {
  const [copied, setCopied] = useState(false)
  const c = CATEGORY_COLORS[error.category]
  const meta = CATEGORY_META[error.category]
  const redditSub = REDDIT_SUBS[error.category]
  const redditUrl = `https://www.reddit.com/r/${redditSub}/search?q=${encodeURIComponent(error.code)}&restrict_sr=1`

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(error.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      id={error.id}
      className="error-card"
      style={{ borderLeft: `3px solid ${c.color}` }}
    >
      {/* Clickable header */}
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          {/* Code + category badge */}
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <span className="font-mono text-[15px] font-medium" style={{ color: c.color }}>
              {error.code}
            </span>
            <span
              className="text-[11px] px-2 py-0.5 rounded-md font-medium"
              style={{ background: c.bg10, border: `1px solid ${c.border25}`, color: c.color }}
            >
              {meta.name}
            </span>
          </div>

          {/* Title */}
          <div
            className="font-semibold text-[16px] mb-1.5"
            style={{ letterSpacing: '-0.2px', color: 'var(--text)' }}
          >
            {error.title}
          </div>

          {/* Summary */}
          <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {error.summary}
          </div>
        </div>

        {/* Chevron */}
        <div
          className="shrink-0 mt-1 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300"
          style={{
            background: 'var(--bg2)',
            color: 'var(--text-muted)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: isExpanded ? '2000px' : '0',
          overflow: 'hidden',
          opacity: isExpanded ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div className="px-6 pb-6" style={{ borderTop: '1px solid var(--border)' }}>

          {/* What this means */}
          <div className="mt-5 mb-4">
            <div
              className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              What this means
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              {error.whatItMeans}
            </p>
          </div>

          {/* Why it happens */}
          <div className="mb-4">
            <div
              className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-2"
              style={{ color: 'var(--text-muted)' }}>
              Why this happens
            </div>
            <ul className="space-y-1.5">
              {error.whyItHappens.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--text-mid)' }}
                >
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: c.color }}
                  />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* What to try */}
          <div className="mb-5">
            <div
              className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              What to try
            </div>
            <ol className="space-y-2.5">
              {error.whatToTry.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-mid)' }}>
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-medium mt-[1px]"
                    style={{ background: c.bg15, color: c.color }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action buttons */}
          <div
            className="flex flex-wrap items-center gap-2.5 pt-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <a href={error.learnUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Go deeper (Microsoft Learn)
            </a>

            <a href={redditUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
              See how others fixed it
            </a>

            <button
              onClick={handleCopy}
              className="action-btn ml-auto"
              style={copied ? { background: c.bg15, borderColor: c.border25, color: c.color } : {}}
            >
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy error code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

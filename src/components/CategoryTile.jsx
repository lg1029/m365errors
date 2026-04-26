import { CATEGORY_META, CATEGORY_COLORS } from '../data/errors'

export default function CategoryTile({ category, count, onClick, animDelay }) {
  const meta = CATEGORY_META[category]
  const c = CATEGORY_COLORS[category]

  return (
    <button
      onClick={onClick}
      className={`cat-card cat-${category} w-full p-6`}
      style={{
        animation: 'fadeUp 0.35s ease both',
        animationDelay: animDelay,
      }}
    >
      {/* Top row: icon + count badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: c.bg15 }}
        >
          {meta.icon}
        </div>
        <span
          className="font-mono text-[11px] font-medium px-2 py-0.5 rounded-md border"
          style={{ background: c.bg10, borderColor: c.border25, color: c.color }}
        >
          {count} {count === 1 ? 'code' : 'codes'}
        </span>
      </div>

      {/* Name */}
      <div
        className="font-semibold mb-1.5"
        style={{ fontSize: '15px', letterSpacing: '-0.2px', color: 'var(--text)' }}
      >
        {meta.name}
      </div>

      {/* Description */}
      <div
        className="text-[13px] leading-relaxed mb-5"
        style={{ color: 'var(--text-muted)' }}
      >
        {meta.desc}
      </div>

      {/* Footer */}
      <div
        className="flex items-center gap-1 text-[12px] font-medium"
        style={{ color: c.color }}
      >
        Browse errors <span className="cat-arrow">→</span>
      </div>
    </button>
  )
}

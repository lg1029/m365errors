const STATS = [
  { num: '600+',   label: 'Error codes documented' },
  { num: '8',      label: 'Products covered'       },
  { num: '0',      label: 'Logins required'        },
  { num: 'Tier 1', label: 'Friendly language'      },
]

export default function StatsRow() {
  return (
    <div
      style={{
        marginTop: '56px',
        paddingTop: '40px',
        borderTop: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.num}
          className="text-center"
          style={{
            padding: '0 24px',
            borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          <div
            className="font-bold mb-1"
            style={{ fontSize: '32px', color: 'var(--text)', letterSpacing: '-1px' }}
          >
            {s.num}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

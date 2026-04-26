import { CATEGORY_COLORS } from '../data/errors'

const PILLS = [
  { code: 'AADSTS53000',                    category: 'entra'     },
  { code: '0x80180014',                     category: 'intune'    },
  { code: '550 5.1.1',                      category: 'exchange'  },
  { code: '0x800705b4',                     category: 'autopilot' },
  { code: 'AADSTS50126',                    category: 'entra'     },
  { code: '0x8018002a',                     category: 'intune'    },
  { code: 'AADSTS700016',                   category: 'entra'     },
  { code: '451 4.7.0',                      category: 'exchange'  },
  { code: '0x80070774',                     category: 'autopilot' },
  { code: 'License_ForProductIsNotAvailable', category: 'licensing' },
  { code: '403 Forbidden',                  category: 'graph'     },
  { code: 'DLP_Policy_Tip_Block',           category: 'purview'   },
  { code: 'AuthorizationFailed',            category: 'azure'     },
  { code: 'AADSTS65001',                    category: 'entra'     },
  { code: '0x87D1041C',                     category: 'intune'    },
]

export default function Hero({ onPillClick }) {
  return (
    <section
      className="text-center px-6 max-w-[900px] mx-auto"
      style={{ paddingTop: '72px' }}
    >
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-md px-3 py-1 mb-7"
        style={{
          background: '#F3EEFF',
          border: '1px solid #DDD6FE',
          color: '#7C3AED',
          animation: 'fadeUp 0.4s ease both',
        }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full flex-shrink-0"
          style={{ background: '#7C3AED', animation: 'pulse 2s infinite' }}
        />
        Microsoft 365 Error Reference
      </div>

      {/* Headline */}
      <h1
        className="font-bold leading-[1.1] mb-4 max-w-[700px] mx-auto"
        style={{
          fontSize: 'clamp(36px, 5vw, 58px)',
          letterSpacing: '-1.5px',
          color: 'var(--text)',
          animation: 'fadeUp 0.4s 0.08s ease both',
        }}
      >
        What does this<br />
        error{' '}
        <em style={{ fontStyle: 'normal', color: '#7C3AED' }}>actually</em>{' '}
        mean?
      </h1>

      {/* Pills label */}
      <div
        className="text-[10px] uppercase tracking-[0.1em] font-semibold mb-3"
        style={{ color: 'var(--text-muted)', animation: 'fadeUp 0.4s 0.12s ease both' }}
      >
        Commonly seen in the field
      </div>

      {/* Pills */}
      <div
        className="flex flex-wrap justify-center gap-2 max-w-[680px] mx-auto mb-10"
        style={{ animation: 'fadeUp 0.4s 0.16s ease both' }}
      >
        {PILLS.map(({ code, category }) => {
          const c = CATEGORY_COLORS[category]
          return (
            <button
              key={code}
              onClick={() => onPillClick(code)}
              className="font-mono text-[11px] font-medium px-3 py-1 rounded-md border transition-all duration-150 whitespace-nowrap cursor-pointer"
              style={{
                background: c.bg10,
                borderColor: c.border25,
                color: c.color,
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              {code}
            </button>
          )
        })}
      </div>

      {/* Subtitle */}
      <p
        className="text-base max-w-[520px] mx-auto leading-relaxed mb-10"
        style={{
          color: 'var(--text-mid)',
          fontWeight: 400,
          animation: 'fadeUp 0.4s 0.2s ease both',
        }}
      >
        Plain-English explanations for Microsoft 365, Entra, Intune, and Azure error codes.
        Built for technicians. Readable by anyone.
      </p>
    </section>
  )
}

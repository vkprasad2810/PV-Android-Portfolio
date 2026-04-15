import { memo } from 'react'

type AndroidBotProps = {
  label?: string
  size?: number
  animated?: boolean
  mode?: 'hero' | 'fix'
}

function AndroidBotBase({ label = 'Android robot', size = 240, animated = true, mode = 'hero' }: AndroidBotProps) {
  const bodyFill = '#3DDC84'
  const stroke = '#000'
  const armTransform = mode === 'fix' ? 'rotate(-22deg)' : 'rotate(6deg)'

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={animated ? 'block overflow-visible motion-safe:[animation:pv-drift_5.5s_ease-in-out_infinite]' : 'block overflow-visible'}
    >
      <title>{label}</title>
      <g transform="translate(120 118)">
        <ellipse cx="0" cy="84" rx="60" ry="18" fill="rgba(0,0,0,0.1)" />
        <g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          className={animated && mode === 'hero' ? 'motion-safe:[animation:pv-bounce_4.5s_ease-in-out_infinite]' : undefined}
        >
          <rect x="-46" y="-6" width="92" height="84" rx="32" fill={bodyFill} stroke={stroke} strokeWidth="6" />
          <rect x="-28" y="-30" width="56" height="26" rx="13" fill={bodyFill} stroke={stroke} strokeWidth="6" />
          <line x1="-18" y1="-42" x2="-34" y2="-62" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          <line x1="18" y1="-42" x2="34" y2="-62" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          <circle cx="-18" cy="-66" r="6" fill={stroke} />
          <circle cx="18" cy="-66" r="6" fill={stroke} />
          <circle cx="-18" cy="18" r="12" fill="#fff" stroke={stroke} strokeWidth="6" />
          <circle cx="18" cy="18" r="12" fill="#fff" stroke={stroke} strokeWidth="6" />
          <rect x="-70" y="8" width="24" height="58" rx="12" fill={bodyFill} stroke={stroke} strokeWidth="6" transform={armTransform} />
          <rect x="46" y="8" width="24" height="58" rx="12" fill={bodyFill} stroke={stroke} strokeWidth="6" transform={`rotate(${mode === 'fix' ? 42 : -26} 58 36)`} />
          <rect x="-54" y="70" width="22" height="54" rx="11" fill={bodyFill} stroke={stroke} strokeWidth="6" />
          <rect x="32" y="70" width="22" height="54" rx="11" fill={bodyFill} stroke={stroke} strokeWidth="6" />
          {mode === 'fix' ? (
            <g className={animated ? 'origin-center motion-safe:[animation:pv-pulse-line_1.2s_ease-in-out_infinite]' : undefined}>
              <path d="M80 4l22-14" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
              <circle cx="106" cy="-18" r="7" fill="#fff" stroke={stroke} strokeWidth="5" />
            </g>
          ) : null}
        </g>
      </g>
    </svg>
  )
}

export const AndroidBot = memo(AndroidBotBase)

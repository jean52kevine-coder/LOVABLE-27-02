interface AlteraLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: number;
}

export function AlteraLogo({ size = 44, showText = true, textSize = 22 }: AlteraLogoProps) {
  const id = `logo-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${id}-1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2FFF" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id={`${id}-2`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00C2FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7B2FFF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`${id}-3`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7B2FFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.2" />
          </linearGradient>
          <filter id={`${id}-glo`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id={`${id}-gloSm`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
        </defs>
        <ellipse cx="100" cy="100" rx="82" ry="32" transform="rotate(-35 100 100)" stroke={`url(#${id}-2)`} strokeWidth="1.5" fill="none" opacity="0.75" />
        <ellipse cx="100" cy="100" rx="82" ry="32" transform="rotate(55 100 100)" stroke={`url(#${id}-3)`} strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="100" cy="100" r="48" stroke={`url(#${id}-1)`} strokeWidth="0.8" fill="none" opacity="0.25" strokeDasharray="80 220" />
        <circle cx="152" cy="74" r="5" fill={`url(#${id}-1)`} filter={`url(#${id}-glo)`} />
        <circle cx="152" cy="74" r="9" fill="none" stroke={`url(#${id}-1)`} strokeWidth="0.8" opacity="0.4" />
        <circle cx="52" cy="132" r="3" fill="#00C2FF" opacity="0.7" filter={`url(#${id}-gloSm)`} />
        <circle cx="100" cy="100" r="20" fill={`url(#${id}-1)`} opacity="0.1" />
        <line x1="100" y1="84" x2="89" y2="112" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="100" y1="84" x2="111" y2="112" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="91.5" y1="102" x2="108.5" y2="102" stroke={`url(#${id}-1)`} strokeWidth="2" strokeLinecap="round" filter={`url(#${id}-gloSm)`} />
        <circle cx="100" cy="83" r="2.5" fill={`url(#${id}-1)`} filter={`url(#${id}-glo)`} />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: `${textSize}px`,
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          <span style={{ color: 'white' }}>ALT</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #7B2FFF, #00C2FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            É
          </span>
          <span style={{ color: 'white' }}>RA</span>
        </span>
      )}
    </div>
  );
}

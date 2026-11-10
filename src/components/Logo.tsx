export function Logo({ className = "gsh-logo" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Zero Studio logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="zero-mark-gradient" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e9d5ff" />
          <stop offset=".48" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="zero-mark-edge" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c4b5fd" stopOpacity=".85" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity=".15" />
        </linearGradient>
        <filter id="zero-mark-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M18 4.75h28A13.25 13.25 0 0 1 59.25 18v28A13.25 13.25 0 0 1 46 59.25H18A13.25 13.25 0 0 1 4.75 46V18A13.25 13.25 0 0 1 18 4.75Z"
        fill="#171126"
        stroke="url(#zero-mark-edge)"
        strokeWidth="1.5"
      />
      <path
        d="M17 17h30v7.2L28.8 40.8H47V48H17v-7.2L35.2 24.2H17V17Z"
        fill="url(#zero-mark-gradient)"
        stroke="#eee7ff"
        strokeOpacity=".28"
        strokeWidth=".8"
        strokeLinejoin="round"
        filter="url(#zero-mark-glow)"
      />
      <path d="M17 17h30v4H17z" fill="#fff" opacity=".18" />
      <path d="M49.5 8.5l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5 1.5-4Z" fill="#ede9fe" />
    </svg>
  );
}

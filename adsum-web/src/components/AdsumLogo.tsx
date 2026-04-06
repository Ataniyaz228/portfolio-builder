interface AdsumLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function AdsumLogo({ className = 'w-4 h-4', style }: AdsumLogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      {/* Left semicircle (bottom half) */}
      <path d="M1.5 12.5a4.5 4.5 0 0 0 9 0H1.5Z" />
      {/* Right full circle */}
      <circle cx="17.5" cy="10" r="5.5" />
    </svg>
  );
}

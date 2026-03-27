export function ChevronDownIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TagIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8.5 1.5H3a1 1 0 0 0-1 1v5.5a.5.5 0 0 0 .15.35l6 6a1 1 0 0 0 1.41 0l5-5a1 1 0 0 0 0-1.41l-6-6A.5.5 0 0 0 8.5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="5.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function HelpCircleIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.06 6a2 2 0 0 1 3.88.67c0 1.33-2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function XIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CheckIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function MinusIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronUpIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InfoCircleIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function BrazilFlagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="circ"><circle cx="10" cy="10" r="10" /></clipPath>
      <circle cx="10" cy="10" r="10" fill="#009c3b" />
      <polygon points="10,2 18.5,10 10,18 1.5,10" fill="#ffdf00" clipPath="url(#circ)" />
      <circle cx="10" cy="10" r="4" fill="#002776" />
      <path d="M6.5 9.5 Q10 8.5 13.5 9.7" stroke="white" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function IngresseLogo() {
  return (
    <div className="flex items-center gap-1.5" style={{ height: 32 }}>
      <img
        src="http://localhost:3845/assets/44c5aa2cbd7902413fe4c96d8d3af23a77ba64dc.svg"
        alt=""
        style={{ height: 32, width: 'auto', display: 'block' }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      <img
        src="http://localhost:3845/assets/8182aa5df93681c22a67edf833d064025fb30c8d.svg"
        alt="Ingresse"
        style={{ height: 32, width: 'auto', display: 'block' }}
        onError={(e) => {
          const el = document.createElement('span')
          el.style.cssText = 'font-size:18px;font-weight:700;color:#171717;letter-spacing:-0.5px;line-height:32px;font-family:Inter,sans-serif'
          el.textContent = 'INGRESSE'
          e.currentTarget.replaceWith(el)
        }}
      />
    </div>
  )
}

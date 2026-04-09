import { TagIcon, XIcon } from './Icons.jsx'

function ReceiptIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export default function CouponSection({ coupon, onOpenModal, onRemove }) {
  /* ── No coupon applied: show add button ─────────────────── */
  if (!coupon) {
    return (
      <button
        onClick={onOpenModal}
        className="flex items-center gap-2 w-full border border-neutral-200 rounded-xl px-4 py-2.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors text-left"
      >
        <ReceiptIcon size={16} className="text-neutral-500 flex-shrink-0" />
        <span className="text-sm font-medium text-neutral-700">Adicionar código ou cupom</span>
      </button>
    )
  }

  /* ── Coupon applied: show code + message ─────────────────── */
  return (
    <div className="flex flex-col gap-1.5">
      <div className="border border-neutral-200 rounded-xl px-3 py-2.5 bg-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <TagIcon size={15} className="text-green-600 flex-shrink-0" />
          <p className="text-sm leading-5 truncate">
            <span className="text-neutral-500">código/cupom: </span>
            <span className="font-semibold text-brand">{coupon.code}</span>
          </p>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 active:text-neutral-800 transition-colors"
        >
          <XIcon size={13} />
        </button>
      </div>
      <p className="text-xs text-neutral-500 px-1 leading-4">{coupon.message}</p>
    </div>
  )
}

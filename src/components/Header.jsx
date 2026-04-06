import { IngresseLogo, ChevronDownIcon, BrazilFlagIcon, ArrowLeftIcon, MoreVerticalIcon } from './Icons.jsx'

export default function Header({ evento, onBack }) {
  return (
    <>
      {/* ── Mobile header ─────────────────────────────────────────── */}
      <div className="lg:hidden bg-[#181818] flex items-center gap-3 px-4 py-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center text-white active:opacity-70 transition-opacity flex-shrink-0"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate leading-5">
            {evento?.titulo ?? 'Evento'}
          </p>
          <p className="text-xs text-neutral-400 truncate leading-4">
            {evento?.subtitulo ?? ''}
          </p>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-white active:opacity-70 transition-opacity flex-shrink-0">
          <MoreVerticalIcon size={20} />
        </button>
      </div>

      {/* ── Desktop header ────────────────────────────────────────── */}
      <div className="hidden lg:block bg-[#181818]">
        <div className="max-w-[1320px] mx-auto px-8 py-3 flex items-center justify-between">
          <IngresseLogo />
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-sm font-semibold text-neutral-300">Victor Pires da Costa</span>
              <ChevronDownIcon size={12} className="text-neutral-400" />
            </button>
            <BrazilFlagIcon size={20} />
          </div>
        </div>
      </div>
    </>
  )
}

import { ShareIcon, HelpCircleIcon } from './Icons.jsx'

export default function DesktopPageHeader() {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-[1320px] mx-auto px-8 flex items-center justify-between h-14">
        {/* Left: page title + badge */}
        <div className="flex items-center gap-2.5">
          <span className="text-base font-semibold text-neutral-900">[Teste] - Victor</span>
          <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md leading-5">
            Rascunho
          </span>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-200 rounded-lg px-3 py-1.5 bg-white hover:bg-neutral-50">
            <ShareIcon size={14} className="text-neutral-500" />
            <span>Compartilhar</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors">
            <HelpCircleIcon size={15} className="text-neutral-400" />
            <span>Preciso de ajuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}

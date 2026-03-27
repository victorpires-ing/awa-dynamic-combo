import { IngresseLogo, ChevronDownIcon, BrazilFlagIcon } from './Icons.jsx'

export default function Header() {
  return (
    <div className="bg-white py-3">
      <div className="flex items-center justify-between px-4 py-2">
        <IngresseLogo />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-semibold text-neutral-600">Nome e sobrenome</span>
            <ChevronDownIcon size={12} className="text-neutral-600" />
          </button>
          <BrazilFlagIcon size={20} />
        </div>
      </div>
    </div>
  )
}

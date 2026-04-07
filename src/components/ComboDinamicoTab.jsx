import ComboAvailableCard from './ComboAvailableCard.jsx'
import ComboSelectedCard from './ComboSelectedCard.jsx'

export default function ComboDinamicoTab({ combos, selectedCombos, onPersonalizar, onEditar, hasItems }) {
  return (
    <div className="flex flex-col gap-5 px-4 pb-4 lg:pb-4 pt-4">

      {/* ── Monte seu combo ───────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-neutral-700">Monte seu combo</p>
        <div className="flex flex-col gap-3">
          {combos.map((combo) => (
            <ComboAvailableCard
              key={combo.id}
              combo={combo}
              onPersonalizar={onPersonalizar}
            />
          ))}
        </div>
      </div>

      {hasItems && <div className="h-2 lg:h-0" />}
    </div>
  )
}

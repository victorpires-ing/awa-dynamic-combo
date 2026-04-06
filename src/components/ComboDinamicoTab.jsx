import ComboAvailableCard from './ComboAvailableCard.jsx'
import ComboSelectedCard from './ComboSelectedCard.jsx'

export default function ComboDinamicoTab({ combos, selectedCombos, onPersonalizar, onEditar, hasItems }) {
  return (
    <div className="flex flex-col gap-5 px-4 pb-12 lg:pb-0 pt-4">

      {/* ── Selecionados ─────────────────────────────────────────── */}
      {selectedCombos.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-neutral-700">Selecionados</p>
          <div className="flex flex-col gap-3">
            {selectedCombos.map((selected) => {
              const combo = combos.find((c) => c.id === selected.comboId)
              return (
                <ComboSelectedCard
                  key={selected.id}
                  selected={selected}
                  combo={combo}
                  onEditar={() => onEditar(selected.id)}
                />
              )
            })}
          </div>
        </div>
      )}

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

      {hasItems && <div className="h-h2 lg:h-0" />}
    </div>
  )
}

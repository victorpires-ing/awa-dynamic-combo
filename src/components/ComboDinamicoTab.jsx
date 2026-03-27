import SectionDivider from './SectionDivider.jsx'
import ComboAvailableCard from './ComboAvailableCard.jsx'

export default function ComboDinamicoTab({ combos, onPersonalizar, hasItems }) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-12 pt-4">
      <SectionDivider label="Disponíveis" />
      <div className="flex flex-col gap-3">
        {combos.map((combo) => (
          <ComboAvailableCard
            key={combo.id}
            combo={combo}
            onPersonalizar={onPersonalizar}
          />
        ))}
      </div>
      {hasItems && <div className="h-52" />}
    </div>
  )
}

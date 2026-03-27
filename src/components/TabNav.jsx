export default function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        if (tab.type === 'combo') {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 h-[78px] flex flex-col items-center justify-center px-5 rounded-xl transition-all
                ${isActive
                  ? 'border-2 border-brand-border bg-brand-bg'
                  : 'border border-neutral-300 bg-white'
                }`}
            >
              <span className={`text-base font-bold ${isActive ? 'text-neutral-900' : 'text-neutral-600'}`}>
                {tab.label}
              </span>
            </button>
          )
        }
        // Date tab
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-shrink-0 h-[78px] flex flex-col items-center justify-between py-3.5 px-5 rounded-xl transition-all
              ${isActive
                ? 'border-2 border-brand-border bg-brand-bg'
                : 'border border-neutral-300 bg-white'
              }`}
          >
            <span className="text-[12px] font-medium text-neutral-600 tracking-[0.24px]">
              {tab.diaSemana}
            </span>
            <span className="text-base font-semibold text-neutral-900">
              {tab.dia} {tab.mes}
            </span>
            <span className="text-sm text-neutral-600">de {tab.ano}</span>
          </button>
        )
      })}
    </div>
  )
}

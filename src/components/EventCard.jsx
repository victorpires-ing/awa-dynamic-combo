import { HelpCircleIcon } from './Icons.jsx'

export default function EventCard({ evento }) {
  return (
    <div className="mx-4">
      <div className="bg-white border border-neutral-300 rounded-2xl p-3 flex items-center gap-3 shadow-xs">
        {/* Event cover image */}
        <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 70, height: 105 }}>
          <img
            src={evento.imagemUrl}
            alt={evento.titulo}
            className="h-full object-cover"
            onError={(e) => {
              e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #c8102e 0%, #003087 100%)'
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        {/* Event info */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-neutral-900 leading-5">
              {evento.titulo}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex-shrink-0 overflow-hidden rounded-sm">
                <img
                  src={evento.brasaoUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.parentElement.innerHTML = '<div class="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center"><span class="text-white text-[6px] font-bold">B</span></div>'
                  }}
                />
              </div>
              <span className="text-[12px] font-medium text-neutral-600 tracking-[0.24px]">
                {evento.subtitulo}
              </span>
            </div>
          </div>

          <button className="self-start flex items-center gap-1 border border-neutral-300 rounded-md px-2.5 py-1.5 shadow-xs bg-white active:bg-neutral-50 transition-colors">
            <HelpCircleIcon size={16} className="text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-700">Preciso de ajuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}

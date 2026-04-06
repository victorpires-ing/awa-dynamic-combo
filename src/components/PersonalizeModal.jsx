import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from './Icons.jsx'
import Step2Tickets from './Step2Tickets.jsx'

export default function PersonalizeModal({
  open,
  combo,
  selectedDates,
  ticketQuantities,
  onClose,
  onQtyChange,
  onAddCombo,
}) {
  if (!combo) return null

  const minPorData = combo.minIngressosPorData ?? 0

  const totalSelected = useMemo(() =>
    Object.values(ticketQuantities).reduce(
      (total, dateQtys) => total + Object.values(dateQtys).reduce((a, b) => a + b, 0),
      0
    ),
    [ticketQuantities]
  )

  const canConfirm = useMemo(() => {
    if (selectedDates.length === 0) return false
    return selectedDates.every((dateId) => {
      const qty = Object.values(ticketQuantities[dateId] || {}).reduce((a, b) => a + b, 0)
      return qty >= minPorData
    })
  }, [selectedDates, ticketQuantities, minPorData])

  const maxTotal = combo.maxIngressosPorData * selectedDates.length

return (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 bg-black/60 lg:flex lg:items-center lg:justify-center"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white flex flex-col
              max-lg:absolute max-lg:bottom-0 max-lg:left-0 max-lg:right-0
              max-lg:rounded-t-2xl max-lg:max-h-[80dvh]
              lg:w-[560px] lg:max-h-[85dvh] lg:rounded-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-neutral-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-base font-bold text-neutral-900 leading-tight truncate">
                    {combo.nome}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Selecione entre {minPorData} e {maxTotal} itens
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 active:bg-neutral-200 transition-colors flex-shrink-0"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-scroll min-h-0 custom-scroll">
              <Step2Tickets
                combo={combo}
                selectedDates={selectedDates}
                ticketQuantities={ticketQuantities}
                onQtyChange={onQtyChange}
              />
            </div>

            <div className="flex-shrink-0 border-t border-neutral-100">
              <div className="px-5 pt-3 pb-1">
                <p className="text-sm text-neutral-500">
                  {totalSelected} {totalSelected === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
              <div className="flex gap-3 px-5 pb-5 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={onAddCombo}
                  disabled={!canConfirm}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors
                    ${
                      canConfirm
                        ? 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)
}

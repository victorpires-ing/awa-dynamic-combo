import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from './Icons.jsx'
import Stepper from './Stepper.jsx'
import Step1Dates from './Step1Dates.jsx'
import Step2Tickets from './Step2Tickets.jsx'
import { formatarPreco } from '../data/mockData.js'

export default function PersonalizeModal({
  open,
  combo,
  step,
  selectedDates,
  ticketQuantities,
  onClose,
  onToggleDate,
  onContinue,
  onQtyChange,
  onAddCombo,
}) {
  if (!combo) return null

  const canContinue = selectedDates.length >= combo.minDatas

  // Subtotal calculado em tempo real
  const subtotal = useMemo(() => {
    return Object.entries(ticketQuantities).reduce((total, [, dateQtys]) => {
      return (
        total +
        Object.entries(dateQtys).reduce((dateTotal, [ticketId, qty]) => {
          const ticket = combo.ingressosPorData.find((t) => t.id === ticketId)
          return dateTotal + (ticket?.preco || 0) * qty
        }, 0)
      )
    }, 0)
  }, [ticketQuantities, combo])

  // Validação: cada data selecionada deve ter >= minIngressosPorData tickets
  const minPorData = combo.minIngressosPorData ?? 0
  const canAddCombo = useMemo(() => {
    if (selectedDates.length === 0) return false
    return selectedDates.every((dateId) => {
      const dateQtys = ticketQuantities[dateId] || {}
      const total = Object.values(dateQtys).reduce((a, b) => a + b, 0)
      return total >= minPorData
    })
  }, [selectedDates, ticketQuantities, minPorData])

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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          {/* Modal — ocupa toda a tela com margem 40px topo, 16px laterais */}
          <motion.div
            className="absolute bg-white rounded-2xl flex flex-col overflow-hidden"
            style={{ top: 40, left: 16, right: 16, bottom: 40 }}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            {/* Header — fixo */}
            <div className="flex-shrink-0 flex flex-col gap-4 px-5 pt-5 pb-4 border-b border-neutral-100">
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-bold text-neutral-900 leading-tight pr-4">
                  Personalizar {combo.nome}
                </p>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 active:bg-neutral-200 transition-colors flex-shrink-0"
                >
                  <XIcon size={16} />
                </button>
              </div>
              <Stepper currentStep={step} totalSteps={2} />
            </div>

            {/* Content — scrollável */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Step1Dates
                      combo={combo}
                      selectedDates={selectedDates}
                      onToggleDate={onToggleDate}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Step2Tickets
                      combo={combo}
                      selectedDates={selectedDates}
                      ticketQuantities={ticketQuantities}
                      onQtyChange={onQtyChange}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer fixo — subtotal (step 2) + botões */}
            <div className="flex-shrink-0 bg-white border-t border-neutral-100">
              {step === 2 && (
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                  <span className="text-sm text-neutral-600">Subtotal do combo</span>
                  <span className="text-sm font-bold text-neutral-900">
                    {subtotal > 0 ? formatarPreco(subtotal) : ' - - '}
                  </span>
                </div>
              )}
              <div className="flex gap-3 px-5 py-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-neutral-300 text-sm font-semibold text-neutral-700 active:bg-neutral-50 transition-colors"
                >
                  Cancelar
                </button>
                {step === 1 ? (
                  <button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors
                      ${canContinue
                        ? 'bg-brand text-white active:bg-brand-hover'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={onAddCombo}
                    disabled={!canAddCombo}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors
                      ${canAddCombo
                        ? 'bg-brand text-white active:bg-brand-hover'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                  >
                    Adicionar combo
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

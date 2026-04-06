import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUpIcon, ChevronDownIcon, InfoCircleIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'

export default function PurchaseSummaryFooter({ total, desconto = 10, onContinue }) {
  const [expanded, setExpanded] = useState(false)

  const precoFinal = total
  const precoOriginal = total / (1 - desconto / 100)

  const PriceBlock = ({ compact }) => (
    <div className={`flex flex-col gap-1 ${compact ? 'pb-3' : 'pb-2'}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-400 line-through">
          de {formatarPreco(precoOriginal)}
        </span>
        <span className="text-xs font-bold text-success bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
          {desconto}% OFF
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={`font-bold text-neutral-900 ${compact ? 'text-base' : 'text-lg'}`}>
          Por {formatarPreco(precoFinal)}
        </span>
        <span className="text-xs text-neutral-500">+ taxas</span>
        {!compact && <InfoCircleIcon size={14} className="text-neutral-400" />}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      <>
        {/* Backdrop só quando expandido */}
        {expanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}

        {/* Footer / sheet */}
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          exit={{ y: 200 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        >
          <div className="w-full bg-white border-t border-neutral-200 rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
            {/* Toggle row */}
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 border-b active:bg-neutral-50 transition-colors"
            >
              <span className="text-sm font-semibold text-neutral-700">Resumo da compra</span>
              {expanded ? (
                <ChevronDownIcon size={16} className="text-neutral-500" />
              ) : (
                <ChevronUpIcon size={16} className="text-neutral-500" />
              )}
            </button>

            {/* Expanded detail */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pt-4">
                    <PriceBlock compact={false} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end justify-between gap-4 px-4 pt-3 pb-6">
              <div className="min-w-0">
                <PriceBlock compact />
              </div>

              <div className="shrink-0">
                <button
                  onClick={onContinue}
                  className="bg-brand text-white rounded-xl px-4 py-3.5 text-sm font-bold active:bg-brand-hover transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  )
}
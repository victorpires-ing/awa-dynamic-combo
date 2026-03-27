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
      <motion.div
        className="absolute z-100  bg-white rounded-2xl flex flex-col overflow-hidden"
        initial={{ y: '200' }}
        animate={{ y: 0 }}
        exit={{ y: '200' }}
        >
        <div className="fixed bottom-0 left-0 right-0 z-40" style={{ margin: '0 auto' }}>
          <div className="bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">

            {/* Toggle row */}
            <div
              className="w-full flex items-center justify-between px-4 py-2 border-b mb-4 active:bg-neutral-50 transition-colors"
            >
              <span className="text-sm font-semibold text-neutral-700">Resumo da compra</span>
              <ChevronUpIcon size={16} className="text-neutral-500" />
              
            </div>

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
                  <div className="px-4">
                    <PriceBlock compact={false} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className='flex flex-row justify-between'>
              <div className="px-4">
                <PriceBlock compact />
              </div>

              {/* CTA */}
              <div className="px-4 pb-6 pt-1">
                <button
                  onClick={onContinue}
                  className="w-full bg-brand text-white rounded-xl px-4 py-3.5 text-sm font-bold active:bg-brand-hover transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

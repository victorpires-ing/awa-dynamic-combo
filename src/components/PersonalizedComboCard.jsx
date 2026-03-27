import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, MinusIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'

export default function PersonalizedComboCard({ combo, quantidade, onQtyChange, isNew }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isNew && ref.current) {
      // Aguarda animação de entrada antes de scrollar
      const timer = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        boxShadow: isNew
          ? ['0 0 0 0px rgba(255,39,26,0)', '0 0 0 3px rgba(255,39,26,0.3)', '0 0 0 0px rgba(255,39,26,0)']
          : '0 0 0 0px rgba(255,39,26,0)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-3"
    >
      {/* Combo name */}
      <p className="text-sm font-bold text-neutral-900">{combo.nome}</p>

      {/* Date chips */}
      <div className="flex flex-wrap gap-1.5">
        {combo.datas.slice(0, 4).map((data) => (
          <span
            key={data.id}
            className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-full"
          >
            {data.diaSemana}, {data.data} • {data.hora}
          </span>
        ))}
        {combo.datas.length > 4 && (
          <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
            +{combo.datas.length - 4}
          </span>
        )}
      </div>

      {/* Price + quantity */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-neutral-900">
          {formatarPreco(combo.subtotal)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(-1)}
            disabled={quantidade <= 0}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors
              ${quantidade <= 0
                ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                : 'border-neutral-300 text-neutral-700 active:bg-neutral-100'
              }`}
          >
            <MinusIcon size={14} />
          </button>
          <span className="w-5 text-center text-sm font-semibold text-neutral-900">{quantidade}</span>
          <button
            onClick={() => onQtyChange(1)}
            className="w-8 h-8 rounded-lg border border-neutral-300 text-neutral-700 flex items-center justify-center active:bg-neutral-100 transition-colors"
          >
            <PlusIcon size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

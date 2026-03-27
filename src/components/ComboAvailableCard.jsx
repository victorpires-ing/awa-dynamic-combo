import { motion } from 'framer-motion'

export default function ComboAvailableCard({ combo, onPersonalizar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3"
    >
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-sm font-bold text-neutral-900 leading-5">{combo.nome}</p>
        {combo.descricao && (
          <p className="text-sm text-neutral-600 leading-5">{combo.descricao}</p>
        )}
      </div>
      <button
        onClick={() => onPersonalizar(combo)}
        className="flex-shrink-0 border border-neutral-300 rounded-md px-2.5 py-1.5 text-sm font-semibold text-neutral-700 bg-white shadow-xs active:bg-neutral-50 transition-colors"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 -2px 0 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)' }}
      >
        Personalizar
      </button>
    </motion.div>
  )
}

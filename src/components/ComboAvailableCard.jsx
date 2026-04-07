import { motion } from 'framer-motion'

function fmtDataShort(str) {
  if (!str) return ''
  const [d, m, y] = str.split('/')
  return `${d}/${m}/${y?.slice(-2) ?? ''}`
}

export default function ComboAvailableCard({ combo, onPersonalizar }) {
  const firstDate = combo.datas[0]?.data
  const firstHora = combo.datas[0]?.hora
  const sessionCount = combo.datas.length
  const lote = combo.ingressosPorData[0]?.subtitulo

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-neutral-200 rounded-xl p-4 flex items-start justify-between gap-3"
    >
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        
        <p className="text-sm font-bold text-neutral-900 leading-5">{combo.nome}</p>
        {firstDate && (
          <p className="text-sm font-medium text-gray-600 leading-5">
            <span className="bg-gray-100 px-2 py-0.5 rounded-full">{fmtDataShort(firstDate)}{firstHora ? `, ${firstHora}` : ''}</span> <span className="bg-gray-100 px-2 py-0.5 rounded-full">+{sessionCount} sessões</span>
          </p>
        )}
        {lote && (
          <p className="text-sm text-neutral-500 leading-5">{lote}</p>
        )}
        {combo.descricao && (
          <p className="text-sm text-neutral-500 leading-5">{combo.descricao}</p>
        )}
      </div>
      <button
        onClick={() => onPersonalizar(combo)}
        className="flex-shrink-0 border border-neutral-300 rounded-md px-3 py-1.5 text-sm font-semibold text-neutral-700 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 -2px 0 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)' }}
      >
        Selecionar
      </button>
    </motion.div>
  )
}

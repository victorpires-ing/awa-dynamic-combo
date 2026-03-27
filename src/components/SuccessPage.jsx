import { motion } from 'framer-motion'
import { CheckIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'

export default function SuccessPage({ evento, personalizedCombos, comboQtys, total, onReset }) {
  const items = personalizedCombos.filter((c) => (comboQtys[c.id] ?? 1) > 0)

  return (
    <motion.div
      className="mobile-frame flex flex-col min-h-dvh bg-white"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header mínimo */}
      <div className="flex items-center px-4 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-1.5" style={{ height: 32 }}>
          <img
            src="http://localhost:3845/assets/44c5aa2cbd7902413fe4c96d8d3af23a77ba64dc.svg"
            alt=""
            style={{ height: 32, width: 'auto' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <img
            src="http://localhost:3845/assets/8182aa5df93681c22a67edf833d064025fb30c8d.svg"
            alt="Ingresse"
            style={{ height: 32, width: 'auto' }}
            onError={(e) => {
              const el = document.createElement('span')
              el.style.cssText = 'font-size:18px;font-weight:700;color:#171717;letter-spacing:-0.5px;line-height:32px;font-family:Inter,sans-serif'
              el.textContent = 'INGRESSE'
              e.currentTarget.replaceWith(el)
            }}
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center px-5 py-10 gap-6">

        {/* Checkmark animado */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.15 }}
          className="w-20 h-20 rounded-full bg-success flex items-center justify-center shadow-sm"
        >
          <CheckIcon size={36} className="text-white" />
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center flex flex-col gap-1.5"
        >
          <h1 className="text-2xl font-bold text-neutral-900">Pedido confirmado!</h1>
          <p className="text-sm text-neutral-500">
            Seus ingressos foram reservados com sucesso.
          </p>
        </motion.div>

        {/* Card de resumo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl overflow-hidden"
        >
          {/* Evento */}
          <div className="px-4 py-3.5 border-b border-neutral-200 flex items-center gap-2.5">
            <img
              src={evento.imagemUrl}
              alt=""
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg,#c8102e,#003087)'
                e.currentTarget.style.objectFit = 'cover'
              }}
            />
            <div>
              <p className="text-sm font-bold text-neutral-900 leading-5">{evento.titulo}</p>
              <p className="text-xs text-neutral-500">{evento.subtitulo}</p>
            </div>
          </div>

          {/* Itens */}
          {items.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {items.map((combo) => {
                const qty = comboQtys[combo.id] ?? 1
                return (
                  <div key={combo.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{combo.nome}</p>
                      <p className="text-xs text-neutral-500">
                        {combo.datas.length} data{combo.datas.length > 1 ? 's' : ''} · {qty}x
                      </p>
                    </div>
                    <span className="text-sm font-bold text-neutral-900">
                      {formatarPreco(combo.subtotal * qty)}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-3">
              <p className="text-sm text-neutral-500">Ingressos avulsos selecionados</p>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-white border-t border-neutral-200">
            <span className="text-sm font-semibold text-neutral-700">Total pago</span>
            <span className="text-base font-bold text-neutral-900">{formatarPreco(total)}</span>
          </div>
        </motion.div>

        {/* Número de pedido mockado */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-neutral-400"
        >
          Pedido #ING-{Math.floor(100000 + Math.random() * 900000)}
        </motion.p>
      </div>

      {/* CTAs fixos */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 pb-10 pt-2 flex flex-col gap-3"
      >
        <button className="w-full bg-brand text-white py-3.5 rounded-xl text-sm font-bold active:bg-brand-hover transition-colors">
          Ir para meus ingressos
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 text-sm font-semibold text-neutral-500 active:text-neutral-700 transition-colors"
        >
          Voltar ao início
        </button>
      </motion.div>
    </motion.div>
  )
}

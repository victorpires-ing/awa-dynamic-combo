import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from './Icons.jsx'

export default function CouponModal({ open, onClose, onApply }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function handleApply() {
    const trimmed = code.trim()
    if (!trimmed) return
    const valid = onApply(trimmed)
    if (valid) {
      setCode('')
      setError('')
    } else {
      setError('Cupom inválido ou não encontrado.')
    }
  }

  function handleClose() {
    setCode('')
    setError('')
    onClose()
  }

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
          <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

          {/* Dialog — centered on all sizes */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-white rounded-2xl w-[calc(100%-2rem)] max-w-[400px] flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-1">
              <div className="flex flex-col gap-1 flex-1 min-w-0 pr-3">
                <h2 className="text-base font-bold text-neutral-900">
                  Adicionar código ou cupom
                </h2>
                <p className="text-sm text-neutral-500 leading-5">
                  Insira um código de desconto ou de desbloqueio de itens exclusivos
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors flex-shrink-0"
              >
                <XIcon size={16} />
              </button>
            </div>

            {/* Input */}
            <div className="px-5 py-4 flex flex-col gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="Digite o código ou cupom aqui"
                autoFocus
                className={`w-full border rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors
                  ${error ? 'border-red-400 focus:border-red-400' : 'border-neutral-200 focus:border-neutral-400'}`}
              />
              {error && (
                <p className="text-xs text-red-500 px-1">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
              <button
                onClick={handleClose}
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors px-2 py-1"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                disabled={!code.trim()}
                className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-colors
                  ${code.trim()
                    ? 'bg-brand text-white hover:bg-brand-hover'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
              >
                Aplicar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

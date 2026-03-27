import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon } from './Icons.jsx'

export default function Toast({ show, message = 'Combo adicionado' }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ maxWidth: 'calc(430px - 32px)', width: 'calc(100% - 32px)' }}
        >
          <div className="mx-auto bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 w-fit">
            <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <CheckIcon size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold whitespace-nowrap">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

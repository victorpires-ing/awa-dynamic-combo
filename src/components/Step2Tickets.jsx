import { motion } from 'framer-motion'
import { PlusIcon, MinusIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'

function QuantityControl({ value, onDecrement, onIncrement, disableIncrement }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        disabled={value <= 0}
        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors
          ${value <= 0
            ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
            : 'border-neutral-300 text-neutral-700 active:bg-neutral-100'
          }`}
      >
        <MinusIcon size={14} />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-neutral-900">{value}</span>
      <button
        onClick={onIncrement}
        disabled={disableIncrement}
        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors
          ${disableIncrement
            ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
            : 'border-neutral-300 text-neutral-700 active:bg-neutral-100'
          }`}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  )
}

export default function Step2Tickets({ combo, selectedDates, ticketQuantities, onQtyChange }) {
  const selectedDateObjects = combo.datas.filter((d) => selectedDates.includes(d.id))

  return (
    <div className="flex flex-col">
      {selectedDateObjects.map((date, idx) => {
        const dateQtys = ticketQuantities[date.id] || {}
        const totalParaData = Object.values(dateQtys).reduce((a, b) => a + b, 0)
        const limiteAtingido = totalParaData >= combo.maxIngressosPorData

        return (
          <motion.div
            key={date.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="px-5 pt-5"
          >
            {/* Date header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-900">{date.data}</span>
                <span className="text-neutral-300 text-xs">•</span>
                <span className="text-sm text-neutral-600">{date.hora}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-semibold ${limiteAtingido ? 'text-brand' : 'text-neutral-500'}`}>
                  {totalParaData} de {combo.maxIngressosPorData} ingresso{combo.maxIngressosPorData !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Ticket items */}
            <div className="flex flex-col gap-2 mb-1">
              {combo.ingressosPorData.map((ticket) => {
                const qty = dateQtys[ticket.id] || 0
                const canIncrement = !limiteAtingido || qty > 0

                return (
                  <div
                    key={ticket.id}
                    className="border border-neutral-200 rounded-xl p-3.5 bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-neutral-900">{ticket.nome}</span>
                        {ticket.subtitulo && (
                          <span className="text-xs text-neutral-500">{ticket.subtitulo}</span>
                        )}
                        <span className="text-sm font-semibold text-neutral-900 mt-1">
                          {formatarPreco(ticket.preco)}
                        </span>
                      </div>
                      <QuantityControl
                        value={qty}
                        onDecrement={() => onQtyChange(date.id, ticket.id, -1)}
                        onIncrement={() => onQtyChange(date.id, ticket.id, 1)}
                        disableIncrement={!canIncrement || (limiteAtingido && qty === 0)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )
      })}

    </div>
  )
}

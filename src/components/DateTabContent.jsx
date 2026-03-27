import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, MinusIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'

function TicketCard({ ticket, qty, onDecrement, onIncrement }) {
  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-white">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-neutral-900">{ticket.nome}</p>
          <p className="text-xs text-neutral-500 mt-0.5">{ticket.lote}</p>
          {ticket.descricao && (
            <p className="text-xs text-neutral-500 mt-2 leading-5">{ticket.descricao}</p>
          )}
          <p className="text-sm font-bold text-neutral-900 mt-2">{formatarPreco(ticket.preco)}</p>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-shrink-0">
          <button
            onClick={onDecrement}
            disabled={qty <= 0}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors
              ${qty <= 0 ? 'border-neutral-200 text-neutral-300 cursor-not-allowed' : 'border-neutral-300 text-neutral-700 active:bg-neutral-100'}`}
          >
            <MinusIcon size={14} />
          </button>
          <span className="w-5 text-center text-sm font-semibold text-neutral-900">{qty}</span>
          <button
            onClick={onIncrement}
            className="w-8 h-8 rounded-lg border border-neutral-300 text-neutral-700 flex items-center justify-center active:bg-neutral-100 transition-colors"
          >
            <PlusIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function GrupoAccordion({ grupo, qtys, onQtyChange }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white active:bg-neutral-50 transition-colors"
      >
        <span className="text-sm font-bold text-neutral-900">{grupo.nome}</span>
        {open
          ? <ChevronUpIcon size={16} className="text-neutral-500" />
          : <ChevronDownIcon size={12} className="text-neutral-500" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 pb-4">
              {grupo.ingressos.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  qty={qtys[ticket.id] || 0}
                  onDecrement={() => onQtyChange(ticket.id, -1)}
                  onIncrement={() => onQtyChange(ticket.id, 1)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Controlled component — qtys e onQtyChange vêm do App
export default function DateTabContent({ data, qtys, onQtyChange }) {
  const [activeHorario, setActiveHorario] = useState(data.horarios[0])

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div>
        <p className="text-sm font-medium text-neutral-600 mb-3">Horários disponíveis</p>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {data.horarios.map((h) => (
            <button
              key={h}
              onClick={() => setActiveHorario(h)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors
                ${activeHorario === h
                  ? 'border-brand text-brand bg-red-50'
                  : 'border-neutral-200 text-neutral-700 bg-white'
                }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {data.grupos.map((grupo) => (
          <GrupoAccordion
            key={grupo.id}
            grupo={grupo}
            qtys={qtys}
            onQtyChange={onQtyChange}
          />
        ))}
      </div>

      <div className="h-52" />
    </div>
  )
}

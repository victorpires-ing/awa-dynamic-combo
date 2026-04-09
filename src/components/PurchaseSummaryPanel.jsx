import { motion, AnimatePresence } from 'framer-motion'
import { formatarPreco } from '../data/mockData.js'
import { Ticket } from 'lucide-react'
import { InfoCircleIcon } from './Icons.jsx'


const imgTicketIcon = 'http://localhost:3845/assets/e7f3c537741866b598fee4f4c727398f7ab7f8c3.svg'

function fmtData(str) {
  if (!str) return ''
  const [d, m, y] = str.split('/')
  return `${d}/${m}/${y?.slice(-2) || ''}`
}

function TicketBadge({ qty }) {
  return (
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-[6px] overflow-hidden bg-[#f4f4f4]">
      <div className="flex items-center gap-0.5 px-1">
        <span className="text-sm font-bold text-[#181818] leading-none">{qty}</span>
        <span className='rotate-90'>
          <Ticket size={18} color='#909090' />
        </span>
      </div>
    </div>
  )
}

function ComboSummaryRow({ item, onRemove }) {
  const datesStr = item.datas.length > 1
    ? `${fmtData(item.datas[0].data)} +${item.datas.length - 1} sessão`
    : fmtData(item.datas[0]?.data || '')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <TicketBadge qty={1} />
        <div className="flex flex-1 gap-2 items-start min-w-0">
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className="text-sm font-bold text-[#181818] truncate">{item.nome}</p>
            {item.lote && (
              <p className="text-sm text-[#464646] leading-5 truncate">{item.lote}</p>
            )}
            {/* Ticket name + date on the same line */}
            {item.ticketNome && (
              <p className="text-sm text-[#464646] leading-5 truncate">
                {item.ticketNome}
                {datesStr && <span className="text-[#909090]"> · {datesStr}</span>}
              </p>
            )}
            {!item.ticketNome && datesStr && (
              <p className="text-sm text-[#909090] tracking-[0.28px]">{datesStr}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <p className="text-sm font-semibold text-[#181818] text-right">{formatarPreco(item.subtotal)}</p>
            <button
              onClick={onRemove}
              className="text-[12px] text-[#909090] underline decoration-solid tracking-[0.24px] whitespace-nowrap"
            >
              Remover
            </button>
          </div>
        </div>
      </div>

      {/* Sub-items */}
      {item.subItems?.length > 0 && (
        <div className="pl-14 flex flex-col gap-1.5">
          {item.subItems.map((sub, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#f4f4f4] flex items-center justify-center flex-shrink-0 px-1">
                <span className="text-[12px] font-medium text-[#181818] text-center leading-none">{sub.qty}</span>
              </div>
              <span className="text-sm text-[#464646] truncate">
                {sub.data && <span className="text-[#909090]">{fmtData(sub.data)} · </span>}
                {sub.nome}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DateSummaryRow({ item, onRemove }) {
  return (
    <div className="flex items-start gap-2">
      <TicketBadge qty={item.qty} />
      <div className="flex flex-1 gap-2 items-start min-w-0">
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <p className="text-sm font-bold text-[#181818] truncate">{item.grupoNome}</p>
          <p className="text-sm text-[#464646] leading-5 truncate">
            {item.ticketNome}
            {item.dataStr && <span className="text-[#909090]"> · {item.dataStr}</span>}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p className="text-sm font-semibold text-[#181818] text-right">{formatarPreco(item.preco)}</p>
          <button
            onClick={onRemove}
            className="text-[12px] text-[#909090] underline decoration-solid tracking-[0.24px] whitespace-nowrap"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PurchaseSummaryPanel({
  expanded,
  onToggle,
  total,
  comboItems,
  dateItems,
  onRemoveCombo,
  onRemoveDateItem,
  onClearAll,
  onContinue,
  discountAmount,
  discountPercent,
  finalTotal,
}) {
  const totalItems = comboItems.length + dateItems.length

  return (
    <>
      {/* ── Backdrop — visible only when expanded ─────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[39] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* ── Panel — full width, always at bottom ──────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-[16px] flex flex-col"
        style={{
          border: '1px solid #d5d5d5',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header — toggle */}
        <button
          onClick={onToggle}
          className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b"
          style={{ background: 'rgba(249,250,251,0.5)', borderColor: '#f3f4f6' }}
        >
          <span className="text-sm font-medium text-[#101828]">Resumo da compra</span>
          <motion.div animate={{ rotate: expanded ? 0 : 180 }} transition={{ duration: 0.2 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 11.25L9 6.75L13.5 11.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </button>

        {/* Items — scrollable, only when expanded */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="items"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="overflow-hidden"
            >
              <div className="overflow-y-auto" style={{ maxHeight: '55dvh' }}>
                {/* Section header */}
                <div className="flex items-center gap-2 px-4 pt-4 pb-3">
                  <span className="text-[12px] font-bold text-[#464646] tracking-[0.24px] whitespace-nowrap">
                    Ingressos
                  </span>
                  <div className="flex-1 border-t-2 border-dashed border-[#d5d5d5]" />
                  <button
                    onClick={onClearAll}
                    className="text-[12px] text-[#909090] underline tracking-[0.24px] whitespace-nowrap"
                  >
                    Limpar tudo
                  </button>
                </div>

                {/* Items list */}
                <div className="px-4 pb-4 flex flex-col gap-4">
                  {comboItems.map((item) => (
                    <ComboSummaryRow
                      key={item.id}
                      item={item}
                      onRemove={() => onRemoveCombo(item.id)}
                    />
                  ))}
                  {dateItems.map((item) => (
                    <DateSummaryRow
                      key={item.id}
                      item={item}
                      onRemove={() => onRemoveDateItem(item.tabId, item.ticketId)}
                    />
                  ))}
                  {totalItems === 0 && (
                    <p className="text-sm text-[#909090] text-center py-4">Nenhum ingresso selecionado</p>
                  )}
                </div>
                {discountAmount > 0 && totalItems > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100">
                    <span className="text-sm text-[#464646]">Descontos</span>
                    <span className="text-sm font-semibold text-green-600">-{formatarPreco(discountAmount)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer — always visible */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-4 py-4"
          style={{ borderTop: '1px solid #e6e6e6' }}
        >
          <div className="flex flex-col gap-0.5">
            {discountAmount > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-sm line-through text-neutral-400">{formatarPreco(total)}</span>
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{discountPercent}% OFF</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-base font-medium text-[#181818]">{formatarPreco(discountAmount > 0 ? finalTotal : total)}</span>
              <span className="text-sm text-[#464646] tracking-[0.28px]">+ taxas</span>
              <InfoCircleIcon size={14} className="text-[#2A89EF] flex-shrink-0" />
            </div>
          </div>
          <button
            onClick={onContinue}
            className="bg-brand text-white text-sm font-medium rounded-xl px-5 py-3 active:opacity-80 transition-opacity whitespace-nowrap"
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  )
}

import { InfoCircleIcon } from './Icons.jsx'
import { formatarPreco } from '../data/mockData.js'
import { Ticket } from 'lucide-react'

function TicketBadge({ qty }) {
  return (
    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-[6px] bg-[#f4f4f4]">
      <div className="flex items-center gap-0.5 px-1">
        <span className="text-xs font-bold text-[#181818] leading-none">{qty}</span>
        <span className='rotate-90'>
          <Ticket size={18} color='#909090' />
        </span>
      </div>
    </div>
  )
}

function fmtData(str) {
  if (!str) return ''
  const [d, m, y] = str.split('/')
  return `${d}/${m}/${y?.slice(-2) ?? ''}`
}

function ComboRow({ item, onRemove }) {
  const d0 = item.datas[0]
  const datesStr = item.datas.length > 1
    ? `${fmtData(d0?.data)}${d0?.hora ? `, ${d0.hora}` : ''} +${item.datas.length - 1} sessão`
    : `${fmtData(d0?.data ?? '')}${d0?.hora ? `, ${d0.hora}` : ''}`

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <TicketBadge qty={1} />
        <div className="flex flex-1 gap-2 items-start min-w-0">
          <div className="flex-1 flex flex-col gap-0.5 min-w-0">
            <p className="text-sm font-bold text-[#181818] truncate">{item.nome}</p>
            {item.lote && (
              <p className="text-sm text-[#464646] leading-5 truncate">{item.lote}</p>
            )}
            {/* Ticket name + date on the same line */}
            {item.ticketNome && (
              <p className="text-sm text-[#464646] leading-5 truncate">
                <span className="text-[#909090]">{datesStr}</span>
              </p>
            )}
            {!item.ticketNome && datesStr && (
              <p className="text-xs text-[#909090]">{datesStr}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <p className="text-sm font-semibold text-[#181818]">{formatarPreco(item.subtotal)}</p>
            <button
              onClick={onRemove}
              className="text-[11px] text-[#909090] underline tracking-[0.22px]"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
      {item.subItems?.length > 0 && (
        <div className="pl-12 flex flex-col gap-1">
          {item.subItems.map((sub, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#f4f4f4] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-medium text-[#181818]">{sub.qty}</span>
              </div>
              <span className="text-xs text-[#464646] truncate">
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

function DateRow({ item, onRemove }) {
  return (
    <div className="flex items-start gap-2">
      <TicketBadge qty={item.qty} />
      <div className="flex flex-1 gap-2 items-start min-w-0">
        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-bold text-[#181818] truncate">{item.grupoNome}</p>
          <p className="text-sm text-[#464646] leading-5 truncate">
            {item.ticketNome}
            {item.dataStr && <span className="text-[#909090]"> · {item.dataStr}</span>}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p className="text-sm font-semibold text-[#181818]">{formatarPreco(item.preco)}</p>
          <button
            onClick={onRemove}
            className="text-[11px] text-[#909090] underline tracking-[0.22px]"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 gap-3">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="text-neutral-300">
        <rect x="4" y="12" width="48" height="32" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M16 28h8M28 22v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M38 26h4M38 30h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-500">Seu carrinho está vazio,</p>
        <p className="text-sm text-neutral-400">Escolha um item.</p>
      </div>
    </div>
  )
}

export default function PurchaseSummarySidebar({
  total,
  comboItems,
  dateItems,
  onRemoveCombo,
  onRemoveDateItem,
  onClearAll,
  onContinue,
  resumo,
}) {
  const hasItems = comboItems.length + dateItems.length > 0

  return (
    <div
      className="bg-white rounded-xl border border-neutral-200 flex flex-col overflow-hidden sticky top-6"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* ── Coupon section ─────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-neutral-100">
        <h3 className="text-sm font-semibold text-neutral-700">Resumo da compra</h3>
      </div>

      {/* ── Summary title ──────────────────────────────────────── */}


      {/* ── Items area ─────────────────────────────────────────── */}
      <div className="overflow-y-auto" style={{ maxHeight: 380 }}>
        {!hasItems ? (
          <EmptyCart />
        ) : (
          <div className="px-4 pb-4">
            {/* Section header */}
            <div className="flex items-center gap-2 py-3">
              <span className="text-[11px] font-bold text-[#464646] tracking-[0.22px] whitespace-nowrap">
                Ingressos
              </span>
              <div className="flex-1 border-t-2 border-dashed border-[#d5d5d5]" />
              <button
                onClick={onClearAll}
                className="text-[11px] text-[#909090] underline tracking-[0.22px] whitespace-nowrap"
              >
                Limpar tudo
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {comboItems.map((item) => (
                <ComboRow key={item.id} item={item} onRemove={() => onRemoveCombo(item.id)} />
              ))}
              {dateItems.map((item) => (
                <DateRow
                  key={item.id}
                  item={item}
                  onRemove={() => onRemoveDateItem(item.tabId, item.ticketId)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className="px-4 py-4 border-t border-neutral-200 mt-auto">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-base font-semibold text-[#181818]">
              {formatarPreco(hasItems ? total : (resumo?.precoFinal ?? 0))}
            </span>
            <span className="text-sm text-[#464646] flex-shrink-0">+ taxas</span>
            <InfoCircleIcon size={14} className="text-[#2A89EF] flex-shrink-0" />
          </div>
          <button
            onClick={onContinue}
            disabled={!hasItems}
            className={`flex-shrink-0 text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors whitespace-nowrap
              ${hasItems
                ? 'bg-brand text-white hover:bg-brand-hover'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

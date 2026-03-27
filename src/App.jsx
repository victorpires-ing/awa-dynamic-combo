import { useState, useCallback, useMemo } from 'react'
import Header from './components/Header.jsx'
import EventCard from './components/EventCard.jsx'
import TabNav from './components/TabNav.jsx'
import ComboDinamicoTab from './components/ComboDinamicoTab.jsx'
import DateTabContent from './components/DateTabContent.jsx'
import PersonalizeModal from './components/PersonalizeModal.jsx'
import PurchaseSummaryPanel from './components/PurchaseSummaryPanel.jsx'
import SuccessPage from './components/SuccessPage.jsx'
import Toast from './components/Toast.jsx'
import { evento, combosDisponiveis, datasAvulsas, resumoCompra } from './data/mockData.js'

const TABS = [
  { id: 'combo', type: 'combo', label: 'Combo dinâmico' },
  ...datasAvulsas.map((d) => ({
    id: d.id,
    type: 'date',
    label: `${d.diaSemana} ${d.dia} ${d.mes}`,
    diaSemana: d.diaSemana,
    dia: d.dia,
    mes: d.mes,
    ano: d.ano,
  })),
]

export default function App() {
  const [page, setPage] = useState('purchase')
  const [activeTab, setActiveTab] = useState('combo')

  // ── Modal ────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false)
  const [activeCombo, setActiveCombo] = useState(null)
  const [step, setStep] = useState(1)
  const [selectedDates, setSelectedDates] = useState([])
  const [ticketQuantities, setTicketQuantities] = useState({})

  // ── Combos adicionados (vão direto ao summary) ───────────────────
  const [personalizedCombos, setPersonalizedCombos] = useState([])

  // ── Ingressos avulsos — estado controlado aqui ───────────────────
  // { tabId: { ticketId: qty } }
  const [dateTabQtys, setDateTabQtys] = useState({})

  // ── Summary panel ─────────────────────────────────────────────────
  const [summaryExpanded, setSummaryExpanded] = useState(false)

  // ── Toast ─────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ show: false, message: '' })

  function showToast(message) {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  // ── Derivações ───────────────────────────────────────────────────

  const combosTotal = useMemo(() =>
    personalizedCombos.reduce((s, c) => s + c.subtotal, 0),
    [personalizedCombos]
  )

  const dateTotal = useMemo(() => {
    let total = 0
    datasAvulsas.forEach((data) => {
      const qtys = dateTabQtys[data.id] || {}
      data.grupos.forEach((grupo) => {
        grupo.ingressos.forEach((ticket) => {
          total += ticket.preco * (qtys[ticket.id] || 0)
        })
      })
    })
    return total
  }, [dateTabQtys])

  const grandTotal = combosTotal + dateTotal
  const hasAnyItem = grandTotal > 0

  // Items para o summary panel — ingressos avulsos
  const summaryDateItems = useMemo(() => {
    const items = []
    datasAvulsas.forEach((data) => {
      const qtys = dateTabQtys[data.id] || {}
      data.grupos.forEach((grupo) => {
        grupo.ingressos.forEach((ticket) => {
          const qty = qtys[ticket.id] || 0
          if (qty > 0) {
            items.push({
              id: `${data.id}-${ticket.id}`,
              tabId: data.id,
              ticketId: ticket.id,
              grupoNome: grupo.nome,
              ticketNome: ticket.nome,
              qty,
              preco: ticket.preco * qty,
              dataStr: `${data.dia}/${data.mes.slice(0, 3)}/${data.ano.slice(-2)}`,
            })
          }
        })
      })
    })
    return items
  }, [dateTabQtys])

  // ── Handlers: modal ──────────────────────────────────────────────

  const handlePersonalizar = useCallback((combo) => {
    const mandatory = combo.datas.filter((d) => d.obrigatoria).map((d) => d.id)
    setActiveCombo(combo)
    setSelectedDates(mandatory)
    setTicketQuantities({})
    setStep(1)
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setTimeout(() => {
      setActiveCombo(null)
      setSelectedDates([])
      setTicketQuantities({})
      setStep(1)
    }, 350)
  }, [])

  const handleToggleDate = useCallback((dateId) => {
    if (!activeCombo) return
    const isObrigatoria = activeCombo.datas.find((d) => d.id === dateId)?.obrigatoria
    if (isObrigatoria) return
    setSelectedDates((prev) => {
      if (prev.includes(dateId)) return prev.filter((id) => id !== dateId)
      if (prev.length >= activeCombo.maxDatas) return prev
      return [...prev, dateId]
    })
  }, [activeCombo])

  const handleContinue = useCallback(() => {
    const initQtys = {}
    selectedDates.forEach((dateId) => {
      initQtys[dateId] = {}
      activeCombo.ingressosPorData.forEach((t) => { initQtys[dateId][t.id] = 0 })
    })
    setTicketQuantities(initQtys)
    setStep(2)
  }, [selectedDates, activeCombo])

  const handleQtyChange = useCallback((dateId, ticketId, delta) => {
    setTicketQuantities((prev) => {
      const datePrev = prev[dateId] || {}
      const current = datePrev[ticketId] || 0
      const totalDate = Object.values(datePrev).reduce((a, b) => a + b, 0)
      if (delta > 0 && totalDate >= activeCombo.maxIngressosPorData) return prev
      if (delta < 0 && current <= 0) return prev
      return { ...prev, [dateId]: { ...datePrev, [ticketId]: current + delta } }
    })
  }, [activeCombo])

  const handleAddCombo = useCallback(() => {
    const id = `combo-${Date.now()}`
    const selectedDateObjects = activeCombo.datas.filter((d) => selectedDates.includes(d.id))

    // Calcula subtotal e monta sub-items
    const subItems = []
    let subtotal = 0
    let totalTickets = 0

    selectedDateObjects.forEach((date) => {
      const dateQtys = ticketQuantities[date.id] || {}
      activeCombo.ingressosPorData.forEach((ticket) => {
        const qty = dateQtys[ticket.id] || 0
        if (qty > 0) {
          subItems.push({ qty, nome: ticket.nome })
          subtotal += ticket.preco * qty
          totalTickets += qty
        }
      })
    })

    if (subtotal === 0) {
      subtotal = activeCombo.ingressosPorData[0].preco * selectedDateObjects.length
      totalTickets = selectedDateObjects.length
    }

    const newCombo = {
      id,
      comboId: activeCombo.id,
      nome: activeCombo.nome,
      ticketNome: activeCombo.ingressosPorData[0]?.nome,
      datas: selectedDateObjects,
      subtotal,
      totalTickets,
      subItems,
    }

    setPersonalizedCombos((prev) => [...prev, newCombo])
    setModalOpen(false)
    setSummaryExpanded(true) // abre o summary automaticamente
    showToast('Combo adicionado com sucesso!')

    setTimeout(() => {
      setActiveCombo(null)
      setSelectedDates([])
      setTicketQuantities({})
      setStep(1)
    }, 350)
  }, [activeCombo, selectedDates, ticketQuantities])

  // ── Handlers: ingressos avulsos ──────────────────────────────────

  const handleDateQtyChange = useCallback((tabId, ticketId, delta) => {
    setDateTabQtys((prev) => {
      const tabQtys = prev[tabId] || {}
      const current = tabQtys[ticketId] || 0
      const wasZero = Object.values(tabQtys).every((q) => q === 0)
      const next = Math.max(0, current + delta)
      const newTabQtys = { ...tabQtys, [ticketId]: next }
      const isNowPositive = Object.values(newTabQtys).some((q) => q > 0)
      if (wasZero && isNowPositive) {
        setTimeout(() => showToast('Ingresso adicionado!'), 0)
        setTimeout(() => setSummaryExpanded(true), 100)
      }
      return { ...prev, [tabId]: newTabQtys }
    })
  }, [])

  // ── Handlers: summary ────────────────────────────────────────────

  const handleRemoveCombo = useCallback((id) => {
    setPersonalizedCombos((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const handleRemoveDateItem = useCallback((tabId, ticketId) => {
    setDateTabQtys((prev) => {
      const tabQtys = { ...(prev[tabId] || {}), [ticketId]: 0 }
      return { ...prev, [tabId]: tabQtys }
    })
  }, [])

  const handleClearAll = useCallback(() => {
    setPersonalizedCombos([])
    setDateTabQtys({})
    setSummaryExpanded(false)
  }, [])

  // ── Reset ─────────────────────────────────────────────────────────

  function handleReset() {
    setPage('purchase')
    setPersonalizedCombos([])
    setDateTabQtys({})
    setSummaryExpanded(false)
    setActiveTab('combo')
  }

  const activeDataTab = datasAvulsas.find((d) => d.id === activeTab)

  // ── Render ───────────────────────────────────────────────────────

  if (page === 'success') {
    return (
      <SuccessPage
        evento={evento}
        personalizedCombos={personalizedCombos}
        comboQtys={{}}
        total={grandTotal}
        onReset={handleReset}
      />
    )
  }

  return (
    <div className="mobile-frame">
      {/* Header — scrolla com a página */}
      <div className="bg-white">
        <Header />
        <div className="px-4 pt-1 pb-3">
          <button
            className="flex items-center gap-1.5 border border-neutral-300 rounded-md px-3 py-1.5 bg-white active:bg-neutral-50 transition-colors"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 -2px 0 0 rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-700">
              <path d="M9 1.5H3.5a1 1 0 0 0-1 1v5L8.5 14l5-5L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor" />
            </svg>
            <span className="text-sm font-semibold text-neutral-700">Usar código/cupom</span>
          </button>
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div className="flex flex-col gap-3">
        <EventCard evento={evento} />
        <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'combo' ? (
          <ComboDinamicoTab
            combos={combosDisponiveis}
            onPersonalizar={handlePersonalizar}
            hasItems={hasAnyItem}
          />
        ) : activeDataTab ? (
          <DateTabContent
            key={activeDataTab.id}
            data={activeDataTab}
            qtys={dateTabQtys[activeDataTab.id] || {}}
            onQtyChange={(ticketId, delta) => handleDateQtyChange(activeDataTab.id, ticketId, delta)}
          />
        ) : null}
      </div>

      {/* Modal de personalização */}
      <PersonalizeModal
        open={modalOpen}
        combo={activeCombo}
        step={step}
        selectedDates={selectedDates}
        ticketQuantities={ticketQuantities}
        onClose={handleModalClose}
        onToggleDate={handleToggleDate}
        onContinue={handleContinue}
        onQtyChange={handleQtyChange}
        onAddCombo={handleAddCombo}
      />

      {/* Summary panel — aparece ao adicionar qualquer item */}
      {hasAnyItem && (
        <PurchaseSummaryPanel
          expanded={summaryExpanded}
          onToggle={() => setSummaryExpanded((v) => !v)}
          total={grandTotal}
          comboItems={personalizedCombos}
          dateItems={summaryDateItems}
          onRemoveCombo={handleRemoveCombo}
          onRemoveDateItem={handleRemoveDateItem}
          onClearAll={handleClearAll}
          onContinue={() => setPage('success')}
        />
      )}

      {/* Toast */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  )
}

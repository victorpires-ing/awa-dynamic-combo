import { useState, useCallback, useMemo } from 'react'
import Header from './components/Header.jsx'
import DesktopPageHeader from './components/DesktopPageHeader.jsx'
import EventCard from './components/EventCard.jsx'
import TabNav from './components/TabNav.jsx'
import ComboDinamicoTab from './components/ComboDinamicoTab.jsx'
import DateTabContent from './components/DateTabContent.jsx'
import PersonalizeModal from './components/PersonalizeModal.jsx'
import PurchaseSummaryPanel from './components/PurchaseSummaryPanel.jsx'
import PurchaseSummarySidebar from './components/PurchaseSummarySidebar.jsx'
import SuccessPage from './components/SuccessPage.jsx'
import Toast from './components/Toast.jsx'
import { TagIcon } from './components/Icons.jsx'
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
  const [selectedDates, setSelectedDates] = useState([])
  const [ticketQuantities, setTicketQuantities] = useState({})

  // ── Combos adicionados ───────────────────────────────────────────
  const [personalizedCombos, setPersonalizedCombos] = useState([])
  const [editingComboId, setEditingComboId] = useState(null)

  // ── Ingressos avulsos ────────────────────────────────────────────
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
    const allDateIds = combo.datas.map((d) => d.id)
    const initQtys = {}
    allDateIds.forEach((dateId) => {
      initQtys[dateId] = {}
      combo.ingressosPorData.forEach((t) => { initQtys[dateId][t.id] = 0 })
    })
    setEditingComboId(null)
    setActiveCombo(combo)
    setSelectedDates(allDateIds)
    setTicketQuantities(initQtys)
    setModalOpen(true)
  }, [])

  const handleEditar = useCallback((personalizedId) => {
    const existing = personalizedCombos.find((c) => c.id === personalizedId)
    if (!existing) return
    const combo = combosDisponiveis.find((c) => c.id === existing.comboId)
    if (!combo) return
    setEditingComboId(personalizedId)
    setActiveCombo(combo)
    setSelectedDates(existing.datas.map((d) => d.id))
    setTicketQuantities(existing.savedQtys ?? {})
    setModalOpen(true)
  }, [personalizedCombos])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setTimeout(() => {
      setEditingComboId(null)
      setActiveCombo(null)
      setSelectedDates([])
      setTicketQuantities({})
    }, 350)
  }, [])

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

    const subItems = []
    let subtotal = 0
    let totalTickets = 0

    selectedDateObjects.forEach((date) => {
      const dateQtys = ticketQuantities[date.id] || {}
      activeCombo.ingressosPorData.forEach((ticket) => {
        const qty = dateQtys[ticket.id] || 0
        if (qty > 0) {
          subItems.push({ qty, nome: ticket.nome, data: date.data })
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
      id: editingComboId ?? id,
      comboId: activeCombo.id,
      nome: activeCombo.nome,
      ticketNome: activeCombo.ingressosPorData[0]?.nome,
      datas: selectedDateObjects,
      subtotal,
      totalTickets,
      subItems,
      savedQtys: ticketQuantities,
    }

    if (editingComboId) {
      setPersonalizedCombos((prev) => prev.map((c) => c.id === editingComboId ? newCombo : c))
      showToast('Combo atualizado!')
    } else {
      setPersonalizedCombos((prev) => [...prev, newCombo])
      setSummaryExpanded(true)
      showToast('Combo adicionado com sucesso!')
    }

    setModalOpen(false)
    setTimeout(() => {
      setEditingComboId(null)
      setActiveCombo(null)
      setSelectedDates([])
      setTicketQuantities({})
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

  function handleReset() {
    setPage('purchase')
    setPersonalizedCombos([])
    setDateTabQtys({})
    setSummaryExpanded(false)
    setActiveTab('combo')
  }

  const activeDataTab = datasAvulsas.find((d) => d.id === activeTab)

  // ── Success page ─────────────────────────────────────────────────

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

  // ── Purchase page ─────────────────────────────────────────────────

  return (
    <div className="mobile-frame">
      {/* ── Header ──────────────────────────────────────────────── */}
      <Header evento={evento} />

      {/* ── Desktop sub-header (hidden on mobile) ───────────────── */}
      <div className="hidden lg:block">
        <DesktopPageHeader />
      </div>

      {/* ── Main content area ───────────────────────────────────── */}
      <div className="lg:max-w-[1320px] lg:mx-auto lg:px-8 lg:py-6">
        <div className="lg:flex lg:gap-6 lg:items-start">

          {/* ── Left column: tabs + content ─────────────────────── */}
          <div className="lg:flex-1 lg:min-w-0 lg:bg-white lg:rounded-xl lg:border lg:border-neutral-200 lg:overflow-hidden" style={{ boxShadow: 'var(--tw-shadow, 0 2px 8px rgba(0,0,0,0.06))' }}>

            {/* Tab navigation */}
            <div className="py-3 lg:px-0 lg:pt-4 lg:pb-0">
              <TabNav tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Tab content */}
            <div>
              {activeTab === 'combo' ? (
                <ComboDinamicoTab
                  combos={combosDisponiveis}
                  selectedCombos={personalizedCombos}
                  onPersonalizar={handlePersonalizar}
                  onEditar={handleEditar}
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
          </div>

          {/* ── Right column: desktop sidebar (hidden on mobile) ─── */}
          <div className="hidden lg:block lg:w-[360px] xl:w-[400px] flex-shrink-0">
            <PurchaseSummarySidebar
              total={grandTotal}
              comboItems={personalizedCombos}
              dateItems={summaryDateItems}
              onRemoveCombo={handleRemoveCombo}
              onRemoveDateItem={handleRemoveDateItem}
              onClearAll={handleClearAll}
              onContinue={() => setPage('success')}
              resumo={resumoCompra}
            />
          </div>

        </div>
      </div>

      {/* ── Mobile floating summary panel (hidden on desktop) ───── */}
      {hasAnyItem && (
        <div className="lg:hidden">
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
        </div>
      )}

      {/* ── Personalize modal ────────────────────────────────────── */}
      <PersonalizeModal
        open={modalOpen}
        combo={activeCombo}
        selectedDates={selectedDates}
        ticketQuantities={ticketQuantities}
        onClose={handleModalClose}
        onQtyChange={handleQtyChange}
        onAddCombo={handleAddCombo}
      />

      {/* ── Toast ────────────────────────────────────────────────── */}
      <Toast show={toast.show} message={toast.message} />
    </div>
  )
}

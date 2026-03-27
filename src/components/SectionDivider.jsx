export default function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-neutral-200" />
      <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  )
}

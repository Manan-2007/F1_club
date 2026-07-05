const variantStyles = {
  active: 'text-f1-green border-f1-green/30',
  upcoming: 'text-f1-green border-f1-green/30',
  planned: 'text-f1-silver/50 border-white/10',
  tbd: 'text-f1-silver/50 border-white/10',
  completed: 'text-f1-silver/40 border-white/[0.08]',
}

export default function Badge({ label, variant = 'planned' }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-widest border px-2 py-0.5 ${variantStyles[variant] || variantStyles.planned}`}
    >
      <span className={variant === 'completed' ? 'line-through opacity-70' : ''}>
        {label}
      </span>
    </span>
  )
}

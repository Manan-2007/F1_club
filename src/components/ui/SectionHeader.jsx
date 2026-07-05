import { Link } from 'react-router-dom'

export default function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
      <div className="flex flex-col gap-4">
        <div className="section-tag">
          <span className="f1-eyebrow">{eyebrow}</span>
        </div>
        <h2 className="f1-heading text-3xl sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="text-f1-silver text-sm font-light max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className="text-xs uppercase tracking-widest text-f1-silver hover:text-f1-red transition-colors duration-300 shrink-0"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

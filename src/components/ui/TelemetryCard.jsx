import { motion } from 'framer-motion'
import { cardVariants } from '@/lib/motion'

export default function TelemetryCard({ children, className = '', onClick }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
      className={`telemetry-card group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <span className="absolute top-0 left-0 w-[2px] h-[2px] bg-f1-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </motion.div>
  )
}

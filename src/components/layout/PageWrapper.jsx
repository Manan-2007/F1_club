import { motion } from 'framer-motion'
import { pageVariants } from '@/lib/motion'

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-f1-bg min-h-screen"
    >
      {children}
    </motion.div>
  )
}

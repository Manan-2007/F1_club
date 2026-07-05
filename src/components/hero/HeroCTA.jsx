import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.45,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const primaryHover = {
  rest: { scale: 1, x: 0 },
  hover: { scale: 1.02, x: 2, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.98 },
}

const outlineHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
}

export default function HeroCTA() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-10 sm:mt-12 w-full sm:w-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Primary CTA */}
      <motion.div variants={buttonVariants} className="w-full sm:w-auto">
        <motion.div
          variants={primaryHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/join" className="btn-primary flex items-center gap-3">
            <span>Join the Grid</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Outline CTA */}
      <motion.div variants={buttonVariants} className="w-full sm:w-auto">
        <motion.div
          variants={outlineHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/projects" className="btn-outline flex items-center gap-3">
            <span>Explore Projects</span>
            <motion.span
              className="inline-block text-f1-silver"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Live indicator */}
      <motion.div variants={buttonVariants} className="flex items-center gap-2 sm:ml-2">
        <span className="w-2 h-2 rounded-full bg-f1-green animate-pulse-slow" />
        <span className="f1-mono !text-xs">SEASON ACTIVE</span>
      </motion.div>
    </motion.div>
  )
}

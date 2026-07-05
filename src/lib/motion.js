// Shared Framer Motion variants — single source of truth for page and card motion.

export const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 100% 0 0)',
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
    // clip-path creates a containing block for fixed descendants (e.g. the
    // Gallery lightbox), so clear it once the wipe finishes.
    transitionEnd: { clipPath: 'none' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const cardVariants = {
  rest: { y: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  hover: { y: -4, scale: 1.01, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

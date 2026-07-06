import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'

const filters = ['All', 'Events', 'Workshops', 'Community', 'Behind the Scenes']

// Placeholder gradients, cycled by index, for gallery items that don't yet
// have an uploaded image.
const FALLBACK_GRADIENTS = [
  'from-[#1a0000] to-f1-carbon',
  'from-f1-carbon to-[#0a0a1a]',
  'from-[#0d1a0d] to-f1-carbon',
  'from-[#1a1000] to-f1-carbon',
  'from-[#0a1a0a] to-f1-surface',
  'from-f1-surface to-f1-carbon',
  'from-[#1a0a00] to-f1-carbon',
  'from-[#00101a] to-f1-surface',
  'from-[#1a0000] to-[#0a0010]',
  'from-f1-carbon to-[#1a1a00]',
  'from-[#001a10] to-f1-carbon',
  'from-[#1a0005] to-f1-surface',
]

const SPAN_CLASSES = {
  normal: '',
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  featured: 'col-span-2 md:row-span-2',
}

export default function Gallery() {
  const [items, setItems] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/gallery')
      const rows = await res.json()
      setItems(
        rows.map((row, i) => ({
          id: row.id,
          label: row.title,
          date: row.dateLabel ?? '',
          span: SPAN_CLASSES[row.span] ?? '',
          gradient: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
          imageUrl: row.imageUrl ?? null,
        }))
      )
    }
    load()
  }, [])

  // Grid items scale in, flowing left→right top→bottom — re-run once
  // API data actually populates the grid.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        stagger: { amount: 0.8, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
    }, gridRef)
    // Masonry rows make this page's height settle late
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [items])

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Media"
        title="Gallery"
        titleAccent=""
        subtitle="Moments from the track."
      />

      <section className="pb-24">
        <div className="f1-container">
          {/* Category filter — visual only in Phase 2 */}
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs uppercase tracking-widest px-4 py-2 transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'bg-f1-red text-f1-white'
                    : 'telemetry-card text-f1-silver'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-2 auto-rows-[140px] md:grid-cols-4 md:gap-3 md:auto-rows-[200px]"
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`gallery-item relative group cursor-pointer bg-gradient-to-br ${item.gradient} ${item.span} border border-white/5 flex items-center justify-center overflow-hidden`}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-6xl text-f1-silver/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="f1-heading text-sm text-center px-4">
                    {item.label}
                  </span>
                </div>
                <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-f1-silver/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="btn-outline !px-3 !py-1 absolute top-6 right-6"
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full md:h-auto md:max-w-3xl flex flex-col justify-center"
            >
              <div
                className={`w-full flex-1 max-h-[60vh] md:flex-none md:max-h-none md:aspect-video bg-gradient-to-br ${selectedItem.gradient} border border-white/10 flex items-center justify-center overflow-hidden`}
              >
                {selectedItem.imageUrl ? (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-8xl text-f1-silver/10">
                    {String(items.indexOf(selectedItem) + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
              <h3 className="f1-heading text-2xl mt-6">{selectedItem.label}</h3>
              <p className="f1-eyebrow mt-2">{selectedItem.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

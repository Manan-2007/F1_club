import { useParallaxLayer } from '@/hooks/useParallaxLayer'

export default function HeroBackground({ mouseRef }) {
  // Layer depths — slow, barely moves
  const glowRef = useParallaxLayer(mouseRef, 12, 6)
  const glow2Ref = useParallaxLayer(mouseRef, -8, -4)
  const linesRef = useParallaxLayer(mouseRef, 6, 3)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-25" />

      {/* Primary red ambient glow — left center */}
      <div
        ref={glowRef}
        className="absolute"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(225,6,0,0.07) 0%, transparent 70%)',
          top: '50%',
          left: '30%',
          marginTop: '-350px',
          marginLeft: '-350px',
        }}
      />

      {/* Secondary cooler glow — right */}
      <div
        ref={glow2Ref}
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,255,153,0.03) 0%, transparent 70%)',
          top: '40%',
          right: '10%',
        }}
      />

      {/* Racing lines — horizontal telemetry lines */}
      <div ref={linesRef} className="absolute inset-0" style={{ opacity: 0.04 }}>
        {[20, 35, 50, 65, 80].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0"
            style={{
              top: `${top}%`,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, #E10600 30%, #E10600 70%, transparent 100%)',
            }}
          />
        ))}
      </div>

      {/* Corner grid marks — F1 garage aesthetic */}
      <div className="absolute top-8 left-8 opacity-20">
        <div className="w-8 h-px bg-f1-red" />
        <div className="w-px h-8 bg-f1-red" />
      </div>
      <div className="absolute top-8 right-8 opacity-20 flex flex-col items-end">
        <div className="w-8 h-px bg-f1-red" />
        <div className="w-px h-8 bg-f1-red" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-20 flex flex-col justify-end">
        <div className="w-px h-8 bg-f1-red" />
        <div className="w-8 h-px bg-f1-red" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20 flex flex-col items-end justify-end">
        <div className="w-px h-8 bg-f1-red" />
        <div className="w-8 h-px bg-f1-red" />
      </div>

      {/* Telemetry data readout — top right, ultra subtle */}
      <div
        className="absolute top-24 right-8 flex flex-col gap-1 opacity-10"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: '#00FF99',
        }}
      >
        <span>LAP: 01/57</span>
        <span>SPD: 312 KM/H</span>
        <span>GEAR: 8</span>
        <span>DRS: ENABLED</span>
        <span>TYRE: SOFT</span>
        <span>DEG: 12.4%</span>
      </div>
    </div>
  )
}

import { Suspense }                            from 'react'
import { Canvas }                              from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents,
         PerformanceMonitor, useProgress }     from '@react-three/drei'
import * as THREE                              from 'three'
import Lighting    from './Lighting'
import CameraRig   from './CameraRig'
import F1CarModel  from './F1CarModel'
import ModelLoader from './ModelLoader'

// DOM overlay shown while the GLB streams in.
function LoaderOverlay() {
  const { active } = useProgress()
  return active ? <ModelLoader /> : null
}

export default function Canvas3D({ mouseRef }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov:      38,
          near:     0.1,
          far:      100,
          position: [-0.5, 1.8, 5.5],
        }}
        gl={{
          antialias:           true,
          alpha:               true,
          powerPreference:     'high-performance',
          stencil:             false,
          toneMapping:         THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerformanceMonitor />
        <CameraRig mouseRef={mouseRef} />
        <Lighting />
        <Suspense fallback={null}>
          <F1CarModel mouseRef={mouseRef} />
        </Suspense>
      </Canvas>

      <LoaderOverlay />
    </div>
  )
}

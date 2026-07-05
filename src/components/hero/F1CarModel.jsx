import { useRef, useMemo, useEffect } from 'react'
import { useFrame }                   from '@react-three/fiber'
import { useGLTF }                    from '@react-three/drei'
import * as THREE                     from 'three'

// "F1 3D Model" (2022-spec car) by Blender458 — CC-BY 4.0.
// See public/models/ATTRIBUTION.md for the full credit line.
const MODEL_URL = '/models/f1-car.glb'

// No module-scope useGLTF.preload: HeroSection imports this module statically
// even when the 2D CarParallax fallback renders, so a preload would pull the
// 3 MB GLB on mobile for nothing. use3D is computed synchronously, so the
// fetch starts the same frame the canvas mounts anyway.

const ROT_LERP  = 0.04
const MAX_ROT_Y = 0.22
const MAX_ROT_X = 0.08

// Resting pose — mouse offsets pivot around this, so the front-3/4
// angle survives the per-frame lerp
const BASE_ROT_X = 0.03
const BASE_ROT_Y = -0.5

// Normalisation targets — independent of the GLB's native units.
// The model is measured at runtime and scaled/centred to these.
const CAR_LENGTH = 4.0   // world units, nose tip to rear wing
const FLOOR_Y    = -1.4  // must match the shadow-catcher plane in Lighting
const CAR_X      = 1.0   // nudged right — the text column owns the left half
const CAR_Z      = -1.2  // pushed back so the full car fits the frame

export default function F1CarModel({ mouseRef }) {
  const groupRef  = useRef()
  const { scene } = useGLTF(MODEL_URL)

  // Enable shadows + boost materials on every mesh in the model
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow    = true
      child.receiveShadow = true

      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]

      mats.forEach((m) => {
        if (!m) return
        if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
          m.envMapIntensity = 1.6
          m.needsUpdate     = true
        }
        // Mirror-smooth exports read as flat black under a dark HDRI —
        // a touch of roughness keeps highlights readable
        if (m.roughness !== undefined && m.roughness < 0.1) {
          m.roughness = 0.15
        }
      })
    })
  }, [scene])

  // Measure the real bounding box and derive the transform that centres
  // the car on the group origin and rests its wheels on FLOOR_Y
  const { scale, innerPos, groupY } = useMemo(() => {
    const box    = new THREE.Box3().setFromObject(scene)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s      = CAR_LENGTH / Math.max(size.x, size.z)
    return {
      scale:    s,
      innerPos: [-center.x * s, -center.y * s, -center.z * s],
      groupY:   FLOOR_Y + (size.y / 2) * s,
    }
  }, [scene])

  // Mouse-driven rotation around the resting pose
  useFrame(() => {
    if (!groupRef.current || !mouseRef?.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      BASE_ROT_Y + mouseRef.current.x * MAX_ROT_Y,
      ROT_LERP
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      BASE_ROT_X - mouseRef.current.y * MAX_ROT_X,
      ROT_LERP
    )
  })

  return (
    <group
      ref={groupRef}
      position={[CAR_X, groupY, CAR_Z]}
      rotation={[BASE_ROT_X, BASE_ROT_Y, 0]}
    >
      <group position={innerPos} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// High-detail Ferrari F1 2019 model.
const MODEL_URL = '/models/ferrari_f1_2019.glb'

// ─── Subtle cursor-follow tuning ──────────────────────────────────────
const ROT_LERP = 0.03          // slow, heavy, cinematic smoothing
const MAX_ROT_Y = 0.9          // very slight horizontal tilt (~8°)
const MAX_ROT_X = 0.5          // very slight vertical tilt (~3.5°)

// ─── Resting pose — dramatic front-3/4 angle ─────────────────────────
const BASE_ROT_X = 0.06
const BASE_ROT_Y = -0.45

// ─── Normalisation — big, centred, fills the hero ─────────────────────
const CAR_LENGTH = 4.8           // large: fills the landing page
const FLOOR_Y = -0.7
const CAR_X = 1.9            // right side, in the marked position
const CAR_Z = -0.3


/**
 * Fix material so it never goes transparent or see-through.
 */
function fixMaterial(mat) {
  if (!mat) return
  mat.side = THREE.DoubleSide
  mat.transparent = false
  mat.opacity = 1.0
  mat.alphaTest = 0
  mat.depthWrite = true
  mat.depthTest = true
  if (mat.envMapIntensity !== undefined) mat.envMapIntensity = 2.0
  if (mat.roughness !== undefined && mat.roughness < 0.08) mat.roughness = 0.1
  mat.needsUpdate = true
}


export default function F1CarModel({ mouseRef }) {
  const groupRef = useRef()
  const { scene } = useGLTF(MODEL_URL)

  // ── Fix every mesh on mount ──
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      child.frustumCulled = false

      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material]
      mats.forEach((m) => fixMaterial(m))
    })
  }, [scene])

  // ── Bounding-box normalisation ──
  const { scale, innerPos, groupY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = CAR_LENGTH / Math.max(size.x, size.z)
    return {
      scale: s,
      innerPos: [-center.x * s, -center.y * s, -center.z * s],
      groupY: FLOOR_Y + (size.y / 2) * s,
    }
  }, [scene])

  // ── Per-frame: subtle cursor-follow rotation ──
  useFrame(() => {
    if (!groupRef.current || !mouseRef?.current) return

    // Target rotation: base pose + tiny offset toward cursor
    const targetY = BASE_ROT_Y + mouseRef.current.x * MAX_ROT_Y
    const targetX = BASE_ROT_X - mouseRef.current.y * MAX_ROT_X

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, targetY, ROT_LERP
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, targetX, ROT_LERP
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

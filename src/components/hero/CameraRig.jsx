import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const LERP_SPEED = 0.04 // lower = heavier/slower camera

/**
 * CameraRig — lives inside the Canvas (needs useFrame).
 * Lerps camera position toward a mouse-driven target for a
 * smooth, cinematic drift. Renders nothing.
 */
export default function CameraRig({ mouseRef }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 0))

  // Set initial camera position once on mount
  const initialised = useRef(false)
  if (!initialised.current) {
    // Elevated front-quarter view — nose, front wing and rear wing
    // all read against the dark background
    camera.position.set(-1.5, 2.2, 5.5)
    camera.lookAt(0.3, 0.2, 0)
    initialised.current = true
  }

  useFrame(() => {
    if (!mouseRef?.current) return

    const mx = mouseRef.current.x // -1 to +1
    const my = mouseRef.current.y // -1 to +1

    // Target position — tighter range keeps the car in frame
    const targetX =  mx * 0.5
    const targetY = -my * 0.18 + 0.45 // offset keeps camera slightly elevated
    const targetZ =  5.2 + Math.abs(mx) * 0.15

    // Lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, LERP_SPEED)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, LERP_SPEED)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, LERP_SPEED)

    // Look slightly down toward the car (its centre sits below y=0,
    // wheels on the floor plane) so it rises into the frame
    target.current.x = THREE.MathUtils.lerp(target.current.x, mx * 0.2, LERP_SPEED)
    target.current.y = THREE.MathUtils.lerp(target.current.y, -0.3, LERP_SPEED)
    camera.lookAt(target.current)
  })

  return null // no visual output, just camera manipulation
}

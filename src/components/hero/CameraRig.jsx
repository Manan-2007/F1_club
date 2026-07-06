import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const LERP_SPEED = 0.03

/**
 * CameraRig — subtle cinematic drift.
 * Camera stays mostly locked, very slight sway with mouse.
 */
export default function CameraRig({ mouseRef }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 0))

  const initialised = useRef(false)
  if (!initialised.current) {
    camera.position.set(-0.5, 1.8, 5.5)
    camera.lookAt(0.3, 0.1, 0)
    initialised.current = true
  }

  useFrame(() => {
    if (!mouseRef?.current) return

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    // Very subtle drift — car stays centred
    const targetX = -0.5 + mx * 0.12
    const targetY =  1.8 - my * 0.05
    const targetZ =  5.5

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, LERP_SPEED)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, LERP_SPEED)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, LERP_SPEED)

    target.current.x = THREE.MathUtils.lerp(target.current.x, 0.3 + mx * 0.05, LERP_SPEED)
    target.current.y = THREE.MathUtils.lerp(target.current.y, 0.1, LERP_SPEED)
    target.current.z = THREE.MathUtils.lerp(target.current.z, 0, LERP_SPEED)
    camera.lookAt(target.current)
  })

  return null
}

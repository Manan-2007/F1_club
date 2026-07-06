import { Environment } from '@react-three/drei'

/**
 * Lighting — dark garage aesthetic. Dramatic upper-left key light,
 * cool rim from the rear, red floor bounce, green halo LED point.
 *
 * To visualise light positions during development:
 *   import { useHelper } from '@react-three/drei'
 *   import * as THREE from 'three'
 *   useHelper(spotRef, THREE.SpotLightHelper, 'red')
 */
export default function Lighting() {
  return (
    <>
      {/* Very dark ambient — almost black */}
      <ambientLight intensity={0.06} color="#0a0505" />

      {/* ENVIRONMENT MAP — what makes metallic paint read as paint.
          'night' HDRI is fetched from raw.githubusercontent.com at
          runtime, so this needs network access. */}
      <Environment preset="night" background={false} blur={0.6} />

      {/* KEY LIGHT — strong, upper left-front. Main highlight along the body */}
      <spotLight
        position={[-4, 7, 4]}
        angle={0.28}
        penumbra={0.4}
        intensity={180}
        color="#fff5ee"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0002}
      />

      {/* RIM LIGHT — upper right rear, separates car from dark background */}
      <spotLight
        position={[5, 4, -5]}
        angle={0.35}
        penumbra={0.7}
        intensity={70}
        color="#cce0ff"
        castShadow={false}
      />

      {/* UNDER FILL — red bounce from garage floor */}
      <pointLight
        position={[0, -2, 2]}
        intensity={12}
        color="#cc1100"
        distance={5}
        decay={2}
      />

      {/* Accent — subtle green from halo area */}
      <pointLight
        position={[0, 1.2, 0.8]}
        intensity={4}
        color="#00FF99"
        distance={2.5}
        decay={2}
      />

      {/* Shadow catcher floor — FLOOR_Y in F1CarModel must match this */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.5} color="#1a0000" />
      </mesh>
    </>
  )
}

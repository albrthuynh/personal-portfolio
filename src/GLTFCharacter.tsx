import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import type * as THREE from 'three'

export function GLTFCharacter(props: any) {
    const group = useRef<THREE.Group>(null)

    // Load the GLTF model
    const { scene, animations } = useGLTF('/models/character.glb') as any
    const { actions } = useAnimations(animations, group)

    // Auto-rotate and float animation
    useFrame((state) => {
        if (group.current) {
            // Continuous rotation
            group.current.rotation.y = state.clock.elapsedTime * 0.3
            // Gentle floating motion
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
        }
    })

    // Play idle animation if available
    // useEffect(() => {
    //   if (actions?.idle) {
    //     actions.idle.play()
    //   }
    // }, [actions])

    return (
        <group ref={group} {...props} position={[0, -15, 0]}>
            <primitive
                object={scene}
                scale={[1.5, 1.5, 1.5]}
                position={[0, 0, 0]}
            />
        </group>
    )
}

// Preload the model for better performance
useGLTF.preload('/models/character.glb')

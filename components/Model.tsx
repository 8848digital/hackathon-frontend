// import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
// import { useFrame } from "@react-three/fiber"
// import { useEffect, useRef } from "react"
// import { Group } from "three"

// useGLTF.preload("/robot_playground.glb")

// export default function Model() {
//   const group = useRef<Group>(null)
//   const { nodes, materials, animations, scene } = useGLTF(
//     "/robot_playground.glb"
//   )
//   const { actions, clips } = useAnimations(animations, scene)
//   const scroll = useScroll()

//   useEffect(() => {
//     console.log(actions)
//     //@ts-ignore
//     actions["Experiment"].play().paused = true
//   }, [])


//   console.log('nodes', nodes)
//   console.log('materials', materials)
//   useFrame(
//     () =>
//     //@ts-ignore
//     (actions["Experiment"].time =
//       //@ts-ignore
//       (actions["Experiment"].getClip().duration * scroll.offset) / 1)
//   )
//   return (
//     <group ref={group} position={[0, -1.5, 1.5]} scale={[1, 1, 1]}>
//       <primitive object={scene} />
//     </group>
//   )
// }

import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/robot_playground.glb")

export default function Model() {
    const group = useRef<Group>(null)
    const { scene, animations } = useGLTF("/robot_playground.glb")
    const { actions } = useAnimations(animations, scene)
    const scroll = useScroll()

    useEffect(() => {
        if (actions?.["Experiment"]) {
            actions["Experiment"].paused = true
            actions["Experiment"].play()
        }
    }, [actions])

    useFrame(() => {
        if (actions?.["Experiment"]) {
            actions["Experiment"].time = actions["Experiment"].getClip().duration * scroll.offset
        }
    })

    return (
        <group ref={group} position={[-1, -1, 2]} scale={[1, 1, 1]}>
            <primitive object={scene} />
        </group>
    )
}


"use client"

import { Canvas } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, ScrollControls, Stars } from "@react-three/drei"

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress.toFixed(1)}% loaded</Html>
}

const sections = [
    { title: "About Us", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { title: "What is Hackathon?", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { title: "Rules to Participate Rules to Participate Rules to Participate", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { title: "Notice", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
]

export default function Scene() {
    return (
        <div className="relative h-screen w-full bg-black text-white">
            <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
                <directionalLight position={[-5, -5, 5]} intensity={2} />
                <Stars />
                <Suspense fallback={<Loader />}>
                    <ScrollControls pages={2} damping={0.5}>
                        <Model />
                        <Content />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    )
}

//Section Content Component
function Content() {

    return (
        <Html>
            <div className="h-full flex flex-col justify-start space-y-40 p-10">
                {sections.map((section, index) => {
                    return (
                        <div key={index} className="py-4 w-max md:max-w-md break-words">
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            <p className="text-lg mt-2">{section.description}</p>
                        </div>
                    )
                })}
            </div>
        </Html>
    )
}


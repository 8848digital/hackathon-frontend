"use client";

import { OrbitControls, Plane, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";

// idea 1
function GlowingWaves() {
  return (
    <Plane args={[10, 10, 32, 32]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="cyan" wireframe />
    </Plane>
  );
}

export const Hero = ()=> {
  return (
    <div className="h-screen w-full relative bg-black flex items-center justify-center">
      <Canvas camera={{ position: [0, 0.1, 5], fov: 55 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Stars />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
        <GlowingWaves />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute text-center text-white">
        <motion.h1
          className="text-6xl font-bold drop-shadow-lg"
          style={{ marginTop: "-75px" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          8848 Hackathon 2025
        </motion.h1>
        <motion.button
          className="mt-6 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-[#10635a] transition"
          style={{ backgroundColor: "#10635a" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Register Now
        </motion.button>
      </div>
    </div>
  );
}

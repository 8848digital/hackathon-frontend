"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, Plane } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as THREE from "three"; // Import Three.js
const FallingObject = ({ position, onCatch }: any) => {
  const ref = useRef<THREE.Mesh>(null!); // Correctly type the ref
  useFrame(() => {
    if (ref.current) {
      // Check if the ref is assigned
      ref.current.position.y -= 0.02;
      if (ref.current.position.y < -5) {
        onCatch(false);
      }
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
const PlayerBlock = ({ position, setPosition }: any) => {
  //   const motionX = useMotionValue(position[0]); // Use motion value for x
  //   useEffect(() => {
  //     motionX.set(position[0]); // Sync motion value with position
  //   }, [position[0]]);
  return (
    <motion.mesh
      position={[0, -3, 0]} // Use motion value in position
      drag="x"
      dragConstraints={{ left: -3, right: 3 }}
      onDrag={(event: any, info: any) => {
        motionX.set(info.point.x); // Update the motion value on drag
        setPosition([info.point.x, -3, 0]); // Update the actual position
      }}
    >
      <boxGeometry args={[2, 0.5, 1]} />
      <meshStandardMaterial color="blue" />
    </motion.mesh>
  );
};
export default function Home({ score, playerPosition, setPosition }: any) {
  // ... (rest of your code: useState, useEffect, handleCatch)
  return (
    <>
      <div className="hud">
        <p>Score: {score}</p>
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* ... (FallingObject components) */}
        <PlayerBlock position={playerPosition} setPosition={setPosition} />
        <OrbitControls /> {/* Add OrbitControls for camera movement */}
      </Canvas>
    </>
  );
}

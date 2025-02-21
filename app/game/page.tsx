"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html, Stars } from "@react-three/drei";
import Basket from "./_components/basket";

function Ball({ number, position }: any) {
  return (
    <Sphere position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="orange" />
      <Html center>
        <div style={{ color: "white", fontSize: "2em" }}>{number}</div>
      </Html>
    </Sphere>
  );
}

// function Basket() {
//   return (
//     <mesh position={[0, -5, 0]}>
//       <boxGeometry args={[3, 1, 3]} />
//       <meshStandardMaterial color="green" />
//     </mesh>
//   );
// }

function GameScene() {
  const [balls, setBalls] = useState<any>([]);

  useFrame(() => {
    // Add new balls at random intervals
    if (Math.random() < 0.02) {
      const newBall = {
        id: Math.random(),
        number: Math.random() > 0.5 ? 8 : 4,
        position: [Math.random() * 10 - 5, 10, 0],
      };
      setBalls((prev: any) => [...prev, newBall]);
    }

    // Update ball positions
    setBalls((prev: any) =>
      prev.map((ball: any) => ({
        ...ball,
        position: [ball.position[0], ball.position[1] - 0.1, ball.position[2]],
      }))
    );
  });

  return (
    <>
      {balls.map((ball: any) => (
        <Ball key={ball.id} number={ball.number} position={ball.position} />
      ))}
      <Basket />
    </>
  );
}

export default function Index() {
  return (
    <div className="h-screen w-full relative bg-black flex items-center justify-center">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <GameScene />
      </Canvas>
    </div>
  );
}

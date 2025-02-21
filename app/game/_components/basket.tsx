import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Basket() {
  const basketRef: any = useRef();

  useFrame(() => {
    // Move basket with arrow keys
    if (keys.ArrowLeft) basketRef.current.position.x -= 0.1;
    if (keys.ArrowRight) basketRef.current.position.x += 0.1;
  });

  return (
    <mesh ref={basketRef} position={[0, -5, 0]}>
      <boxGeometry args={[3, 1, 3]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

const keys: any = {};
window.addEventListener("keydown", (e) => (keys[e.code] = true));
window.addEventListener("keyup", (e) => (keys[e.code] = false));

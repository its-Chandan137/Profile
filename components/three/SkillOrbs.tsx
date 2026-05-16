"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const orbPositions: [number, number, number][] = [
  [-2.6, 0.6, 0],
  [-0.8, -0.3, -0.6],
  [1.1, 0.45, 0.2],
  [2.7, -0.2, -0.4]
];

export default function SkillOrbs() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 3, 2]} color="#00d4ff" intensity={1.8} />
      {orbPositions.map((position, index) => (
        <Float key={position.join("-")} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={position}>
            <sphereGeometry args={[0.38 + index * 0.05, 32, 32]} />
            <meshStandardMaterial
              color={index % 2 ? "#7c3aed" : "#00d4ff"}
              emissive={index % 2 ? "#7c3aed" : "#00d4ff"}
              emissiveIntensity={0.75}
              transparent
              opacity={0.33}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}
    </Canvas>
  );
}

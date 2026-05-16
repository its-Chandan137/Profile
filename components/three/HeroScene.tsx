"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 9000;
const FIELD_WIDTH = 16;
const FIELD_HEIGHT = 9;
const FIELD_DEPTH = 8;
const REPULSE_RADIUS = 2.15;
const REPULSE_STRENGTH = 0.85;
const MAX_TILT = THREE.MathUtils.degToRad(5);

const vertexShader = `
  attribute float alpha;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = color;
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 3.4 * (9.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float strength = smoothstep(0.5, 0.0, dist);
    if (strength <= 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha * strength);
  }
`;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const { camera } = useThree();

  const particles = useMemo(() => {
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const current = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const alphas = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT * 3);
    const cyan = new THREE.Color("#00d4ff");
    const purple = new THREE.Color("#7c3aed");

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3;
      const x = (Math.random() - 0.5) * FIELD_WIDTH;
      const y = (Math.random() - 0.5) * FIELD_HEIGHT;
      const z = (Math.random() - 0.5) * FIELD_DEPTH;
      const color = Math.random() < 0.8 ? cyan : purple;
      const brightness = 0.68 + Math.random() * 0.32;

      base[index] = x;
      base[index + 1] = y;
      base[index + 2] = z;
      current[index] = x;
      current[index + 1] = y;
      current[index + 2] = z;
      colors[index] = color.r * brightness;
      colors[index + 1] = color.g * brightness;
      colors[index + 2] = color.b * brightness;
      alphas[i] = 0.42 + Math.random() * 0.48;
      seeds[index] = Math.random() * Math.PI * 2;
      seeds[index + 1] = 0.35 + Math.random() * 0.65;
      seeds[index + 2] = 0.1 + Math.random() * 0.2;
    }

    return { base, current, colors, alphas, seeds };
  }, []);

  useEffect(() => {
    const geometry = geometryRef.current;
    const material = materialRef.current;
    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.active = true;
    };
    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      geometry?.dispose();
      material?.dispose();
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    const positions = particles.current;
    const base = particles.base;
    const seeds = particles.seeds;
    const mouse = mouseRef.current;
    const mouseX = mouse.x * FIELD_WIDTH * 0.36;
    const mouseY = mouse.y * FIELD_HEIGHT * 0.36;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const index = i * 3;
      const bx = base[index];
      const by = base[index + 1];
      const bz = base[index + 2];
      const seed = seeds[index];
      const driftScale = seeds[index + 1];
      const waveScale = seeds[index + 2];
      const wave =
        Math.sin(elapsed * 0.65 + bx * 0.55 + bz * 0.38 + seed) * waveScale +
        Math.cos(elapsed * 0.3 + by * 0.45 + seed) * 0.055;

      let tx = bx + Math.sin(elapsed * 0.28 + seed) * 0.12 * driftScale;
      let ty = by + wave;
      let tz = bz + Math.cos(elapsed * 0.24 + seed) * 0.1 * driftScale;

      const dx = tx - mouseX;
      const dy = ty - mouseY;
      const dz = tz * 0.18;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (mouse.active && distance < REPULSE_RADIUS) {
        const force = (1 - distance / REPULSE_RADIUS) * REPULSE_STRENGTH;
        const safeDistance = Math.max(distance, 0.001);
        tx += (dx / safeDistance) * force;
        ty += (dy / safeDistance) * force;
        tz += (dz / safeDistance) * force * 0.75;
      }

      positions[index] += (tx - positions[index]) * 0.075;
      positions[index + 1] += (ty - positions[index + 1]) * 0.075;
      positions[index + 2] += (tz - positions[index + 2]) * 0.075;
    }

    const positionAttribute = geometryRef.current?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (positionAttribute) {
      positionAttribute.needsUpdate = true;
    }

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -mouse.y * MAX_TILT, 0.045);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * MAX_TILT, 0.045);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[particles.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        <bufferAttribute attach="attributes-alpha" args={[particles.alphas, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 7, 16]} />
      <ParticleField />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}

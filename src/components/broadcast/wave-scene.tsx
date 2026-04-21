"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function WaveRings() {
  const group = useRef<THREE.Group>(null);
  const ringCount = 42;

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }).map((_, i) => ({
      radius: 0.4 + i * 0.12,
      phase: i * 0.18,
    }));
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();

    group.current.rotation.z = Math.sin(t * 0.08) * 0.1 + pointer.x * 0.15;
    group.current.rotation.x = -0.35 + pointer.y * 0.08;

    group.current.children.forEach((child, i) => {
      const ring = rings[i];
      if (!ring) return;
      const pulse = Math.sin(t * 1.4 - ring.phase) * 0.5 + 0.5;
      const mouseBoost = Math.abs(pointer.x) + Math.abs(pointer.y);
      const scale = 1 + pulse * 0.06 + mouseBoost * 0.02;
      child.scale.set(scale, scale, 1);
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + pulse * 0.35;
    });
  });

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.radius, ring.radius + 0.004, 128]} />
          <meshBasicMaterial
            color="#e8b24a"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.8;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#f5d48a" transparent opacity={0.6} />
    </points>
  );
}

export function WaveScene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.8, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 4, 14]} />
        <WaveRings />
        <ParticleField />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black" />
    </div>
  );
}

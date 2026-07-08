"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

import { socialPlanets, type SocialPlanet } from "@/data/social";

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return <Line points={points} color="#1e63e9" transparent opacity={0.14} />;
}

function Planet({ planet, index }: { planet: SocialPlanet; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const angleRef = useRef((index / socialPlanets.length) * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += delta * planet.speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(angleRef.current) * planet.distance;
      ref.current.position.z = Math.sin(angleRef.current) * planet.distance;
      ref.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[planet.size * 0.32, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
      <Html distanceFactor={9} occlude={false} zIndexRange={[10, 0]}>
        <a
          href={planet.href}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor-hover
          className="glass flex -translate-x-1/2 translate-y-6 flex-col items-center gap-0.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-center transition-colors hover:border-electric"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">
              {planet.label}
            </span>
            {planet.count && (
              <span
                className="text-[11px] font-semibold"
                style={{ color: planet.color }}
              >
                {planet.count}
              </span>
            )}
          </span>
          <span className="text-[9px] text-muted">{planet.handle}</span>
        </a>
      </Html>
    </group>
  );
}

function CenterAvatar() {
  return (
    <group>
      <pointLight color="#7fa6ff" intensity={40} distance={20} />
      <Html center distanceFactor={11} zIndexRange={[6, 0]}>
        <div className="pointer-events-none relative flex h-[190px] w-[190px] items-center justify-center">
          {/* Glow */}
          <div
            className="absolute inset-[-22%] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(30,99,233,0.75), rgba(34,211,238,0.28) 55%, transparent 75%)",
            }}
          />
          <span className="absolute inset-0 animate-pulse-glow rounded-full" style={{ boxShadow: "0 0 60px 12px rgba(30,99,233,0.35)" }} />
          {/* Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="Techie Sapien"
            draggable={false}
            className="relative h-[150px] w-[150px] rounded-full border-2 border-white/20 object-cover"
            style={{ boxShadow: "0 0 45px 6px rgba(30,99,233,0.55)" }}
          />
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <CenterAvatar />
      <group ref={groupRef} rotation={[0.45, 0, 0]}>
        {socialPlanets.map((planet) => (
          <OrbitRing key={`ring-${planet.id}`} radius={planet.distance} />
        ))}
        {socialPlanets.map((planet, i) => (
          <Planet key={planet.id} planet={planet} index={i} />
        ))}
      </group>
    </>
  );
}

export function SocialUniverse({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 50, position: [0, 6, 13.5] }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default SocialUniverse;

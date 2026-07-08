"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
  // Radial mask fades the avatar's blue studio backdrop into the dark scene,
  // so the center reads as the person emerging from space, not a glowing disc.
  const mask =
    "radial-gradient(circle at 50% 43%, #000 40%, rgba(0,0,0,0.35) 58%, transparent 70%)";
  return (
    <group>
      <pointLight color="#7fa6ff" intensity={18} distance={22} />
      <Html center distanceFactor={12} zIndexRange={[6, 0]}>
        <div style={{ width: 108, height: 108 }} className="pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.png"
            alt="Techie Sapien"
            draggable={false}
            style={{
              width: 108,
              height: 108,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
            className="rounded-full object-cover"
          />
        </div>
      </Html>
    </group>
  );
}

/** Aims the camera slightly below the origin so the system sits a touch high. */
function Rig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, -0.3, 0);
  }, [camera]);
  return null;
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
      <Rig />
      <ambientLight intensity={0.35} />
      <group position={[0, 0, 0]}>
        <CenterAvatar />
        <group ref={groupRef} rotation={[0.36, 0, 0]}>
          {socialPlanets.map((planet) => (
            <OrbitRing key={`ring-${planet.id}`} radius={planet.distance} />
          ))}
          {socialPlanets.map((planet, i) => (
            <Planet key={planet.id} planet={planet} index={i} />
          ))}
        </group>
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
        camera={{ fov: 50, position: [0, 6.5, 16] }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default SocialUniverse;

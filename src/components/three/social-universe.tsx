"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

import { socialPlanets, type SocialPlanet } from "@/data/social";

// Scene constants shared by the fit logic.
const R_MAX = Math.max(...socialPlanets.map((p) => p.distance)); // outermost orbit
const CAM_Z = 16;
const FOV = 50;
const TILT = 0.3;

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
          className="glass flex -translate-x-1/2 translate-y-4 flex-col items-center gap-0.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-center transition-colors hover:border-electric"
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
    camera.lookAt(0, -0.15, 0);
  }, [camera]);
  return null;
}

/**
 * Scales the whole system so the outermost orbit always fits inside the canvas,
 * for any aspect ratio — this is what guarantees the outer planets never clip.
 */
function useFitScale() {
  const { size } = useThree();
  return useMemo(() => {
    const aspect = size.width / Math.max(1, size.height);
    const halfH = CAM_Z * Math.tan((FOV * Math.PI) / 360); // world half-height at z=0
    const halfW = halfH * aspect;
    // Fit the outermost orbit inside a safe fraction of the frustum. Horizontal
    // is the binding constraint on wide canvases; vertical on tall/mobile ones.
    const scaleW = (halfW * 0.7) / R_MAX;
    const scaleH = (halfH * 0.82) / (R_MAX * Math.sin(TILT) + 1.4);
    return Math.min(1.12, scaleW, scaleH);
  }, [size.width, size.height]);
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const fit = useFitScale();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      <Rig />
      <ambientLight intensity={0.35} />
      <group scale={fit} position={[0, 1.3 * fit, 0]}>
        <CenterAvatar />
        <group ref={groupRef} rotation={[TILT, 0, 0]}>
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
        camera={{ fov: FOV, position: [0, 6, CAM_Z] }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default SocialUniverse;

"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function useDotTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(180,205,255,0.8)");
    gradient.addColorStop(1, "rgba(62,123,250,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function fibonacciSphere(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function NeuralCore({ density = 1 }: { density?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const dotTexture = useDotTexture();
  const pointer = useRef({ x: 0, y: 0 });
  const radius = 2.1;
  const count = Math.round(560 * density);

  const nodePositions = useMemo(() => fibonacciSphere(count, radius), [count]);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    nodePositions.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodePositions, count]);

  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const threshold = radius * 0.42;
    const maxPerNode = 3;

    for (let i = 0; i < nodePositions.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodePositions.length && connections < maxPerNode; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < threshold) {
          positions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
          connections++;
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    return geometry;
  }, [nodePositions]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.25,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.current.x * 0.15,
      0.03
    );
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.05 + Math.sin(t * 1.5) * 0.006;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.05}
          map={dotTexture}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={"#bcd4ff"}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color={"#3e7bfa"}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[radius * 0.55, 1]} />
        <meshBasicMaterial
          color={"#3e7bfa"}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function AmbientDust({ density = 1 }: { density?: number }) {
  const ref = useRef<THREE.Points>(null);
  const dotTexture = useDotTexture();
  const count = Math.round(260 * density);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        map={dotTexture}
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={"#7fa6ff"}
        sizeAttenuation
      />
    </points>
  );
}

function Rig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 7.2);
  }, [camera]);
  return null;
}

function SceneContent() {
  const [density, setDensity] = useState(1);

  useEffect(() => {
    const isSmall = window.innerWidth < 768;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setDensity(isSmall || isCoarse ? 0.45 : 1);
  }, []);

  return (
    <>
      <Rig />
      <ambientLight intensity={0.4} />
      <NeuralCore density={density} />
      <AmbientDust density={density} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function NeuralSphere({ className }: { className?: string }) {
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
        dpr={[1, 1.6]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ fov: 45, position: [0, 0, 7.2] }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}

export default NeuralSphere;

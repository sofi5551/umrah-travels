"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import { criticalLoadingManager, useCriticalProgress } from "@/lib/criticalLoadingManager";

const MODEL_PARTS = [
  { url: "/models/base.stl", color: "#E2D7BE", metalness: 0.05, roughness: 0.85 },
  { url: "/models/kaaba.stl", color: "#0D0D0D", metalness: 0.15, roughness: 0.75 },
  { url: "/models/kaaba_roof.stl", color: "#C6992E", metalness: 0.6, roughness: 0.3 },
  { url: "/models/mezaab_e_rehmat.stl", color: "#E7CE8C", metalness: 0.85, roughness: 0.2 },
] as const;

function KaabaModel() {
  const geometries = useLoader(
    STLLoader,
    MODEL_PARTS.map((p) => p.url),
    (loader) => {
      loader.manager = criticalLoadingManager;
    }
  );
  const groupRef = useRef<THREE.Group>(null);

  const { center, scale } = useMemo(() => {
    const box = new THREE.Box3();
    geometries.forEach((geo) => {
      geo.computeBoundingBox();
      if (geo.boundingBox) box.union(geo.boundingBox);
    });
    const c = new THREE.Vector3();
    box.getCenter(c);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { center: c, scale: 2.4 / maxDim };
  }, [geometries]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
        <group position={[-center.x, -center.y, -center.z]}>
          {geometries.map((geo, i) => (
            <mesh key={MODEL_PARTS[i].url} geometry={geo}>
              <meshStandardMaterial
                color={MODEL_PARTS[i].color}
                metalness={MODEL_PARTS[i].metalness}
                roughness={MODEL_PARTS[i].roughness}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

function useModelReady() {
  const { active, progress } = useCriticalProgress();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active && progress === 100) setReady(true);
  }, [active, progress]);
  return ready;
}

export default function HeroModel() {
  const ready = useModelReady();

  return (
    <div
      className="h-full w-full transition-opacity duration-1000 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [0, 0.6, 5.5], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.3} color="#E7CE8C" />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#0B3D33" />
        <CameraRig />
        <Suspense fallback={null}>
          <KaabaModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

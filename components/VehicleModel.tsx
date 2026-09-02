"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";
import { criticalLoadingManager } from "@/lib/criticalLoadingManager";

export type TextureOverride = { mesh: string; map?: string; color?: string };

type Props = {
  format: "glb" | "fbx" | "obj";
  url: string;
  mtlUrl?: string;
  resourcePath?: string;
  textureOverrides?: TextureOverride[];
  // Whether this model's load should gate the full-screen boot loader.
  // Defaults to true — set false for large files that shouldn't block the
  // rest of the site (see lib/criticalLoadingManager.ts).
  critical?: boolean;
};

function centerAndScale(object: THREE.Object3D, targetSize = 2.4) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;
  object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  object.scale.setScalar(scale);
}

// Some FBX/OBJ exports either fail to bind a material's texture (three.js's
// FBXLoader parsed this Camry's body material with no map at all, despite the
// file loading fine) or the texture turns out to be a UV atlas whose
// coordinates don't line up with this mesh's UVs (applying it literally smears
// headlight/taillight close-ups across the paint). Rather than fight either
// case, this lets a specific mesh's material be corrected after load — either
// by binding a known-good texture file, or by falling back to a flat color.
function applyTextureOverrides(
  object: THREE.Object3D,
  resourcePath: string | undefined,
  overrides: TextureOverride[]
) {
  const loader = new THREE.TextureLoader();
  const byMesh = new Map(overrides.map((o) => [o.mesh, o]));
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const override = byMesh.get(child.name);
    if (!override) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((m) => {
      const mat = m as THREE.MeshPhongMaterial;
      if (override.map) {
        const texture = loader.load((resourcePath ?? "") + override.map);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        mat.map = texture;
      } else {
        mat.map = null;
      }
      if (override.color) mat.color.set(override.color);
      mat.needsUpdate = true;
    });
  });
}

function SpinGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return <group ref={ref}>{children}</group>;
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

function GLTFModel({
  url,
  critical,
  onReady,
}: {
  url: string;
  critical: boolean;
  onReady: () => void;
}) {
  // useGLTF caches per-url internally (drei's GLTFLoader has no resourcePath
  // mutation, so it doesn't hit the shared-instance pitfall FBX/OBJ do).
  const { scene } = useGLTF(url, true, true, (loader) => {
    if (critical) loader.manager = criticalLoadingManager;
  });
  const [object] = useState(() => {
    const cloned = scene.clone(true);
    centerAndScale(cloned);
    return cloned;
  });
  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <primitive object={object} />;
}

// Deliberately NOT using @react-three/fiber's useLoader for FBX/OBJ: it
// memoizes the loader instance by class only (not class+url), so every model
// of the same format on the page would share one loader instance — a
// resourcePath set for one car silently leaks into every other concurrently
// -loading car, corrupting textures. A fresh loader per component instance
// avoids that entirely.
function FBXModel({
  url,
  resourcePath,
  textureOverrides,
  critical,
  onReady,
}: {
  url: string;
  resourcePath?: string;
  textureOverrides?: TextureOverride[];
  critical: boolean;
  onReady: () => void;
}) {
  const [object, setObject] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new FBXLoader(critical ? criticalLoadingManager : undefined);
    if (resourcePath) loader.setResourcePath(resourcePath);
    loader.load(url, (fbx) => {
      if (cancelled) return;
      if (textureOverrides?.length) applyTextureOverrides(fbx, resourcePath, textureOverrides);
      centerAndScale(fbx);
      setObject(fbx);
      onReady();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, resourcePath]);

  if (!object) return null;
  return <primitive object={object} />;
}

function OBJModel({
  url,
  mtlUrl,
  resourcePath,
  textureOverrides,
  critical,
  onReady,
}: {
  url: string;
  mtlUrl?: string;
  resourcePath?: string;
  textureOverrides?: TextureOverride[];
  critical: boolean;
  onReady: () => void;
}) {
  const [object, setObject] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let cancelled = false;

    function loadObj(materials?: ReturnType<typeof MTLLoader.prototype.parse>) {
      const objLoader = new OBJLoader(critical ? criticalLoadingManager : undefined);
      if (materials) objLoader.setMaterials(materials);
      objLoader.load(url, (obj) => {
        if (cancelled) return;
        if (textureOverrides?.length) applyTextureOverrides(obj, resourcePath, textureOverrides);
        centerAndScale(obj);
        setObject(obj);
        onReady();
      });
    }

    if (mtlUrl) {
      const mtlLoader = new MTLLoader(critical ? criticalLoadingManager : undefined);
      if (resourcePath) mtlLoader.setResourcePath(resourcePath);
      mtlLoader.load(mtlUrl, (materials) => {
        if (cancelled) return;
        materials.preload();
        loadObj(materials);
      });
    } else {
      loadObj();
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, mtlUrl, resourcePath]);

  if (!object) return null;
  return <primitive object={object} />;
}

function Scene({ format, url, mtlUrl, resourcePath, textureOverrides, critical }: Props) {
  const [ready, setReady] = useState(false);
  const isCritical = critical !== false;

  return (
    <div
      className="h-full w-full transition-opacity duration-500 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [3.2, 1.5, 3.6], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <directionalLight position={[-4, 2, -4]} intensity={0.6} />
        <CameraRig />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <SpinGroup>
            {format === "glb" && (
              <GLTFModel url={url} critical={isCritical} onReady={() => setReady(true)} />
            )}
            {format === "fbx" && (
              <FBXModel
                url={url}
                resourcePath={resourcePath}
                textureOverrides={textureOverrides}
                critical={isCritical}
                onReady={() => setReady(true)}
              />
            )}
            {format === "obj" && (
              <OBJModel
                url={url}
                mtlUrl={mtlUrl}
                resourcePath={resourcePath}
                textureOverrides={textureOverrides}
                critical={isCritical}
                onReady={() => setReady(true)}
              />
            )}
          </SpinGroup>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function VehicleModel({
  format,
  url,
  mtlUrl,
  resourcePath,
  textureOverrides,
  critical,
}: Props) {
  return (
    <div className="h-full w-full">
      <Scene
        format={format}
        url={url}
        mtlUrl={mtlUrl}
        resourcePath={resourcePath}
        textureOverrides={textureOverrides}
        critical={critical}
      />
    </div>
  );
}

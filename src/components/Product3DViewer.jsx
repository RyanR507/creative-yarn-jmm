import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./Product3DViewer.css";

// Frees GPU/CPU resources for a model that's no longer being shown — called
// when a design is switched away from, or the viewer unmounts.
function disposeScene(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((mat) => {
      if (!mat) return;
      Object.values(mat).forEach((value) => {
        if (value && typeof value.dispose === "function") value.dispose();
      });
      mat.dispose();
    });
  });
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * True interactive 3D product viewer: drag to orbit, pinch/scroll to zoom.
 * Loads a real .glb/.gltf model via Three.js / React Three Fiber. Never
 * fakes depth on a flat image — if WebGL isn't available, or the model
 * can't be loaded, it shows `fallbackImage` (the existing product photo)
 * instead, and never a broken viewer.
 *
 * Loading uses GLTFLoader's own onLoad/onError callbacks directly, rather
 * than drei's Suspense-integrated `useGLTF`. Confirmed while testing this
 * component: a model that fails to *parse* (corrupt/invalid file) surfaces
 * from `useGLTF` as an unhandled promise rejection that no React error
 * boundary reliably catches, which would risk a broken viewer reaching a
 * customer. GLTFLoader's own onError callback fires for both network and
 * parse failures, so the model is only ever rendered once fully resolved.
 */
export default function Product3DViewer({ src, fallbackImage, productName }) {
  const [webglOk] = useState(supportsWebGL);
  const [status, setStatus] = useState("loading"); // loading | ready | failed
  const [scene, setScene] = useState(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedScene = null;
    setStatus("loading");
    setScene(null);

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (cancelled) {
          disposeScene(gltf.scene);
          return;
        }
        loadedScene = gltf.scene;
        setScene(gltf.scene);
        setStatus("ready");
      },
      undefined,
      () => {
        if (!cancelled) setStatus("failed");
      }
    );

    return () => {
      cancelled = true;
      if (loadedScene) disposeScene(loadedScene);
    };
  }, [src]);

  if (!webglOk || status !== "ready") {
    return (
      <div className="product-3d product-3d--fallback">
        <img src={fallbackImage} alt={productName} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className="product-3d" onPointerDown={() => setHintDismissed(true)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 3.2], fov: 32 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />

        <Center>
          <primitive object={scene} />
        </Center>

        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <ContactShadows position={[0, -1.05, 0]} opacity={0.3} blur={2.4} far={2} />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.4}
          maxDistance={5}
          minPolarAngle={Math.PI * 0.12}
          maxPolarAngle={Math.PI * 0.88}
        />
      </Canvas>

      {!hintDismissed && (
        <span className="product-3d__hint" aria-hidden="true">
          Arrastra para explorar ↔↕
        </span>
      )}
    </div>
  );
}

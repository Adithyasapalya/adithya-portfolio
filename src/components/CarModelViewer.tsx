import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Generate high-contrast studio reflection map with softboxes
function createCarStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x060608);

  // Longitudinal overhead strip light (spine reflection)
  const topStripGeo = new THREE.PlaneGeometry(14, 60);
  const topStripMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const topStrip = new THREE.Mesh(topStripGeo, topStripMat);
  topStrip.position.set(0, 16, 0);
  topStrip.rotation.x = Math.PI / 2;
  envScene.add(topStrip);

  // Front-right key softbox panel (fender gleam)
  const keySoftboxGeo = new THREE.PlaneGeometry(24, 24);
  const keySoftboxMat = new THREE.MeshBasicMaterial({ color: 0xf5f8ff });
  const keySoftbox = new THREE.Mesh(keySoftboxGeo, keySoftboxMat);
  keySoftbox.position.set(16, 12, 16);
  keySoftbox.lookAt(0, 0, 0);
  envScene.add(keySoftbox);

  // Left fill softbox panel (cool sheen)
  const fillSoftboxGeo = new THREE.PlaneGeometry(20, 20);
  const fillSoftboxMat = new THREE.MeshBasicMaterial({ color: 0xdae6f8 });
  const fillSoftbox = new THREE.Mesh(fillSoftboxGeo, fillSoftboxMat);
  fillSoftbox.position.set(-18, 10, 10);
  fillSoftbox.lookAt(0, 0, 0);
  envScene.add(fillSoftbox);

  // Rear softbox panel (rear spoiler & diffuser accent)
  const rearSoftboxGeo = new THREE.PlaneGeometry(18, 18);
  const rearSoftboxMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const rearSoftbox = new THREE.Mesh(rearSoftboxGeo, rearSoftboxMat);
  rearSoftbox.position.set(0, 12, -20);
  rearSoftbox.lookAt(0, 0, 0);
  envScene.add(rearSoftbox);

  // Horizontal side rim strip (waistline gleam)
  const sideStripGeo = new THREE.PlaneGeometry(40, 3);
  const sideStripMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sideStrip = new THREE.Mesh(sideStripGeo, sideStripMat);
  sideStrip.position.set(12, 2.5, 0);
  sideStrip.rotation.y = -Math.PI / 2;
  envScene.add(sideStrip);

  const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();
  return envTexture;
}

export function CarModelViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera with balanced perspective and wide vertical frustum
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(43, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.95);
    camera.lookAt(0, -0.05, 0);

    // Renderer with ACES Filmic high-contrast tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Environment Map for realistic paint & glass reflections
    const studioEnv = createCarStudioEnvironment(renderer);
    scene.environment = studioEnv;

    // Direct Studio Lights - Calibrated for high-contrast motorsport showroom look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.40);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5.5, 8.5, 6.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc8dcff, 0.9);
    fillLight.position.set(-6, 3.5, 3.5);
    scene.add(fillLight);

    const rimBlue = new THREE.DirectionalLight(0x0142a2, 1.8);
    rimBlue.position.set(-5, 2.5, -4);
    scene.add(rimBlue);

    const rimWarm = new THREE.DirectionalLight(0xffeedd, 1.2);
    rimWarm.position.set(0, 5.0, -5.5);
    scene.add(rimWarm);

    // Pivot group
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Initial 3/4 front isometric hero angle (~-50 deg around Y)
    let targetRotY = -Math.PI * 0.28;
    let targetRotX = 0.08;
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;

    pivot.rotation.y = currentRotY;
    pivot.rotation.x = currentRotX;

    let modelMaxDim = 4.65;

    const applyOptimalScale = () => {
      const isMobile = window.innerWidth < 768;
      const targetSize = isMobile ? 3.15 : 3.85;
      pivot.scale.setScalar(targetSize / (modelMaxDim || 4.65));
    };

    // Load Model with real-time download progress tracking
    const loader = new GLTFLoader();
    const modelUrl = "/mercedes-amg-gt3-red-bull-racing/source/mercedes_benz_amg_gt3_red_bull.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        setIsLoading(false);

        // Calculate model bounding box and center exactly on origin
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        modelMaxDim = Math.max(size.x, size.y, size.z) || 4.65;
        applyOptimalScale();

        // Material traversal: Match Image 1 reference exactly
        gltf.scene.traverse((node) => {
          // 1. Hide Object_25 (the washed-out wire mesh plate covering the grille):
          // In Image 1, this mesh is hidden, revealing the red tow hook, the dark radiator fins,
          // and depth behind the vertical chrome slats!
          if (node.name === "Object_25") {
            node.visible = false;
            return;
          }

          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];

            materials.forEach((mat) => {
              if (!mat) return;
              if (mat instanceof THREE.MeshStandardMaterial) {
                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                  mat.map.needsUpdate = true;
                }

                const matName = (mat.name || "").toLowerCase();

                // 2. Carbon Aero (Canards / Dive Planes, Front Splitter, Rear Diffuser)
                // Crisp glossy twill weave with deep contrast (matching Image 1)
                if (
                  matName.includes("carbon") ||
                  matName.includes("exterior_details")
                ) {
                  mat.roughness = 0.32;
                  mat.metalness = 0.15;
                  mat.envMapIntensity = 0.7;
                  if (mat.normalScale) {
                    mat.normalScale.set(0.65, 0.65);
                  }
                }
                // 3. Red Bull Livery bodywork (Deep glossy metallic royal blue)
                else if (matName.includes("livery")) {
                  mat.roughness = 0.18;
                  mat.metalness = 0.28;
                  mat.envMapIntensity = 1.25;
                }
                // 4. Radiator core & Engine components (Dark with visible red tow hook & cooling fins)
                else if (matName.includes("engine_components")) {
                  mat.roughness = 0.65;
                  mat.metalness = 0.25;
                  mat.envMapIntensity = 0.4;
                }
                // 5. Headlight glass lenses (Crystal clear with deep dark reflectors)
                else if (matName.includes("glass") || matName.includes("lights")) {
                  mat.roughness = 0.05;
                  mat.envMapIntensity = 1.6;
                }
                // 6. Wheels, Calipers & Discs
                else if (matName.includes("rim") || matName.includes("caliper") || matName.includes("disc")) {
                  mat.envMapIntensity = 1.4;
                  mat.roughness = 0.22;
                  mat.metalness = 0.65;
                } else {
                  mat.envMapIntensity = 1.0;
                }

                mat.needsUpdate = true;
              }
            });
          }
        });

        pivot.add(gltf.scene);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const pct = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setLoadProgress(pct);
        } else if (xhr.loaded > 0) {
          // Fallback estimate for 55.38 MB file
          const pct = Math.min(99, Math.round((xhr.loaded / 55382340) * 100));
          setLoadProgress(pct);
        }
      },
      (err) => {
        console.error("Failed to load Mercedes AMG GT3 Red Bull 3D model:", err);
        setIsLoading(false);
      }
    );

    // Interactive pointer drag (user can rotate 360°, stays static on release)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetRotY += deltaX * 0.007;
      targetRotX += deltaY * 0.007;
      targetRotX = Math.max(-0.16, Math.min(0.20, targetRotX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.style.touchAction = "none";
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", applyOptimalScale);

    // Resize handling: dynamically update camera aspect and re-fit scale to new dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          applyOptimalScale();
        }
      }
    });
    resizeObserver.observe(container);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      currentRotY += (targetRotY - currentRotY) * 0.1;
      currentRotX += (targetRotX - currentRotX) * 0.1;

      pivot.rotation.y = currentRotY;
      pivot.rotation.x = currentRotX;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", applyOptimalScale);

      studioEnv.dispose();

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div className="car-hero-standalone" ref={containerRef}>
      {isLoading && (
        <div className="car-model-loader" aria-live="polite">
          <div className="car-loader-telemetry">
            <div className="car-loader-header">
              <span className="car-loader-dot" />
              <span className="car-loader-title">GT3 TELEMETRY // LOADING MODEL</span>
              <span className="car-loader-pct mono">{loadProgress}%</span>
            </div>
            <div className="car-loader-bar-bg">
              <div className="car-loader-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
            <span className="car-loader-caption mono">
              STREAMING RED BULL RACING LIVERY & AERODYNAMICS (55 MB)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

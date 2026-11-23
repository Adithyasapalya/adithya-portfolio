import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Generate high-contrast studio reflection map with softboxes
function createCarStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0a0a0e);

  // Longitudinal overhead strip light
  const topStripGeo = new THREE.PlaneGeometry(16, 70);
  const topStripMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const topStrip = new THREE.Mesh(topStripGeo, topStripMat);
  topStrip.position.set(0, 18, 0);
  topStrip.rotation.x = Math.PI / 2;
  envScene.add(topStrip);

  // Front-right key softbox panel
  const keySoftboxGeo = new THREE.PlaneGeometry(26, 26);
  const keySoftboxMat = new THREE.MeshBasicMaterial({ color: 0xf5f8ff });
  const keySoftbox = new THREE.Mesh(keySoftboxGeo, keySoftboxMat);
  keySoftbox.position.set(16, 14, 16);
  keySoftbox.lookAt(0, 0, 0);
  envScene.add(keySoftbox);

  // Left fill softbox panel
  const fillSoftboxGeo = new THREE.PlaneGeometry(22, 22);
  const fillSoftboxMat = new THREE.MeshBasicMaterial({ color: 0xdae6f8 });
  const fillSoftbox = new THREE.Mesh(fillSoftboxGeo, fillSoftboxMat);
  fillSoftbox.position.set(-18, 12, 10);
  fillSoftbox.lookAt(0, 0, 0);
  envScene.add(fillSoftbox);

  // Rear softbox panel
  const rearSoftboxGeo = new THREE.PlaneGeometry(20, 20);
  const rearSoftboxMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const rearSoftbox = new THREE.Mesh(rearSoftboxGeo, rearSoftboxMat);
  rearSoftbox.position.set(0, 14, -22);
  rearSoftbox.lookAt(0, 0, 0);
  envScene.add(rearSoftbox);

  // Horizontal side rim strip
  const sideStripGeo = new THREE.PlaneGeometry(45, 4);
  const sideStripMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const sideStrip = new THREE.Mesh(sideStripGeo, sideStripMat);
  sideStrip.position.set(14, 3, 0);
  sideStrip.rotation.y = -Math.PI / 2;
  envScene.add(sideStrip);

  const envTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();
  return envTexture;
}

export function CarModelViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera with comfortable distance & wide frustum to eliminate all boundary clipping
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.40, 5.0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Environment Map for realistic paint & glass reflections
    const studioEnv = createCarStudioEnvironment(renderer);
    scene.environment = studioEnv;

    // Direct Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 9, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdde8ff, 1.5);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    const rimBlue = new THREE.DirectionalLight(0x0142a2, 1.6);
    rimBlue.position.set(-6, 3, -4);
    scene.add(rimBlue);

    const rimYellow = new THREE.DirectionalLight(0xffd300, 0.8);
    rimYellow.position.set(4, -2, -3);
    scene.add(rimYellow);

    // Pivot group
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Initial 3/4 front isometric hero angle
    let targetRotY = -Math.PI * 0.28; // ~-50 deg front three-quarter view
    let targetRotX = 0.10;           // slight downward tilt
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;

    pivot.rotation.y = currentRotY;
    pivot.rotation.x = currentRotX;

    // Bounding sphere radius of car (default 2.72 for Mercedes AMG GT3)
    let boundingSphereRadius = 2.72;

    const fitModelToViewport = () => {
      const vFovRad = (camera.fov * Math.PI) / 180;
      const frustumH = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const frustumW = frustumH * camera.aspect;

      // Safe limit ensures the rotating 3D bounding sphere fits completely inside
      // BOTH width and height of the viewport with a clean safety margin,
      // so turning the car at ANY 360° angle NEVER touches or slices against the canvas edge!
      const minDimension = Math.min(frustumW, frustumH);
      const safeDiameter = minDimension * 0.92;
      const safeScale = safeDiameter / (boundingSphereRadius * 2);
      pivot.scale.setScalar(safeScale);
    };

    // Load Model
    const loader = new GLTFLoader();
    const modelUrl = "/mercedes-amg-gt3-red-bull-racing/source/mercedes_benz_amg_gt3_red_bull.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        // Calculate model bounding box and center exactly on origin
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        // Compute exact bounding sphere radius of rotating car
        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        boundingSphereRadius = Math.max(sphere.radius, 2.5);

        fitModelToViewport();

        // Preserve all native materials, textures, and clearcoat exactly as authored
        gltf.scene.traverse((node) => {
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
                mat.envMapIntensity = 1.2;
                mat.needsUpdate = true;
              }
            });
          }
        });

        pivot.add(gltf.scene);
      },
      undefined,
      (err) => {
        console.error("Failed to load Mercedes AMG GT3 Red Bull 3D model:", err);
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
      targetRotX = Math.max(-0.40, Math.min(0.48, targetRotX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.style.touchAction = "none";
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize handling: dynamically update camera aspect and re-fit scale to new dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          fitModelToViewport();
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

  return <div className="car-hero-standalone" ref={containerRef} />;
}

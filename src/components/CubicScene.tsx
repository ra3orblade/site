import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function detectMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820;
}

// ---- Shape generators (each returns exactly `count` Vector3 targets) -------

function cubeShape(count: number): THREE.Vector3[] {
  const N = Math.max(2, Math.round(Math.cbrt(count)));
  const step = 1.6 / Math.max(1, N - 1);
  const half = (N - 1) / 2;
  const out: THREE.Vector3[] = [];
  for (let i = 0; i < N && out.length < count; i++)
    for (let j = 0; j < N && out.length < count; j++)
      for (let k = 0; k < N && out.length < count; k++)
        out.push(new THREE.Vector3((i - half) * step, (j - half) * step, (k - half) * step));
  while (out.length < count) out.push(new THREE.Vector3(0, 0, 0));
  return out;
}

function sphereShape(count: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  const r = 1.05;
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    out.push(new THREE.Vector3(Math.cos(theta) * radius * r, y * r, Math.sin(theta) * radius * r));
  }
  return out;
}

function torusShape(count: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  const R = 1.0;
  const r = 0.34;
  const turns = Math.max(2, Math.round(count / 14));
  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2;
    const v = (i / count) * Math.PI * 2 * turns;
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = r * Math.sin(v);
    const z = (R + r * Math.cos(v)) * Math.sin(u);
    out.push(new THREE.Vector3(x, y, z));
  }
  return out;
}

function pyramidShape(count: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  const layers: Array<{ size: number; y: number }> = [];
  let need = count;
  let layer = 1;
  while (need > 0) {
    const size = layer * layer;
    layers.push({ size, y: 0 });
    need -= size;
    layer++;
    if (layer > 30) break;
  }
  layers.reverse();
  const step = 0.34;
  for (let i = 0; i < layers.length; i++) {
    layers[i].y = -layers.length / 2 * step + i * step;
  }
  let written = 0;
  for (const L of layers) {
    if (written >= count) break;
    const N = Math.round(Math.sqrt(L.size));
    const half = (N - 1) / 2;
    for (let i = 0; i < N && written < count; i++)
      for (let j = 0; j < N && written < count; j++) {
        out.push(new THREE.Vector3((i - half) * step, L.y, (j - half) * step));
        written++;
      }
  }
  while (out.length < count) out.push(new THREE.Vector3(0, 0, 0));
  return out;
}

function helixShape(count: number): THREE.Vector3[] {
  const out: THREE.Vector3[] = [];
  const turns = 2.5;
  const radius = 0.7;
  const heightHalf = 1.0;
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1);
    const angle = t * Math.PI * 2 * turns;
    out.push(
      new THREE.Vector3(Math.cos(angle) * radius, (t - 0.5) * 2 * heightHalf, Math.sin(angle) * radius)
    );
  }
  return out;
}

function makeShapes(count: number) {
  return [cubeShape(count), sphereShape(count), torusShape(count), pyramidShape(count), helixShape(count)];
}

function pickSize() {
  const r = Math.random();
  if (r < 0.07) return 0.22 + Math.random() * 0.1; // big
  if (r < 0.28) return 0.15 + Math.random() * 0.05; // medium
  return 0.08 + Math.random() * 0.05; // small
}

// ---- Voxel system ----------------------------------------------------------

type Voxel = {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  spin: THREE.Vector3;
  rot: THREE.Euler;
  size: number;
};

type Phase = 'scattered' | 'assembling' | 'held' | 'exploding';

function scatterPosition(out: THREE.Vector3) {
  const phi = Math.random() * Math.PI * 2;
  const cosT = 1 - 2 * Math.random();
  const sinT = Math.sqrt(Math.max(0, 1 - cosT * cosT));
  const rr = 3.2 + Math.random() * 1.8;
  out.set(Math.cos(phi) * sinT * rr, cosT * rr, Math.sin(phi) * sinT * rr);
}

function FlyingVoxels({ assemble, mobile }: { assemble: boolean; mobile: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const count = mobile ? 32 : 80;
  const shapes = useMemo(() => makeShapes(count), [count]);

  const voxels = useMemo<Voxel[]>(() => {
    const out: Voxel[] = [];
    const initialScatter = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      scatterPosition(initialScatter);
      out.push({
        pos: initialScatter.clone(),
        target: initialScatter.clone(),
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.6
        ),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        size: pickSize(),
      });
    }
    return out;
  }, [count]);

  const assembleRef = useRef(assemble);
  useEffect(() => {
    assembleRef.current = assemble;
  }, [assemble]);
  const prevAssembleRef = useRef(assemble);

  const phaseRef = useRef<{ phase: Phase; phaseStart: number; shapeIdx: number }>({
    phase: 'scattered',
    phaseStart: 0,
    shapeIdx: 0,
  });

  const assignShapeTargets = (idx: number) => {
    const shape = shapes[idx];
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    for (let i = 0; i < count; i++) voxels[i].target.copy(shape[order[i]]);
  };

  const assignExplosionTargets = () => {
    for (let i = 0; i < count; i++) {
      const v = voxels[i];
      const d = v.pos.clone();
      if (d.lengthSq() < 0.001) {
        scatterPosition(d);
      } else {
        d.normalize();
        d.x += (Math.random() - 0.5) * 0.5;
        d.y += (Math.random() - 0.5) * 0.5;
        d.z += (Math.random() - 0.5) * 0.5;
        d.normalize();
        d.multiplyScalar(3.2 + Math.random() * 1.8);
      }
      v.target.copy(d);
    }
  };

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // React to scroll-driven assemble flag changes.
    if (assembleRef.current !== prevAssembleRef.current) {
      if (assembleRef.current) {
        phaseRef.current.phase = 'assembling';
        phaseRef.current.phaseStart = t;
        assignShapeTargets(phaseRef.current.shapeIdx);
      } else {
        phaseRef.current.phase = 'exploding';
        phaseRef.current.phaseStart = t;
        assignExplosionTargets();
      }
      prevAssembleRef.current = assembleRef.current;
    }

    // Auto-cycle while assembled.
    const elapsed = t - phaseRef.current.phaseStart;
    if (assembleRef.current) {
      if (phaseRef.current.phase === 'assembling' && elapsed > 2.6) {
        phaseRef.current.phase = 'held';
        phaseRef.current.phaseStart = t;
      } else if (phaseRef.current.phase === 'held' && elapsed > 4.0) {
        phaseRef.current.phase = 'exploding';
        phaseRef.current.phaseStart = t;
        assignExplosionTargets();
      } else if (phaseRef.current.phase === 'exploding' && elapsed > 1.4) {
        phaseRef.current.shapeIdx = (phaseRef.current.shapeIdx + 1) % shapes.length;
        phaseRef.current.phase = 'assembling';
        phaseRef.current.phaseStart = t;
        assignShapeTargets(phaseRef.current.shapeIdx);
      }
    } else {
      // Out of view: once explosion settles, mark scattered.
      if (phaseRef.current.phase === 'exploding' && elapsed > 1.4) {
        phaseRef.current.phase = 'scattered';
        phaseRef.current.phaseStart = t;
      }
    }

    // Lerp positions toward target with phase-dependent rate.
    const rate =
      phaseRef.current.phase === 'exploding'
        ? 0.075
        : phaseRef.current.phase === 'assembling'
          ? 0.06
          : 0.045;

    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const v = voxels[i];
      v.pos.lerp(v.target, rate);
      v.rot.x += dt * v.spin.x;
      v.rot.y += dt * v.spin.y;
      v.rot.z += dt * v.spin.z;

      let breath = 1;
      if (phaseRef.current.phase === 'held') {
        breath = 1 + Math.sin(t * 1.2 + i * 0.3) * 0.04;
      }

      dummy.position.copy(v.pos);
      if (phaseRef.current.phase !== 'held') {
        tmp.set(
          Math.sin(t * 3 + i) * 0.014,
          Math.cos(t * 2.7 + i * 1.3) * 0.014,
          Math.sin(t * 3.3 + i * 0.7) * 0.014
        );
        dummy.position.add(tmp);
      }
      dummy.rotation.copy(v.rot);
      dummy.scale.setScalar(v.size * breath);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={!mobile}
      receiveShadow={!mobile}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.12} flatShading />
    </instancedMesh>
  );
}

function CameraOrbit() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera;
    const a = t * 0.045;
    cam.position.x = Math.sin(a) * 3.6;
    cam.position.z = Math.cos(a) * 3.6;
    cam.position.y = 1.2 + Math.sin(t * 0.06) * 0.12;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Voxels of varying sizes that gather into a shape on scroll-in and explode
 * outward on scroll-out. While in view they auto-cycle through several
 * shapes (cube, sphere, torus, pyramid, helix) with explosions between.
 */
export function CubicScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [ready, setReady] = useState(false);
  const [assemble, setAssemble] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const isMobile = detectMobile();
    setMobile(isMobile);
    setDpr(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    setReady(true);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let exitTimer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (exitTimer) {
              window.clearTimeout(exitTimer);
              exitTimer = undefined;
            }
            setAssemble(true);
            setRunning(true);
          } else {
            setAssemble(false);
            // Keep frameloop alive briefly so the explosion plays out.
            if (exitTimer) window.clearTimeout(exitTimer);
            exitTimer = window.setTimeout(() => setRunning(false), 2200);
          }
        }
      },
      { rootMargin: '0px 0px 0px 0px', threshold: [0, 0.15] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, [ready]);

  if (!ready) {
    return (
      <div
        ref={wrapperRef}
        className="relative h-[340px] w-full md:h-[420px] lg:h-[480px]"
        aria-hidden
      />
    );
  }

  if (reduced) {
    return (
      <div
        ref={wrapperRef}
        className="relative h-[340px] w-full md:h-[420px] lg:h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,245,245,0.06) 0%, rgba(0,0,0,0) 60%)',
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative h-[340px] w-full md:h-[420px] lg:h-[480px] overflow-hidden bg-black"
      aria-hidden
    >
      <Canvas
        frameloop={running ? 'always' : 'never'}
        gl={{
          antialias: !mobile,
          alpha: false,
          powerPreference: mobile ? 'default' : 'high-performance',
        }}
        dpr={dpr}
        shadows={!mobile}
        camera={{ position: [3.4, 1.2, 2.4], fov: 36 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#000000', 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.fog = new THREE.Fog('#000000', 6, 14);
        }}
      >
        <CameraOrbit />

        <ambientLight intensity={0.04} />
        <directionalLight
          position={[4.5, 5.2, 2.3]}
          intensity={3.0}
          color="#ffffff"
          castShadow={!mobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={14}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0005}
        />
        <directionalLight position={[-3, 1.2, -3]} intensity={0.3} color="#ffffff" />

        <FlyingVoxels assemble={assemble} mobile={mobile} />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.4, 0]}
          receiveShadow={!mobile}
        >
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#000000" roughness={1} />
        </mesh>
      </Canvas>
    </div>
  );
}

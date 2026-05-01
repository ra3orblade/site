import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function detectMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820;
}

type NodeDef = { x: number; y: number; z: number; scale: number };
type NodeSeed = {
  driftX: number;
  driftY: number;
  driftZ: number;
  phaseX: number;
  phaseY: number;
  phaseZ: number;
  amp: number;
  rotX: number;
  rotY: number;
  rotZ: number;
};
type Signal = { active: boolean; edgeIdx: number; t: number; speed: number; dir: 1 | -1 };

const STRETCH_X = 1.75;

function buildNodes(count: number): { nodes: NodeDef[]; seeds: NodeSeed[] } {
  const nodes: NodeDef[] = [];
  const seeds: NodeSeed[] = [];
  for (let i = 0; i < count; i++) {
    const r = 0.65 + Math.random() * 0.95;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    nodes.push({
      x: Math.cos(theta) * Math.sin(phi) * r * STRETCH_X,
      y: Math.sin(theta) * Math.sin(phi) * r,
      z: Math.cos(phi) * r,
      scale: 0.06 + Math.random() * 0.12,
    });
    seeds.push({
      driftX: 0.35 + Math.random() * 0.6,
      driftY: 0.35 + Math.random() * 0.6,
      driftZ: 0.35 + Math.random() * 0.6,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseZ: Math.random() * Math.PI * 2,
      amp: 0.07 + Math.random() * 0.08,
      rotX: (Math.random() - 0.5) * 0.9,
      rotY: (Math.random() - 0.5) * 0.9,
      rotZ: (Math.random() - 0.5) * 0.4,
    });
  }
  return { nodes, seeds };
}

function buildEdgeIndices(nodes: NodeDef[], degree: number): [number, number][] {
  const out: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dz = nodes[i].z - nodes[j].z;
      dists.push({ j, d: Math.hypot(dx, dy, dz) });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < Math.min(degree, dists.length); k++) {
      const a = Math.min(i, dists[k].j);
      const b = Math.max(i, dists[k].j);
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([a, b]);
    }
  }
  return out;
}

function Cluster({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const signalRefs = useRef<Array<THREE.Mesh | null>>([]);
  const count = mobile ? 22 : 38;
  const signalCount = mobile ? 5 : 9;
  const cooldownRef = useRef(0.6);

  const { nodes, seeds, edgeIndices, edgeGeom, signals, pulses } = useMemo(() => {
    const { nodes, seeds } = buildNodes(count);
    const edgeIndices = buildEdgeIndices(nodes, 2);
    const positions = new Float32Array(edgeIndices.length * 6);
    for (let e = 0; e < edgeIndices.length; e++) {
      const [a, b] = edgeIndices[e];
      positions[e * 6 + 0] = nodes[a].x;
      positions[e * 6 + 1] = nodes[a].y;
      positions[e * 6 + 2] = nodes[a].z;
      positions[e * 6 + 3] = nodes[b].x;
      positions[e * 6 + 4] = nodes[b].y;
      positions[e * 6 + 5] = nodes[b].z;
    }
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const signals: Signal[] = Array.from({ length: signalCount }, () => ({
      active: false,
      edgeIdx: 0,
      t: 0,
      speed: 0,
      dir: 1,
    }));
    const pulses = new Float32Array(count);
    return { nodes, seeds, edgeIndices, edgeGeom, signals, pulses };
  }, [count, signalCount]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    const live: Array<{ x: number; y: number; z: number }> = new Array(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const s = seeds[i];
      const x = n.x + Math.sin(t * s.driftX + s.phaseX) * s.amp;
      const y = n.y + Math.sin(t * s.driftY + s.phaseY) * s.amp;
      const z = n.z + Math.sin(t * s.driftZ + s.phaseZ) * s.amp;
      live[i] = { x, y, z };

      pulses[i] = Math.max(0, pulses[i] - dt * 1.6);

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(x, y, z);
        mesh.rotation.x += dt * s.rotX;
        mesh.rotation.y += dt * s.rotY;
        mesh.rotation.z += dt * s.rotZ;
        const pulseScale = 1 + pulses[i] * 0.55;
        mesh.scale.setScalar(n.scale * pulseScale);
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = pulses[i] * 1.4;
      }
    }

    const pos = edgeGeom.attributes.position.array as Float32Array;
    for (let e = 0; e < edgeIndices.length; e++) {
      const [a, b] = edgeIndices[e];
      const na = live[a];
      const nb = live[b];
      pos[e * 6 + 0] = na.x;
      pos[e * 6 + 1] = na.y;
      pos[e * 6 + 2] = na.z;
      pos[e * 6 + 3] = nb.x;
      pos[e * 6 + 4] = nb.y;
      pos[e * 6 + 5] = nb.z;
    }
    edgeGeom.attributes.position.needsUpdate = true;

    cooldownRef.current -= dt;
    if (cooldownRef.current <= 0) {
      cooldownRef.current = 0.4 + Math.random() * 0.9;
      for (const sig of signals) {
        if (!sig.active) {
          sig.active = true;
          sig.edgeIdx = Math.floor(Math.random() * edgeIndices.length);
          sig.t = 0;
          sig.speed = 0.55 + Math.random() * 0.85;
          sig.dir = Math.random() < 0.5 ? 1 : -1;
          break;
        }
      }
    }

    for (let i = 0; i < signals.length; i++) {
      const sig = signals[i];
      const mesh = signalRefs.current[i];
      if (!sig.active) {
        if (mesh) mesh.visible = false;
        continue;
      }
      sig.t += dt * sig.speed;
      const [a, b] = edgeIndices[sig.edgeIdx];
      const start = sig.dir === 1 ? a : b;
      const end = sig.dir === 1 ? b : a;
      const na = live[start];
      const nb = live[end];
      const tt = Math.min(1, sig.t);
      const eased = tt * tt * (3 - 2 * tt);
      const x = na.x + (nb.x - na.x) * eased;
      const y = na.y + (nb.y - na.y) * eased;
      const z = na.z + (nb.z - na.z) * eased;
      if (mesh) {
        mesh.visible = true;
        mesh.position.set(x, y, z);
        mesh.rotation.x += dt * 4;
        mesh.rotation.y += dt * 5;
      }
      if (sig.t >= 1) {
        sig.active = false;
        pulses[end] = 1;
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.13) * 0.2;
      groupRef.current.rotation.z = Math.sin(t * 0.09) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial color="#f5f5f5" transparent opacity={0.45} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={[n.x, n.y, n.z]}
          scale={n.scale}
        >
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0}
            roughness={0.4}
            metalness={0.18}
            flatShading
          />
        </mesh>
      ))}
      {signals.map((_, i) => (
        <mesh
          key={`sig-${i}`}
          ref={(el) => {
            signalRefs.current[i] = el;
          }}
          visible={false}
          scale={0.075}
        >
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.6}
            roughness={0.25}
            metalness={0.4}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Low-poly knowledge graph cluster of pyramid (tetrahedron) nodes connected
 * by live edges. Bright signals pulse along edges and trigger receiver glows
 * — echoes the alive quality of the hero scene.
 */
export function KnowledgeGraph() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

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
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) {
    return (
      <div
        ref={wrapperRef}
        className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]"
        aria-hidden
      />
    );
  }

  if (reduced) {
    return (
      <div
        ref={wrapperRef}
        className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)',
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative h-[380px] w-full md:h-[460px] lg:h-[540px]"
      aria-hidden
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: mobile ? 'default' : 'high-performance',
        }}
        dpr={dpr}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <ambientLight intensity={0.04} />
        <hemisphereLight args={['#ffffff', '#000000', 0.18]} />
        <directionalLight position={[3.2, 4.8, 2.2]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-2.5, 1.2, -3.5]} intensity={1.2} color="#ffffff" />
        <Cluster mobile={mobile} />
      </Canvas>
    </div>
  );
}

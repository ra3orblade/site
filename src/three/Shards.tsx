import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getHeroDim } from './scroll';

const COUNT_DESKTOP = 60;
const COUNT_MOBILE = 22;

/**
 * Small instanced shards orbiting the central form. They share lighting,
 * so they catch the same key/rim and reinforce the depth.
 */
export function Shards({ mobile = false }: { mobile?: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;

  const { matrices, seeds } = useMemo(() => {
    const ms: THREE.Matrix4[] = [];
    const sd: Array<{ orbit: number; phase: number; tilt: number; rate: number; size: number }> = [];
    for (let i = 0; i < count; i++) {
      ms.push(new THREE.Matrix4());
      sd.push({
        orbit: 1.7 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.9,
        rate: 0.05 + Math.random() * 0.18,
        size: 0.04 + Math.random() * 0.07,
      });
    }
    return { matrices: ms, seeds: sd };
  }, [count]);

  const tmp = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      quat: new THREE.Quaternion(),
      scale: new THREE.Vector3(),
      euler: new THREE.Euler(),
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const dim = getHeroDim();
    // Shards drift outward and shrink as you scroll, then fade out.
    const drift = 1 + dim * 1.6;
    const sizeFactor = 1 - dim * 0.7;

    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const angle = s.phase + t * s.rate;
      tmp.pos.set(
        Math.cos(angle) * s.orbit * drift,
        Math.sin(angle * 0.7 + s.phase) * s.orbit * 0.45 * s.tilt * drift,
        Math.sin(angle) * s.orbit * drift
      );
      tmp.euler.set(t * s.rate * 1.7 + i, t * s.rate * 1.3 + i * 0.4, t * s.rate + i * 0.7);
      tmp.quat.setFromEuler(tmp.euler);
      tmp.scale.setScalar(s.size * sizeFactor);
      matrices[i].compose(tmp.pos, tmp.quat, tmp.scale);
      ref.current.setMatrixAt(i, matrices[i]);
    }
    ref.current.instanceMatrix.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = Math.max(0, 1 - dim * 1.4);
      matRef.current.transparent = dim > 0.05;
    }
  });

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count]}
      castShadow={!mobile}
      receiveShadow={!mobile}
    >
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial ref={matRef} color="#ffffff" roughness={0.4} metalness={0.1} flatShading />
    </instancedMesh>
  );
}

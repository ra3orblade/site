import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Form } from './Form';
import { Shards } from './Shards';
import { getHeroDim } from './scroll';

function CameraRig() {
  const pointer = useRef({ x: 0, y: 0 });
  const shadowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const dim = getHeroDim();
    const targetX = pointer.current.x * 0.45 * (1 - dim * 0.7);
    const targetY = 0.15 + pointer.current.y * 0.35 * (1 - dim * 0.7);
    const targetZ = 4.6 + dim * 3.5;
    const k = Math.min(1, delta * 1.6);
    state.camera.position.x += (targetX - state.camera.position.x) * k;
    state.camera.position.y += (targetY - state.camera.position.y) * k;
    state.camera.position.z += (targetZ - state.camera.position.z) * k;
    state.camera.lookAt(0, 0, 0);

    state.gl.toneMappingExposure = 1.05 - dim * 0.55;

    if (shadowRef.current) {
      shadowRef.current.visible = dim < 0.5;
    }
  });

  return <group ref={shadowRef as never} />;
}

export default function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 1.75));
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduced) {
    return (
      <div
        ref={ref}
        className="h-full w-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%), #000',
        }}
      />
    );
  }

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={dpr}
        shadows
        camera={{ position: [0, 0.15, 4.6], fov: 38, near: 0.1, far: 30 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#000000', 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.fog = new THREE.Fog('#000000', 5, 14);
        }}
      >
        <CameraRig />

        <ambientLight intensity={0.04} />
        <hemisphereLight args={['#ffffff', '#000000', 0.18]} />

        <directionalLight
          position={[3.2, 4.8, 2.2]}
          intensity={3.4}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={12}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0005}
        />

        <directionalLight position={[-2.5, 1.2, -3.5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[0, -2.5, 1.5]} intensity={0.18} color="#ffffff" />

        <Form />
        <Shards />

        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.55}
          scale={6}
          blur={2.6}
          far={3}
          resolution={512}
          color="#000000"
        />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.25}
            mipmapBlur
            radius={0.75}
          />
          <Vignette eskil={false} offset={0.18} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

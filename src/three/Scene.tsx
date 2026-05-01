import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Form } from './Form';
import { Shards } from './Shards';
import { getHeroDim } from './scroll';

function detectMobile() {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 820;
  return coarse || narrow;
}

function CameraRig({ touchOnly }: { touchOnly: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const shadowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (touchOnly) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [touchOnly]);

  useFrame((state, delta) => {
    const dim = getHeroDim();
    const t = state.clock.elapsedTime;
    // On touch devices, drive parallax from a slow lissajous so the scene
    // never sits perfectly still — there's no cursor to follow.
    const px = touchOnly ? Math.sin(t * 0.18) * 0.6 : pointer.current.x;
    const py = touchOnly ? Math.cos(t * 0.13) * 0.5 : pointer.current.y;
    const targetX = px * 0.45 * (1 - dim * 0.7);
    const targetY = 0.15 + py * 0.35 * (1 - dim * 0.7);
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
  const [mobile, setMobile] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const isMobile = detectMobile();
    setMobile(isMobile);
    // Cap DPR aggressively on mobile — high-DPR + postprocessing is the
    // most common cause of WebGL context loss on iOS Safari.
    const cap = isMobile ? 1.25 : 1.75;
    setDpr(Math.min(window.devicePixelRatio || 1, cap));
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
        gl={{
          antialias: !mobile,
          alpha: false,
          powerPreference: mobile ? 'default' : 'high-performance',
        }}
        dpr={dpr}
        shadows={!mobile}
        camera={{ position: [0, 0.15, 4.6], fov: 38, near: 0.1, far: 30 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#000000', 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.fog = new THREE.Fog('#000000', 5, 14);
        }}
      >
        <CameraRig touchOnly={mobile} />

        <ambientLight intensity={0.04} />
        <hemisphereLight args={['#ffffff', '#000000', 0.18]} />

        <directionalLight
          position={[3.2, 4.8, 2.2]}
          intensity={3.4}
          color="#ffffff"
          castShadow={!mobile}
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
        <Shards mobile={mobile} />

        {!mobile && (
          <ContactShadows
            position={[0, -1.55, 0]}
            opacity={0.55}
            scale={6}
            blur={2.6}
            far={3}
            resolution={512}
            color="#000000"
          />
        )}

        {!mobile && (
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
        )}
      </Canvas>
    </div>
  );
}

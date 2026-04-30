import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getHeroDim } from './scroll';

const noiseFns = /* glsl */ `
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289v(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289v(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  vec3 displaced(vec3 p, vec3 n, float uTime, float uAmp, float uFreq, float uSpike){
    float t = uTime * 0.18;
    float n1 = snoise(p * uFreq + vec3(t, 0.0, 0.0));
    float n2 = snoise(p * (uFreq * 2.3) + vec3(0.0, t * 1.7, 0.0)) * 0.5;
    float spike = pow(max(0.0, n1), 3.0) * uSpike;
    float disp = (n1 + n2) * uAmp + spike;
    return p + n * disp;
  }
`;

function makeOnBeforeCompile(uniforms: ReturnType<typeof makeUniforms>) {
  return (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uAmp = uniforms.uAmp;
    shader.uniforms.uFreq = uniforms.uFreq;
    shader.uniforms.uSpike = uniforms.uSpike;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      /* glsl */ `
        #include <common>
        uniform float uTime;
        uniform float uAmp;
        uniform float uFreq;
        uniform float uSpike;
        ${noiseFns}
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      /* glsl */ `
        vec3 transformed = displaced(position, normal, uTime, uAmp, uFreq, uSpike);
      `
    );
  };
}

function makeUniforms() {
  return {
    uTime: { value: 0 },
    uAmp: { value: 0.18 },
    uFreq: { value: 1.4 },
    uSpike: { value: 0.0 },
  };
}

/**
 * Central form. Two stacked meshes — a faceted icosahedron and a torus knot.
 * As scroll progresses, the icosahedron fades and shrinks while the knot
 * fades in and grows. The hero icon literally turns into something else by the
 * time you've scrolled past the hero.
 */
export function Form() {
  const icosaRef = useRef<THREE.Mesh>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const icosaMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const knotMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const icosaGeom = useMemo(() => new THREE.IcosahedronGeometry(1.0, 24), []);
  const knotGeom = useMemo(() => new THREE.TorusKnotGeometry(0.7, 0.2, 220, 24, 2, 3), []);

  const icosaUniforms = useMemo(makeUniforms, []);
  const knotUniforms = useMemo(makeUniforms, []);

  const icosaCompile = useMemo(() => makeOnBeforeCompile(icosaUniforms), [icosaUniforms]);
  const knotCompile = useMemo(() => makeOnBeforeCompile(knotUniforms), [knotUniforms]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dim = getHeroDim();
    const spikePulse = Math.max(0, Math.sin(t * 0.45) - 0.6) / 0.4;

    // Icosahedron — primary at top of page, recedes as you scroll.
    icosaUniforms.uTime.value = t;
    icosaUniforms.uAmp.value = 0.16 + Math.sin(t * 0.25) * 0.05 + dim * 0.45;
    icosaUniforms.uSpike.value = Math.max(spikePulse * 0.3, dim * 0.4);
    icosaUniforms.uFreq.value = 1.4 + dim * 1.4;

    // Torus knot — emerges as you scroll past ~50%.
    knotUniforms.uTime.value = t * 0.7;
    knotUniforms.uAmp.value = 0.06 + Math.sin(t * 0.3) * 0.03 + (1 - dim) * 0.04;
    knotUniforms.uSpike.value = 0;
    knotUniforms.uFreq.value = 1.6;

    // Cross-fade: icosa from full to gone by ~0.7 dim; knot from 0 starting at 0.35.
    const icosaOpacity = Math.max(0, 1 - dim * 1.5);
    const knotOpacity = Math.max(0, Math.min(1, (dim - 0.35) * 2.2));

    if (icosaMatRef.current) {
      icosaMatRef.current.opacity = icosaOpacity;
      icosaMatRef.current.transparent = icosaOpacity < 0.999;
    }
    if (knotMatRef.current) {
      knotMatRef.current.opacity = knotOpacity;
      knotMatRef.current.transparent = true;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.y += delta * (0.12 + dim * 0.18);
      icosaRef.current.rotation.x = Math.sin(t * 0.21) * 0.25;
      icosaRef.current.scale.setScalar(1 - dim * 0.4);
      icosaRef.current.visible = icosaOpacity > 0.001;
    }
    if (knotRef.current) {
      knotRef.current.rotation.y += delta * (0.18 + dim * 0.25);
      knotRef.current.rotation.x = Math.sin(t * 0.18) * 0.4;
      knotRef.current.rotation.z += delta * 0.08;
      knotRef.current.scale.setScalar(0.4 + knotOpacity * 0.85);
      knotRef.current.visible = knotOpacity > 0.001;
    }
  });

  return (
    <group>
      <mesh ref={icosaRef} geometry={icosaGeom} castShadow receiveShadow>
        <meshStandardMaterial
          ref={icosaMatRef}
          color="#ffffff"
          roughness={0.32}
          metalness={0.18}
          flatShading
          envMapIntensity={0.4}
          onBeforeCompile={icosaCompile}
        />
      </mesh>
      <mesh ref={knotRef} geometry={knotGeom} castShadow receiveShadow visible={false}>
        <meshStandardMaterial
          ref={knotMatRef}
          color="#ffffff"
          roughness={0.28}
          metalness={0.22}
          flatShading
          envMapIntensity={0.4}
          onBeforeCompile={knotCompile}
        />
      </mesh>
    </group>
  );
}

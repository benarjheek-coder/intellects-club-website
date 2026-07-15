"use client";
import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Stars, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      lavaMaterial: any;
      gpuParticleMaterial: any;
    }
  }
}

// ============================================================================
// GLSL SHADERS (High-Performance GPU Rendering)
// ============================================================================

const noise3D = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
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
  vec3  ns = n_ * D.wyz - D.xzx;
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
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// 1. Procedural Earth Shader
class ProceduralEarthMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * vec4(vPosition, 1.0);
        }
      `,
      fragmentShader: `
        ${noise3D}
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vec3 pos = vec3(vUv * 5.0, uTime * 0.05);
          float n = snoise(pos) * 0.5 + 0.5;
          float n2 = snoise(pos * 2.0) * 0.5 + 0.5;
          float landNoise = n * 0.7 + n2 * 0.3;
          
          vec3 water = vec3(0.01, 0.04, 0.08);
          vec3 land = vec3(0.02, 0.05, 0.02);
          vec3 nightLights = vec3(1.0, 0.9, 0.5) * pow(n2, 5.0) * 1.5;
          
          vec3 color = mix(water, land, smoothstep(0.4, 0.6, landNoise));
          
          float cloudNoise = snoise(vec3(vUv * 8.0, uTime * 0.1)) * 0.5 + 0.5;
          float cloudCover = smoothstep(0.5, 0.8, cloudNoise);
          color = mix(color, vec3(0.8), cloudCover);
          
          if(landNoise > 0.5 && cloudCover < 0.2) color += nightLights * 0.5;
          
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity * 1.0;
          
          gl_FragColor = vec4(color + atmosphere, 1.0);
        }
      `,
    });
  }
}

// 2. Volumetric Fireball Shader
class VolumetricFireballMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.0 } },
      vertexShader: `
        ${noise3D}
        varying float vNoise;
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vUv = uv;
          float n = snoise(position * 1.5 + uTime * 3.0);
          vNoise = n;
          vec3 newPos = position + normal * (n * 1.5); // Huge distortion
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vNoise;
        varying vec2 vUv;
        uniform float uOpacity;
        void main() {
          float intensity = smoothstep(-1.0, 1.0, vNoise);
          vec3 color = mix(vec3(1.0, 0.05, 0.0), vec3(1.0, 0.8, 0.1), intensity);
          color = mix(vec3(0.01), color, intensity * 2.0); // Thick black smoke edges
          float alpha = smoothstep(-0.5, 0.8, vNoise) * uOpacity;
          gl_FragColor = vec4(color * 2.5, alpha);
        }
      `
    });
  }
}

// 3. Lava Asteroid Shader
class LavaMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: { uTime: { value: 0 }, uGlowIntensity: { value: 1.0 } },
      vertexShader: `
        ${noise3D}
        varying vec2 vUv;
        varying float vNoise;
        varying vec3 vNormal;
        uniform float uTime;
        void main() {
          vUv = uv;
          vNormal = normal;
          float n = snoise(position * 2.5 + uTime * 0.5); // highly jagged
          vNoise = n;
          vec3 newPos = position + normal * (n * 0.6);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vNoise;
        varying vec3 vNormal;
        uniform float uGlowIntensity;
        void main() {
          vec3 rockColor = vec3(0.01, 0.01, 0.01);
          float lavaFactor = smoothstep(0.0, -0.5, vNoise);
          vec3 lavaColor = vec3(1.0, 0.3, 0.0) * uGlowIntensity * 3.0;
          vec3 finalColor = mix(rockColor, lavaColor, lavaFactor);
          float light = dot(vNormal, vec3(0.0, 1.0, 1.0)) * 0.5 + 0.5;
          finalColor *= light + lavaFactor; 
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// 4. Instanced 3D Debris (Burning Rocks)
class InstancedDebrisMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: { uExplosionScale: { value: 0 } },
      vertexShader: `
        uniform float uExplosionScale;
        attribute vec3 aVelocity;
        attribute vec3 aAngularVelocity;
        attribute float aSize;
        
        varying vec3 vNormal;
        varying float vHeat;
        
        mat3 rotX(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(1, 0, 0, 0, c, -s, 0, s, c);
        }
        mat3 rotY(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(c, 0, s, 0, 1, 0, -s, 0, c);
        }
        mat3 rotZ(float angle) {
          float c = cos(angle), s = sin(angle);
          return mat3(c, -s, 0, s, c, 0, 0, 0, 1);
        }
        
        void main() {
          float t = uExplosionScale * 15.0; // scale 0->1 becomes 0->15 seconds of travel
          
          vec3 offset = aVelocity * t;
          
          mat3 rot = rotZ(aAngularVelocity.z * t) * rotY(aAngularVelocity.y * t) * rotX(aAngularVelocity.x * t);
          vec3 rotatedPos = rot * (position * aSize);
          vNormal = normalize(normalMatrix * rot * normal);
          
          // Add motion blur stretching based on velocity
          vec3 stretch = aVelocity * uExplosionScale * 0.5;
          rotatedPos += stretch * position.z; 

          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(rotatedPos + offset, 1.0);
          
          // Heat fades as they travel further
          vHeat = clamp(1.0 - (t / 15.0), 0.0, 1.0);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying float vHeat;
        
        void main() {
          vec3 coreColor = vec3(0.01, 0.01, 0.01); // Pure black volcanic rock
          
          // Edges glow orange
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          rim = smoothstep(0.6, 1.0, rim);
          
          vec3 fireColor = vec3(1.0, 0.2, 0.0) * 3.0 * vHeat;
          
          gl_FragColor = vec4(mix(coreColor, fireColor, rim), 1.0);
        }
      `
    });
  }
}

// 5. Instanced Smoke Billboards
class InstancedSmokeMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: { uExplosionScale: { value: 0 }, uOpacity: { value: 1.0 } },
      vertexShader: `
        uniform float uExplosionScale;
        attribute vec3 aVelocity;
        attribute float aSize;
        
        varying vec2 vUv;
        varying float vAlpha;
        
        void main() {
          vUv = uv;
          float t = uExplosionScale * 10.0;
          vec3 offset = aVelocity * t;
          
          // Billboard strictly facing camera
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(offset, 1.0);
          
          // Apply size expansion
          float currentSize = aSize * (1.0 + uExplosionScale * 2.0);
          mvPosition.xy += position.xy * currentSize;
          
          vAlpha = clamp(uExplosionScale * 2.0, 0.0, 1.0); // fade in rapidly
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        ${noise3D}
        varying vec2 vUv;
        varying float vAlpha;
        uniform float uOpacity;
        
        void main() {
          // Circular soft edge
          float dist = distance(vUv, vec2(0.5));
          if (dist > 0.5) discard;
          
          float n = snoise(vec3(vUv * 5.0, 1.0)) * 0.5 + 0.5;
          float alpha = smoothstep(0.5, 0.2, dist) * n * vAlpha * uOpacity;
          
          vec3 smokeColor = vec3(0.02, 0.01, 0.01);
          
          gl_FragColor = vec4(smokeColor, alpha);
        }
      `
    });
  }
}


// ============================================================================
// COMPONENTS
// ============================================================================

function RealEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [colorMap, specularMap, cloudsMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-water.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
  ]);

  useFrame(() => {
    if (earthRef.current && cloudsRef.current) {
      earthRef.current.rotation.y += 0.001;
      cloudsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap} 
          roughnessMap={specularMap}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function CinematicObjects({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const asteroidRef = useRef<THREE.Mesh>(null);
  const fireballRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  
  const lavaMaterial = useMemo(() => new LavaMaterial(), []);
  const fireballMaterial = useMemo(() => new VolumetricFireballMaterial(), []);

  const asteroidMatRef = useRef<any>(null);
  const fireballMatRef = useRef<any>(null);

  useEffect(() => {
    if (!timeline || !earthGroupRef.current || !asteroidRef.current || !fireballRef.current || !shockwaveRef.current) return;
    
    // INITIAL STATES
    earthGroupRef.current.position.set(0, 0, -25);
    earthGroupRef.current.scale.set(6, 6, 6);
    
    asteroidRef.current.position.set(10, 8, 10);
    asteroidRef.current.scale.set(2.0, 2.0, 2.0); 
    
    fireballRef.current.position.set(0, 0, -25);
    fireballRef.current.scale.set(0.01, 0.01, 0.01);
    
    shockwaveRef.current.position.set(0, 0, -25);
    shockwaveRef.current.scale.set(0.01, 0.01, 0.01);
    (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity = 0;

    // 1. EARTH ROTATION & ZOOM
    timeline.to(earthGroupRef.current.position, { z: -20, duration: 8, ease: "none" }, 0);

    // 2. ASTEROID FLY-BY (t=1.5 to t=4.0)
    timeline.to(asteroidRef.current.position, {
      x: 0, y: 0, z: -19,
      duration: 2.5,
      ease: "power3.in"
    }, 1.5);
    timeline.to(asteroidRef.current.rotation, {
      x: Math.PI * 6, y: Math.PI * 4,
      duration: 2.5,
      ease: "power3.in"
    }, 1.5);
    timeline.to(asteroidMatRef.current.uniforms.uGlowIntensity, {
      value: 12.0,
      duration: 2.5,
      ease: "power4.in"
    }, 1.5);

    // 3. IMPACT (At t = 4.0)
    timeline.to(asteroidRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.05 }, 4.0);
    timeline.to(earthGroupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.05 }, 4.0);
    
    // Fireball Explosion
    timeline.to(fireballRef.current.scale, {
      x: 70, y: 70, z: 70,
      duration: 1.2,
      ease: "power3.out"
    }, 4.0);
    timeline.to(fireballMatRef.current.uniforms.uOpacity, {
      value: 1.0, duration: 0.1
    }, 4.0);
    timeline.to(fireballMatRef.current.uniforms.uOpacity, {
      value: 0.0, duration: 2.0, ease: "power2.inOut"
    }, 4.2);

    // Shockwave
    timeline.to(shockwaveRef.current.scale, {
      x: 120, y: 120, z: 0.1,
      duration: 1.2,
      ease: "power3.out"
    }, 4.0);
    timeline.to((shockwaveRef.current.material as THREE.MeshBasicMaterial), {
      opacity: 1.0, duration: 0.1
    }, 4.0);
    timeline.to((shockwaveRef.current.material as THREE.MeshBasicMaterial), {
      opacity: 0.0, duration: 1.0, ease: "power2.in"
    }, 4.2);

  }, [timeline]);

  useFrame((state) => {
    if (asteroidMatRef.current) asteroidMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (fireballMatRef.current) fireballMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      <group ref={earthGroupRef}>
        <Suspense fallback={null}>
          <RealEarth />
        </Suspense>
      </group>

      <mesh ref={asteroidRef}>
        <icosahedronGeometry args={[1, 32]} />
        <primitive object={lavaMaterial} ref={asteroidMatRef} attach="material" />
      </mesh>

      <mesh ref={fireballRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={fireballMaterial} ref={fireballMatRef} attach="material" />
      </mesh>

      <mesh ref={shockwaveRef}>
        <torusGeometry args={[1, 0.1, 32, 100]} />
        <meshBasicMaterial color="#ffffff" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function DebrisSystem({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const smokeRef = useRef<THREE.InstancedMesh>(null);
  
  const debrisMatRef = useRef<any>(null);
  const smokeMatRef = useRef<any>(null);

  const debrisMaterial = useMemo(() => new InstancedDebrisMaterial(), []);
  const smokeMaterial = useMemo(() => new InstancedSmokeMaterial(), []);

  const ROCK_COUNT = 600;
  const SMOKE_COUNT = 400;

  useEffect(() => {
    if (!meshRef.current || !smokeRef.current) return;
    
    const dummy = new THREE.Object3D();
    
    // Setup Debris Physics
    const velocities = new Float32Array(ROCK_COUNT * 3);
    const angulars = new Float32Array(ROCK_COUNT * 3);
    const sizes = new Float32Array(ROCK_COUNT);
    
    for (let i = 0; i < ROCK_COUNT; i++) {
      dummy.position.set(0, 0, -20); // Earth location
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random()); // Face camera
      const speed = 1.0 + Math.random() * 4.0;
      
      velocities[i*3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i*3+1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i*3+2] = Math.cos(phi) * speed;
      
      angulars[i*3] = (Math.random() - 0.5) * 10;
      angulars[i*3+1] = (Math.random() - 0.5) * 10;
      angulars[i*3+2] = (Math.random() - 0.5) * 10;
      
      sizes[i] = 0.2 + Math.random() * 1.5; // Massive random rock sizes
    }
    
    meshRef.current.geometry.setAttribute('aVelocity', new THREE.InstancedBufferAttribute(velocities, 3));
    meshRef.current.geometry.setAttribute('aAngularVelocity', new THREE.InstancedBufferAttribute(angulars, 3));
    meshRef.current.geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(sizes, 1));
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Setup Smoke Billboards
    const smokeVelocities = new Float32Array(SMOKE_COUNT * 3);
    const smokeSizes = new Float32Array(SMOKE_COUNT);
    
    for (let i = 0; i < SMOKE_COUNT; i++) {
      dummy.position.set(0, 0, -20);
      dummy.updateMatrix();
      smokeRef.current.setMatrixAt(i, dummy.matrix);
      
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random()); 
      const speed = 0.5 + Math.random() * 2.0;
      
      smokeVelocities[i*3] = Math.sin(phi) * Math.cos(theta) * speed;
      smokeVelocities[i*3+1] = Math.sin(phi) * Math.sin(theta) * speed;
      smokeVelocities[i*3+2] = Math.cos(phi) * speed;
      
      smokeSizes[i] = 5.0 + Math.random() * 15.0; // Huge planes
    }

    smokeRef.current.geometry.setAttribute('aVelocity', new THREE.InstancedBufferAttribute(smokeVelocities, 3));
    smokeRef.current.geometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(smokeSizes, 1));
    smokeRef.current.instanceMatrix.needsUpdate = true;

  }, []);

  useEffect(() => {
    if (!debrisMatRef.current || !smokeMatRef.current || !timeline) return;

    debrisMatRef.current.uniforms.uExplosionScale.value = 0;
    smokeMatRef.current.uniforms.uExplosionScale.value = 0;
    smokeMatRef.current.uniforms.uOpacity.value = 1.0;

    // Explode heavily at t=4.0
    timeline.to(debrisMatRef.current.uniforms.uExplosionScale, {
      value: 1.0,
      duration: 4.0,
      ease: "power2.out"
    }, 4.0);

    timeline.to(smokeMatRef.current.uniforms.uExplosionScale, {
      value: 1.0,
      duration: 5.0,
      ease: "power2.out"
    }, 4.0);

    // Fade out smoke to reveal logo
    timeline.to(smokeMatRef.current.uniforms.uOpacity, {
      value: 0.0,
      duration: 3.0,
      ease: "power2.inOut"
    }, 6.0);

  }, [timeline]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, ROCK_COUNT]}>
        <icosahedronGeometry args={[1, 0]} />
        <primitive object={debrisMaterial} ref={debrisMatRef} attach="material" />
      </instancedMesh>
      
      <instancedMesh ref={smokeRef} args={[undefined, undefined, SMOKE_COUNT]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={smokeMaterial} ref={smokeMatRef} attach="material" />
      </instancedMesh>
    </group>
  );
}

function CinematicCamera({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const { camera } = useThree();
  const shake = useRef({ intensity: 0 });
  const flash = useRef<THREE.PointLight>(null);

  useEffect(() => {
    if (!timeline) return;
    
    // Start strictly far back
    camera.position.set(0, 0, 5); 
    
    // As asteroid flies past, camera tracking
    timeline.to(camera.position, { z: 5, duration: 2.5, ease: "power2.inOut" }, 1.5);
    timeline.to(camera.rotation, { x: -0.1, y: 0, duration: 2.5, ease: "power2.in" }, 1.5);
    timeline.to(shake.current, { intensity: 0.4, duration: 2.5, ease: "power4.in" }, 1.5);

    // Impact Shake & White Flash
    timeline.to(shake.current, { intensity: 4.0, duration: 0.1 }, 4.0);
    timeline.to(shake.current, { intensity: 0, duration: 3.5, ease: "power3.out" }, 4.1);

    if (flash.current) {
      flash.current.intensity = 0;
      timeline.to(flash.current, { intensity: 2000, duration: 0.1 }, 4.0);
      timeline.to(flash.current, { intensity: 0, duration: 2.5, ease: "power2.out" }, 4.1);
    }

  }, [timeline, camera]);

  useFrame((state) => {
    if (shake.current.intensity > 0) {
      const i = shake.current.intensity;
      const t = state.clock.elapsedTime * 60;
      camera.position.x = (Math.sin(t) * i * 0.5) + (Math.random() - 0.5) * i;
      camera.position.y = (Math.cos(t * 1.1) * i * 0.5) + (Math.random() - 0.5) * i;
    } else {
      camera.position.x = 0;
      camera.position.y = 0;
    }
  });

  return <pointLight ref={flash} color="#ffffff" distance={300} decay={2} />;
}

// ============================================================================
// MAIN SCENE
// ============================================================================
export default function CinematicScene({ onComplete }: { onComplete: () => void }) {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const [showUI, setShowUI] = useState(false);
  const [showBlackout, setShowBlackout] = useState(false);
  const [initialBlackScreen, setInitialBlackScreen] = useState(true);

  useEffect(() => {
    // Fade out initial black screen after 1s
    setTimeout(() => setInitialBlackScreen(false), 1000);

    const tl = gsap.timeline({ delay: 1.0 }); // Start timeline after black screen
    setTimeline(tl);

    // Slow motion right after impact (t=4.0 is impact in timeline)
    tl.to(tl, { timeScale: 0.05, duration: 0.1, ease: "none" }, 4.1);
    tl.to(tl, { timeScale: 1.0, duration: 1.0, ease: "power2.in" }, 4.2);

    // Full screen physical blackout to mask the UI reveal
    // Adjusted by +1.0s to account for the initial black screen delay
    setTimeout(() => setShowBlackout(true), 5200);
    setTimeout(() => setShowBlackout(false), 8000); // clears slowly

    // Trigger UI (Logo already standing there)
    setTimeout(() => setShowUI(true), 7500); // Fades in as smoke/blackout clears

    // Trigger Complete
    setTimeout(() => onComplete(), 12000);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <>
      <div className="absolute inset-0 z-0 bg-[#000000]">
        <Canvas gl={{ antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.05} /> // extremely dark space
          
          <directionalLight position={[20, 10, 10]} intensity={3.5} color="#ffffff" />
          
          <CinematicCamera timeline={timeline} />
          <CinematicObjects timeline={timeline} />
          <DebrisSystem timeline={timeline} />

          {/* Sparse Deep Space - NO COLORFUL LIGHTS */}
          <Stars radius={150} depth={50} count={300} factor={2} saturation={0} fade speed={0.1} />
          
          {/* Postprocessing Pipeline */}
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={3.0} radius={1.2} />
            <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
            <Vignette eskil={false} offset={0.1} darkness={1.5} />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={new THREE.Vector2(0.005, 0.005)} 
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* INITIAL 1-SECOND BLACK SCREEN */}
      <AnimatePresence>
        {initialBlackScreen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* THICK SMOKE BLACKOUT */}
      <AnimatePresence>
        {showBlackout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-10 bg-[#020202] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* LOGO REVEAL (Clean, HDR, Volumetric feel) */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Cinematic Glow Behind Logo - Hidden until smoke clears */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-700/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/15 rounded-full blur-[100px]" />
            
            {/* Intellects Club Image Logo */}
            <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.4)] border border-white/30">
              <Image 
                src="/images/logo.jpg"
                alt="Intellects Club Logo"
                fill
                className="object-cover mix-blend-screen" 
              />
            </div>

            <h1
              className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-widest md:tracking-[0.3em] mb-4 drop-shadow-[0_0_50px_rgba(255,255,255,1)] text-center w-full px-4 break-words"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              INTELLECTS CLUB
            </h1>
            <p className="text-sm sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] text-center px-4">
              Revamping Tech
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

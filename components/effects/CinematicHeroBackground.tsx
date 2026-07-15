"use client";
import React, { useRef, useMemo, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Stars, useGLTF, Decal } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { easing } from "maath";

// ============================================================================
// Genuine 3D Astronaut Component Removed 
// (Replaced by Exact Image Overlay in Hero.tsx to match reference perfectly)
// ============================================================================

// ============================================================================
// 1. Ultra-Realistic Shader Earth (Day/Night cycle + Atmosphere)
// ============================================================================
function RealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Reliable 2K/4K unpkg textures
  const textureUrls = [
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-water.png"
  ];
  const [dayMap, nightMap, bumpMap, specularMap] = useTexture(textureUrls);

  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uNightMap: { value: nightMap },
        uBumpMap: { value: bumpMap },
        uSpecularMap: { value: specularMap },
        uSunDirection: { value: new THREE.Vector3(-1, 0.2, 0.5).normalize() },
      },
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
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uBumpMap;
        uniform sampler2D uSpecularMap;
        uniform vec3 uSunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 viewDirection = normalize(-vPosition);
          vec3 normal = normalize(vNormal);

          // Calculate sun intensity (Day/Night cycle)
          float sunIntensity = dot(normal, uSunDirection);
          float blend = smoothstep(-0.2, 0.2, sunIntensity);

          vec4 dayColor = texture2D(uDayMap, vUv);
          vec4 nightColor = texture2D(uNightMap, vUv);
          
          // Mix day and night based on sun direction
          vec3 finalColor = mix(nightColor.rgb * 1.5, dayColor.rgb, blend);

          // Specular reflection (ocean shine)
          float specularMask = texture2D(uSpecularMap, vUv).r;
          
          // Add specular highlights to water on day side
          if (blend > 0.0 && specularMask > 0.5) {
            vec3 halfVector = normalize(uSunDirection + viewDirection);
            float specLight = max(0.0, dot(vNormal, halfVector));
            specLight = pow(specLight, 32.0); // Shininess
            finalColor += vec3(0.5, 0.7, 1.0) * specLight * blend;
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, [dayMap, nightMap, bumpMap, specularMap]);

  const { size } = useThree();
  const isMobile = size.width < 768;
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.015; // Slow cinematic rotation
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.018; // Clouds move slightly faster
    }
  });

  return (
    <group 
      position={isMobile ? [2.8, 0, -5] : [5.8, 0, -4]} 
      scale={[3.5, 3.5, 3.5]}
    >
      {/* Earth remains huge on mobile, brought into the narrow mobile frustum (x=2.8) so ~40% is visible on the right */}
      {/* Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>
      
      {/* Cloud & Atmosphere Layer */}
      <mesh ref={atmosphereRef} scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Rim Glow (Fresnel effect substitute) */}
      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#4e82ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// 2. Parallax Camera & Space Dust
// ============================================================================
function ParallaxCamera() {
  useFrame((state, delta) => {
    // Smoothly damp camera position based on mouse pointer
    // Mouse coords are normalized between -1 and 1
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 0.5, state.pointer.y * 0.5, 0],
      0.25,
      delta
    );
    // Look slightly towards center to create a subtle panning effect
    state.camera.lookAt(0, 0, -4);
  });
  return null;
}

function AmbientSpaceDust() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const COUNT = 1500;
  
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < COUNT; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 - 10
      );
      dummy.scale.setScalar(0.005 + Math.random() * 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x -= delta * 0.01;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

// ============================================================================
// 3. Shooting Stars Effect
// ============================================================================
function ShootingStars() {
  const starsRef = useRef<THREE.Group>(null);
  const trails = useRef<{ mesh: THREE.Mesh; speed: number; active: boolean; zPos: number }[]>([]);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    // Initialize 5 shooting star objects, hidden initially
    for(let i=0; i<5; i++) {
      const geo = new THREE.CylinderGeometry(0.005, 0.02, 3, 4);
      geo.rotateX(Math.PI / 2); // Point along Z
      const mat = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color("#a855f7"), 
        transparent: true, 
        opacity: 0,
        blending: THREE.AdditiveBlending 
      });
      const mesh = new THREE.Mesh(geo, mat);
      starsRef.current.add(mesh);
      trails.current.push({ mesh, speed: 0, active: false, zPos: 0 });
    }
  }, []);

  useFrame((state, delta) => {
    // Randomly activate a shooting star
    if (Math.random() > 0.98) {
      const inactive = trails.current.find(t => !t.active);
      if (inactive) {
        inactive.active = true;
        inactive.mesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 + 5,
          -40 // Start far back
        );
        inactive.zPos = -40;
        inactive.speed = 30 + Math.random() * 40; // Fast!
        (inactive.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8;
      }
    }

    // Update active stars
    trails.current.forEach(t => {
      if (t.active) {
        t.zPos += t.speed * delta;
        t.mesh.position.z = t.zPos;
        // Fade out as it passes
        if (t.zPos > 10) {
          t.active = false;
          (t.mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        }
      }
    });
  });

  return <group ref={starsRef} />;
}

// ============================================================================
// Main Scene Component
// ============================================================================
export default function CinematicHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020205] overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 0], fov: 45 }} 
        dpr={[1, 1.5]} // Cap at 1.5 for performance on mobile/retina
        gl={{ antialias: false, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#010103"]} />
        
        {/* Basic lighting for the Astronaut & Shadows */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[-5, 5, 5]} 
          intensity={2.0} 
          color="#ffffff" 
          castShadow
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        
        <ParallaxCamera />
        <AmbientSpaceDust />
        <ShootingStars />
        
        {/* Deep Space Background Stars */}
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
        
        <React.Suspense fallback={null}>
          <RealisticEarth />
        </React.Suspense>
        
        {/* Cinematic Post-Processing */}
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.5} radius={0.8} />
          <Vignette eskil={false} offset={0.1} darkness={1.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// Preload heavy Earth textures outside the React lifecycle
useTexture.preload([
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  "https://unpkg.com/three-globe/example/img/earth-night.jpg",
  "https://unpkg.com/three-globe/example/img/earth-topology.png",
  "https://unpkg.com/three-globe/example/img/earth-water.png"
]);

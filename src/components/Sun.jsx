import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Sun = () => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive={new THREE.Color(0xffd700)} // A bit of yellow/gold glow
        emissiveIntensity={2}
      />
      <pointLight castShadow position={[0, 0, 0]} intensity={10000} />
    </mesh>
  );
};

export default Sun;

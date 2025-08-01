import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Moon = () => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, '/assets/textures/2k_moon.jpg');

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Orbit around the parent (Earth)
      const angle = clock.getElapsedTime() * 0.5;
      const distance = 2.5;
      meshRef.current.position.x = Math.sin(angle) * distance;
      meshRef.current.position.z = Math.cos(angle) * distance;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[0.27, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Moon;

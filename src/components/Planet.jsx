import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Planet = ({
  textureUrl,
  size,
  distance,
  orbitalSpeed,
  rotationSpeed,
  ringTextureUrl,
}) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, `/assets/textures/${textureUrl}`);
  const ringTexture = ringTextureUrl ? useLoader(TextureLoader, `/assets/textures/${ringTextureUrl}`) : null;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Rotation on its own axis
      meshRef.current.rotation.y += rotationSpeed;

      // Orbit around the sun
      const angle = clock.getElapsedTime() * orbitalSpeed;
      meshRef.current.position.x = Math.sin(angle) * distance;
      meshRef.current.position.z = Math.cos(angle) * distance;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {ringTexture && (
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[size + 0.5, size + 2, 64]} />
          <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent />
        </mesh>
      )}
    </group>
  );
};

export default Planet;

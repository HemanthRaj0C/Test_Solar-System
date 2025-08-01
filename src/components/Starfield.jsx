import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Starfield = () => {
  const texture = useLoader(TextureLoader, '/assets/textures/2k_stars.jpg');

  return (
    <mesh>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default Starfield;

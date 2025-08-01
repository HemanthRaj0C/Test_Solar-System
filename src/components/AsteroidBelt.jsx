import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AsteroidBelt = () => {
  const count = 1500;
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const asteroids = useMemo(() => {
    const temp = [];
    const innerRadius = 17;
    const outerRadius = 23;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (outerRadius - innerRadius) + innerRadius;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;

      const size = Math.random() * 0.2 + 0.05;
      const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];

      temp.push({ x, y, z, size, rotation });
    }
    return temp;
  }, []);

  useEffect(() => {
    asteroids.forEach((asteroid, i) => {
      dummy.position.set(asteroid.x, asteroid.y, asteroid.z);
      dummy.rotation.set(asteroid.rotation[0], asteroid.rotation[1], asteroid.rotation[2]);
      dummy.scale.set(asteroid.size, asteroid.size, asteroid.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroids, dummy]);

  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#A9A9A9" roughness={0.8} metalness={0.5} />
    </instancedMesh>
  );
};

export default AsteroidBelt;

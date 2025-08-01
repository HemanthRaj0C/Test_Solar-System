import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from './components/Sun';
import Planet from './components/Planet';
import Moon from './components/Moon';
import AsteroidBelt from './components/AsteroidBelt';
import Starfield from './components/Starfield';
import './App.css';

const planets = [
  { name: 'Mercury', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg', size: 0.38, distance: 4, orbitalSpeed: 0.4, rotationSpeed: 0.01 },
  { name: 'Venus', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg', size: 0.95, distance: 7, orbitalSpeed: 0.35, rotationSpeed: 0.005 },
  { name: 'Mars', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg', size: 0.53, distance: 15, orbitalSpeed: 0.24, rotationSpeed: 0.02 },
  { name: 'Jupiter', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg', size: 4, distance: 25, orbitalSpeed: 0.13, rotationSpeed: 0.05 },
  { name: 'Saturn', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg', ringTextureUrl: 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png', size: 3.5, distance: 40, orbitalSpeed: 0.09, rotationSpeed: 0.045 },
  { name: 'Uranus', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg', size: 2, distance: 55, orbitalSpeed: 0.06, rotationSpeed: 0.03 },
  { name: 'Neptune', textureUrl: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg', size: 1.9, distance: 70, orbitalSpeed: 0.05, rotationSpeed: 0.025 },
];

const EarthSystem = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const angle = clock.getElapsedTime() * 0.1;
      const distance = 10;
      groupRef.current.position.x = Math.sin(angle) * distance;
      groupRef.current.position.z = Math.cos(angle) * distance;
    }
  });

  return (
    <group ref={groupRef}>
      <Planet
        textureUrl="https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg"
        size={1}
        distance={0}
        orbitalSpeed={0}
        rotationSpeed={0.02}
      />
      <Moon />
    </group>
  );
};

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 40, 100], fov: 75 }}>
      <ambientLight intensity={0.1} />
      <Starfield />
      <Sun />
      <EarthSystem />
      {planets.map((planet) => (
        <Planet key={planet.name} {...planet} />
      ))}
      <AsteroidBelt />
      <OrbitControls />
    </Canvas>
  );
}

export default App;

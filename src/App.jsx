import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from './components/Sun';
import Planet from './components/Planet';
import Moon from './components/Moon';
import PlanetSelector from './components/PlanetSelector';
import CameraControlsManager from './components/CameraControlsManager';
import AsteroidBelt from './components/AsteroidBelt';
import Starfield from './components/Starfield';
import PlanetInfo from './components/PlanetInfo';
import './App.css';

const celestialObjects = [
  { name: 'Sun', textureUrl: '2k_sun.jpg', size: 10, distance: 0, orbitalSpeed: 0, rotationSpeed: 0.005, type: 'star' },
  { name: 'Mercury', textureUrl: '2k_mercury.jpg', size: 0.38, distance: 4, orbitalSpeed: 0.4, rotationSpeed: 0.01, type: 'planet' },
  { name: 'Venus', textureUrl: '2k_venus_surface.jpg', size: 0.95, distance: 7, orbitalSpeed: 0.35, rotationSpeed: 0.005, type: 'planet' },
  { name: 'Earth', textureUrl: '2k_earth_daymap.jpg', size: 1, distance: 10, orbitalSpeed: 0.1, rotationSpeed: 0.02, type: 'planet', hasMoon: true },
  { name: 'Mars', textureUrl: '2k_mars.jpg', size: 0.53, distance: 15, orbitalSpeed: 0.24, rotationSpeed: 0.02, type: 'planet' },
  { name: 'Jupiter', textureUrl: '2k_jupiter.jpg', size: 4, distance: 25, orbitalSpeed: 0.13, rotationSpeed: 0.05, type: 'planet' },
  { name: 'Saturn', textureUrl: '2k_saturn.jpg', ringTextureUrl: '2k_saturn_ring_alpha.png', size: 3.5, distance: 40, orbitalSpeed: 0.09, rotationSpeed: 0.045, type: 'planet' },
  { name: 'Uranus', textureUrl: '2k_uranus.jpg', size: 2, distance: 55, orbitalSpeed: 0.06, rotationSpeed: 0.03, type: 'planet' },
  { name: 'Neptune', textureUrl: '2k_neptune.jpg', size: 1.9, distance: 70, orbitalSpeed: 0.05, rotationSpeed: 0.025, type: 'planet' },
];

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PlanetSelector
        celestialObjects={celestialObjects}
        onSelect={setSelectedPlanet}
        onOverview={() => setSelectedPlanet(null)}
      />
      <PlanetInfo planet={selectedPlanet} />
      <Canvas shadows camera={{ position: [0, 40, 100], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <Starfield />
        <Sun onClick={() => setSelectedPlanet(celestialObjects[0])} />
        {celestialObjects.filter(p => p.type === 'planet').map((planet) => (
          <Planet key={planet.name} {...planet} onClick={() => setSelectedPlanet(planet)}>
            {planet.hasMoon && <Moon />}
          </Planet>
        ))}
        <AsteroidBelt />
        <OrbitControls />
        <CameraControlsManager selectedPlanet={selectedPlanet} />
      </Canvas>
    </div>
  );
}

export default App;

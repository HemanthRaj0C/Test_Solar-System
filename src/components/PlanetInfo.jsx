import React from 'react';

const PlanetInfo = ({ planet }) => {
  if (!planet) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        width: '250px',
      }}
    >
      <h3>{planet.name}</h3>
      <p>Type: {planet.type || 'Planet'}</p>
      <p>Size: {planet.size}x Earth</p>
      <p>Distance from Sun: {planet.distance} AU</p>
      <p>Orbital Speed: {planet.orbitalSpeed}</p>
      <p>Rotation Speed: {planet.rotationSpeed}</p>
    </div>
  );
};

export default PlanetInfo;

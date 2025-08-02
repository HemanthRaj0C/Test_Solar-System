import React from 'react';

const PlanetSelector = ({ celestialObjects, onSelect, onOverview }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
      }}
    >
      <h3>Select a Celestial Object</h3>
      <button onClick={onOverview}>Overview</button>
      {celestialObjects.map((planet) => (
        <button key={planet.name} onClick={() => onSelect(planet)}>
          {planet.name}
        </button>
      ))}
    </div>
  );
};

export default PlanetSelector;

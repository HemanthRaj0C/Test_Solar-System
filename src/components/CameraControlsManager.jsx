import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraControlsManager = ({ selectedPlanet }) => {
  const { camera, controls } = useThree();
  const planetPosition = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (selectedPlanet) {
      const angle = clock.getElapsedTime() * selectedPlanet.orbitalSpeed;
      const distance = selectedPlanet.distance;
      planetPosition.current.set(
        Math.sin(angle) * distance,
        0,
        Math.cos(angle) * distance
      );

      if (controls) {
        controls.target.lerp(planetPosition.current, 0.1);
        const idealOffset = new THREE.Vector3(0, 5, selectedPlanet.size * 5);
        const idealCameraPosition = new THREE.Vector3().addVectors(planetPosition.current, idealOffset);
        camera.position.lerp(idealCameraPosition, 0.1);
      }
    } else {
      if (controls) {
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        camera.position.lerp(new THREE.Vector3(0, 40, 100), 0.1);
      }
    }
  });

  useEffect(() => {
    if (controls) {
      if (selectedPlanet) {
        controls.enabled = false;
      } else {
        controls.enabled = true;
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
      }
    }
  }, [selectedPlanet, controls]);

  return null;
};

export default CameraControlsManager;

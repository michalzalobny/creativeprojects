import * as THREE from 'three';

export const lights = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    container.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);
    container.add(directionalLight);
  };

  generateLights();

  return {
    container,
  };
};

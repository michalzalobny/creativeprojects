import * as THREE from 'three';

export const lights = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateLights = () => {
    const directionalLight1 = new THREE.DirectionalLight(0x2e39c6, 0.8);
    directionalLight1.position.set(-3, 0, 3);
    container.add(directionalLight1);
  };

  const init = () => {
    generateLights();
  };

  return {
    container,
    init,
  };
};

import * as THREE from 'three';

export const lights = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    // container.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x2e39c6, 3.5);
    directionalLight1.position.set(-3, 0, 3);
    container.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xf30dff, 2.0);
    directionalLight2.position.set(3, 5, 3);
    container.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0x9ea8ff, 2.5);
    directionalLight3.position.set(-4, 1.2, 3);
    container.add(directionalLight3);
  };

  const init = () => {
    generateLights();
  };

  return {
    container,
    init,
  };
};

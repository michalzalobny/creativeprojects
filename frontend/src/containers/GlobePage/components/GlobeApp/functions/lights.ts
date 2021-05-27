import * as THREE from 'three';

const LIGHTS_POWER = 0.7;

export const lights = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateLights = () => {
    const directionalLight1 = new THREE.DirectionalLight(
      0x2e39c6,
      3 * LIGHTS_POWER,
    );
    directionalLight1.position.set(-3, 0, 3);
    container.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(
      0xf30dff,
      1.7 * LIGHTS_POWER,
    );
    directionalLight2.position.set(3, 5, 3);
    container.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(
      0x9ea8ff,
      1.9 * LIGHTS_POWER,
    );
    directionalLight3.position.set(-4, 1.2, 3 * LIGHTS_POWER);
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

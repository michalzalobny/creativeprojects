import * as THREE from 'three';

import { appObj } from './application';

export const imagePlane = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const textureLoader = new THREE.TextureLoader();

  const generateImage = () => {};

  return {
    container,
  };
};

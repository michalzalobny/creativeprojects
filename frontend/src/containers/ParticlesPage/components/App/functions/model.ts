import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Model {
  modelSrc: string;
  loader: GLTFLoader;
}

export const model = ({ loader, modelSrc }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateModel = () => {
    loader.load(modelSrc, res => {
      console.log(res);
    });
    // container.add(directionalLight1);
  };

  const init = () => {
    generateModel();
  };
  init();

  return {
    container,
  };
};

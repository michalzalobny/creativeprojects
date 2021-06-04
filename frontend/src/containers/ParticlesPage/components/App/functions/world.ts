import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { model } from './model';
import skullSrc from './models/horse.glb';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
  updateModelSkull: (updateInfo: UpdateInfo) => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let loader: GLTFLoader;
  let dracoLoader;

  const worldManager: WorldManager = {
    initLights: null,
    updateModelSkull: null,
  };

  const init = () => {
    loader = new GLTFLoader();
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/',
    ); // use a full url path

    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const { update: updateModelSkull, container: containerModelSkull } = model({
      appObj,
      modelSrc: skullSrc,
      loader,
    });
    container.add(containerModelSkull);
    worldManager.updateModelSkull = updateModelSkull;
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateModelSkull(updateInfo);
  };

  const destroy = () => {};

  return {
    init,
    container,
    destroy,
    update,
  };
};

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { model } from './model';

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
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const { update: updateModelSkull, container: containerModelSkull } = model({
      appObj,
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

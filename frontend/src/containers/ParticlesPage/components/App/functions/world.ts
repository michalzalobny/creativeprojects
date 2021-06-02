import * as THREE from 'three';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const pivotGroup = new THREE.Group();
  const scaleGroup = new THREE.Group();
  container.add(pivotGroup);
  container.add(scaleGroup);

  const worldManager: WorldManager = {
    initLights: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();
  };

  const update = (updateInfo: UpdateInfo) => {};

  const destroy = () => {};

  return {
    init,
    container,
    destroy,
    update,
  };
};

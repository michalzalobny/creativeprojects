import * as THREE from 'three';

import { lights } from './lights';
import { App, AppObj } from './app';
import { globe } from './globe';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
  initGlobe: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    initLights: null,
    initGlobe: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const { container: containerGlobe, init: initGlobe } = globe();

    container.add(containerGlobe);
    worldManager.initGlobe = initGlobe;
    worldManager.initGlobe();

    container.add(new THREE.AxesHelper());
  };

  const destroy = () => {};

  const update = () => {};

  return {
    init,
    container,
    destroy,
    update,
  };
};

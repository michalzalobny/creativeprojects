import * as THREE from 'three';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { globe } from './globe';
import { dots } from './dots';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
  initGlobe: () => void;
  updateGlobe: (updateInfo: UpdateInfo) => void;
  updateDots: (updateInfo: UpdateInfo) => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    initLights: null,
    initGlobe: null,
    updateGlobe: null,
    updateDots: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const {
      container: containerGlobe,
      init: initGlobe,
      update: updateGlobe,
    } = globe();

    container.add(containerGlobe);
    worldManager.initGlobe = initGlobe;
    worldManager.updateGlobe = updateGlobe;
    worldManager.initGlobe();

    const { container: containerDots, update: updateDots } = dots({ appObj });
    container.add(containerDots);
    worldManager.updateDots = updateDots;

    container.add(new THREE.AxesHelper());
  };

  const destroy = () => {};

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateGlobe(updateInfo);
    worldManager.updateDots(updateInfo);
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

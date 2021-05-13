import * as THREE from 'three';

import { lights } from './lights';
import { imagePlanes } from './imagePlanes';
import { App, AppObj } from './app';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  updateImagePlanes: () => void;
  destroyImagePlanes: () => void;
  initImagePlanes: () => void;
  initLights: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    destroyImagePlanes: null,
    updateImagePlanes: null,
    initImagePlanes: null,
    initLights: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const {
      init: initImagePlanes,
      update: updateImagePlanes,
      destroy: destroyImagePlanes,
      container: containerImagePlanes,
    } = imagePlanes({ appProps, appObj });

    container.add(containerImagePlanes);
    worldManager.updateImagePlanes = updateImagePlanes;
    worldManager.destroyImagePlanes = destroyImagePlanes;
    worldManager.initImagePlanes = initImagePlanes;
    worldManager.initImagePlanes();

    container.add(new THREE.AxesHelper());
  };

  const destroy = () => {
    worldManager.destroyImagePlanes();
  };

  const update = () => {
    worldManager.updateImagePlanes();
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

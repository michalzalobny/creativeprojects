import * as THREE from 'three';

import { lights } from './lights';
import { imagePlane } from './imagePlane';
import { App, AppObj } from './app';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  updateImagePlane: () => void;
  destroyImagePlane: () => void;
  initImagePlane: () => void;
  initLights: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let worldManager: WorldManager = {
    destroyImagePlane: null,
    updateImagePlane: null,
    initImagePlane: null,
    initLights: null,
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const {
      init: initImagePlane,
      update: updateImagePlane,
      destroy: destroyImagePlane,
      container: containerImagePlane,
    } = imagePlane({ appProps, appObj });

    container.add(containerImagePlane);
    worldManager.updateImagePlane = updateImagePlane;
    worldManager.destroyImagePlane = destroyImagePlane;
    worldManager.initImagePlane = initImagePlane;
    worldManager.initImagePlane();

    container.add(new THREE.AxesHelper());
  };

  const destroy = () => {
    worldManager.destroyImagePlane();

    worldManager = {
      destroyImagePlane: null,
      updateImagePlane: null,
      initImagePlane: null,
      initLights: null,
    };
  };

  const update = () => {
    worldManager.updateImagePlane();
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

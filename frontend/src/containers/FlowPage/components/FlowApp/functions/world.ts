import * as THREE from 'three';

import { lights } from './lights';
import { imagePlanes } from './imagePlanes';
import { imageSlider } from './imageSlider';
import { App, AppObj } from './app';

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  updateImagePlanes: () => void;
  destroyImagePlanes: () => void;
  initImagePlanes: () => void;
  updateImageSlider: () => void;
  destroyImageSlider: () => void;
  initImageSlider: () => void;
  initLights: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    destroyImagePlanes: null,
    updateImagePlanes: null,
    initImagePlanes: null,
    destroyImageSlider: null,
    updateImageSlider: null,
    initImageSlider: null,
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

    const {
      init: initImageSlider,
      update: updateImageSlider,
      destroy: destroyImageSlider,
      container: containerImageSlider,
    } = imageSlider({ appProps, appObj });

    container.add(containerImageSlider);
    worldManager.updateImageSlider = updateImageSlider;
    worldManager.destroyImageSlider = destroyImageSlider;
    worldManager.initImageSlider = initImageSlider;
    worldManager.initImageSlider();

    container.add(new THREE.AxesHelper());
  };

  const destroy = () => {
    worldManager.destroyImagePlanes();
    worldManager.destroyImageSlider();
  };

  const update = () => {
    worldManager.updateImagePlanes();
    worldManager.updateImageSlider();
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

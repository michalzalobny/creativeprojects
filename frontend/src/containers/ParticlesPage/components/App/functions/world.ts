import * as THREE from 'three';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { model } from './model';
import { wrap } from './utils/wrap';

interface World {
  appProps: App;
  appObj: AppObj;
}

export interface WorldState {
  currentSlide: number;
  slideIndex: number;
}

interface WorldManager {
  initLights: () => void;
  updateModel: (updateInfo: UpdateInfo) => void;
  destroyModel: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const worldManager: WorldManager = {
    initLights: null,
    updateModel: null,
    destroyModel: null,
  };

  const worldState: WorldState = {
    currentSlide: 0,
    slideIndex: 0,
  };

  const paginateSlide = (newVal: number) => {
    worldState.currentSlide += newVal;
    worldState.slideIndex = wrap(
      0,
      appProps.creativeItems.length,
      worldState.currentSlide,
    );
  };

  const init = () => {
    const { init: initLights, container: containerLights } = lights();

    container.add(containerLights);
    worldManager.initLights = initLights;
    worldManager.initLights();

    const {
      destroy: destroyModel,
      update: updateModel,
      container: containerModel,
    } = model({
      appObj,
      appProps,
      worldState,
      paginateSlide,
    });
    container.add(containerModel);
    worldManager.updateModel = updateModel;
    worldManager.destroyModel = destroyModel;
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateModel(updateInfo);
  };

  const destroy = () => {
    worldManager.destroyModel();
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

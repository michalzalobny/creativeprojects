import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { model } from './model';
import horseSrc from './models/horse.glb';
import skullSrc from './models/skull.glb';
import { WordsWrapper } from 'containers/FlowPage/components/FlowApp/components/FlowPageContent/styled/Header/WordsWrapper';
// import dracoSrc from './libs/draco'

interface World {
  appProps: App;
  appObj: AppObj;
}

interface WorldManager {
  initLights: () => void;
  updateModelSkull: (updateInfo: UpdateInfo) => void;
  updateModelHorse: (updateInfo: UpdateInfo) => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let loader: GLTFLoader;
  let dracoLoader;

  const worldManager: WorldManager = {
    initLights: null,
    updateModelHorse: null,
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
      modelSrc: skullSrc,
      loader,
    });
    container.add(containerModelSkull);
    worldManager.updateModelSkull = updateModelSkull;

    const { update: updateModelHorse, container: containerModelHorse } = model({
      modelSrc: horseSrc,
      loader,
    });
    worldManager.updateModelHorse = updateModelHorse;
    container.add(containerModelHorse);
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateModelHorse(updateInfo);
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

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

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
  destroyDots: () => void;
}

export const world = ({ appObj, appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const pivot = new THREE.Group();
  container.add(pivot);

  const worldManager: WorldManager = {
    initLights: null,
    initGlobe: null,
    updateGlobe: null,
    updateDots: null,
    destroyDots: null,
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
    } = globe({
      pivot,
    });

    container.add(containerGlobe);
    worldManager.initGlobe = initGlobe;
    worldManager.updateGlobe = updateGlobe;
    worldManager.initGlobe();

    const {
      container: containerDots,
      update: updateDots,
      destroy: destroyDots,
    } = dots({
      appObj,
      appProps,
      pivot,
    });
    container.add(containerDots);
    worldManager.updateDots = updateDots;
    worldManager.destroyDots = destroyDots;

    // container.add(new THREE.AxesHelper());

    setTimeout(() => {
      // scrollMode = true;
      // animateRotationParameter(0);
    }, 1500);
  };

  const destroy = () => {
    worldManager.destroyDots();
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateGlobe(updateInfo);
    worldManager.updateDots(updateInfo);
    updatePivot();
  };

  const SHIFT = 2; //2
  const MULTIPLIER = 0.4; //0.4
  const FINAL_SHIFT = 0.6; //0.6

  const scrollMode = false;
  let rotationXParameter = 1;
  let rotationTween;

  const animateRotationParameter = destination => {
    if (rotationTween) {
      rotationTween.stop();
    }

    rotationTween = new TWEEN.Tween({
      progress: rotationXParameter,
    })
      .to({ progress: destination }, 2000)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        rotationXParameter = obj.progress;
      });

    rotationTween.start();
  };

  const updatePivot = () => {
    pivot.rotation.x = appObj.scroll.scrollObj.currentY;
    pivot.rotation.y = appObj.scroll.scrollObj.currentX;

    if (scrollMode) {
      pivot.position.z =
        (1 - rotationXParameter) *
        ((Math.sin(appObj.scroll.scrollObj.currentX) + SHIFT) * MULTIPLIER +
          FINAL_SHIFT);

      pivot.rotation.x =
        appObj.scroll.scrollObj.currentY * rotationXParameter +
        Math.sin(appObj.scroll.scrollObj.currentX) *
          -0.4 *
          (1 - rotationXParameter);
    }

    // pivot.position.x =
    //   Math.cos(appObj.scroll.scrollObj.currentX) -
    //   Math.sin(appObj.scroll.scrollObj.currentX);

    // pivot.position.y =
    //   Math.cos(appObj.scroll.scrollObj.currentX) -
    //   Math.sin(appObj.scroll.scrollObj.currentX);
  };

  return {
    init,
    container,
    destroy,
    update,
  };
};

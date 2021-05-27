import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { lights } from './lights';
import { App, AppObj, UpdateInfo } from './app';
import { globe } from './globe';
import { dots } from './dots';
import { ZOOM_IN_THRESHOLD } from '../constants';

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

    setListeners();

    // container.add(new THREE.AxesHelper());
  };

  const initZoomIn = () => {
    animateRotationParameter(0);
  };

  const initZoomOut = () => {
    animateRotationParameter(1);
  };

  let zoomStartTime;
  let checkForZoom;
  const onTouchDown = () => {
    checkForZoom = true;
    zoomStartTime = window.performance.now();
  };

  const onTouchUp = () => {
    checkForZoom = false;
  };

  const setListeners = () => {
    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchend', onTouchUp);
  };

  const destroyListeners = () => {
    window.removeEventListener('mousedown', onTouchDown);
    window.removeEventListener('mouseup', onTouchUp);

    window.removeEventListener('touchstart', onTouchDown);
    window.removeEventListener('touchend', onTouchUp);
  };

  const destroy = () => {
    destroyListeners();
    worldManager.destroyDots();
  };

  const update = (updateInfo: UpdateInfo) => {
    worldManager.updateGlobe(updateInfo);
    worldManager.updateDots(updateInfo);
    updatePivot();
    if (
      window.performance.now() - zoomStartTime > ZOOM_IN_THRESHOLD &&
      checkForZoom
    ) {
      appProps.setIsZoomed(true);
      initZoomIn();
      checkForZoom = false;
    }
  };

  const SHIFT = 1.5; //2
  const MULTIPLIER = 0.45; //0.4
  const FINAL_SHIFT = 0.4; //0.6

  let rotationXParameter = 1;
  let rotationTween;

  const animateRotationParameter = destination => {
    if (rotationTween) {
      rotationTween.stop();
    }

    rotationTween = new TWEEN.Tween({
      progress: rotationXParameter,
    })
      .to({ progress: destination }, 800)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(obj => {
        rotationXParameter = obj.progress;
      });

    rotationTween.start();
  };

  const updatePivot = () => {
    pivot.rotation.x = appObj.scroll.scrollObj.currentY;
    pivot.rotation.y = appObj.scroll.scrollObj.currentX;

    pivot.position.z =
      (1 - rotationXParameter) * 1.4 +
      (1 - rotationXParameter) *
        ((Math.sin(appObj.scroll.scrollObj.currentX) + SHIFT) * MULTIPLIER +
          FINAL_SHIFT) *
        0.2;

    pivot.rotation.x =
      appObj.scroll.scrollObj.currentY * rotationXParameter +
      Math.sin(appObj.scroll.scrollObj.currentX) *
        -0.4 *
        (1 - rotationXParameter);
  };

  return {
    init,
    container,
    destroy,
    update,
    initZoomOut,
  };
};

import * as THREE from 'three';
import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';

import { world } from './world';
import { FlowItemRef } from '../FlowApp';
import { scroll, ScrollReturn } from './scroll/scroll';

export interface App {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  flowItemsArray: FlowItemRef[];
}

interface AppObj {
  scroll: ScrollReturn;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  sizes: DOMRect;
  config: Config;
  debugGUI: dat.GUI;
  rafId: number;
  isResumed: boolean;
  lastFrameTime: number;
}

interface AppManager {
  updateWorld: () => void;
  destroyWorld: () => void;
  initWorld: () => void;
}

interface Config {
  showDebugGui?: boolean;
}

export const CAMERA_POS = 5;
export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export let appObj: AppObj = {
  scroll: null,
  camera: null,
  scene: null,
  renderer: null,
  sizes: null,
  config: { showDebugGui: false },
  debugGUI: null,
  rafId: null,
  isResumed: false,
  lastFrameTime: null,
};

let appManager: AppManager = {
  destroyWorld: null,
  updateWorld: null,
  initWorld: null,
};

export const app = (appProps: App) => {
  const setCamera = () => {
    appObj.camera = new THREE.PerspectiveCamera();

    appObj.camera.near = 0.1;
    appObj.camera.far = 100;

    updateCameraSettings();

    appObj.camera.position.set(0, 0, CAMERA_POS);
  };

  const updateCameraSettings = () => {
    const aspectRatio = appObj.sizes.width / appObj.sizes.height;
    appObj.camera.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    appObj.camera.fov =
      2 *
      Math.atan(appObj.sizes.height / 2 / appObj.camera.position.z) *
      (180 / Math.PI);

    appObj.camera.updateProjectionMatrix();
  };

  const setRenderer = () => {
    appObj.scene = new THREE.Scene();

    appObj.renderer = new THREE.WebGLRenderer({
      canvas: appProps.canvasRefEl,
      antialias: true,
      alpha: true,
    });

    appObj.renderer.shadowMap.enabled = true;
    appObj.renderer.outputEncoding = THREE.sRGBEncoding;
    appObj.renderer.setClearColor(new THREE.Color('#c2d0ff'));
    appObj.renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    appObj.sizes = appProps.canvasWrapperRefEl.getBoundingClientRect();
  };

  const onResize = () => {
    setSizes();
    appObj.renderer.setSize(appObj.sizes.width, appObj.sizes.height);
    appObj.renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
    );

    updateCameraSettings();
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      stopAppFrame();
    } else {
      resumeAppFrame();
    }
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
  };

  const setConfig = () => {
    appObj.config.showDebugGui = window.location.hash === '#debug';
  };

  const setDebug = () => {
    if (appObj.config.showDebugGui) {
      appObj.debugGUI = new dat.GUI({ width: 420 });
    }
  };

  const destroy = () => {
    stopAppFrame();
    appManager.destroyWorld();
    appObj.debugGUI && appObj.debugGUI.destroy();
    appObj.renderer.dispose();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('visibilitychange', onVisibilityChange);

    //Resets appObj
    appObj = {
      scroll: null,
      camera: null,
      scene: null,
      renderer: null,
      sizes: null,
      config: { showDebugGui: false },
      debugGUI: null,
      rafId: null,
      isResumed: false,
      lastFrameTime: null,
    };

    //Resets appManager
    appManager = {
      destroyWorld: null,
      updateWorld: null,
      initWorld: null,
    };
  };

  const resumeAppFrame = () => {
    appObj.rafId = window.requestAnimationFrame(renderOnFrame);
    appObj.isResumed = true;
  };

  const renderOnFrame = (time: number) => {
    appObj.rafId = window.requestAnimationFrame(renderOnFrame);

    if (appObj.isResumed) {
      appObj.lastFrameTime = window.performance.now();
      appObj.isResumed = false;
      return;
    }

    appObj.scroll.update(time);

    const delta = time - appObj.lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    appObj.lastFrameTime = time;

    //Update the app
    TWEEN.update(time);
    appObj.renderer.render(appObj.scene, appObj.camera);
    appManager.updateWorld();
  };

  const stopAppFrame = () => {
    window.cancelAnimationFrame(appObj.rafId);
  };

  const init = () => {
    setSizes();
    setCamera();
    setRenderer();
    onResize();
    setConfig();
    setDebug();
    setListeners();
    resumeAppFrame();

    appObj.scroll = scroll();

    const {
      init: initWorld,
      update: updateWorld,
      destroy: destroyWorld,
      container: containerWorld,
    } = world({
      appProps,
    });

    appObj.scene.add(containerWorld);
    appManager.updateWorld = updateWorld;
    appManager.destroyWorld = destroyWorld;
    appManager.initWorld = initWorld;
    appManager.initWorld();

    appProps.setIsReady(true);
  };

  return { destroy, init };
};

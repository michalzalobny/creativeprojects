import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';

import { getElHeight, getElWidth } from 'utils/functions/getElementSize';

import { world } from './world';
import { scroll, ScrollReturn } from './scroll/scroll';

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface App {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  scrollWrapperRefEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  refsToOffset: HTMLDivElement[];
}

interface Sizes {
  width: number;
  height: number;
}

export interface AppObj {
  scroll: ScrollReturn;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  config: Config;
  debugGUI: dat.GUI;
  rafId: number;
  isResumed: boolean;
  lastFrameTime: number;
  contentSizes: Sizes;
  viewportSizes: Sizes;
  controls: OrbitControls;
}

interface AppManager {
  updateWorld: (updateInfo: UpdateInfo) => void;
  destroyWorld: () => void;
  initWorld: () => void;
}

interface Config {
  showDebugGui?: boolean;
}

export const CAMERA_POS = 3.5;
export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export const app = (appProps: App) => {
  const appObj: AppObj = {
    scroll: null,
    camera: null,
    scene: null,
    renderer: null,
    config: { showDebugGui: false },
    debugGUI: null,
    rafId: null,
    isResumed: true,
    lastFrameTime: null,
    contentSizes: { height: 0, width: 0 },
    viewportSizes: { height: 0, width: 0 },
    controls: null,
  };

  const appManager: AppManager = {
    destroyWorld: null,
    updateWorld: null,
    initWorld: null,
  };

  const setCamera = () => {
    appObj.camera = new THREE.PerspectiveCamera();

    appObj.camera.near = 0.1;
    appObj.camera.far = 100;

    appObj.controls = new OrbitControls(appObj.camera, appProps.canvasRefEl);
    updateCameraSettings();

    appObj.camera.position.set(0, 0, CAMERA_POS);
  };

  const updateCameraSettings = () => {
    const aspectRatio =
      appObj.viewportSizes.width / appObj.viewportSizes.height;
    appObj.camera.aspect = aspectRatio;

    appObj.camera.updateProjectionMatrix();
    appObj.controls.update();
  };

  const setRenderer = () => {
    appObj.scene = new THREE.Scene();

    appObj.renderer = new THREE.WebGLRenderer({
      canvas: appProps.canvasRefEl,
      antialias: false,
      alpha: true,
    });

    appObj.renderer.shadowMap.enabled = true;
    appObj.renderer.outputEncoding = THREE.sRGBEncoding;
    appObj.renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    appObj.contentSizes.width = getElWidth(appProps.scrollWrapperRefEl);
    appObj.contentSizes.height = getElHeight(appProps.scrollWrapperRefEl);

    const viewportRect = appProps.canvasWrapperRefEl.getBoundingClientRect();
    appObj.viewportSizes.width = viewportRect.width;
    appObj.viewportSizes.height = viewportRect.height;
  };

  const onResize = () => {
    setSizes();
    appObj.renderer.setSize(
      appObj.viewportSizes.width,
      appObj.viewportSizes.height,
    );
    appObj.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (window.innerWidth < 768) {
      appObj.scene.scale.set(0.8, 0.8, 0.8);
    } else {
      appObj.scene.scale.set(1, 1, 1);
    }

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
    appObj.scroll.destroy();
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

    const delta = time - appObj.lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    appObj.lastFrameTime = time;
    //Update the app
    appManager.updateWorld({ slowDownFactor, delta, time });
    // updateCSS();

    TWEEN.update(time);
    appObj.scroll.update(time);
    appObj.renderer.render(appObj.scene, appObj.camera);
  };

  const stopAppFrame = () => {
    window.cancelAnimationFrame(appObj.rafId);
  };

  const updateCSS = () => {
    appProps.refsToOffset.forEach(item => {
      item.style.transform = `translate3d(0,${appObj.scroll.scrollObj.currentY}px,0)`;
    });
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

    appObj.scroll = scroll(appObj.contentSizes, appObj.viewportSizes);
    appObj.scroll.init();

    const {
      init: initWorld,
      update: updateWorld,
      destroy: destroyWorld,
      container: containerWorld,
    } = world({
      appProps,
      appObj,
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

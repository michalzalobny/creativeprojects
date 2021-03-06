import * as THREE from 'three';
import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';

import { getElHeight, getElWidth } from 'utils/functions/getElementSize';

import { world } from './world';
import { FlowItem, SlideItem } from '../FlowApp';
import { scroll, ScrollReturn } from './scroll/scroll';
import { sideScroll, SideScrollReturn } from './sideScroll/sideScroll';

export interface App {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  scrollWrapperRefEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSlider: React.Dispatch<React.SetStateAction<boolean>>;
  flowItemsArray: FlowItem[];
  slideItemsArray: SlideItem[];
  refsToOffset: HTMLDivElement[];
  stickyRef: HTMLDivElement;
  stickyBorderRef: HTMLDivElement;
}

interface Sizes {
  width: number;
  height: number;
}

interface DomEl {
  top: number;
  height: number;
}

export interface AppObj {
  scroll: ScrollReturn;
  sideScroll: SideScrollReturn;
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
  stickyBorderRect: DomEl;
  stickyRefParentRect: DomEl;
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

export const app = (appProps: App) => {
  const appObj: AppObj = {
    sideScroll: null,
    scroll: null,
    camera: null,
    scene: null,
    renderer: null,
    config: { showDebugGui: false },
    debugGUI: null,
    rafId: null,
    isResumed: false,
    lastFrameTime: null,
    contentSizes: { height: 0, width: 0 },
    viewportSizes: { height: 0, width: 0 },
    stickyBorderRect: { top: 0, height: 0 },
    stickyRefParentRect: { height: 0, top: 0 },
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

    updateCameraSettings();

    appObj.camera.position.set(0, 0, CAMERA_POS);
  };

  const updateCameraSettings = () => {
    const aspectRatio =
      appObj.viewportSizes.width / appObj.viewportSizes.height;
    appObj.camera.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    appObj.camera.fov =
      2 *
      Math.atan(appObj.viewportSizes.height / 2 / appObj.camera.position.z) *
      (180 / Math.PI);

    appObj.camera.updateProjectionMatrix();
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
    appObj.renderer.setClearColor(new THREE.Color('#E1DAD3'));
    appObj.renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    appObj.contentSizes.width = getElWidth(appProps.scrollWrapperRefEl);
    appObj.contentSizes.height = getElHeight(appProps.scrollWrapperRefEl);

    const viewportRect = appProps.canvasWrapperRefEl.getBoundingClientRect();
    appObj.viewportSizes.width = viewportRect.width;
    appObj.viewportSizes.height = viewportRect.height;

    const stickyRefRect = appProps.stickyBorderRef.getBoundingClientRect();
    appObj.stickyBorderRect.top = stickyRefRect.top;
    appObj.stickyBorderRect.height = getElHeight(appProps.stickyRef);

    const stickyRefParentRect = appProps.stickyRef.parentElement.getBoundingClientRect();
    appObj.stickyRefParentRect.top = stickyRefParentRect.top;
    appObj.stickyRefParentRect.height = stickyRefParentRect.height;
  };

  const onResize = () => {
    setSizes();
    appObj.renderer.setSize(
      appObj.viewportSizes.width,
      appObj.viewportSizes.height,
    );
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
    appObj.scroll.destroy();
    appObj.sideScroll.destroy();
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
    appManager.updateWorld();
    updateCSS();

    TWEEN.update(time);
    appObj.scroll.update(time);
    appObj.sideScroll.update(time);
    appObj.renderer.render(appObj.scene, appObj.camera);
  };

  const stopAppFrame = () => {
    window.cancelAnimationFrame(appObj.rafId);
  };

  const updateCSS = () => {
    appProps.refsToOffset.forEach(item => {
      item.style.transform = `translate3d(0,${appObj.scroll.scrollObj.currentY}px,0)`;
    });

    let stickyOffset;

    if (
      -appObj.scroll.scrollObj.currentY >
      appObj.stickyBorderRect.top - appObj.viewportSizes.height
    ) {
      stickyOffset =
        appObj.scroll.scrollObj.currentY +
        appObj.stickyBorderRect.top -
        appObj.stickyRefParentRect.top -
        appObj.stickyRefParentRect.height;
    } else if (
      -appObj.scroll.scrollObj.currentY > appObj.stickyRefParentRect.height
    ) {
      stickyOffset =
        appObj.viewportSizes.height -
        appObj.stickyRefParentRect.top -
        appObj.stickyRefParentRect.height;
    } else {
      stickyOffset = appObj.scroll.scrollObj.currentY;
    }
    appProps.stickyRef.style.transform = `translate3d(0,${stickyOffset}px,0)`;
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

    appObj.sideScroll = sideScroll(
      appObj.contentSizes,
      appObj.viewportSizes,
      appProps.setShowSlider,
    );
    appObj.sideScroll.init();

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

    setTimeout(() => {
      appProps.setIsReady(true);
    }, 3000);
  };

  return { destroy, init };
};

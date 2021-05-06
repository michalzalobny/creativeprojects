import * as THREE from 'three';
import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';
import { MotionValue } from 'framer-motion';
import sync, { cancelSync, FrameData } from 'framesync';

import AppTime from './utils/AppTime';
import { world } from './world';
import { FlowItemRef } from '../FlowApp';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

export interface AppProps {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  flowItemsArray: FlowItemRef[];
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}

interface Config {
  showDebugGui?: boolean;
}

export const CAMERA_POS = 100;

interface AppObj {
  appTime: AppTime;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  sizes: DOMRect;
  config: Config;
  debugGUI: dat.GUI;
  controls: OrbitControls;
}

export let appObj: AppObj = {
  appTime: new AppTime(),
  camera: null,
  scene: null,
  renderer: null,
  sizes: null,
  config: { showDebugGui: false },
  debugGUI: null,
  controls: null,
};

export const application = (appProps: AppProps) => {
  const setCamera = () => {
    appObj.camera = new THREE.PerspectiveCamera();

    appObj.camera.near = 0.1;
    appObj.camera.far = 200;

    updateCameraSettings();

    appObj.camera.position.set(0, 0, CAMERA_POS);
    appObj.camera.lookAt(0, 0, 0);
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

    appObj.controls = new OrbitControls(appObj.camera, appProps.canvasRefEl);
    appObj.controls.enableDamping = true;
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
      appObj.appTime.stop();
    } else {
      appObj.appTime.resume();
    }
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);

    // appObj.appTime.on('tick', (_slowDownFactor, time, _delta) => {
    //   TWEEN.update(time);
    // });
  };

  const setWorld = () => {
    const { update, destroy, container } = world({ appProps });
    appObj.scene.add(container);
    return { update, destroy };
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
    cancelSync.render(render);
    cancelSync.update(updateSetWorld);
    // appObj.camera.orbitControls.dispose();
    destroySetWorld();
    appObj.appTime.stop();
    appObj.debugGUI && appObj.debugGUI.destroy();
    appObj.renderer.dispose();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('visibilitychange', onVisibilityChange);

    //Resets appObj
    appObj = {
      appTime: new AppTime(),
      camera: null,
      scene: null,
      renderer: null,
      sizes: null,
      config: { showDebugGui: false },
      debugGUI: null,
      controls: null,
    };
  };

  const render = (frameData: FrameData) => {
    TWEEN.update(frameData.timestamp);
    // updateSetWorld();
    appObj.renderer.render(appObj.scene, appObj.camera);
    appObj.controls.update();
  };

  setSizes();
  setCamera();
  setRenderer();
  onResize();
  setConfig();
  setDebug();
  const { update: updateSetWorld, destroy: destroySetWorld } = setWorld();
  setListeners();
  appProps.setIsReady(true);

  sync.render(render, true, true);
  sync.update(updateSetWorld, true, true);

  return { destroy };
};

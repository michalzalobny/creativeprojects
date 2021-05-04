import AppTime from './utils/AppTime';
import { world } from './world';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import TWEEN from '@tweenjs/tween.js';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

export interface AppProps {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Config {
  showDebugGui?: boolean;
}

export const CAMERA_POS = 6;

interface AppObj {
  appTime: AppTime;
  camera: THREE.OrthographicCamera;
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
    // Orthographic camera
    // const aspectRatio = appObj.sizes.width / appObj.sizes.height;
    // appObj.camera = new THREE.OrthographicCamera(
    //   -1 * aspectRatio,
    //   1 * aspectRatio,
    //   1,
    //   -1,
    //   0.1,
    //   100,
    // );

    //Perspective camera
    appObj.camera = new THREE.PerspectiveCamera();

    updateCameraSettings();

    appObj.camera.position.set(CAMERA_POS, CAMERA_POS * 0, CAMERA_POS);
    appObj.camera.lookAt(0, 0, 0);
  };

  const updateCameraSettings = () => {
    const aspectRatio = appObj.sizes.width / appObj.sizes.height;

    // Orthographic camera
    // const distance = CAMERA_POS;
    // appObj.camera.left = (aspectRatio / -1) * distance;
    // appObj.camera.right = (aspectRatio / 1) * distance;
    // appObj.camera.top = 1 * distance;
    // appObj.camera.bottom = -1 * distance;

    //Perspective camera
    appObj.camera.aspect = aspectRatio;

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

    appObj.appTime.on('tick', (_slowDownFactor, time, _delta) => {
      appObj.controls.update();
      TWEEN.update(time);
      appObj.renderer.render(appObj.scene, appObj.camera);
    });
  };

  const setWorld = () => {
    const { destroy, container } = world({ appProps });
    appObj.scene.add(container);
    return { destroy };
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
    appObj.camera.orbitControls && appObj.camera.orbitControls.dispose();
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

  setSizes();
  setCamera();
  setRenderer();
  onResize();
  setConfig();
  setDebug();
  const { destroy: destroySetWorld } = setWorld();
  setListeners();
  appProps.setIsReady(true);

  return { destroy };
};
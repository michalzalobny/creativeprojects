import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { debounce } from 'lodash';
import { OrbitControls } from 'three-stdlib';

import { MouseMove } from './Singletons/MouseMove';
import { Scroll } from './Singletons/Scroll';
import { ModelScene } from './Scenes/ModelScene';
import { Preloader } from './Utility/Preloader';

interface Constructor {
  rendererWrapperEl: HTMLDivElement;
  imagesToPreload: string[];
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export class App extends THREE.EventDispatcher {
  static defaultFps = 60;
  static dtFps = 1000 / App.defaultFps;

  _rendererWrapperEl: HTMLDivElement;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement;
  _camera: THREE.PerspectiveCamera;
  _renderer: THREE.WebGLRenderer;
  _mouseMove = MouseMove.getInstance();
  _scroll = Scroll.getInstance();
  _preloader = new Preloader();
  _modelScene: ModelScene;
  _setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  _controls: OrbitControls;

  constructor({
    setIsLoaded,
    imagesToPreload,
    rendererWrapperEl,
  }: Constructor) {
    super();
    this._rendererWrapperEl = rendererWrapperEl;
    this._canvas = document.createElement('canvas');
    this._rendererWrapperEl.appendChild(this._canvas);
    this._camera = new THREE.PerspectiveCamera();

    this._setIsLoaded = setIsLoaded;

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: false,
      alpha: false,
    });

    this._renderer.outputEncoding = THREE.sRGBEncoding;

    this._modelScene = new ModelScene({
      camera: this._camera,
      mouseMove: this._mouseMove,
    });

    this._onResize();
    this._addListeners();
    this._resumeAppFrame();

    this._preloader.images = imagesToPreload;
    this._controls = new OrbitControls(this._camera, this._rendererWrapperEl);
    this._controls.update();
  }

  _onResizeDebounced = debounce(() => this._onResize(), 300);

  _onResize() {
    const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();
    const aspectRatio = rendererBounds.width / rendererBounds.height;
    this._camera.aspect = aspectRatio;

    this._camera.position.z = 10;
    this._camera.position.y = 5;

    this._renderer.setSize(rendererBounds.width, rendererBounds.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._camera.updateProjectionMatrix();

    this._modelScene.rendererBounds = rendererBounds;
  }

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _onAssetsLoaded = (e: THREE.Event) => {
    this._modelScene.textureItems = (e.target as Preloader).textureItems;
    this._setIsLoaded(true);
    this._modelScene.animateIn();
  };

  _addListeners() {
    window.addEventListener('resize', this._onResizeDebounced);
    window.addEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.addEventListener('loaded', this._onAssetsLoaded);
  }

  _removeListeners() {
    window.removeEventListener('resize', this._onResizeDebounced);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.removeEventListener('loaded', this._onAssetsLoaded);
  }

  _resumeAppFrame() {
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);
    this._isResumed = true;
  }

  _renderOnFrame = (time: number) => {
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);

    if (this._isResumed || !this._lastFrameTime) {
      this._lastFrameTime = window.performance.now();
      this._isResumed = false;
      return;
    }

    TWEEN.update(time);

    const delta = time - this._lastFrameTime;
    let slowDownFactor = delta / App.dtFps;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this._lastFrameTime = time;

    this._mouseMove.update({ delta, slowDownFactor, time });
    this._scroll.update({ delta, slowDownFactor, time });
    this._modelScene.update({ delta, slowDownFactor, time });

    this._renderer.render(this._modelScene, this._camera);
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
    }
  }

  destroy() {
    if (this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    this._removeListeners();

    this._modelScene.destroy();
    this._preloader.destroy();
  }
}

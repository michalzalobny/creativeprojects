import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { debounce } from 'lodash';
import { NextRouter } from 'next/router';

import { MouseMove } from './Singletons/MouseMove';
import { Scroll } from './Singletons/Scroll';
import { SlideScene } from './Scenes/SlideScene';
import { Preloader } from './Utility/Preloader';
import { ItemProps, PreloadItems, ModalItem } from './types';

interface Constructor {
  rendererWrapperEl: HTMLDivElement;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setModalItem: React.Dispatch<React.SetStateAction<ModalItem | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  _slideScene: SlideScene;
  _setIsReadyReact: React.Dispatch<React.SetStateAction<boolean>>;
  setModalItemReact: React.Dispatch<React.SetStateAction<ModalItem | null>>;
  setShowModalReact: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpened = false;
  isActive = false;
  reactRouter: NextRouter | null = null;

  constructor({
    setModalItem,
    setShowModal,
    setIsReady,
    rendererWrapperEl,
  }: Constructor) {
    super();
    this.setModalItemReact = setModalItem;
    this.setShowModalReact = setShowModal;
    this._setIsReadyReact = setIsReady;
    this._rendererWrapperEl = rendererWrapperEl;
    this._canvas = document.createElement('canvas');
    this._rendererWrapperEl.appendChild(this._canvas);
    this._camera = new THREE.PerspectiveCamera();

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    });

    this._slideScene = new SlideScene({
      camera: this._camera,
      scroll: this._scroll,
      mouseMove: this._mouseMove,
    });

    this._onResize();
    this._addListeners();
    this._resumeAppFrame();
  }

  _onResizeDebounced = debounce(() => this._onResize(), 300);

  _onResize() {
    const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();
    const aspectRatio = rendererBounds.width / rendererBounds.height;
    this._camera.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    this._camera.position.z = 1200;
    this._camera.fov =
      2 *
      Math.atan(rendererBounds.height / 2 / this._camera.position.z) *
      (180 / Math.PI);

    this._renderer.setSize(rendererBounds.width, rendererBounds.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._camera.updateProjectionMatrix();

    this._slideScene.setRendererBounds(rendererBounds);
  }

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _onAssetsLoaded = (e: THREE.Event) => {
    this._slideScene.mediaItems = (e.target as Preloader).mediaItems;
    this._setIsReadyReact(true);
    this._slideScene.animateIn();
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
    this._slideScene.update({ delta, slowDownFactor, time });

    this._renderer.render(this._slideScene, this._camera);
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

    this._slideScene.destroy();
    this._preloader.destroy();
  }

  setItems(items: ItemProps[]) {
    this._slideScene.setItems(items);
  }

  setIsModalOpened(value: boolean) {
    this.isModalOpened = value;
  }

  setItemsToPreload(items: PreloadItems) {
    this._preloader.items = items;
  }

  setReactRouter(router: NextRouter) {
    this.reactRouter = router;
  }

  setIsActive(value: boolean) {
    this.isActive = value;

    //Automatically closes modal if the app becomes not active
    if (!this.isActive) {
      this.setIsModalOpened(false);
      this.setShowModalReact(false);
    }
  }
}

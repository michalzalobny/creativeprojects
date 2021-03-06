import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import debounce from 'lodash/debounce';

import { CreativeItem } from 'utils/types/strapi/CreativeItem';
import { CardItemProps } from './types';

import { MouseMove } from './Singletons/MouseMove';
import { Scroll } from './Singletons/Scroll';
import { StackScene } from './Scenes/StackScene';
import { Preloader } from './Utility/Preloader';

interface Constructor {
  rendererWrapperEl: HTMLDivElement;
  items: CreativeItem[];
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
  _stackScene: StackScene;
  _setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;

  constructor({
    setIsLoaded,
    imagesToPreload,
    items,
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
      antialias: true,
      alpha: true,
    });

    this._stackScene = new StackScene({
      camera: this._camera,
      scroll: this._scroll,
      mouseMove: this._mouseMove,
    });

    this._stackScene.items = Array.from(items).map((item, key) => {
      return { itemKey: key + 1, itemKeyReverse: items.length - key, item };
    });

    this._onResize();
    this._addListeners();
    this._resumeAppFrame();

    this._preloader.images = imagesToPreload;
  }

  _onResize = () => {
    const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();
    const aspectRatio = rendererBounds.width / rendererBounds.height;
    this._camera.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    this._camera.position.z = 500;
    this._camera.fov =
      2 *
      Math.atan(rendererBounds.height / 2 / this._camera.position.z) *
      (180 / Math.PI);

    this._renderer.setSize(rendererBounds.width, rendererBounds.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._camera.updateProjectionMatrix();

    this._stackScene.rendererBounds = rendererBounds;
  };

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _onAssetsLoaded = (e: THREE.Event) => {
    this._stackScene.textureItems = (e.target as Preloader).textureItems;
    this._setIsLoaded(true);
    this.setStackFilter('');
    this._stackScene.animateIn();
  };

  _onItemChangeDebounced = debounce((e: THREE.Event) => {
    this._onItemChange(e);
  }, 300);

  _onItemChange(e: THREE.Event) {
    const el = e.el as CardItemProps;
    this.dispatchEvent({ type: 'itemchange', el });
  }

  _addListeners() {
    window.addEventListener('resize', this._onResize);
    window.addEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.addEventListener('loaded', this._onAssetsLoaded);
    this._stackScene.addEventListener(
      'itemchange',
      this._onItemChangeDebounced,
    );
  }

  _removeListeners() {
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.removeEventListener('loaded', this._onAssetsLoaded);
    this._stackScene.removeEventListener(
      'itemchange',
      this._onItemChangeDebounced,
    );
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
    this._stackScene.update({ delta, slowDownFactor, time });

    this._renderer.render(this._stackScene, this._camera);
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
    }
  }

  setStackFilter(filter: string) {
    this._stackScene.filter = filter;
  }

  destroy() {
    if (this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    this._removeListeners();

    this._stackScene.destroy();
    this._preloader.destroy();
  }
}

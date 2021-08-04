import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { Scroll } from './Scroll/Scroll';
import { SpiralScene } from './SpiralScene';

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export class App {
  _rendererWrapperEl: HTMLDivElement;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement;
  _camera: THREE.PerspectiveCamera;
  _renderer: THREE.WebGLRenderer;
  _mouseMove = MouseMove.getInstance();
  _scroll = Scroll.getInstance();
  _spiralScene: SpiralScene;

  constructor(rendererWrapperEl: HTMLDivElement) {
    this._rendererWrapperEl = rendererWrapperEl;
    this._canvas = document.createElement('canvas');
    this._rendererWrapperEl.appendChild(this._canvas);
    this._camera = new THREE.PerspectiveCamera();
    this._spiralScene = new SpiralScene(
      this._camera,
      this._scroll,
      this._mouseMove,
    );
    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    });

    this._init();
  }

  _onResize = () => {
    const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();
    const aspectRatio = rendererBounds.width / rendererBounds.height;
    this._camera.aspect = aspectRatio;
    this._renderer.setSize(rendererBounds.width, rendererBounds.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._camera.updateProjectionMatrix();

    this._spiralScene.rendererBounds = rendererBounds;
  };

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _setListeners() {
    window.addEventListener('resize', this._onResize);
    window.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  destroy() {
    if (this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
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

    const delta = time - this._lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this._lastFrameTime = time;
    TWEEN.update(time);

    this._mouseMove.update({ delta, slowDownFactor, time });
    this._scroll.update({ delta, slowDownFactor, time });

    this._spiralScene.update({ delta, slowDownFactor, time });

    this._renderer.render(this._spiralScene, this._camera);
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
    }
  }

  _init() {
    this._onResize();
    this._setListeners();
    this._resumeAppFrame();

    //TODO: Preload items before loading
    this._spiralScene.items = Array.from(Array(12).keys()).map((item, key) => {
      return { number: key };
    });

    this._spiralScene.init();
  }
}

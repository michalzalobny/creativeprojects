import TWEEN from '@tweenjs/tween.js';

import { MouseMove } from './Singletons/MouseMove';
import { MouseCircle } from './MouseCircle';

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export class App {
  _rendererWrapperEl: HTMLDivElement;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D | null;
  _mouseCircle: MouseCircle | null = null;
  _mouseMove = MouseMove.getInstance();

  constructor(rendererWrapperEl: HTMLDivElement) {
    this._rendererWrapperEl = rendererWrapperEl;
    this._canvas = document.createElement('canvas');
    this._rendererWrapperEl.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._init();

    this._mouseCircle = new MouseCircle({ mouseMove: this._mouseMove });
  }

  _setSizes() {
    if (this._rendererWrapperEl && this._canvas && this._ctx) {
      const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();

      const w = rendererBounds.width;
      const h = rendererBounds.height;
      const ratio = window.devicePixelRatio;

      this._canvas.width = w * ratio;
      this._canvas.height = h * ratio;
      this._canvas.style.width = w + 'px';
      this._canvas.style.height = h + 'px';
      this._ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }

  _onResize = () => {
    this._setSizes();
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
    if (this._canvas && this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);

    if (this._mouseCircle) {
      this._mouseCircle.destroy();
    }
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

    this._clear();

    this._mouseMove.update({ delta, slowDownFactor, time });

    if (this._mouseCircle && this._ctx) {
      this._mouseCircle.update({ delta, slowDownFactor, time }, this._ctx);
    }
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
    }
  }

  _init() {
    this._setSizes();
    this._onResize();
    this._setListeners();
    this._resumeAppFrame();
  }

  _clear() {
    if (this._ctx) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      // this._ctx.filter = 'invert(1)';
    }
  }
}

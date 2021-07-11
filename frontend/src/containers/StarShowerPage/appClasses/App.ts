import TWEEN from '@tweenjs/tween.js';

import { CanvasSketch } from './CanvasSketch';

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export class App {
  rendererWrapperEl: HTMLDivElement;
  canvasSketch: CanvasSketch | null = null;
  rafId: number | null = null;
  isResumed = true;
  lastFrameTime: number | null = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(rendererWrapperEl: HTMLDivElement) {
    this.rendererWrapperEl = rendererWrapperEl;
    this.canvas = document.createElement('canvas');
    this.rendererWrapperEl.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  setSizes() {
    if (this.rendererWrapperEl && this.canvas) {
      const rendererBounds = this.rendererWrapperEl.getBoundingClientRect();
      if (this.canvasSketch) {
        this.canvasSketch.rendererBounds = rendererBounds;
      }
      this.canvas.width = rendererBounds.width;
      this.canvas.height = rendererBounds.height;
    }
  }

  onResize = () => {
    this.setSizes();
  };

  onVisibilityChange = () => {
    if (document.hidden) {
      this.stopAppFrame();
    } else {
      this.resumeAppFrame();
    }
  };

  setListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.stopAppFrame();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.canvasSketch) {
      this.canvasSketch.destroy();
    }
  }

  resumeAppFrame() {
    this.rafId = window.requestAnimationFrame(this.renderOnFrame);
    this.isResumed = true;
  }

  renderOnFrame = (time: number) => {
    this.rafId = window.requestAnimationFrame(this.renderOnFrame);

    if (this.isResumed || !this.lastFrameTime) {
      this.lastFrameTime = window.performance.now();
      this.isResumed = false;
      return;
    }

    const delta = time - this.lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this.lastFrameTime = time;
    TWEEN.update(time);

    if (this.canvasSketch) {
      this.canvasSketch.update({ delta, slowDownFactor, time });
    }
  };

  stopAppFrame() {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  init() {
    this.setSizes();
    this.onResize();
    this.setListeners();
    this.resumeAppFrame();

    if (this.ctx) {
      this.canvasSketch = new CanvasSketch(this.ctx);
    } else {
      throw new Error('ctx context could not be created');
    }
  }
}

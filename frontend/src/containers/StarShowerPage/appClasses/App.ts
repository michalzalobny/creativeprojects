import TWEEN from '@tweenjs/tween.js';

import { canvasSketch, CanvasSketchReturn } from './CanvasSketch';
import { MouseMove } from './MouseMove/MouseMove';
import { Scroll } from './Scroll/Scroll';

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

interface Sizes {
  width: number;
  height: number;
}

export interface AppObj {
  rendererWrapperEl: HTMLDivElement | null;
  canvasSketch: CanvasSketchReturn | null;
  mouseMove: MouseMove | null;
  scroll: Scroll | null;
  rafId: number | null;
  isResumed: boolean;
  lastFrameTime: number | null;
  viewportSizes: Sizes;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
}

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export class App {
  appObj: AppObj;

  constructor(rendererWrapperEl: HTMLDivElement | null) {
    this.appObj = {
      rendererWrapperEl: rendererWrapperEl,
      canvasSketch: null,
      mouseMove: null,
      scroll: null,
      rafId: null,
      isResumed: true,
      lastFrameTime: null,
      canvas: null,
      ctx: null,
      viewportSizes: { height: 0, width: 0 },
    };
  }

  setSizes() {
    if (this.appObj.rendererWrapperEl && this.appObj.canvas) {
      const viewportRect = this.appObj.rendererWrapperEl.getBoundingClientRect();
      this.appObj.viewportSizes.width = viewportRect.width;
      this.appObj.viewportSizes.height = viewportRect.height;

      this.appObj.canvas.width = this.appObj.viewportSizes.width;
      this.appObj.canvas.height = this.appObj.viewportSizes.height;
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

  setContext() {
    if (this.appObj.canvas) {
      this.appObj.ctx = this.appObj.canvas.getContext('2d');
    }
  }

  destroy() {
    if (this.appObj.canvas && this.appObj.canvas.parentNode) {
      this.appObj.canvas.parentNode.removeChild(this.appObj.canvas);
    }
    this.stopAppFrame();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.appObj.mouseMove) {
      this.appObj.mouseMove.destroy();
    }

    if (this.appObj.scroll) {
      this.appObj.scroll.destroy();
    }

    if (this.appObj.canvasSketch) {
      this.appObj.canvasSketch.destroy();
    }
  }

  resumeAppFrame() {
    this.appObj.rafId = window.requestAnimationFrame(this.renderOnFrame);
    this.appObj.isResumed = true;
  }

  renderOnFrame = (time: number) => {
    this.appObj.rafId = window.requestAnimationFrame(this.renderOnFrame);

    if (this.appObj.isResumed || !this.appObj.lastFrameTime) {
      this.appObj.lastFrameTime = window.performance.now();
      this.appObj.isResumed = false;
      return;
    }

    const delta = time - this.appObj.lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this.appObj.lastFrameTime = time;
    TWEEN.update(time);

    if (this.appObj.mouseMove) {
      this.appObj.mouseMove.update();
    }

    if (this.appObj.scroll) {
      this.appObj.scroll.update(time);
    }

    if (this.appObj.canvasSketch) {
      this.appObj.canvasSketch.update({ delta, slowDownFactor, time });
    }
  };

  stopAppFrame() {
    if (this.appObj.rafId) {
      window.cancelAnimationFrame(this.appObj.rafId);
    }
  }

  createCanvas() {
    this.appObj.canvas = document.createElement('canvas');
    if (this.appObj.rendererWrapperEl) {
      this.appObj.rendererWrapperEl.appendChild(this.appObj.canvas);
    }
  }

  init() {
    this.createCanvas();
    this.setSizes();
    this.onResize();
    this.setContext();
    this.setListeners();
    this.resumeAppFrame();

    this.appObj.mouseMove = new MouseMove(this.appObj.viewportSizes);
    this.appObj.mouseMove.init();

    this.appObj.scroll = new Scroll();
    this.appObj.scroll.init();

    this.appObj.canvasSketch = canvasSketch({ appObj: this.appObj });
  }
}

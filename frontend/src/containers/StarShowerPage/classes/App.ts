import TWEEN from '@tweenjs/tween.js';

import { canvasSketch, CanvasSketchReturn } from './CanvasSketch';
import { MouseMoveReturn, mouseMove } from './mouseMove/mouseMove';

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface App {
  rendererWrapperEl: React.MutableRefObject<HTMLDivElement>;
}

interface Sizes {
  width: number;
  height: number;
}

export interface AppObj {
  mouseMove: MouseMoveReturn;
  canvasSketch: CanvasSketchReturn;
  rafId: number;
  isResumed: boolean;
  lastFrameTime: number;
  viewportSizes: Sizes;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export class App {
  rendererWrapperEl: React.MutableRefObject<HTMLDivElement>;
  appObj: AppObj = {
    canvasSketch: null,
    mouseMove: null,
    rafId: null,
    isResumed: true,
    lastFrameTime: null,
    canvas: null,
    ctx: null,
    viewportSizes: { height: 0, width: 0 },
  };

  constructor(rendererWrapperEl) {
    this.rendererWrapperEl = rendererWrapperEl;
  }

  setSizes() {
    const viewportRect = this.rendererWrapperEl.current.getBoundingClientRect();
    this.appObj.viewportSizes.width = viewportRect.width;
    this.appObj.viewportSizes.height = viewportRect.height;

    this.appObj.canvas.width = this.appObj.viewportSizes.width;
    this.appObj.canvas.height = this.appObj.viewportSizes.height;
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
    this.appObj.ctx = this.appObj.canvas.getContext('2d');
  }

  destroy() {
    this.appObj.canvas.parentNode.removeChild(this.appObj.canvas);
    this.stopAppFrame();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.appObj.mouseMove.destroy();
    this.appObj.canvasSketch.destroy();
  }

  resumeAppFrame() {
    this.appObj.rafId = window.requestAnimationFrame(this.renderOnFrame);
    this.appObj.isResumed = true;
  }

  renderOnFrame = (time: number) => {
    this.appObj.rafId = window.requestAnimationFrame(this.renderOnFrame);

    if (this.appObj.isResumed) {
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
    this.appObj.mouseMove.update();
    this.appObj.canvasSketch.update({ delta, slowDownFactor, time });
  };

  stopAppFrame() {
    window.cancelAnimationFrame(this.appObj.rafId);
  }

  createCanvas() {
    this.appObj.canvas = document.createElement('canvas');
    this.rendererWrapperEl.current.appendChild(this.appObj.canvas);
  }

  init() {
    this.createCanvas();
    this.setSizes();
    this.onResize();
    this.setContext();
    this.setListeners();
    this.resumeAppFrame();

    this.appObj.mouseMove = mouseMove({
      viewportSizes: this.appObj.viewportSizes,
    });
    this.appObj.mouseMove.init();

    this.appObj.canvasSketch = canvasSketch({ appObj: this.appObj });
  }
}

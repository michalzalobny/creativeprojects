import TWEEN from '@tweenjs/tween.js';

import { canvasSketch, CanvasSketchReturn } from './canvasSketch';
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

export const app = (appProps: App) => {
  const appObj: AppObj = {
    canvasSketch: null,
    mouseMove: null,
    rafId: null,
    isResumed: true,
    lastFrameTime: null,
    canvas: null,
    ctx: null,
    viewportSizes: { height: 0, width: 0 },
  };

  const setSizes = () => {
    const viewportRect = appProps.rendererWrapperEl.current.getBoundingClientRect();
    appObj.viewportSizes.width = viewportRect.width;
    appObj.viewportSizes.height = viewportRect.height;

    appObj.canvas.width = appObj.viewportSizes.width;
    appObj.canvas.height = appObj.viewportSizes.height;
  };

  const onResize = () => {
    setSizes();
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      stopAppFrame();
    } else {
      resumeAppFrame();
    }
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
  };

  const setContext = () => {
    appObj.ctx = appObj.canvas.getContext('2d');
  };

  const destroy = () => {
    appObj.canvas.parentNode.removeChild(appObj.canvas);
    stopAppFrame();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('visibilitychange', onVisibilityChange);
    appObj.mouseMove.destroy();
  };

  const resumeAppFrame = () => {
    appObj.rafId = window.requestAnimationFrame(renderOnFrame);
    appObj.isResumed = true;
  };

  const renderOnFrame = (time: number) => {
    appObj.rafId = window.requestAnimationFrame(renderOnFrame);

    if (appObj.isResumed) {
      appObj.lastFrameTime = window.performance.now();
      appObj.isResumed = false;
      return;
    }

    const delta = time - appObj.lastFrameTime;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    appObj.lastFrameTime = time;
    TWEEN.update(time);
    appObj.mouseMove.update();
    appObj.canvasSketch.update({ delta, slowDownFactor, time });
  };

  const stopAppFrame = () => {
    window.cancelAnimationFrame(appObj.rafId);
  };

  const createCanvas = () => {
    appObj.canvas = document.createElement('canvas');
    appProps.rendererWrapperEl.current.appendChild(appObj.canvas);
  };

  const init = () => {
    createCanvas();
    setSizes();
    onResize();
    setContext();
    setListeners();
    resumeAppFrame();

    appObj.mouseMove = mouseMove({ viewportSizes: appObj.viewportSizes });
    appObj.mouseMove.init();

    appObj.canvasSketch = canvasSketch({ appObj });
  };

  return { destroy, init };
};

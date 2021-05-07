import EventEmitter from './EventEmitter';

export const DEFALUT_FPS = 60;
const DT_FPS = 1000 / DEFALUT_FPS;

export default class AppTime extends EventEmitter {
  ticker;
  isResumed;
  lastFrameTime;

  constructor() {
    super();
    this.isResumed = false;
    this.resume();
  }

  tick = (time: number) => {
    this.ticker = window.requestAnimationFrame(this.tick);

    if (this.isResumed) {
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

    this.trigger('tick', [slowDownFactor, time, delta]);
    this.lastFrameTime = time;
  };

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }

  resume() {
    this.ticker = window.requestAnimationFrame(this.tick);
    this.isResumed = true;
  }
}

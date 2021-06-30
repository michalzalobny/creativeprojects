import { lerp } from './utils/lerp';
import { MOMENTUM_DAMPING } from './constants';
import { ApplyScroll } from './classes/ApplyScroll';
import { HandleEvents } from './classes/HandleEvents';

const SCROLL_SPEED_X = 0;
const SCROLL_SPEED_Y = 0;

interface Values {
  x: number;
  y: number;
}

export interface ScrollObj {
  applyScroll: ApplyScroll | null;
  ease: number;
  last: Values;
  current: Values;
  target: Values;
  currentStrength: Values;
  targetStrength: Values;
  lastTouch: Values;
  useMomentum: boolean;
  touchMomentum: Values;
  isTouching: boolean;
  speed: Values;
  direction: { x: -1 | 1; y: -1 | 1 };
}

interface Sizes {
  width: number;
  height: number;
}

export class Scroll {
  scrollObj: ScrollObj;
  handleEvents: HandleEvents;

  constructor() {
    this.scrollObj = {
      applyScroll: null,
      ease: 0.04,
      last: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      currentStrength: { x: 0, y: 0 },
      targetStrength: { x: 0, y: 0 },
      lastTouch: { x: 0, y: 0 },
      useMomentum: false,
      touchMomentum: { x: 0, y: 0 },
      isTouching: false,
      speed: { x: SCROLL_SPEED_X, y: SCROLL_SPEED_Y },
      direction: { x: 1, y: 1 },
    };

    this.handleEvents = new HandleEvents(this.scrollObj);
    this.scrollObj.applyScroll = new ApplyScroll(this.scrollObj);
  }

  init() {
    this.handleEvents.init();
  }

  destroy() {
    this.handleEvents.destroy();
  }

  update(time: number) {
    //Auto scrollingX
    this.scrollObj.target.x += this.scrollObj.speed.x;
    if (this.scrollObj.current.x >= this.scrollObj.last.x) {
      this.scrollObj.direction.x = 1;
      this.scrollObj.speed.x = SCROLL_SPEED_X;
    } else {
      this.scrollObj.direction.x = -1;
      this.scrollObj.speed.x = -SCROLL_SPEED_X;
    }

    //Auto scrollingY
    this.scrollObj.target.y += this.scrollObj.speed.y;
    if (this.scrollObj.current.y >= this.scrollObj.last.y) {
      this.scrollObj.direction.y = 1;
      this.scrollObj.speed.y = SCROLL_SPEED_Y;
    } else {
      this.scrollObj.direction.y = -1;
      this.scrollObj.speed.y = -SCROLL_SPEED_Y;
    }

    this.scrollObj.last.x = this.scrollObj.current.x;
    this.scrollObj.current.x = lerp(
      this.scrollObj.current.x,
      this.scrollObj.target.x,
      this.scrollObj.ease,
    );

    this.scrollObj.last.y = this.scrollObj.current.y;
    this.scrollObj.current.y = lerp(
      this.scrollObj.current.y,
      this.scrollObj.target.y,
      this.scrollObj.ease,
    );

    //Update strengthY
    this.scrollObj.currentStrength.y = lerp(
      this.scrollObj.currentStrength.y,
      this.scrollObj.targetStrength.y,
      this.scrollObj.ease,
    );
    this.scrollObj.targetStrength.y = Math.abs(
      this.scrollObj.current.y - this.scrollObj.last.y,
    );

    //Update strengthX
    this.scrollObj.currentStrength.x = lerp(
      this.scrollObj.currentStrength.x,
      this.scrollObj.targetStrength.x,
      this.scrollObj.ease,
    );
    this.scrollObj.targetStrength.x = Math.abs(
      this.scrollObj.current.x - this.scrollObj.last.x,
    );

    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    this.scrollObj.touchMomentum.x *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    this.scrollObj.touchMomentum.y *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!this.scrollObj.useMomentum) {
      return;
    }

    if (!this.scrollObj.applyScroll) {
      return;
    }

    if (Math.abs(this.scrollObj.touchMomentum.x) >= 0.01) {
      this.scrollObj.applyScroll.applyScrollXY({
        y: 0,
        x: this.scrollObj.touchMomentum.x,
      });
    }

    if (Math.abs(this.scrollObj.touchMomentum.y) >= 0.01) {
      this.scrollObj.applyScroll.applyScrollXY({
        y: this.scrollObj.touchMomentum.y,
        x: 0,
      });
    }
  }
}

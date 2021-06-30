import { lerp } from './utils/lerp';
import { MOMENTUM_DAMPING } from './constants';
import { ApplyScroll } from './classes/ApplyScroll';
import { HandleEvents } from './classes/HandleEvents';

const SCROLL_SPEED_X = 0.004;
const SCROLL_SPEED_Y = 2;

export interface ScrollObj {
  applyScroll: ApplyScroll | null;
  ease: number;
  currentX: number;
  targetX: number;
  lastX: number;
  currentY: number;
  targetY: number;
  lastY: number;
  currentStrengthY: number;
  targetStrengthY: number;
  lastStrengthY: number;
  currentStrengthX: number;
  targetStrengthX: number;
  lastStrengthX: number;
  useMomentum: boolean;
  touchMomentumX: number;
  touchMomentumY: number;
  lastTouchX: number;
  lastTouchY: number;
  viewportSizes: Sizes;
  isTouching: boolean;
  speedX: number;
  speedY: number;
  directionX: -1 | 1;
  directionY: -1 | 1;
}

interface Sizes {
  width: number;
  height: number;
}

export class Scroll {
  scrollObj: ScrollObj;
  handleEvents: HandleEvents;

  constructor(viewportSizes: Sizes) {
    this.scrollObj = {
      applyScroll: null,
      ease: 0.04,
      currentX: 0,
      targetX: 0,
      lastX: 0,
      currentY: 0,
      targetY: 0,
      lastY: 0,
      currentStrengthY: 0,
      targetStrengthY: 0,
      lastStrengthY: 0,
      currentStrengthX: 0,
      targetStrengthX: 0,
      lastStrengthX: 0,
      useMomentum: false,
      touchMomentumX: 0,
      touchMomentumY: 0,
      lastTouchX: 0,
      lastTouchY: 0,
      viewportSizes: viewportSizes,
      isTouching: false,
      speedX: SCROLL_SPEED_X,
      speedY: SCROLL_SPEED_Y,
      directionX: 1,
      directionY: 1,
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
    console.log(this.scrollObj.currentY);

    this.scrollObj.targetX += this.scrollObj.speedX;
    this.scrollObj.targetY += this.scrollObj.speedY;

    if (this.scrollObj.currentX >= this.scrollObj.lastX) {
      this.scrollObj.directionX = 1;
      this.scrollObj.speedX = SCROLL_SPEED_X;
    } else {
      this.scrollObj.directionX = -1;
      this.scrollObj.speedX = -SCROLL_SPEED_X;
    }

    if (this.scrollObj.currentY >= this.scrollObj.lastY) {
      this.scrollObj.directionY = 1;
      this.scrollObj.speedY = SCROLL_SPEED_Y;
    } else {
      this.scrollObj.directionY = -1;
      this.scrollObj.speedY = -SCROLL_SPEED_Y;
    }

    this.scrollObj.lastX = this.scrollObj.currentX;
    this.scrollObj.currentX = lerp(
      this.scrollObj.currentX,
      this.scrollObj.targetX,
      this.scrollObj.ease,
    );

    this.scrollObj.lastY = this.scrollObj.currentY;
    this.scrollObj.currentY = lerp(
      this.scrollObj.currentY,
      this.scrollObj.targetY,
      this.scrollObj.ease,
    );

    //Update strengthY
    this.scrollObj.lastStrengthY = this.scrollObj.currentStrengthY;
    this.scrollObj.currentStrengthY = lerp(
      this.scrollObj.currentStrengthY,
      this.scrollObj.targetStrengthY,
      this.scrollObj.ease,
    );
    this.scrollObj.targetStrengthY = Math.abs(
      this.scrollObj.currentY - this.scrollObj.lastY,
    );

    //Update strengthX
    this.scrollObj.lastStrengthX = this.scrollObj.currentStrengthX;
    this.scrollObj.currentStrengthX = lerp(
      this.scrollObj.currentStrengthX,
      this.scrollObj.targetStrengthX,
      this.scrollObj.ease,
    );
    this.scrollObj.targetStrengthX = Math.abs(
      this.scrollObj.currentX - this.scrollObj.lastX,
    );

    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    this.scrollObj.touchMomentumX *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    this.scrollObj.touchMomentumY *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!this.scrollObj.useMomentum) {
      return;
    }

    if (!this.scrollObj.applyScroll) {
      return;
    }

    if (Math.abs(this.scrollObj.touchMomentumX) >= 0.01) {
      this.scrollObj.applyScroll.applyScrollXY({
        y: 0,
        x: this.scrollObj.touchMomentumX,
      });
    }

    if (Math.abs(this.scrollObj.touchMomentumY) >= 0.01) {
      this.scrollObj.applyScroll.applyScrollXY({
        y: this.scrollObj.touchMomentumY,
        x: 0,
      });
    }
  }
}

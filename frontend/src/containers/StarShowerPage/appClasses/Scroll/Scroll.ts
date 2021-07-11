import { EventDispatcher } from 'three';
import normalizeWheel from 'normalize-wheel';

import { UpdateInfo } from '../App';
import { lerp } from './utils/lerp';

const SCROLL_SPEED_X = 0;
const SCROLL_SPEED_Y = 0;

const MOMENTUM_CARRY = 0.2;
const MOMENTUM_DAMPING = 0.58;
const MOUSE_MULTIPLIER = 1;

interface ApplyScrollXY {
  x: number;
  y: number;
}

export class Scroll extends EventDispatcher {
  ease = 0.04;
  last = { x: 0, y: 0 };
  current = { x: 0, y: 0 };
  target = { x: 0, y: 0 };
  currentStrength = { x: 0, y: 0 };
  targetStrength = { x: 0, y: 0 };
  lastTouch = { x: 0, y: 0 };
  useMomentum = false;
  touchMomentum = { x: 0, y: 0 };
  isTouching = false;
  speed = { x: SCROLL_SPEED_X, y: SCROLL_SPEED_Y };
  direction = { x: 1, y: 1 };

  constructor() {
    super();
    this.addEvents();
  }

  applyScrollXY({ x, y }: ApplyScrollXY) {
    this.applyScrollX(x);
    this.applyScrollY(y);
  }

  applyScrollX(amountPx: number) {
    const newOffsetX = this.target.x + amountPx;
    this.target.x = newOffsetX;
  }

  applyScrollY(amountPx: number) {
    const newOffsetY = this.target.y + amountPx;
    this.target.y = newOffsetY;
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this.isTouching = true;
    this.useMomentum = false;
    this.lastTouch.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this.lastTouch.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    if (!this.isTouching) {
      return;
    }

    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX =
      (touchX - this.lastTouch.x) * ('touches' in event ? 1 : MOUSE_MULTIPLIER);
    const deltaY =
      (touchY - this.lastTouch.y) * ('touches' in event ? 1 : MOUSE_MULTIPLIER);

    this.lastTouch.x = touchX;
    this.lastTouch.y = touchY;

    this.touchMomentum.x *= MOMENTUM_CARRY;
    this.touchMomentum.y *= MOMENTUM_CARRY;

    this.touchMomentum.y += deltaY;
    this.touchMomentum.x += deltaX;

    this.applyScrollXY({ x: deltaX, y: deltaY });
  };

  onTouchUp = () => {
    this.isTouching = false;
    this.useMomentum = true;
  };

  onWheel = (event: WheelEvent) => {
    this.useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    this.applyScrollXY({ x: -pixelY, y: -pixelY });
  };

  onResize = () => {
    this.useMomentum = false;
  };

  addEvents() {
    window.addEventListener('wheel', this.onWheel);

    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);

    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);

    window.addEventListener('resize', this.onResize);

    this.onResize();
  }

  destroy() {
    window.removeEventListener('wheel', this.onWheel);

    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);

    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);

    window.removeEventListener('resize', this.onResize);
  }

  update(updateInfo: UpdateInfo) {
    this.dispatchEvent({ type: 'scrolled' });
    //Auto scrollingX
    this.target.x += this.speed.x;
    if (this.current.x >= this.last.x) {
      this.direction.x = 1;
      this.speed.x = SCROLL_SPEED_X;
    } else {
      this.direction.x = -1;
      this.speed.x = -SCROLL_SPEED_X;
    }

    //Auto scrollingY
    this.target.y += this.speed.y;
    if (this.current.y >= this.last.y) {
      this.direction.y = 1;
      this.speed.y = SCROLL_SPEED_Y;
    } else {
      this.direction.y = -1;
      this.speed.y = -SCROLL_SPEED_Y;
    }

    this.last.x = this.current.x;
    this.current.x = lerp(
      this.current.x,
      this.target.x,
      this.ease * updateInfo.slowDownFactor,
    );

    this.last.y = this.current.y;
    this.current.y = lerp(
      this.current.y,
      this.target.y,
      this.ease * updateInfo.slowDownFactor,
    );

    //Update strengthY
    this.currentStrength.y = lerp(
      this.currentStrength.y,
      this.targetStrength.y,
      this.ease * updateInfo.slowDownFactor,
    );
    this.targetStrength.y = Math.abs(this.current.y - this.last.y);

    //Update strengthX
    this.currentStrength.x = lerp(
      this.currentStrength.x,
      this.targetStrength.x,
      this.ease * updateInfo.slowDownFactor,
    );
    this.targetStrength.x = Math.abs(this.current.x - this.last.x);

    const timeFactor = Math.min(
      Math.max(updateInfo.time / (1000 / updateInfo.time), 1),
      4,
    );
    this.touchMomentum.x *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    this.touchMomentum.y *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!this.useMomentum) {
      return;
    }

    if (Math.abs(this.touchMomentum.x) >= 0.01) {
      this.applyScrollXY({
        y: 0,
        x: this.touchMomentum.x,
      });
    }

    if (Math.abs(this.touchMomentum.y) >= 0.01) {
      this.applyScrollXY({
        y: this.touchMomentum.y,
        x: 0,
      });
    }
  }
}

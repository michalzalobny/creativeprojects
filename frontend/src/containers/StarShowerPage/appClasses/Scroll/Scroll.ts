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
  _ease = 0.09;
  _last = { x: 0, y: 0 };
  _lastTouch = { x: 0, y: 0 };
  _useMomentum = false;
  _touchMomentum = { x: 0, y: 0 };
  _isTouching = false;
  _speed = { x: SCROLL_SPEED_X, y: SCROLL_SPEED_Y };
  _direction = { x: 1, y: 1 };
  _target = { x: 0, y: 0 };
  _targetStrength = { x: 0, y: 0 };
  current = { x: 0, y: 0 };
  currentStrength = { x: 0, y: 0 };

  static _instance: Scroll;
  static _canCreate = false;

  static getInstance() {
    if (!Scroll._instance) {
      Scroll._canCreate = true;
      Scroll._instance = new Scroll();
      Scroll._canCreate = false;
    }

    return Scroll._instance;
  }

  constructor() {
    super();

    if (Scroll._instance || !Scroll._canCreate) {
      throw new Error('Use Scroll.getInstance()');
    }

    this.addEvents();

    Scroll._instance = this;
  }

  applyScrollXY({ x, y }: ApplyScrollXY) {
    this.applyScrollX(x);
    this.applyScrollY(y);
  }

  applyScrollX(amountPx: number) {
    const newOffsetX = this._target.x + amountPx;
    this._target.x = newOffsetX;
  }

  applyScrollY(amountPx: number) {
    const newOffsetY = this._target.y + amountPx;
    this._target.y = newOffsetY;
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this._isTouching = true;
    this._useMomentum = false;
    this._lastTouch.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this._lastTouch.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    if (!this._isTouching) {
      return;
    }

    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX =
      (touchX - this._lastTouch.x) *
      ('touches' in event ? 1 : MOUSE_MULTIPLIER);
    const deltaY =
      (touchY - this._lastTouch.y) *
      ('touches' in event ? 1 : MOUSE_MULTIPLIER);

    this._lastTouch.x = touchX;
    this._lastTouch.y = touchY;

    this._touchMomentum.x *= MOMENTUM_CARRY;
    this._touchMomentum.y *= MOMENTUM_CARRY;

    this._touchMomentum.y += deltaY;
    this._touchMomentum.x += deltaX;

    this.applyScrollXY({ x: deltaX, y: deltaY });
  };

  onTouchUp = () => {
    this._isTouching = false;
    this._useMomentum = true;
  };

  onWheel = (event: WheelEvent) => {
    this._useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    this.applyScrollXY({ x: -pixelY, y: -pixelY });
  };

  onResize = () => {
    this._useMomentum = false;
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
    this._target.x += this._speed.x;
    if (this.current.x >= this._last.x) {
      this._direction.x = 1;
      this._speed.x = SCROLL_SPEED_X;
    } else {
      this._direction.x = -1;
      this._speed.x = -SCROLL_SPEED_X;
    }

    //Auto scrollingY
    this._target.y += this._speed.y;
    if (this.current.y >= this._last.y) {
      this._direction.y = 1;
      this._speed.y = SCROLL_SPEED_Y;
    } else {
      this._direction.y = -1;
      this._speed.y = -SCROLL_SPEED_Y;
    }

    this._last.x = this.current.x;
    this.current.x = lerp(
      this.current.x,
      this._target.x,
      this._ease * updateInfo.slowDownFactor,
    );

    this._last.y = this.current.y;
    this.current.y = lerp(
      this.current.y,
      this._target.y,
      this._ease * updateInfo.slowDownFactor,
    );

    //Update strengthY
    this.currentStrength.y = lerp(
      this.currentStrength.y,
      this._targetStrength.y,
      this._ease * updateInfo.slowDownFactor,
    );
    this._targetStrength.y = Math.abs(this.current.y - this._last.y);

    //Update strengthX
    this.currentStrength.x = lerp(
      this.currentStrength.x,
      this._targetStrength.x,
      this._ease * updateInfo.slowDownFactor,
    );
    this._targetStrength.x = Math.abs(this.current.x - this._last.x);

    const timeFactor = Math.min(
      Math.max(updateInfo.time / (1000 / updateInfo.time), 1),
      4,
    );
    this._touchMomentum.x *= Math.pow(MOMENTUM_DAMPING, timeFactor);
    this._touchMomentum.y *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!this._useMomentum) {
      return;
    }

    if (Math.abs(this._touchMomentum.x) >= 0.01) {
      this.applyScrollXY({
        y: 0,
        x: this._touchMomentum.x,
      });
    }

    if (Math.abs(this._touchMomentum.y) >= 0.01) {
      this.applyScrollXY({
        y: this._touchMomentum.y,
        x: 0,
      });
    }
  }
}

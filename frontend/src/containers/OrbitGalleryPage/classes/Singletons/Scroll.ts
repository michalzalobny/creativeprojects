import { EventDispatcher } from 'three';
import normalizeWheel from 'normalize-wheel';

import { UpdateInfo } from '../types';

interface ApplyScrollXY {
  x: number;
  y: number;
}

export class Scroll extends EventDispatcher {
  _lastTouch = { x: 0, y: 0 };
  _useMomentum = false;
  _touchMomentum = { x: 0, y: 0 };
  _isTouching = false;

  static momentumCarry = 0.2;
  static momentumDamping = 0.58;
  static mouseSwipeMultiplier = 1.8;
  static touchSwipeMultiplier = 2.4;
  static mouseScrollMultiplier = 1;
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

    this._addEvents();

    Scroll._instance = this;
  }

  _applyScrollXY({ x, y }: ApplyScrollXY) {
    this.dispatchEvent({ type: 'applyscroll', x, y });
  }

  _onTouchDown = (event: TouchEvent | MouseEvent) => {
    this._isTouching = true;
    this.dispatchEvent({ type: 'touchdown' });
    this._useMomentum = false;
    this._lastTouch.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this._lastTouch.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  _onTouchMove = (event: TouchEvent | MouseEvent) => {
    if (!this._isTouching) {
      return;
    }

    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX =
      (touchX - this._lastTouch.x) *
      ('touches' in event
        ? Scroll.touchSwipeMultiplier
        : Scroll.mouseSwipeMultiplier);
    const deltaY =
      (touchY - this._lastTouch.y) *
      ('touches' in event
        ? Scroll.touchSwipeMultiplier
        : Scroll.mouseSwipeMultiplier);

    this._lastTouch.x = touchX;
    this._lastTouch.y = touchY;

    this._touchMomentum.x *= Scroll.momentumCarry;
    this._touchMomentum.y *= Scroll.momentumCarry;

    this._touchMomentum.y += deltaY;
    this._touchMomentum.x += deltaX;

    this._applyScrollXY({ x: deltaX, y: deltaY });
  };

  _onTouchUp = () => {
    this._isTouching = false;
    this.dispatchEvent({ type: 'touchup' });
    this._useMomentum = true;
  };

  _onWheel = (event: WheelEvent) => {
    this._useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    this._applyScrollXY({
      x: 0,
      y: -pixelY * Scroll.mouseScrollMultiplier,
    });
  };

  _onResize = () => {
    this._useMomentum = false;
  };

  _addEvents() {
    window.addEventListener('wheel', this._onWheel);

    window.addEventListener('mousedown', this._onTouchDown);
    window.addEventListener('mousemove', this._onTouchMove);
    window.addEventListener('mouseup', this._onTouchUp);

    window.addEventListener('touchstart', this._onTouchDown);
    window.addEventListener('touchmove', this._onTouchMove);
    window.addEventListener('touchend', this._onTouchUp);

    window.addEventListener('resize', this._onResize);

    this._onResize();
  }

  update(updateInfo: UpdateInfo) {
    //Apply scroll momentum after user touch is ended
    if (!this._useMomentum) {
      return;
    }

    const timeFactor = Math.min(
      Math.max(updateInfo.time / (1000 / updateInfo.time), 1),
      4,
    );
    this._touchMomentum.x *= Math.pow(Scroll.momentumDamping, timeFactor);
    this._touchMomentum.y *= Math.pow(Scroll.momentumDamping, timeFactor);

    if (Math.abs(this._touchMomentum.x) >= 0.01) {
      this._applyScrollXY({
        y: 0,
        x: this._touchMomentum.x,
      });
    }

    if (Math.abs(this._touchMomentum.y) >= 0.01) {
      this._applyScrollXY({
        y: this._touchMomentum.y,
        x: 0,
      });
    }
  }
}

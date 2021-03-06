import { EventDispatcher } from 'three';

import { UpdateInfo } from '../types';
import { lerp } from './utils/lerp';

interface Mouse {
  x: number;
  y: number;
}

export class MouseMove extends EventDispatcher {
  _mouseLast: Mouse = { x: 0, y: 0 };
  _isTouching = false;
  _ease = 0.06;
  _clickStart: Mouse = { x: 0, y: 0 };
  mouse: Mouse = { x: 0, y: 0 };
  mouseLerp: Mouse = { x: 0, y: 0 };
  strength = 0;
  strengthLerp = 0;

  static _instance: MouseMove | null;
  static _canCreate = false;

  static getInstance() {
    if (!MouseMove._instance) {
      MouseMove._canCreate = true;
      MouseMove._instance = new MouseMove();
      MouseMove._canCreate = false;
    }

    return MouseMove._instance;
  }

  constructor() {
    super();

    if (MouseMove._instance || !MouseMove._canCreate) {
      throw new Error('Use MouseMove.getInstance()');
    }

    this._addEvents();

    MouseMove._instance = this;
  }

  _onTouchDown = (event: TouchEvent | MouseEvent) => {
    this._isTouching = true;
    this._mouseLast.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this._mouseLast.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    this.mouse.x = this._mouseLast.x;
    this.mouse.y = this._mouseLast.y;

    this._clickStart.x = this.mouse.x;
    this._clickStart.y = this.mouse.y;

    this.dispatchEvent({ type: 'down' });
  };

  _onTouchMove = (event: TouchEvent | MouseEvent) => {
    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - this._mouseLast.x;
    const deltaY = touchY - this._mouseLast.y;

    this.strength = deltaX * deltaX + deltaY * deltaY;

    this._mouseLast.x = touchX;
    this._mouseLast.y = touchY;

    this.mouse.x += deltaX;
    this.mouse.y += deltaY;
  };

  _onTouchUp = () => {
    this._isTouching = false;
    this.dispatchEvent({ type: 'up' });
  };

  _onMouseLeave = () => {};

  _onClick = () => {
    if (
      this._clickStart.x === this.mouse.x &&
      this._clickStart.y === this.mouse.y
    ) {
      this.dispatchEvent({ type: 'clicked' });
    }
  };

  _addEvents() {
    window.addEventListener('mousedown', this._onTouchDown);
    window.addEventListener('mousemove', this._onTouchMove);
    window.addEventListener('mouseup', this._onTouchUp);
    window.addEventListener('click', this._onClick);

    window.addEventListener('touchstart', this._onTouchDown);
    window.addEventListener('touchmove', this._onTouchMove);
    window.addEventListener('touchend', this._onTouchUp);

    window.addEventListener('mouseout', this._onMouseLeave);
  }

  update(updateInfo: UpdateInfo) {
    this.dispatchEvent({ type: 'mousemoved' });
    const { _ease, mouse, _mouseLast, mouseLerp } = this;

    _mouseLast.x = mouse.x;
    _mouseLast.y = mouse.y;

    mouseLerp.x = lerp(mouseLerp.x, mouse.x, _ease * updateInfo.slowDownFactor);
    mouseLerp.y = lerp(mouseLerp.y, mouse.y, _ease * updateInfo.slowDownFactor);

    //Update strengthLerp
    this.strengthLerp = lerp(
      this.strengthLerp,
      this.strength,
      _ease * updateInfo.slowDownFactor,
    );
  }
}

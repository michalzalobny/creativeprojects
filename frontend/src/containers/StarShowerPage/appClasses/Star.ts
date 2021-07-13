import { EventDispatcher } from 'three';

import { UpdateInfo } from './App';

export class Star extends EventDispatcher {
  _x: number;
  _y: number;
  _radius: number;
  _color: string;
  _ctx: CanvasRenderingContext2D;
  _rendererBounds: DOMRect;
  _velocity = {
    x: 0,
    y: 3,
  };
  _gravity = 1;
  _friction = 0.8;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    rendererBounds: DOMRect,
  ) {
    super();
    this._ctx = ctx;
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
    this._rendererBounds = rendererBounds;

    console.log('base:', this._gravity);
  }

  _draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }

  _shatter() {
    this._radius -= 8;
    if (this._radius <= 0) {
      this.dispatchEvent({ type: 'destroystar' });
    }
    this.dispatchEvent({ type: 'starhit' });
  }

  update(updateInfo: UpdateInfo) {
    this._draw();

    //Gravity implementation
    if (
      this._y + this._radius + this._velocity.y >
      this._rendererBounds.height
    ) {
      this._shatter();
      this._velocity.y = -this._velocity.y * this._friction;
    } else {
      this._velocity.y += this._gravity;
    }
    this._y += this._velocity.y * updateInfo.slowDownFactor;
  }
}

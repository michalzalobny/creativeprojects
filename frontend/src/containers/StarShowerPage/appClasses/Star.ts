import { EventDispatcher } from 'three';

import { UpdateInfo } from './App';
import { RendererBounds } from './types';

export class Star extends EventDispatcher {
  _x: number;
  _y: number;
  _radius: number;
  _color: string;

  _velocity = {
    x: 0,
    y: 3,
  };
  _gravity = 1;
  _friction = 0.8;

  constructor(x: number, y: number, radius: number, color: string) {
    super();

    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
  }

  _draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this._color;
    ctx.fill();
    ctx.closePath();
  }

  _shatter() {
    this._radius -= 8;
    if (this._radius <= 0) {
      this.dispatchEvent({ type: 'destroystar' });
    }
    this.dispatchEvent({ type: 'starhit' });
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    this._draw(ctx);

    //Gravity implementation
    if (this._y + this._radius + this._velocity.y > rendererBounds.height) {
      this._shatter();
      this._velocity.y = -this._velocity.y * this._friction;
    } else {
      this._velocity.y += this._gravity;
    }
    this._y += this._velocity.y * updateInfo.slowDownFactor;
  }
}

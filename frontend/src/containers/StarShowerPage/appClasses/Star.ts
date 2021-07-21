import { EventDispatcher } from 'three';

import { RendererBounds } from './types';
import { UpdateInfo } from './types';
import { getRandBetween } from './utils/getRandBetween';

export class Star extends EventDispatcher {
  _x: number;
  _y: number;
  _radius: number;
  _velocity = {
    x: 0,
    y: 0,
  };
  _gravity = 0.5;
  _friction = 0.8;
  _noGravity = false;

  constructor(
    x: number,
    y: number,
    radius: number,
    xVelocity: number,
    yVelocity: number,
    noGravity: boolean,
  ) {
    super();
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._velocity.x = xVelocity;
    this._velocity.y = yVelocity;
    this._noGravity = noGravity;
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    if (this._noGravity) {
      return;
    }

    //Ball hits top/bottom of the screen
    if (
      this._y + this._radius + this._velocity.y >= rendererBounds.height ||
      this._y - this._radius + this._velocity.y <= 0
    ) {
      this._velocity.y = -this._velocity.y * this._friction;
      //Gravity implementation
    } else {
      this._velocity.y += this._gravity;
    }

    //Ball hits side of the screen
    if (
      this._x + this._radius + this._velocity.x >= rendererBounds.width ||
      this._x - this._radius + this._velocity.x <= 0
    ) {
      this._velocity.x = -this._velocity.x * this._friction;
    }

    this._y += this._velocity.y * updateInfo.slowDownFactor;
    this._x += this._velocity.x * updateInfo.slowDownFactor;
  }
}

import { EventDispatcher } from 'three';

import { UpdateInfo } from './types';
import { lerp } from './utils/lerp';

export class MouseCircle extends EventDispatcher {
  _x = 0;
  _y = 0;
  _ease = 0.4;

  constructor() {
    super();
  }

  init() {}

  _draw(
    ctx: CanvasRenderingContext2D,

    mouseRadius: number,
  ) {
    //radius circle
    ctx.beginPath();
    ctx.arc(this._x, this._y, mouseRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  update(
    updateInfo: UpdateInfo,
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number,
    mouseRadius: number,
  ) {
    this._y = lerp(this._y, mouseY, this._ease * updateInfo.slowDownFactor);
    this._x = lerp(this._x, mouseX, this._ease * updateInfo.slowDownFactor);
    this._draw(ctx, mouseRadius);
  }
}

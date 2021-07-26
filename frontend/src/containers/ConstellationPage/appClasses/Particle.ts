import { EventDispatcher } from 'three';

import { RendererBounds } from './types';
import { UpdateInfo } from './types';
import { lerp } from './utils/lerp';

export class Particle extends EventDispatcher {
  _x: number;
  _y: number;
  _xDestination: number;
  _yDestination: number;
  _xLerp: number;
  _yLerp: number;
  _radius: number;
  _color: string;
  _directionX: number;
  _directionY: number;
  _ease = 0.09;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    directionX: number,
    directionY: number,
  ) {
    super();
    this._x = x;
    this._y = y;
    this._xLerp = x;
    this._yLerp = y;
    this._yDestination = y;
    this._xDestination = x;
    this._radius = radius;
    this._color = color;
    this._directionX = directionX;
    this._directionY = directionY;
  }

  _draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this._color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number,
    mouseRadius: number,
  ) {
    this._yDestination += this._directionY * updateInfo.slowDownFactor;
    this._xDestination += this._directionX * updateInfo.slowDownFactor;

    this._y = lerp(
      this._y,
      this._yDestination,
      this._ease * updateInfo.slowDownFactor,
    );

    this._x = lerp(
      this._x,
      this._xDestination,
      this._ease * updateInfo.slowDownFactor,
    );

    this._draw(ctx);

    //Infinite star move X
    if (this._x + this._radius < 0) {
      this._x = rendererBounds.width + this._radius - 1;
      this._xDestination = rendererBounds.width + this._radius - 1;
    }
    if (this._x - this._radius > rendererBounds.width) {
      this._x = 0 - this._radius + 1;
      this._xDestination = 0 - this._radius + 1;
    }

    //Infinite star move Y
    if (this._y + this._radius < 0) {
      this._y = rendererBounds.height + this._radius - 1;
      this._yDestination = rendererBounds.height + this._radius - 1;
    }
    if (this._y - this._radius > rendererBounds.height) {
      this._y = 0 - this._radius + 1;
      this._yDestination = 0 - this._radius + 1;
    }

    //Collistion detection
    const dx = mouseX - this._x;
    const dy = mouseY - this._y;
    const movePower = mouseRadius;
    const distance = Math.sqrt(dx * dx + dy * dy);

    //The particle has entered our mouse radius
    if (distance < mouseRadius + this._radius) {
      if (mouseX < this._x) {
        this._xDestination += movePower * (Math.abs(dx) / mouseRadius);
      }

      if (mouseX > this._x) {
        this._xDestination -= movePower * (Math.abs(dx) / mouseRadius);
      }

      if (mouseY < this._y) {
        this._yDestination += movePower * (Math.abs(dy) / mouseRadius);
      }

      if (mouseY > this._y) {
        this._yDestination -= movePower * (Math.abs(dy) / mouseRadius);
      }
    }
  }
}

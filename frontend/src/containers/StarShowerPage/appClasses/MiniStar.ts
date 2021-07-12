import { UpdateInfo } from './App';
import { Star } from './Star';
import { getRandBetween } from './utils/getRandBetween';

export class MiniStar extends Star {
  _velocity = {
    x: getRandBetween(-5, 5),
    y: getRandBetween(-15, 15),
  };

  _gravity = 0.1;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    rendererBounds: DOMRect,
  ) {
    super(x, y, radius, color, ctx, rendererBounds);
  }

  _draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }

  update(updateInfo: UpdateInfo) {
    this._draw();

    //Gravity implementation
    if (
      this._y + this._radius + this._velocity.y >
      this._rendererBounds.height
    ) {
      this._velocity.y = -this._velocity.y * this._friction;
    } else {
      this._velocity.y += this._gravity;
    }
    this._x += this._velocity.x * updateInfo.slowDownFactor;
    this._y += this._velocity.y * updateInfo.slowDownFactor;
  }
}

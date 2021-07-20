import { Star } from './Star';
import { UpdateInfo } from './types';
import { RendererBounds } from './types';

export class BigStar extends Star {
  _color: string;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    xVelocity: number,
    yVelocity: number,
  ) {
    super(x, y, radius, xVelocity, yVelocity);
    this._color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this._color;
    ctx.shadowColor = '#e3eaef';
    ctx.shadowBlur = 40;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  _shatter() {
    this._radius -= 8;
    this.dispatchEvent({ type: 'starhit' });
    if (this._radius <= 0) {
      this.dispatchEvent({ type: 'destroystar' });
    }
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    super.update(updateInfo, rendererBounds, ctx);
    this.draw(ctx);

    if (
      this._y + this._radius + this._velocity.y >= rendererBounds.height ||
      this._y - this._radius + this._velocity.y <= 0
    ) {
      this._shatter();
    }

    if (
      this._x + this._radius + this._velocity.x >= rendererBounds.width ||
      this._x - this._radius + this._velocity.x <= 0
    ) {
      this._shatter();
    }
  }
}

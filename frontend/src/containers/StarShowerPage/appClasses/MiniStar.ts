import { UpdateInfo } from './types';
import { Star } from './Star';
import { getRandBetween } from './utils/getRandBetween';
import { RendererBounds } from './types';

export class MiniStar extends Star {
  _velocity = {
    x: getRandBetween(-5, 5),
    y: getRandBetween(-15, 15),
  };
  _gravity = 0.1;
  _ttl = 100; //time to live  - 100 rerenders
  _opacity = 1;

  constructor(x: number, y: number, radius: number) {
    super(x, y, radius);
  }

  _draw(ctx: CanvasRenderingContext2D) {
    // save and restore makes sure that the glow effect only applies to the stars (not other canvas elements)
    ctx.save();
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(227,234,239, ${this._opacity})`;
    ctx.shadowColor = '#e3eaef';
    ctx.shadowBlur = 40;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    super.update(updateInfo, rendererBounds, ctx);
    this._draw(ctx);

    //Gravity implementation
    if (this._y + this._radius + this._velocity.y > rendererBounds.height) {
      this._velocity.y = -this._velocity.y * this._friction;
    } else {
      this._velocity.y += this._gravity;
    }
    this._x += this._velocity.x * updateInfo.slowDownFactor;
    this._y += this._velocity.y * updateInfo.slowDownFactor;
    this._ttl -= 1 * updateInfo.slowDownFactor;
    this._opacity = this._ttl * 0.01; // /100

    //if stars time has ended, remove it from the canvas
    if (this._ttl <= 0) {
      this.dispatchEvent({ type: 'destroyministar' });
    }
  }
}

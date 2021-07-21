import { Star } from './Star';
import { UpdateInfo } from './types';
import { RendererBounds } from './types';
import { getRand } from './utils/getRandBetween';

export class BackgroundStar extends Star {
  _velocity = {
    x: getRand(-1, 1),
    y: 0,
  };

  constructor(
    x: number,
    y: number,
    radius: number,
    xVelocity: number,
    yVelocity: number,
  ) {
    super(x, y, radius, xVelocity, yVelocity, true);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
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
    this.draw(ctx);

    //Move the stars infinitely

    let newX =
      (this._x + this._velocity.x * updateInfo.slowDownFactor) %
      rendererBounds.width;

    if (newX <= 0) {
      newX = rendererBounds.width;
    }

    this._x = newX;
  }
}

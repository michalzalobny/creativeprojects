import { Star } from './Star';
import { UpdateInfo } from './types';
import { RendererBounds } from './types';
import { getRand } from './utils/getRandBetween';

export class BackgroundStar extends Star {
  _velocity = {
    x: getRand(1, 2),
    y: getRand(1, 2),
  };
  _animationDirection = getRand(-1, 1);
  _opacity = 1;

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
    ctx.fillStyle = `rgba(255,255,255, ${this._opacity})`;
    ctx.shadowColor = '#e3eaef';
    ctx.shadowBlur = 40;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  updateVelocity() {
    this._velocity.x = getRand(1, 2);
    this._velocity.y = getRand(1, 2);
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    super.update(updateInfo, rendererBounds, ctx);
    this.draw(ctx);

    //Infinite star move X
    let newX =
      this._x +
      this._velocity.x * this._animationDirection * updateInfo.slowDownFactor;
    if (newX < 0) {
      this.updateVelocity();
      newX = rendererBounds.width;
    }
    if (newX > rendererBounds.width) {
      this.updateVelocity();
      newX = 0;
    }
    this._x = newX;

    //Infinite star move Y
    let newY =
      this._y +
      this._velocity.y * this._animationDirection * updateInfo.slowDownFactor;
    if (newY < 0) {
      this.updateVelocity();
      newY = rendererBounds.height;
    }

    if (newY > rendererBounds.height) {
      this.updateVelocity();
      newY = 0;
    }
    this._y = newY;

    //Manage star opacity - the higher the star is the more bright it
    this._opacity = 1 - this._y / rendererBounds.height;
  }
}

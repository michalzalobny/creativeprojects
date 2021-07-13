import { UpdateInfo } from './App';
import { Star } from './Star';
import { getRandBetween } from './utils/getRandBetween';

export class MiniStar extends Star {
  _velocity = {
    x: getRandBetween(-5, 5),
    y: getRandBetween(-15, 15),
  };

  _gravity = 0.1;
  _ttl = 100; //time to live  - 100 rerenders
  _opacity = 1;

  constructor(
    x: number,
    y: number,
    radius: number,
    ctx: CanvasRenderingContext2D,
    rendererBounds: DOMRect,
  ) {
    super(x, y, radius, '#000', ctx, rendererBounds);

    console.log('extended:', this._gravity);
  }

  _draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    this._ctx.fillStyle = `rgba(255,0,0, ${this._opacity})`;
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
    this._ttl -= 1 * updateInfo.slowDownFactor;
    this._opacity = this._ttl * 0.01; // /100

    //if stars time has ended, remove it from the canvas
    if (this._ttl <= 0) {
      this.dispatchEvent({ type: 'destroyministar' });
    }
  }
}

export class Star {
  _x: number;
  _y: number;
  _radius: number;
  _color: string;
  _ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    ctx: CanvasRenderingContext2D,
  ) {
    this._ctx = ctx;
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
  }

  _draw() {
    this._ctx.beginPath();
    this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.closePath();
  }

  update() {
    this._draw();
  }
}

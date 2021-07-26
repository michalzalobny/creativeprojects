import { UpdateInfo } from './types';
import { EventDispatcher } from 'three';

export class MouseCircle extends EventDispatcher {
  constructor() {
    super();
  }

  init() {}

  _draw(
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number,
    mouseRadius: number,
  ) {
    //radius circle
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, mouseRadius, 0, 2 * Math.PI);
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
    this._draw(ctx, mouseX, mouseY, mouseRadius);
  }
}

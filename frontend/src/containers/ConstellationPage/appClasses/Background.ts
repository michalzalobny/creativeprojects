import { UpdateInfo } from './types';
import { EventDispatcher } from 'three';
import { RendererBounds } from './types';

export class Background extends EventDispatcher {
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _backgroundGradient: CanvasGradient | null = null;

  constructor() {
    super();
  }

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  init(ctx: CanvasRenderingContext2D) {
    //Create background
    this._backgroundGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      this._rendererBounds.height,
    );
    this._backgroundGradient.addColorStop(0, '#142C4F');
    this._backgroundGradient.addColorStop(1, '#080F1C');
  }

  _draw(ctx: CanvasRenderingContext2D) {}

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._draw(ctx);

    if (this._backgroundGradient) {
      ctx.fillStyle = this._backgroundGradient;
    }
    ctx.fillRect(0, 0, this._rendererBounds.width, this._rendererBounds.height);
  }
}

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './types';
import { RendererBounds } from './types';
import { Background } from './Background';

export class CanvasSketch {
  _background: Background;
  _mouseMove: MouseMove;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };

  constructor(mouseMove: MouseMove) {
    this._mouseMove = mouseMove;
    this._background = new Background();
  }

  init(ctx: CanvasRenderingContext2D) {
    this._addEventListeners();

    this._background.rendererBounds = this._rendererBounds;
    this._background.init(ctx);
  }

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._background.update(updateInfo, ctx);
  }

  _onResize = () => {};

  _addEventListeners() {
    window.addEventListener('resize', this._onResize);
  }

  _removeEventListeners() {
    window.removeEventListener('resize', this._onResize);
  }

  destroy() {
    this._removeEventListeners();
  }
}

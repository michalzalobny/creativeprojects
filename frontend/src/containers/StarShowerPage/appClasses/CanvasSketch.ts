import { MouseMove } from './MouseMove/MouseMove';
import { Event } from 'three';
import { UpdateInfo } from './App';

export class CanvasSketch {
  _mouseMove = MouseMove.getInstance();
  _mouseX = 0;
  _mouseY = 0;
  _ctx: CanvasRenderingContext2D;
  _rendererBounds: DOMRect | null = null;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._addEventListeners();
  }

  set rendererBounds(bounds: DOMRect) {
    this._rendererBounds = bounds;
  }

  update(updateInfo: UpdateInfo) {
    this._clear();
    this._ctx.fillText('HTML CANVAS', this._mouseX, this._mouseY);
    this._mouseMove.update(updateInfo);
  }

  _clear() {
    if (this._rendererBounds) {
      this._ctx.clearRect(
        0,
        0,
        this._rendererBounds.width,
        this._rendererBounds.height,
      );
    }
  }

  _onResize = () => {};

  _onMouseMove = (e: Event) => {
    this._mouseX = (e.target as MouseMove).mouseLerp.x;
    this._mouseY = (e.target as MouseMove).mouseLerp.y;
  };

  _addEventListeners() {
    window.addEventListener('resize', this._onResize);
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResize);
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  destroy() {
    this._removeEventListeners();
    this._mouseMove.destroy();
  }
}

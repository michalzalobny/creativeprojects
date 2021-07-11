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
    this.init();
  }

  set rendererBounds(bounds: DOMRect) {
    this._rendererBounds = bounds;
  }

  update(updateInfo: UpdateInfo) {
    this.clear();
  }

  clear() {
    if (this._rendererBounds) {
      this._ctx.clearRect(
        0,
        0,
        this._rendererBounds.width,
        this._rendererBounds.height,
      );
    }
  }

  init() {
    this.addEventListeners();
  }

  onResize = () => {};

  addEventListeners() {
    window.addEventListener('resize', this.onResize);

    this._mouseMove.addEventListener('mousemoved', (e: Event) => {
      this._mouseX = (e.target as MouseMove).mouseLerp.x;
      this._mouseY = (e.target as MouseMove).mouseLerp.y;
    });
  }
  removeEventListeners() {
    window.removeEventListener('resize', this.onResize);
  }

  destroy() {
    this.removeEventListeners();
  }
}

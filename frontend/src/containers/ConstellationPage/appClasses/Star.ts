import { EventDispatcher } from 'three';

import { RendererBounds } from './types';
import { UpdateInfo } from './types';

export class Star extends EventDispatcher {
  _x: number;
  _y: number;
  _radius: number;

  constructor(x: number, y: number, radius: number) {
    super();
    this._x = x;
    this._y = y;
    this._radius = radius;
  }

  update(
    updateInfo: UpdateInfo,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {}
}

import { Event } from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './App';
import { Star } from './Star';
import { MiniStar } from './MiniStar';

export class CanvasSketch {
  _mouseMove = MouseMove.getInstance();
  _mouseX = 0;
  _mouseY = 0;
  _ctx: CanvasRenderingContext2D;
  _rendererBounds: DOMRect;
  _starsArray: Star[] = [];
  _miniStarsArray: MiniStar[] = [];

  constructor(ctx: CanvasRenderingContext2D, rendererBounds: DOMRect) {
    this._ctx = ctx;
    this._addEventListeners();
    this._rendererBounds = rendererBounds;
    this._generateStars();
  }

  _onStarHit = (e: Event) => {
    for (let i = 0; i < 8; i++) {
      this._miniStarsArray.push(
        new MiniStar(
          e.target._x,
          e.target._y,
          2,
          'red',
          this._ctx,
          this._rendererBounds,
        ),
      );
    }
  };

  _onStarDestroy = (e: Event) => {
    const indexToRemove = this._starsArray.indexOf(e.target);
    if (indexToRemove > -1) {
      this._starsArray.splice(indexToRemove, 1);
    }
  };

  _generateStars() {
    for (let i = 0; i < 1; i++) {
      this._starsArray.push(
        new Star(
          this._rendererBounds.width / 2,
          30,
          30,
          'blue',
          this._ctx,
          this._rendererBounds,
        ),
      );
      this._starsArray.forEach(star => {
        star.addEventListener('starhit', this._onStarHit);
      });
      this._starsArray.forEach(star => {
        star.addEventListener('destroystar', this._onStarDestroy);
      });
    }
  }

  update(updateInfo: UpdateInfo) {
    this._clear();
    this._ctx.fillText(
      `x: ${Math.trunc(this._mouseX)}, y: ${Math.trunc(this._mouseY)}`,
      this._mouseX,
      this._mouseY,
    );
    this._mouseMove.update(updateInfo);
    this._miniStarsArray.forEach(star => {
      star.update(updateInfo);
    });
    this._starsArray.forEach(star => {
      star.update(updateInfo);
    });
  }

  _clear() {
    this._ctx.clearRect(
      0,
      0,
      this._rendererBounds.width,
      this._rendererBounds.height,
    );
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
    this._starsArray.forEach(star => {
      star.removeEventListener('starhit', this._onStarHit);
    });
    this._starsArray.forEach(star => {
      star.removeEventListener('destroystar', this._onStarDestroy);
    });
  }
}

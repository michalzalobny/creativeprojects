import { Event } from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './types';
import { BigStar } from './BigStar';
import { MiniStar } from './MiniStar';
import { RendererBounds } from './types';

export class CanvasSketch {
  _mouseMove: MouseMove;
  _mouseX = 0;
  _mouseY = 0;
  _ctx: CanvasRenderingContext2D;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _starsArray: BigStar[] = [];
  _miniStarsArray: MiniStar[] = [];
  _backgroundStarsArray: BigStar[] = [];
  _backgroundGradient: CanvasGradient | null = null;

  constructor(ctx: CanvasRenderingContext2D, mouseMove: MouseMove) {
    this._ctx = ctx;
    this._mouseMove = mouseMove;
  }

  init() {
    this._addEventListeners();
    this._generateStars();

    //Create background
    this._backgroundGradient = this._ctx.createLinearGradient(
      0,
      0,
      0,
      this._rendererBounds.height,
    );
    this._backgroundGradient.addColorStop(0, '#171e26');
    this._backgroundGradient.addColorStop(1, '#3f586b');
  }

  _onStarDestroyMiniStar = (e: Event) => {
    const indexToRemove = this._miniStarsArray.indexOf(e.target);
    if (indexToRemove > -1) {
      this._miniStarsArray.splice(indexToRemove, 1);
    }
  };

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  _onStarHit = (e: Event) => {
    for (let i = 0; i < 8; i++) {
      this._miniStarsArray.push(new MiniStar(e.target._x, e.target._y, 2));
    }
    this._miniStarsArray.forEach(star => {
      star.addEventListener('destroyministar', this._onStarDestroyMiniStar);
    });
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
        new BigStar(this._rendererBounds.width / 2, 30, 30, '#e3eaef'),
      );
    }
    this._starsArray.forEach(star => {
      star.addEventListener('starhit', this._onStarHit);
    });
    this._starsArray.forEach(star => {
      star.addEventListener('destroystar', this._onStarDestroy);
    });

    //Add background stars
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * this._rendererBounds.width;
      const y = Math.random() * this._rendererBounds.height;
      const radius = Math.random() * 3;
      this._backgroundStarsArray.push(new BigStar(x, y, radius, 'white'));
    }
  }

  _createMountainRange(
    amount: number,
    height: number,
    color: string,
    rendererBounds: RendererBounds,
    ctx: CanvasRenderingContext2D,
  ) {
    for (let i = 0; i < amount; i++) {
      const offset = rendererBounds.width * 0.2;
      const mountainWidth = rendererBounds.width / amount;
      ctx.beginPath();
      ctx.moveTo(i * mountainWidth, rendererBounds.height);
      ctx.lineTo(
        i * mountainWidth + mountainWidth + offset,
        rendererBounds.height,
      );
      ctx.lineTo(
        i * mountainWidth + mountainWidth * 0.5,
        rendererBounds.height - height,
      );
      ctx.lineTo(i * mountainWidth - offset, rendererBounds.height);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }

  update(updateInfo: UpdateInfo) {
    if (this._backgroundGradient) {
      this._ctx.fillStyle = this._backgroundGradient;
    }
    this._clear();

    this._backgroundStarsArray.forEach(star => {
      star.draw(this._ctx);
    });

    this._createMountainRange(
      1,
      this._rendererBounds.height * 0.7,
      '#384551',
      this._rendererBounds,
      this._ctx,
    );
    this._createMountainRange(
      2,
      this._rendererBounds.height * 0.55,
      '#2B3843',
      this._rendererBounds,
      this._ctx,
    );
    this._createMountainRange(
      3,
      this._rendererBounds.height * 0.3,
      '#26333E',
      this._rendererBounds,
      this._ctx,
    );
    this._ctx.fillText(
      `x: ${Math.trunc(this._mouseX)}, y: ${Math.trunc(this._mouseY)}`,
      this._mouseX,
      this._mouseY,
    );

    this._miniStarsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, this._ctx);
    });
    this._starsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, this._ctx);
    });
  }

  _clear() {
    this._ctx.fillRect(
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
    this._starsArray.forEach(star => {
      star.removeEventListener('starhit', this._onStarHit);
    });
    this._starsArray.forEach(star => {
      star.removeEventListener('destroystar', this._onStarDestroy);
    });
  }
}

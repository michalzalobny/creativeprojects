import { Event } from 'three';

import { Catapult, CATAPULT_MULTIPLIER } from './Catapult';
import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './types';
import { BigStar } from './BigStar';
import { MiniStar } from './MiniStar';
import { RendererBounds } from './types';
import { Background } from './Background';

export class CanvasSketch {
  _background: Background;
  _catapult: Catapult;
  _mouseMove: MouseMove;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _starsArray: BigStar[] = [];
  _miniStarsArray: MiniStar[] = [];

  constructor(mouseMove: MouseMove) {
    this._mouseMove = mouseMove;
    this._catapult = new Catapult(this._mouseMove);
    this._background = new Background();
  }

  init(ctx: CanvasRenderingContext2D) {
    this._addEventListeners();

    this._catapult.rendererBounds = this._rendererBounds;
    this._catapult.init();

    this._background.rendererBounds = this._rendererBounds;
    this._background.init(ctx);
  }

  _onStarDestroyMiniStar = (e: Event) => {
    const indexToRemove = this._miniStarsArray.indexOf(e.target);
    if (indexToRemove > -1) {
      const starToRemove = this._miniStarsArray[indexToRemove];
      this._miniStarsArray.splice(indexToRemove, 1);
      starToRemove.removeEventListener('destroyministar', this._onStarDestroy);
    }
  };

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  _onStarHit = (e: Event) => {
    for (let i = 0; i < 3; i++) {
      this._miniStarsArray.push(new MiniStar(e.target._x, e.target._y, 2));
    }
    this._miniStarsArray.forEach(star => {
      star.addEventListener('destroyministar', this._onStarDestroyMiniStar);
    });
  };

  _onStarDestroy = (e: Event) => {
    const indexToRemove = this._starsArray.indexOf(e.target);

    if (indexToRemove > -1) {
      const starToRemove = this._starsArray[indexToRemove];
      this._starsArray.splice(indexToRemove, 1);
      starToRemove.removeEventListener('starhit', this._onStarHit);
      starToRemove.removeEventListener('destroystar', this._onStarDestroy);
    }
  };

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._background.update(updateInfo, ctx);

    this._miniStarsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, ctx);
    });
    this._starsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, ctx);
    });

    this._catapult.update(updateInfo, ctx);
  }

  _onResize = () => {
    this._background.generateStarsBackground();
    this._catapult.rendererBounds = this._rendererBounds;
  };

  _onCatapultShoot = (e: Event) => {
    this._starsArray.push(
      new BigStar(
        e.x,
        e.y,
        e.strength * CATAPULT_MULTIPLIER,
        '#e3eaef',
        -e.deltaX * CATAPULT_MULTIPLIER,
        -e.deltaY * CATAPULT_MULTIPLIER,
      ),
    );

    this._starsArray[this._starsArray.length - 1].addEventListener(
      'starhit',
      this._onStarHit,
    );

    this._starsArray[this._starsArray.length - 1].addEventListener(
      'destroystar',
      this._onStarDestroy,
    );
  };

  _addEventListeners() {
    window.addEventListener('resize', this._onResize);
    this._catapult.addEventListener('shoot', this._onCatapultShoot);
  }

  _removeEventListeners() {
    window.removeEventListener('resize', this._onResize);
    this._catapult.removeEventListener('shoot', this._onCatapultShoot);

    this._starsArray.forEach(star => {
      star.removeEventListener('starhit', this._onStarHit);
    });
    this._starsArray.forEach(star => {
      star.removeEventListener('destroystar', this._onStarDestroy);
    });
  }

  destroy() {
    this._removeEventListeners();
    this._catapult.destroy();
  }
}

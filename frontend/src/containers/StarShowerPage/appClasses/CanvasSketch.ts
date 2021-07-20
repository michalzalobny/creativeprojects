import { Event } from 'three';

import { Catapult } from './Catapult';
import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './types';
import { BigStar } from './BigStar';
import { MiniStar } from './MiniStar';
import { RendererBounds } from './types';
import { getRandBetween } from './utils/getRandBetween';

const RADIUS = 12;
export const GROUND_HEIGHT = 60;

export class CanvasSketch {
  _catapult: Catapult;
  _mouseMove: MouseMove;
  _ctx: CanvasRenderingContext2D;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _starsArray: BigStar[] = [];
  _miniStarsArray: MiniStar[] = [];
  _backgroundStarsArray: BigStar[] = [];
  _backgroundGradient: CanvasGradient | null = null;
  _ticker = 1;
  _randomSpawnRate = 75;

  constructor(ctx: CanvasRenderingContext2D, mouseMove: MouseMove) {
    this._ctx = ctx;
    this._mouseMove = mouseMove;
    this._catapult = new Catapult(this._mouseMove);
  }

  init() {
    this._addEventListeners();
    this._generateStarsBackground();
    this._catapult.init();

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
      const starToRemove = this._miniStarsArray[indexToRemove];
      this._miniStarsArray.splice(indexToRemove, 1);
      starToRemove.removeEventListener('destroyministar', this._onStarDestroy);
    }
  };

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  _onStarHit = (e: Event) => {
    for (let i = 0; i < 4; i++) {
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

  _generateStarsBackground() {
    //Add background stars
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * this._rendererBounds.width;
      const y = Math.random() * this._rendererBounds.height;
      const radius = Math.random() * 3;
      this._backgroundStarsArray.push(new BigStar(x, y, radius, 'white', 0, 0));
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
    // this._spawnRandomStar();

    this._ticker += 1 * Math.floor(updateInfo.slowDownFactor);

    if (this._backgroundGradient) {
      this._ctx.fillStyle = this._backgroundGradient;
    }
    this._ctx.fillRect(
      0,
      0,
      this._rendererBounds.width,
      this._rendererBounds.height,
    );

    this._backgroundStarsArray.forEach(star => {
      star.draw(this._ctx);
    });

    this._createMountains();

    this._ctx.fillStyle = '#182028';
    this._ctx.fillRect(
      0,
      this._rendererBounds.height - GROUND_HEIGHT,
      this._rendererBounds.width,
      GROUND_HEIGHT,
    );

    this._miniStarsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, this._ctx);
    });
    this._starsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, this._ctx);
    });

    this._catapult.update(updateInfo, this._ctx);
  }

  _spawnRandomStar() {
    if (this._ticker % this._randomSpawnRate === 0) {
      this._randomSpawnRate = getRandBetween(75, 200);
      const x = Math.max(
        12,
        Math.random() * this._rendererBounds.width - RADIUS,
      );
      this._starsArray.push(new BigStar(x, -100, RADIUS, '#e3eaef', 0, 0));

      this._starsArray[this._starsArray.length - 1].addEventListener(
        'starhit',
        this._onStarHit,
      );

      this._starsArray[this._starsArray.length - 1].addEventListener(
        'destroystar',
        this._onStarDestroy,
      );
    }
  }

  _createMountains() {
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
  }

  _onResize = () => {};

  _onCatapultShoot = (e: Event) => {
    console.log(e.deltaX, e.deltaY);
    this._starsArray.push(
      new BigStar(
        e.x,
        e.y,
        e.strength * 0.1,
        '#e3eaef',
        -e.deltaX * 0.1,
        -e.deltaY * 0.1,
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

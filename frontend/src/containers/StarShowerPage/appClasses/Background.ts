import { UpdateInfo } from './types';
import { Event, EventDispatcher } from 'three';
import { RendererBounds } from './types';
import { BackgroundStar } from './BackgroundStar';

export class Background extends EventDispatcher {
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _backgroundGradient: CanvasGradient | null = null;
  _backgroundStarsArray: BackgroundStar[] = [];

  constructor() {
    super();
  }

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  generateStarsBackground() {
    this._backgroundStarsArray = [];
    //Add background stars
    for (let i = 0; i < Math.round(this._rendererBounds.width * 0.01); i++) {
      const x = Math.random() * this._rendererBounds.width;
      const y = Math.random() * this._rendererBounds.height;
      const radius = Math.random() * 3;
      this._backgroundStarsArray.push(new BackgroundStar(x, y, radius, 0, 0));
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

  _createMountains(ctx: CanvasRenderingContext2D) {
    this._createMountainRange(
      1,
      this._rendererBounds.height * 0.7,
      '#384551',
      this._rendererBounds,
      ctx,
    );
    this._createMountainRange(
      2,
      this._rendererBounds.height * 0.55,
      '#2B3843',
      this._rendererBounds,
      ctx,
    );
    this._createMountainRange(
      3,
      this._rendererBounds.height * 0.3,
      '#26333E',
      this._rendererBounds,
      ctx,
    );
  }

  init(ctx: CanvasRenderingContext2D) {
    //Create background
    this._backgroundGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      this._rendererBounds.height,
    );
    this._backgroundGradient.addColorStop(0, '#171e26');
    this._backgroundGradient.addColorStop(1, '#3f586b');
    this.generateStarsBackground();
  }

  _draw(ctx: CanvasRenderingContext2D) {}

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._draw(ctx);
    if (this._backgroundGradient) {
      ctx.fillStyle = this._backgroundGradient;
    }
    ctx.fillRect(0, 0, this._rendererBounds.width, this._rendererBounds.height);

    this._backgroundStarsArray.forEach(star => {
      star.update(updateInfo, this._rendererBounds, ctx);
    });

    this._createMountains(ctx);
  }
}

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo, RendererBounds } from './types';
import { getRand } from './utils/getRandBetween';
import { Background } from './Background';
import { Particle } from './Particle';

export class CanvasSketch {
  _mouseX = 0;
  _mouseY = 0;
  _mouseRadius = 0;
  _background: Background;
  _mouseMove: MouseMove;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };
  _particlesArray: Particle[] = [];

  constructor(mouseMove: MouseMove) {
    this._mouseMove = mouseMove;
    this._background = new Background();
  }

  _generateParticles() {
    this._particlesArray = [];

    const particlesAmount =
      this._rendererBounds.width * this._rendererBounds.height * 0.00004;

    for (let i = 0; i < particlesAmount; i++) {
      const radius = getRand(1, 3);
      const x =
        Math.random() * (this._rendererBounds.width - radius * 2) + radius;
      const y =
        Math.random() * (this._rendererBounds.height - radius * 2) + radius;

      const directionX = getRand(-1, 1);
      const directionY = getRand(-1, 1);
      this._particlesArray.push(
        new Particle(x, y, radius, 'white', directionX, directionY),
      );
    }
  }

  init(ctx: CanvasRenderingContext2D) {
    this._addEventListeners();

    this._background.rendererBounds = this._rendererBounds;
    this._background.init(ctx);

    this._generateParticles();
  }

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
    this._mouseRadius = 90;
  }

  _connectParticles(ctx: CanvasRenderingContext2D) {
    const minDist = 4;
    let opacity = 1;
    const borderVal = 0.05;
    for (let a = 0; a < this._particlesArray.length; a++) {
      for (let b = a; b < this._particlesArray.length; b++) {
        const dx =
          (this._particlesArray[a]._x - this._particlesArray[b]._x) / 100;
        const dy =
          (this._particlesArray[a]._y - this._particlesArray[b]._y) / 100;

        const distance = dx * dx + dy * dy;

        if (distance < minDist) {
          const aXBorderDist =
            this._particlesArray[a]._x / this._rendererBounds.width;

          let opacityAXMultiplier = 1;

          if (aXBorderDist <= borderVal) {
            opacityAXMultiplier = Math.min(
              Math.max(aXBorderDist / borderVal, 0),
              1,
            );
          }

          if (aXBorderDist >= 1 - borderVal) {
            opacityAXMultiplier = Math.min(
              Math.max((1 - aXBorderDist) / borderVal, 0),
              1,
            );
          }

          const aYBorderDist =
            this._particlesArray[a]._y / this._rendererBounds.height;

          let opacityAYMultiplier = 1;

          if (aYBorderDist <= borderVal) {
            opacityAYMultiplier = Math.min(
              Math.max(aYBorderDist / borderVal, 0),
              1,
            );
          }

          if (aYBorderDist >= 1 - borderVal) {
            opacityAYMultiplier = Math.min(
              Math.max((1 - aYBorderDist) / borderVal, 0),
              1,
            );
          }

          const bXBorderDist =
            this._particlesArray[b]._x / this._rendererBounds.width;

          let opacityBXMultiplier = 1;

          if (bXBorderDist <= borderVal) {
            opacityBXMultiplier = Math.min(
              Math.max(bXBorderDist / borderVal, 0),
              1,
            );
          }

          if (bXBorderDist >= 1 - borderVal) {
            opacityBXMultiplier = Math.min(
              Math.max((1 - bXBorderDist) / borderVal, 0),
              1,
            );
          }

          const bYBorderDist =
            this._particlesArray[b]._y / this._rendererBounds.height;

          let opacityBYMultiplier = 1;

          if (bYBorderDist <= borderVal) {
            opacityBYMultiplier = Math.min(
              Math.max(bYBorderDist / borderVal, 0),
              1,
            );
          }

          if (bYBorderDist >= 1 - borderVal) {
            opacityBYMultiplier = Math.min(
              Math.max((1 - bYBorderDist) / borderVal, 0),
              1,
            );
          }

          opacity =
            (1 - distance / minDist) *
            opacityAXMultiplier *
            opacityAYMultiplier *
            opacityBXMultiplier *
            opacityBYMultiplier;

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(this._particlesArray[a]._x, this._particlesArray[a]._y);
          ctx.lineTo(this._particlesArray[b]._x, this._particlesArray[b]._y);
          ctx.stroke();
        }
      }
    }
  }

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._background.update(updateInfo, ctx);

    this._particlesArray.forEach(particle => {
      particle.update(
        updateInfo,
        this._rendererBounds,
        ctx,
        this._mouseX,
        this._mouseY,
        this._mouseRadius,
      );
    });

    this._connectParticles(ctx);
  }

  _onResize = () => {
    this._generateParticles();
    this._background.rendererBounds = this._rendererBounds;
  };

  _onMouseMove = e => {
    this._mouseX = (e.target as MouseMove).mouse.x;
    this._mouseY = (e.target as MouseMove).mouse.y;
  };

  _onMouseLeave = e => {};

  _addEventListeners() {
    window.addEventListener('resize', this._onResize);
    window.addEventListener('mouseout', this._onMouseLeave);
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeEventListeners() {
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('mouseout', this._onMouseLeave);
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  destroy() {
    this._removeEventListeners();
  }
}

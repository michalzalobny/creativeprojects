import * as THREE from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo, RendererBounds } from './types';
import { getRand } from './utils/getRandBetween';
import { Background } from './Background';
import { Particle } from './Particle';
import { getBoundaryOpacity } from './utils/getBoundaryOpacity';
import {
  BORDER_DRAW_OFFSET,
  MIN_DIST_TO_DRAW,
  MOUSE_RADIUS,
  STARS_SPEED,
} from './constants';

export class CanvasSketch {
  _mouseX = 0;
  _mouseY = 0;
  _mouseRadius = MOUSE_RADIUS;
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
      const radius = getRand(0.5, 4);
      const x =
        Math.random() * (this._rendererBounds.width - radius * 2) + radius;
      const y =
        Math.random() * (this._rendererBounds.height - radius * 2) + radius;

      const directionX = getRand(-STARS_SPEED, STARS_SPEED);
      const directionY = getRand(-STARS_SPEED, STARS_SPEED);
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
  }

  _connectParticles(ctx: CanvasRenderingContext2D) {
    for (let a = 0; a < this._particlesArray.length; a++) {
      for (let b = a; b < this._particlesArray.length; b++) {
        const dx =
          (this._particlesArray[a]._x - this._particlesArray[b]._x) / 100;
        const dy =
          (this._particlesArray[a]._y - this._particlesArray[b]._y) / 100;

        const distance = dx * dx + dy * dy;

        if (distance < MIN_DIST_TO_DRAW) {
          let opacity = 1;
          const aXOpacity = getBoundaryOpacity({
            borderVal: BORDER_DRAW_OFFSET,
            coordinate: this._particlesArray[a]._x,
            referenceVal: this._rendererBounds.width,
          });

          const aYOpacity = getBoundaryOpacity({
            borderVal: BORDER_DRAW_OFFSET,
            coordinate: this._particlesArray[a]._y,
            referenceVal: this._rendererBounds.height,
          });

          const bXOpacity = getBoundaryOpacity({
            borderVal: BORDER_DRAW_OFFSET,
            coordinate: this._particlesArray[b]._x,
            referenceVal: this._rendererBounds.width,
          });

          const bYOpacity = getBoundaryOpacity({
            borderVal: BORDER_DRAW_OFFSET,
            coordinate: this._particlesArray[b]._y,
            referenceVal: this._rendererBounds.height,
          });

          opacity =
            (1 - distance / MIN_DIST_TO_DRAW) *
            aXOpacity *
            aYOpacity *
            bXOpacity *
            bYOpacity;

          ctx.lineWidth = 1;
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

  _onMouseMove = (e: THREE.Event) => {
    this._mouseX = (e.target as MouseMove).mouse.x;
    this._mouseY = (e.target as MouseMove).mouse.y;
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
  }
}

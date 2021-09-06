import { EventDispatcher } from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo } from './types';
import { MouseMove } from './MouseMove/MouseMove';
import { lerp } from './utils/lerp';

interface Constructor {
  mouseMove: MouseMove;
}

export class MouseCircle extends EventDispatcher {
  _x = 0;
  _y = 0;
  _ease = 0.4;
  _opacity = 0;
  _mouseMove: MouseMove;

  constructor({ mouseMove }: Constructor) {
    super();

    this._mouseMove = mouseMove;
    this._addEventListeners();
  }

  destroy() {
    this._removeEventListeners();
  }

  _onMouseOut = () => {
    this._animateOpacity(0);
  };
  _onMouseEnter = () => {
    this._animateOpacity(1);
  };

  _onMouseMove = (e: THREE.Event) => {
    this._x = (e.target as MouseMove).mouseLerp.x;
    this._y = (e.target as MouseMove).mouseLerp.y;
  };

  _addEventListeners() {
    window.addEventListener('mouseout', this._onMouseOut);
    window.addEventListener('mouseover', this._onMouseEnter);
    window.addEventListener('pointerdown', this._onMouseEnter);
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeEventListeners() {
    window.removeEventListener('mouseout', this._onMouseOut);
    window.removeEventListener('mouseover', this._onMouseEnter);
    window.removeEventListener('pointerdown', this._onMouseEnter);
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  _draw(ctx: CanvasRenderingContext2D) {
    //radius circle
    ctx.beginPath();
    ctx.arc(this._x, this._y, 20 * this._opacity, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255,255,255, ${this._opacity})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  _animateOpacity(destination: number) {
    const tweenProgress = new TWEEN.Tween({
      progress: this._opacity,
    })
      .to({ progress: destination }, 300)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        this._opacity = obj.progress;
      });

    tweenProgress.start();
  }

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._draw(ctx);
  }
}

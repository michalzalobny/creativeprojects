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
  _opacity = 1;
  _mouseMove: MouseMove;
  _radius = {
    current: 30,
    target: 30,
  };

  constructor({ mouseMove }: Constructor) {
    super();

    this._mouseMove = mouseMove;
    this._addEventListeners();
  }

  destroy() {
    this._removeEventListeners();
  }

  _onMouseMove = (e: THREE.Event) => {
    this._x = (e.target as MouseMove).mouseLerp.x;
    this._y = (e.target as MouseMove).mouseLerp.y;
  };

  _addEventListeners() {
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeEventListeners() {
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  _draw(ctx: CanvasRenderingContext2D) {
    //radius circle
    ctx.beginPath();
    ctx.arc(
      this._x,
      this._y,
      this._radius.current * this._opacity,
      0,
      2 * Math.PI,
    );
    ctx.strokeStyle = `rgba(255,255,255, ${this._opacity})`;
    ctx.lineWidth = 1.4;
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

    this._radius.current = lerp(
      this._radius.current,
      this._radius.target,
      0.03 * updateInfo.slowDownFactor,
    );
  }
}

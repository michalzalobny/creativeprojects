import { EventDispatcher } from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo } from './types';
import { lerp } from './utils/lerp';

export class MouseCircle extends EventDispatcher {
  _x = 0;
  _y = 0;
  _ease = 0.4;
  _opacity = 0;

  constructor() {
    super();
  }

  init() {
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

  _addEventListeners() {
    window.addEventListener('mouseout', this._onMouseOut);
    window.addEventListener('mouseover', this._onMouseEnter);
    window.addEventListener('pointerdown', this._onMouseEnter);
  }

  _removeEventListeners() {
    window.removeEventListener('mouseout', this._onMouseOut);
    window.removeEventListener('mouseover', this._onMouseEnter);
    window.removeEventListener('pointerdown', this._onMouseEnter);
  }

  _draw(ctx: CanvasRenderingContext2D, mouseRadius: number) {
    //radius circle
    ctx.beginPath();
    ctx.arc(this._x, this._y, mouseRadius * this._opacity, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255,255,255, ${this._opacity})`;
    ctx.lineWidth = 0.5;
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

  update(
    updateInfo: UpdateInfo,
    ctx: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number,
    mouseRadius: number,
  ) {
    TWEEN.update(updateInfo.time);
    this._y = lerp(this._y, mouseY, this._ease * updateInfo.slowDownFactor);
    this._x = lerp(this._x, mouseX, this._ease * updateInfo.slowDownFactor);
    this._draw(ctx, mouseRadius);
  }
}

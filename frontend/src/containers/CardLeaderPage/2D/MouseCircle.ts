import { EventDispatcher } from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo } from './types';
import { MouseMove } from './Singletons/MouseMove';
import { lerp } from './utils/lerp';

interface Constructor {
  mouseMove: MouseMove;
}

const DEFAULT_SIZE = 10;

export class MouseCircle extends EventDispatcher {
  static mouseLerp = 0.2;

  static _radius = {
    current: DEFAULT_SIZE,
    target: DEFAULT_SIZE,
  };

  static _opacity = 0;
  static _ringOpacity = 0;

  static onMouseEnter() {
    MouseCircle._radius.target = 40;
    this._animateOpacity(1);
    this._animateRingOpacity(1);
  }

  static onMouseLeft() {
    MouseCircle._radius.target = DEFAULT_SIZE;
    this._animateOpacity(0);
    this._animateRingOpacity(0);
  }

  static hide() {
    this._animateRingOpacity(0);
    this._animateOpacity(0);
    MouseCircle._radius.target = DEFAULT_SIZE;
  }

  static show() {
    this._animateRingOpacity(0);
    this._animateOpacity(0);
  }

  static _animateOpacity(destination: number) {
    const tweenProgress = new TWEEN.Tween({
      progress: this._opacity,
    })
      .to({ progress: destination }, 250)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        this._opacity = obj.progress;
      });

    tweenProgress.start();
  }

  static _animateRingOpacity(destination: number) {
    const tweenProgress = new TWEEN.Tween({
      progress: this._ringOpacity,
    })
      .to({ progress: destination }, 250)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        this._ringOpacity = obj.progress;
      });

    tweenProgress.start();
  }

  _mouse = {
    x: {
      current: 0,
      target: 0,
    },
    y: {
      current: 0,
      target: 0,
    },
  };

  _ease = 0.4;

  _mouseMove: MouseMove;

  constructor({ mouseMove }: Constructor) {
    super();

    this._mouseMove = mouseMove;
    this._addEventListeners();
  }

  destroy() {
    this._removeEventListeners();
  }

  _onMouseMove = (e: THREE.Event) => {
    this._mouse.x.target = (e.target as MouseMove).mouse.x;
    this._mouse.y.target = (e.target as MouseMove).mouse.y;
  };

  _addEventListeners() {
    this._mouseMove.addEventListener('mousemove', this._onMouseMove);
  }

  _removeEventListeners() {
    this._mouseMove.removeEventListener('mousemove', this._onMouseMove);
  }

  _draw(ctx: CanvasRenderingContext2D) {
    //radius circle
    ctx.beginPath();
    ctx.arc(
      this._mouse.x.current,
      this._mouse.y.current,
      MouseCircle._radius.current * 1,
      0,
      2 * Math.PI,
    );
    ctx.strokeStyle = `rgba(255,255,255, ${MouseCircle._ringOpacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '16px Open Sans';
    ctx.fillStyle = `rgba(255,255,255, ${MouseCircle._opacity})`;
    const metrics = ctx.measureText('Hold');
    const actualHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    ctx.fillText(
      'Hold',
      this._mouse.x.current - metrics.width / 2,
      this._mouse.y.current + actualHeight / 2,
    );
  }

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._draw(ctx);

    this._mouse.x.current = lerp(
      this._mouse.x.current,
      this._mouse.x.target,
      MouseCircle.mouseLerp * updateInfo.slowDownFactor,
    );

    this._mouse.y.current = lerp(
      this._mouse.y.current,
      this._mouse.y.target,
      MouseCircle.mouseLerp * updateInfo.slowDownFactor,
    );

    MouseCircle._radius.current = lerp(
      MouseCircle._radius.current,
      MouseCircle._radius.target,
      0.07 * updateInfo.slowDownFactor,
    );
  }
}

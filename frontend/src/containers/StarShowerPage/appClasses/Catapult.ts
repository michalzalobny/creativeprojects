import { Event, EventDispatcher } from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { UpdateInfo } from './types';
import { getLength } from './utils/getLength';
import { RendererBounds } from './types';

export const CATAPULT_MULTIPLIER = 0.1;

export class Catapult extends EventDispatcher {
  _mouseMove: MouseMove;
  _mouseX = 0;
  _mouseY = 0;
  _touchedX = 0;
  _touchedY = 0;
  _isTouching = false;
  _rendererBounds: RendererBounds = { width: 300, height: 200 };

  constructor(mouseMove: MouseMove) {
    super();
    this._mouseMove = mouseMove;
  }

  init() {
    this._addEventListeners();
  }

  set rendererBounds(bounds: RendererBounds) {
    this._rendererBounds = bounds;
  }

  _onMouseDown = (e: Event) => {
    this._isTouching = true;
    this._touchedX = (e.target as MouseMove).mouse.x;
    this._touchedY = (e.target as MouseMove).mouse.y;
    this._mouseX = this._touchedX;
    this._mouseY = this._touchedY;
  };

  _onMouseUp = (e: Event) => {
    this._isTouching = false;

    const distance = getLength(
      this._mouseX,
      this._mouseY,
      this._touchedX,
      this._touchedY,
    );

    const deltaX = this._mouseX - this._touchedX;
    const deltaY = this._mouseY - this._touchedY;

    this.dispatchEvent({
      type: 'shoot',
      strength: distance,
      x: this._mouseX,
      y: this._mouseY,
      deltaX,
      deltaY,
    });
  };

  _onMouseMove = (e: Event) => {
    const starRadius =
      getLength(this._mouseX, this._mouseY, this._touchedX, this._touchedY) *
      CATAPULT_MULTIPLIER; //The radius of the star

    //Restrict drawing the star outside of the renderer bounds
    const newX = (e.target as MouseMove).mouse.x;
    const xLeftBoundary = starRadius;
    const xRightBoundary = this._rendererBounds.width - starRadius;

    //Added or removed 1 pixel, to fix collision bug
    if (newX >= xRightBoundary) {
      this._mouseX = xRightBoundary - 1;
    } else if (newX <= xLeftBoundary) {
      this._mouseX = xLeftBoundary + 1;
    } else {
      this._mouseX = newX;
    }

    const newY = (e.target as MouseMove).mouse.y;
    const yTopBoundary = this._rendererBounds.height - starRadius;
    const yBottomBoundary = starRadius;

    if (newY >= yTopBoundary) {
      this._mouseY = yTopBoundary - 1;
    } else if (newY <= yBottomBoundary) {
      this._mouseY = yBottomBoundary + 1;
    } else {
      this._mouseY = newY;
    }
  };

  _addEventListeners() {
    this._mouseMove.addEventListener('down', this._onMouseDown);
    this._mouseMove.addEventListener('up', this._onMouseUp);
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeEventListeners() {
    this._mouseMove.removeEventListener('down', this._onMouseDown);
    this._mouseMove.removeEventListener('up', this._onMouseUp);
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  destroy() {
    this._removeEventListeners();
  }

  _draw(ctx: CanvasRenderingContext2D) {
    if (this._isTouching) {
      this._drawLine(ctx);
      this._drawPowerCircle(ctx);
    }
  }

  _drawLine(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this._touchedX, this._touchedY);
    ctx.lineTo(this._mouseX, this._mouseY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  _drawPowerCircle(ctx: CanvasRenderingContext2D) {
    const distance = getLength(
      this._mouseX,
      this._mouseY,
      this._touchedX,
      this._touchedY,
    );
    ctx.beginPath();
    ctx.arc(
      this._mouseX,
      this._mouseY,
      distance * CATAPULT_MULTIPLIER,
      0,
      2 * Math.PI,
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  update(updateInfo: UpdateInfo, ctx: CanvasRenderingContext2D) {
    this._draw(ctx);
  }
}

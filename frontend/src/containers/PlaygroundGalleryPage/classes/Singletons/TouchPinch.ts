import { EventDispatcher } from 'three';

import { Coords } from '../types';

export class TouchPinch extends EventDispatcher {
  _delta: Coords = { x: 0, y: 0 };
  _deltaLast: Coords = { x: 0, y: 0 };
  _distanceLast = 0;
  _isPinching = false;

  static _instance: TouchPinch | null;
  static _canCreate = false;
  static getInstance() {
    if (!TouchPinch._instance) {
      TouchPinch._canCreate = true;
      TouchPinch._instance = new TouchPinch();
      TouchPinch._canCreate = false;
    }

    return TouchPinch._instance;
  }

  constructor() {
    super();

    if (TouchPinch._instance || !TouchPinch._canCreate) {
      throw new Error('Use TouchPinch.getInstance()');
    }

    this._addEvents();

    TouchPinch._instance = this;
  }

  _onTouchDown = (e: TouchEvent) => {
    if (e.touches.length >= 2) {
      this._isPinching = true;

      this._delta.x = e.touches[0].pageX - e.touches[1].pageX;
      this._delta.y = e.touches[0].pageY - e.touches[1].pageY;

      this._deltaLast.x = this._delta.x;
      this._deltaLast.y = this._delta.y;
    }
  };

  _onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 1) return;
    if (this._isPinching) {
      e.preventDefault();

      this._delta.x = e.touches[0].pageX - e.touches[1].pageX;
      this._delta.y = e.touches[0].pageY - e.touches[1].pageY;

      const deltaDeltaX = this._delta.x - this._deltaLast.x;
      const deltaDeltaY = this._delta.y - this._deltaLast.y;

      const distance = Math.sqrt(
        Math.pow(this._delta.x, 2) + Math.pow(this._delta.y, 2),
      );

      const deltaDistance = Math.sqrt(
        Math.pow(deltaDeltaX, 2) + Math.pow(deltaDeltaY, 2),
      );

      const direction = -Math.sign(distance - this._distanceLast);

      this.dispatchEvent({
        type: 'pinch',
        distance: deltaDistance * direction,
      });

      this._deltaLast.x = this._delta.x;
      this._deltaLast.y = this._delta.y;
      this._distanceLast = distance;
    }
  };

  _onTouchUp = () => {
    this._isPinching = false;
  };

  _addEvents() {
    window.addEventListener('touchstart', this._onTouchDown);
    window.addEventListener('touchmove', this._onTouchMove, {
      passive: false,
    });
    window.addEventListener('touchend', this._onTouchUp);
  }
}

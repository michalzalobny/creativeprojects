import { EventDispatcher } from 'three';

import { UpdateInfo } from '../types';

interface Mouse {
  x: number;
  y: number;
}

export class TouchPinch extends EventDispatcher {
  _delta: Mouse = { x: 0, y: 0 };
  _deltaLast: Mouse = { x: 0, y: 0 };
  _isPinching = false;
  _isActive = false;

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
    if (this._isPinching) {
      e.preventDefault();

      this._delta.x = e.touches[0].pageX - e.touches[1].pageX;
      this._delta.y = e.touches[0].pageY - e.touches[1].pageY;

      const deltaDeltaX = this._delta.x - this._deltaLast.x;
      const deltaDeltaY = this._delta.y - this._deltaLast.y;

      const sign = 1;

      // sign = Math.sign(deltaDeltaY);
      // if (Math.abs(deltaDeltaX) > Math.abs(deltaDeltaY)) {
      //   // sign = Math.sign(deltaDeltaX);
      // } else {
      //   // sign = Math.sign(deltaDeltaY);
      // }

      const distance = Math.hypot(deltaDeltaX, deltaDeltaY);

      // this._isActive &&
      this.dispatchEvent({ type: 'pinch', distance: distance * sign });

      this._deltaLast.x = this._delta.x;
      this._deltaLast.y = this._delta.y;
    }
  };

  _onTouchUp = () => {
    this._isPinching = false;
  };

  _addMeta() {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  _removeMeta() {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  _addEvents() {
    window.addEventListener('touchstart', this._onTouchDown);
    window.addEventListener('touchmove', this._onTouchMove, {
      passive: false,
    });
    window.addEventListener('touchend', this._onTouchUp);
  }

  enablePinch() {
    this._isActive = true;
    this._addMeta();
  }

  disablePinch() {
    this._isActive = false;
    this._removeMeta();
  }

  update(updateInfo: UpdateInfo) {}
}

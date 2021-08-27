import { EventDispatcher } from 'three';

import { UpdateInfo, Bounds } from '../types';

interface Constructor {
  domEl: HTMLElement;
}

export class HTMLComponent extends EventDispatcher {
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _domEl: HTMLElement;
  _elBounds: DOMRect;

  constructor({ domEl }: Constructor) {
    super();
    this._domEl = domEl;
    this._elBounds = this._domEl.getBoundingClientRect();
  }

  _updateSizes() {
    this._elBounds = this._domEl.getBoundingClientRect();
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    this._updateSizes();
  }

  update(updateInfo: UpdateInfo) {}

  destroy() {}
}

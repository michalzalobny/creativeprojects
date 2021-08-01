import * as THREE from 'three';

import { Bounds } from './types';

export class InteractiveScene extends THREE.Scene {
  raycaster = new THREE.Raycaster();
  _rendererBounds: Bounds = { height: 100, width: 100 };

  constructor() {
    super();
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }
}

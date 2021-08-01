import * as THREE from 'three';

export class InteractiveScene extends THREE.Scene {
  raycaster = new THREE.Raycaster();
  _rendererBounds: DOMRect;

  constructor() {
    super();
  }

  set rendererBounds(bounds: DOMRect) {
    this._rendererBounds = bounds;
  }
}

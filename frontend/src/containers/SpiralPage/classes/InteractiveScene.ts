import * as THREE from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { Bounds } from './types';

export class InteractiveScene extends THREE.Scene {
  _raycaster = new THREE.Raycaster();
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _camera: THREE.PerspectiveCamera;
  _mouseMove: MouseMove;

  constructor(camera: THREE.PerspectiveCamera, mouseMove: MouseMove) {
    super();
    this._camera = camera;
    this._mouseMove = mouseMove;
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }
}

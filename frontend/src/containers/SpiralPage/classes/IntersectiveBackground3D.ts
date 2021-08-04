import * as THREE from 'three';

import { InteractiveObject } from './InteractiveObject';

export class IntersectiveBackground3D extends InteractiveObject {
  _raycasterPlane: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  > | null = null;

  constructor() {
    super();
  }

  _drawRaycasterPlane() {
    this._raycasterPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      new THREE.MeshBasicMaterial(),
    );

    this.add(this._raycasterPlane);
  }

  getIntersectPoint(
    x: number,
    y: number,
    raycaster: THREE.Raycaster,
    camera: THREE.Camera,
  ) {
    raycaster.setFromCamera({ x, y }, camera);

    if (this._raycasterPlane) {
      const intersects = raycaster.intersectObjects(
        [this._raycasterPlane],
        true,
      );
      if (intersects[0]) {
        return intersects[0].point;
      }
    }

    return null;
  }

  setPlaneDepth(value: number) {
    if (this._raycasterPlane) {
      this._raycasterPlane.position.z = value;
    }
  }

  init() {
    this._drawRaycasterPlane();
  }

  destroy() {}
}

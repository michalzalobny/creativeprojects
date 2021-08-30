import * as THREE from 'three';

import { UpdateInfo } from '../types';
import { InteractiveObject3D } from './InteractiveObject3D';

export class IntersectiveBackground3D extends InteractiveObject3D {
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
  _geometry: THREE.PlaneGeometry | null = null;
  _material: THREE.MeshBasicMaterial | null = null;

  constructor() {
    super();
    this._drawRaycasterPlane();
  }

  _drawRaycasterPlane() {
    this._geometry = new THREE.PlaneBufferGeometry(5000, 5000);
    this._material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      opacity: 0,
    });

    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this.add(this._mesh);
  }

  getIntersectPoint(
    x: number,
    y: number,
    raycaster: THREE.Raycaster,
    camera: THREE.Camera,
  ) {
    raycaster.setFromCamera({ x, y }, camera);

    if (this._mesh) {
      const intersects = raycaster.intersectObjects([this._mesh], true);
      if (intersects[0]) {
        return intersects[0].point;
      }
    }

    return null;
  }

  setPlaneDepth(value: number) {
    if (this._mesh) {
      this._mesh.position.z = value;
    }
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
  }

  destroy() {
    super.destroy();
    this._geometry?.dispose();
    this._material?.dispose();
    if (this._mesh) {
      this.remove(this._mesh);
    }
  }
}

import * as THREE from 'three';

import { UpdateInfo } from './types';
export class StoryItem extends THREE.Object3D {
  _geometry: THREE.PlaneGeometry;
  _mesh: THREE.Mesh;
  _material: THREE.MeshBasicMaterial;

  constructor(geometry: THREE.PlaneGeometry) {
    super();

    this._geometry = geometry;

    this._material = new THREE.MeshBasicMaterial();
    this._mesh = new THREE.Mesh(this._geometry, this._material);

    this.add(this._mesh);
    this.init();
  }

  init() {}
  update(updateInfo: UpdateInfo) {}
  destroy() {}
}

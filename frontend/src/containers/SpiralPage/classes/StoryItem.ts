import * as THREE from 'three';

import { UpdateInfo } from './types';
export class StoryItem extends THREE.Object3D {
  container: THREE.Object3D;
  geometry: THREE.PlaneGeometry;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;

  constructor(geometry: THREE.PlaneGeometry) {
    super();
    this.container = new THREE.Object3D();
    this.geometry = geometry;

    this.material = new THREE.MeshBasicMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.container.add(this.mesh);

    this.add(this.container);
    this.init();
  }

  init() {}
  update(updateInfo: UpdateInfo) {}
  destroy() {}
}

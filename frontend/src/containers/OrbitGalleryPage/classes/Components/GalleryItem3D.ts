import * as THREE from 'three';

import { GalleryItemProps } from '../types';
import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  galleryItem: GalleryItemProps;
  domEl: HTMLElement;
}

export class GalleryItem3D extends MediaObject3D {
  _galleryItem: GalleryItemProps;
  _domEl: HTMLElement;
  _geometry: THREE.PlaneGeometry;

  constructor({ geometry, galleryItem, domEl }: Constructor) {
    super({ geometry });

    this._galleryItem = galleryItem;
    this._geometry = geometry;
    this._domEl = domEl;

    const geo = new THREE.BoxGeometry(100, 100, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geo, material);
    this.add(cube);
    this.setColliderName('galleryItem');
  }
}

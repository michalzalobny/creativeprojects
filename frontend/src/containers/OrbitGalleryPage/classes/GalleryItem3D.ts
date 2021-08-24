import * as THREE from 'three';

import { GalleryItemProps } from './types';
import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  galleryItem: GalleryItemProps;
}

export class GalleryItem3D extends MediaObject3D {
  _galleryItem: GalleryItemProps;

  constructor({ geometry, galleryItem }: Constructor) {
    super({ geometry });

    this._galleryItem = galleryItem;
  }
}

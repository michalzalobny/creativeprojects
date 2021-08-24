import * as THREE from 'three';

import { GalleryItemProps, UpdateInfo } from '../types';
import { MediaObject3D } from './MediaObject3D';

interface ScrollValues {
  x: number;
  y: number;
  strength: number;
}

interface Constructor {
  geometry: THREE.PlaneGeometry;
  galleryItem: GalleryItemProps;
  domEl: HTMLElement;
}

export class GalleryItem3D extends MediaObject3D {
  galleryItem: GalleryItemProps;
  _geometry: THREE.PlaneGeometry;
  _scrollValues = {
    x: 0,
    y: 0,
    strength: 0,
  };

  constructor({ geometry, galleryItem, domEl }: Constructor) {
    super({ geometry, domEl });

    this.galleryItem = galleryItem;
    this._geometry = geometry;

    this.setColliderName('galleryItem');
  }

  _updateBounds() {
    // const { currentY, currentX } = appObj.scroll.scrollObj;
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._updateScale();
    this._updateX(0);
    this._updateY(0);

    if (this._mesh) {
      this._mesh.material.uniforms.uPlaneSizes.value = [
        this._mesh.scale.x,
        this._mesh.scale.y,
      ];
    }
  }

  _updateScale() {
    if (this._mesh && this._domElBounds) {
      this._mesh.scale.x = this._domElBounds.width;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.x =
        -x +
        this._domElBounds.left -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2 -
        this._extra.x;
    }
  }

  _updateY(y: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.y =
        -y -
        this._domElBounds.top +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2;
    }
  }

  set scrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  onResize() {
    super.onResize();
    this._updateBounds();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._updateX(this._scrollValues.x);
    this._updateY(this._scrollValues.y);
  }
}

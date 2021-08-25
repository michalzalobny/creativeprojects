import * as THREE from 'three';

import { GalleryItemProps, UpdateInfo, ScrollValues } from '../types';
import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  galleryItem: GalleryItemProps;
  domEl: HTMLElement;
  galleryWrapperDomEl: HTMLElement;
}

export class GalleryItem3D extends MediaObject3D {
  static disappearOffset = 1; //Prevents from image disappearing too fast

  galleryItem: GalleryItemProps;
  _galleryWrapperDomEl: HTMLElement;
  _galleryWrapperDomElBounds: DOMRect | null = null;
  _domEl: HTMLElement;
  _domElBounds: DOMRect | null = null;
  _scrollValues: ScrollValues | null = null;
  _isBefore = false;
  _isAfter = false;

  constructor({
    geometry,
    galleryItem,
    domEl,
    galleryWrapperDomEl,
  }: Constructor) {
    super({ geometry });

    this.galleryItem = galleryItem;
    this._galleryWrapperDomEl = galleryWrapperDomEl;
    this._domEl = domEl;

    this.setColliderName('galleryItem');
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._galleryWrapperDomElBounds = this._galleryWrapperDomEl.getBoundingClientRect();
    this._updateScale();
    if (this._scrollValues) {
      this._updateX(this._scrollValues.current.x);
      this._updateY(this._scrollValues.current.y);
    }

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
        this._mesh.scale.y / 2 -
        this._extra.y;
    }
  }

  _handleInfinityScroll() {
    if (this._mesh && this._galleryWrapperDomElBounds && this._scrollValues) {
      // x axis
      const scaleX = this._mesh.scale.x / 2;
      if (this._scrollValues.direction.x === 'left') {
        const x = this._mesh.position.x + scaleX;

        if (
          x <
          (-this._rendererBounds.width / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.x -= this._galleryWrapperDomElBounds.width;
        }
      } else if (this._scrollValues.direction.x === 'right') {
        const x = this._mesh.position.x - scaleX;

        if (
          x >
          (this._rendererBounds.width / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.x += this._galleryWrapperDomElBounds.width;
        }
      }

      // y axis
      const scaleY = this._mesh.scale.y / 2;
      if (this._scrollValues.direction.y === 'up') {
        const y = this._mesh.position.y + scaleY;

        if (
          y <
          (-this._rendererBounds.height / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.y -= this._galleryWrapperDomElBounds.height;
        }
      } else if (this._scrollValues.direction.y === 'down') {
        const y = this._mesh.position.y - scaleY;

        if (
          y >
          (this._rendererBounds.height / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.y += this._galleryWrapperDomElBounds.height;
        }
      }
    }
  }

  _resetPosition() {
    this._extra.x = 0;
    this._extra.y = 0;
  }

  set scrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  onResize() {
    super.onResize();
    this._resetPosition();
    this._updateBounds();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    if (this._scrollValues) {
      this._updateX(this._scrollValues.current.x);
      this._updateY(this._scrollValues.current.y);
    }

    this._handleInfinityScroll();

    if (this._mesh && this._scrollValues) {
      this._mesh.material.uniforms.uStrength.value = this._scrollValues.strength.current;
    }
  }
}
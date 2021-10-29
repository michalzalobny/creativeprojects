import * as THREE from 'three';

import { ItemProps, UpdateInfo, ScrollValues } from '../types';
import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
  galleryDomEl: HTMLElement;
}

export class MediaHolder3D extends MediaObject3D {
  cardItem: ItemProps;
  groupIndex = 0;
  _domEl: HTMLElement;
  _domElBounds: DOMRect;
  _galleryDomEl: HTMLElement;
  _galleryDomElBounds: DOMRect;
  _scaleTranslate = { x: 0, y: 0 };
  _extra = { x: 0, y: 0 };
  _scrollValues: ScrollValues | null = null;
  _ratioWidth = 1;

  constructor({ galleryDomEl, geometry, cardItem, domEl }: Constructor) {
    super({ geometry });

    this.cardItem = cardItem;
    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    this._galleryDomEl = galleryDomEl;
    this._galleryDomElBounds = this._galleryDomEl.getBoundingClientRect();

    this.setColliderName('cardItem');
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._galleryDomElBounds = this._galleryDomEl.getBoundingClientRect();
    this._updateScale();

    if (this._mesh) {
      this._mesh.material.uniforms.uPlaneSizes.value = [
        this._mesh.scale.x,
        this._mesh.scale.y,
      ];
    }
  }

  _updateScale() {
    if (this._mesh) {
      this._mesh.scale.x = this._domElBounds.height * this._ratioWidth;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh) {
      this._mesh.position.x =
        -x +
        this._domElBounds.left -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2 -
        this._extra.x -
        this._scaleTranslate.x;
    }
  }

  _updateY(y: number) {
    if (this._mesh) {
      this._mesh.position.y =
        -y -
        this._domElBounds.top +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2 -
        this._extra.y -
        this._scaleTranslate.y;
    }
  }

  _resetPosition() {
    this._scaleTranslate.x = 0;
    this._scaleTranslate.y = 0;
    this._extra.x = 0;
    this._extra.y = 0;
  }

  _handleInfinityScroll() {
    if (this._mesh && this._galleryDomElBounds && this._scrollValues) {
      // x axis
      const scaleX = this._mesh.scale.x / 2;
      if (this._scrollValues.direction.x === 'left') {
        const x = this._mesh.position.x + scaleX;

        if (x < -this._rendererBounds.width / 2) {
          this._extra.x -= this._galleryDomElBounds.width;
        }
      } else if (this._scrollValues.direction.x === 'right') {
        const x = this._mesh.position.x - scaleX;

        if (x > this._rendererBounds.width / 2) {
          this._extra.x += this._galleryDomElBounds.width;
        }
      }

      // y axis
      const scaleY = this._mesh.scale.y / 2;
      if (this._scrollValues.direction.y === 'up') {
        const y = this._mesh.position.y + scaleY;

        if (y < -this._rendererBounds.height / 2) {
          this._extra.y -= this._galleryDomElBounds.height;
        }
      } else if (this._scrollValues.direction.y === 'down') {
        const y = this._mesh.position.y - scaleY;

        if (y > this._rendererBounds.height / 2) {
          this._extra.y += this._galleryDomElBounds.height;
        }
      }
    }
  }

  onMouseEnter() {
    super.onMouseEnter();
    document.body.style.cursor = 'pointer';
    this.dispatchEvent({ type: 'pointerover' });
  }

  onMouseLeave() {
    super.onMouseLeave();
    document.body.style.cursor = 'initial';
    this.dispatchEvent({ type: 'pointerleft' });
  }

  onResize() {
    this._resetPosition();
    this._updateBounds();
  }

  setScrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    if (this._scrollValues) {
      this._updateX(this._scrollValues.current.x);
      this._updateY(this._scrollValues.current.y);
      if (this._mesh)
        this._mesh.material.uniforms.uStrength.value = this._scrollValues.strength.current;
    }
    this._handleInfinityScroll();
  }

  set groupIndexValue(index: number) {
    this.groupIndex = index;
  }
}

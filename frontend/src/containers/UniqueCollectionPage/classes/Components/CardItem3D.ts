import * as THREE from 'three';

import { CardItemProps, UpdateInfo } from '../types';
import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: CardItemProps;
  domEl: HTMLElement;
}

export class CardItem3D extends MediaObject3D {
  cardItem: CardItemProps;
  _domEl: HTMLElement;
  _domElBounds: DOMRect | null = null;
  _extraTranslate = { x: 0, y: 0 };
  _scaleTranslate = { x: 0, y: 0 };
  _stackTranslateY = 0;

  constructor({ geometry, cardItem, domEl }: Constructor) {
    super({ geometry });

    this.cardItem = cardItem;
    this._domEl = domEl;

    this.setColliderName('cardItem');
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._updateScale();

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
        this._extraTranslate.x -
        this._scaleTranslate.x;
    }
  }

  _updateY(y: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.y =
        -y -
        this._domElBounds.top +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2 -
        this._extraTranslate.y -
        this._scaleTranslate.y -
        this._stackTranslateY;
    }
  }

  _resetPosition() {
    this._extraTranslate.x = 0;
    this._extraTranslate.y = 0;
  }

  onResize() {
    super.onResize();
    this._resetPosition();
    this._updateBounds();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._updateX(0);
    this._updateY(0);
  }

  set cardScale(value: number) {
    if (this._domElBounds && this._mesh) {
      this._mesh.scale.x = this._domElBounds.width * value;
      this._mesh.scale.y = this._domElBounds.height * value;

      this._scaleTranslate.x =
        -(this._domElBounds.width - this._mesh.scale.x) / 2;
      this._scaleTranslate.y =
        (this._domElBounds.height - this._mesh.scale.y) / 2;
    }
  }

  set stackTranslateY(value: number) {
    if (this._domElBounds) {
      this._stackTranslateY = value * this._domElBounds.height * 0.1;
    }
  }
}

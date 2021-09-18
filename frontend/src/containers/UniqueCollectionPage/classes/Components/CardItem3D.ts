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
  _domElBounds: DOMRect;
  _extraTranslate = { x: 0, y: 0 };
  _scaleTranslate = { x: 0, y: 0 };
  _currentOffsetX = 0;
  _randomValue = 1;
  _readyProgress = 0;

  constructor({ geometry, cardItem, domEl }: Constructor) {
    super({ geometry });

    this.cardItem = cardItem;
    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    if (this._mesh) {
      this._mesh.position.z = this.cardItem.itemKeyReverse * 0.001;
    }

    this._randomValue = Math.random() > 0.5 ? 1 : -1;

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
    if (this._mesh) {
      this._mesh.scale.x = this._domElBounds.width;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh) {
      this._mesh.position.x =
        -x +
        this._domElBounds.left * this._readyProgress -
        (this._rendererBounds.width / 2) * this._readyProgress +
        (this._mesh.scale.x / 2) * this._readyProgress -
        this._extraTranslate.x -
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
        this._extraTranslate.y -
        this._scaleTranslate.y;
    }
  }

  _handlePositioning() {
    if (this._mesh) {
      const amplitude = this._mesh.scale.x * 0.2;
      const frequency = 1;

      this._mesh.rotation.z =
        this._randomValue *
        -0.08 *
        Math.PI *
        Math.sin((this._mesh.position.x * 0.001) / frequency);

      this._mesh.position.y =
        amplitude *
        Math.sin(this.cardItem.itemKey / frequency) *
        this._readyProgress;
    }
  }

  _resetPosition() {
    this._extraTranslate.x = 0;
    this._extraTranslate.y = 0;
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
    super.onResize();
    this._resetPosition();
    this._updateBounds();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._updateX(this._currentOffsetX);
    this._handlePositioning();
  }

  set currentOffsetX(value: number) {
    this._currentOffsetX = value;
  }
}

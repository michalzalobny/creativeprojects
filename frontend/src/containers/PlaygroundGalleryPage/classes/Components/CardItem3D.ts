import * as THREE from 'three';

import {
  CardItemProps,
  UpdateInfo,
  AnimateProps,
  ScrollValues,
} from '../types';
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
  _randomValue = 1;
  _rotationProgress = 0;
  _isAnimatedIn = false;
  _scrollValues: ScrollValues | null = null;
  isRotated = false;

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

  _positionRandomly() {
    const position = this._getRandomPosition();

    this._extraTranslate.x = position.x;
    this._extraTranslate.y = position.y;
  }

  _getRandomPosition(): { x: number; y: number } {
    if (!this._mesh) {
      return { x: 0, y: 0 };
    }

    const randomX = Math.random() > 0.5 ? 1 : -1;
    const randomY = Math.random() > 0.5 ? 1 : -1;

    const x = ((Math.random() * this._rendererBounds.width) / 2) * randomX;
    const y = ((Math.random() * this._rendererBounds.height) / 2) * randomY;

    const minVertical = this._rendererBounds.height * 0.5 * 0.5;
    const maxVertical = this._rendererBounds.height * 0.5;
    const minHorizontal = this._rendererBounds.width * 0.5 * 0.5;
    const maxHorizontal = this._rendererBounds.width * 0.5;

    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (
      (absX < minHorizontal || absX > maxHorizontal) &&
      (absY < minVertical || absY > maxVertical)
    ) {
      return this._getRandomPosition();
    }

    return { x: x * 1.1, y: y * 1.1 };
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
        this._domElBounds.left -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2 -
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

  _resetPosition() {
    this._scaleTranslate.x = 0;
    this._scaleTranslate.y = 0;
    this._extraTranslate.x = 0;
    this._extraTranslate.y = 0;
    this._positionRandomly();
  }

  animateOpacity(props: AnimateProps) {}

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

  setScrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._updateX(0);
    this._updateY(0);
  }
}

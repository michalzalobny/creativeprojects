import * as THREE from 'three';

import { UpdateInfo } from '../types';

export type ColliderName = 'cardItem';

export class InteractiveObject3D extends THREE.Object3D {
  colliderName: ColliderName | null = null;
  _isHovered = false;

  constructor() {
    super();
  }

  setColliderName(name: ColliderName) {
    this.colliderName = name;
  }

  onMouseEnter() {
    this._isHovered = true;
    this.dispatchEvent({ type: 'mouseenter' });
  }

  onMouseLeave() {
    this._isHovered = false;
    this.dispatchEvent({ type: 'mouseleave' });
  }

  onClick() {
    this.dispatchEvent({ type: 'click' });
  }

  update(updateInfo: UpdateInfo) {}

  destroy() {}
}

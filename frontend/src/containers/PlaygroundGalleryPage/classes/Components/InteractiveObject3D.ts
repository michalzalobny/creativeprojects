import * as THREE from 'three';

import { appState } from '../../appState';
import { UpdateInfo } from '../types';

export type ColliderName = 'cardItem';

export class InteractiveObject3D extends THREE.Object3D {
  static visibilityThreshold = 0;

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
    //Stop the actions if the app is not active or modal is currently opened
    if (appState.app && !appState.app.isActive) return;
    if (appState.app && appState.app.isModalOpened) return;

    this.dispatchEvent({ type: 'click' });
  }

  update(updateInfo: UpdateInfo) {}

  destroy() {}
}

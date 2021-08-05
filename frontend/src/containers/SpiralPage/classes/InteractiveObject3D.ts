import * as THREE from 'three';

export type ColliderName = 'storyItem';

export class InteractiveObject3D extends THREE.Object3D {
  colliderName: ColliderName | null = null;
  _isHovered = false;

  setColliderName(name: ColliderName) {
    this.colliderName = name;
  }

  onMouseOver() {
    this._isHovered = true;
    this.dispatchEvent({ type: 'mouseover' });
  }

  onMouseOut() {
    this._isHovered = false;
    this.dispatchEvent({ type: 'mouseout' });
  }

  onClick() {
    this.dispatchEvent({ type: 'click' });
  }
}

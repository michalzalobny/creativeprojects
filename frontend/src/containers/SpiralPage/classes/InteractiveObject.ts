import * as THREE from 'three';

export type ColliderName = 'storyItem' | 'backgroundPlane';

export class InteractiveObject extends THREE.Object3D {
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
}

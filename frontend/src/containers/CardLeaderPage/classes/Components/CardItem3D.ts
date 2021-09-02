import * as THREE from 'three';

import {
  FollowItemProps,
  UpdateInfo,
  MouseValues,
  Coords,
  Bounds,
  TextureItem,
} from '../types';
import { lerp } from '../utils/lerp';
import { MediaObject3D } from './MediaObject3D';
import { getRandFloat } from '../utils/getRand';
import { CardItem3DAnimated } from './CardItem3DAnimated';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  followItem: FollowItemProps;
  domEl: HTMLElement;
}

export class CardItem3D extends MediaObject3D {
  static defaultOpacity = 1;
  static depthMultiplier = 0.001;

  followItem: FollowItemProps;
  _domEl: HTMLElement;
  _domElBounds: DOMRect;
  _childEl: HTMLElement;
  _childElBounds: DOMRect;
  _extra = { x: 0, y: 0 };
  _extraScaleTranslate = { x: 0, y: 0 };
  _extraTranslate = { x: 0, y: 0 };
  _lerpEase = CardItem3DAnimated.defaultLerp;
  _lerpFirst = 0.2;
  _lerpQuotient = 0.85;
  _shouldFollow = true;
  _isFollowing = false;
  _followProgress = 0;
  _mouseValues: MouseValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    strength: {
      current: 0,
      target: 0,
    },
    autoSpeed: {
      x: 0,
      y: 0,
    },
  };

  constructor({ geometry, followItem, domEl }: Constructor) {
    super({ geometry });

    this.followItem = followItem;

    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    this._childEl = this._domEl.children[0] as HTMLElement;
    this._childElBounds = this._childEl.getBoundingClientRect();

    this.setColliderName('cardItem');

    this.resetDepth();
    this.resetLerp();
  }

  _positionRandomly() {
    const position = this._getRandomPosition();
    this._extraTranslate.x = position.x;
    this._extraTranslate.y = position.y;
  }

  _getRandomPosition(): { x: number; y: number } {
    const randomValueX = getRandFloat(-1, 1);
    const signX = randomValueX > 0 ? 1 : -1;

    const randomValueY = getRandFloat(-1, 1);
    const signY = randomValueY > 0 ? 1 : -1;

    const x =
      (randomValueX * this._rendererBounds.width) / 2 -
      this._domElBounds.width * signX;
    const y =
      (randomValueY * this._rendererBounds.height) / 2 -
      this._domElBounds.height * signY;

    if (
      Math.abs(x) <= this._rendererBounds.width / 5 &&
      Math.abs(y) <= this._rendererBounds.height / 4
    ) {
      return this._getRandomPosition();
    }

    return { x, y };
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._childElBounds = this._childEl.getBoundingClientRect();

    this._updateScale();

    if (this._mouseValues) {
      this._updateX(this._mouseValues.current.x);
      this._updateY(this._mouseValues.current.y);
    }

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
        this._extra.x -
        this._extraScaleTranslate.x -
        this._extraTranslate.x * (1 - this._followProgress) +
        this._mouseValues.current.x * (1 - this._followProgress);
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
        this._extraScaleTranslate.y -
        this._extraTranslate.y * (1 - this._followProgress) +
        this._mouseValues.current.y * (1 - this._followProgress);
    }
  }

  _rotateMeshRandomly() {
    if (this._mesh) {
      this._mesh.rotation.z = getRandFloat(-Math.PI, Math.PI) * 0.03;
    }
  }

  _resetPosition() {
    this._extra.x = 0;
    this._extra.y = 0;
    this._extraScaleTranslate.x = 0;
    this._extraScaleTranslate.y = 0;
    this._extraTranslate.x = 0;
    this._extraTranslate.y = 0;
    this._positionRandomly();
  }

  _updateMouseValues(updateInfo: UpdateInfo) {
    if (!this._mouseValues) {
      return;
    }

    //Update strength value
    this._mouseValues.strength.current = lerp(
      this._mouseValues.strength.current,
      this._mouseValues.strength.target,
      this._lerpEase * updateInfo.slowDownFactor,
    );

    const deltaX = this._mouseValues.current.x - this._mouseValues.last.x;
    const deltaY = this._mouseValues.current.y - this._mouseValues.last.y;

    this._mouseValues.strength.target = Math.sqrt(
      deltaX * deltaX + deltaY * deltaY,
    );

    this._mouseValues.last.x = this._mouseValues.current.x;
    this._mouseValues.last.y = this._mouseValues.current.y;

    //Lerp 2D mouse coords
    this._mouseValues.current.x = lerp(
      this._mouseValues.current.x,
      this._mouseValues.target.x,
      this._lerpEase * updateInfo.slowDownFactor,
    );
    this._mouseValues.current.y = lerp(
      this._mouseValues.current.y,
      this._mouseValues.target.y,
      this._lerpEase * updateInfo.slowDownFactor,
    );
  }

  resetDepth() {
    if (this._mesh)
      this._mesh.position.z = this.followItem.key * CardItem3D.depthMultiplier;
  }

  boostDepth() {
    if (this._mesh)
      this._mesh.position.z =
        (this.followItem.itemsAmount + 1) * CardItem3D.depthMultiplier;
  }

  resetLerp() {
    this._lerpEase =
      this._lerpFirst *
      Math.pow(this._lerpQuotient, this.followItem.reverseKey - 1);
  }

  boostLerp() {
    this._lerpEase =
      this._lerpFirst + this._lerpFirst * (1 - this._lerpQuotient);
  }

  onMouseEnter() {
    super.onMouseEnter();

    if (!this._isFollowing && this._followProgress < 0.2) this.boostDepth();
  }

  onMouseLeave() {
    super.onMouseLeave();
    if (!this._isFollowing && this._followProgress < 0.2) this.resetDepth();
  }

  destroy() {
    super.destroy();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._updateX(this._mouseValues.current.x);
    this._updateY(this._mouseValues.current.y);
    this._updateMouseValues(updateInfo);

    if (this._mesh) {
      this._mesh.material.uniforms.uStrength.value =
        this._mouseValues.strength.current * this._followProgress;
    }
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._updateBounds();
    this._resetPosition();
  }

  set textureItem(textureItem: TextureItem) {
    super.textureItem = textureItem;
    this._updateBounds();
  }

  set targetMouse({ x, y }: Coords) {
    if (!this._shouldFollow) {
      return;
    }

    this._mouseValues.target.x =
      -x - (-this._domElBounds.left - this._domElBounds.width * 0.5);
    this._mouseValues.target.y =
      y - this._domElBounds.top - this._domElBounds.height * 0.5;
  }
}

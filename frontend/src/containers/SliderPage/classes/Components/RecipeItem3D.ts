import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { RecipieItemProps, UpdateInfo, ScrollValues } from '../types';
import { MediaObject3D } from './MediaObject3D';
import { getRandFloat } from '../utils/getRand';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  recipieItem: RecipieItemProps;
  domEl: HTMLElement;
}

interface AnimateOpacity {
  duration: number;
  delay: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class RecipeItem3D extends MediaObject3D {
  static disappearOffset = 1.3; //Prevents from image disappearing too fast
  static defaultOpacity = 0.65;

  recipieItem: RecipieItemProps;
  _domEl: HTMLElement;
  _domElBounds: DOMRect;
  _childEl: HTMLElement;
  _childElBounds: DOMRect;
  _scrollValues: ScrollValues | null = null;
  _isBefore = false;
  _isAfter = false;
  _animateInTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  isAnimatedIn = false;
  _extra = { x: 0, y: 0 };
  _extraScale = { x: 0, y: 0 };

  constructor({ geometry, recipieItem, domEl }: Constructor) {
    super({ geometry });

    this.recipieItem = recipieItem;
    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    this._childEl = this._domEl.children[0] as HTMLElement;
    this._childElBounds = this._childEl.getBoundingClientRect();

    this.setColliderName('recipeItem');
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._childElBounds = this._childEl.getBoundingClientRect();
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
        this._extraScale.x;
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
        this._extraScale.y;
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
  }

  set scrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  animateOpacity({
    destination,
    duration,
    delay,
    easing = TWEEN.Easing.Linear.None,
  }: AnimateOpacity) {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        if (!this._mesh) {
          return;
        }

        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  animateIn(delay: number) {
    if (!this._mesh) {
      return;
    }

    if (this._animateInTween) {
      this._animateInTween.stop();
    }

    this._rotateMeshRandomly();

    const startX = this._childElBounds.width;
    const startY = this._childElBounds.height;

    const destinationX = this._mesh.scale.x;
    const destinationY = this._mesh.scale.y;

    const duration = 2800;

    this.animateOpacity({
      destination: RecipeItem3D.defaultOpacity,
      duration,
      delay,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this._animateInTween = new TWEEN.Tween({
      x: startX,
      y: startY,
    })
      .to({ x: destinationX, y: destinationY }, duration)
      .delay(delay)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraScale.x = -(destinationX - obj.x) / 2;
          this._extraScale.y = (destinationY - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {
        this.isAnimatedIn = true;
      });

    this._animateInTween.start();
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

    if (this._mesh && this._scrollValues) {
      this._mesh.material.uniforms.uStrength.value =
        this._scrollValues.strength.current * 0.7;
    }
  }
}

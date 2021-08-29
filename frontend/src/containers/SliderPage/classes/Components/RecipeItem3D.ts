import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { RecipieItemProps, UpdateInfo, MouseValues, Coords } from '../types';
import { lerp } from '../utils/lerp';
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
  static disappearOffset = 1.03;
  static defaultOpacity = 1;

  recipieItem: RecipieItemProps;
  _domEl: HTMLElement;
  _domElBounds: DOMRect;
  _childEl: HTMLElement;
  _childElBounds: DOMRect;
  _mouseValues: MouseValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    direction: { x: 'left', y: 'up' },
    strength: {
      current: 0,
      target: 0,
    },
  };
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
  _lerpEase: number;
  _lerpFirst = 0.1;
  _lerpQuotient = 0.88;
  _lerpLast = 20;

  constructor({ geometry, recipieItem, domEl }: Constructor) {
    super({ geometry });

    this.recipieItem = recipieItem;
    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    this._childEl = this._domEl.children[0] as HTMLElement;
    this._childElBounds = this._childEl.getBoundingClientRect();

    this.setColliderName('recipeItem');

    this._lerpEase =
      this._lerpFirst * Math.pow(this._lerpQuotient, this.recipieItem.key - 1);

    // this._lerpEase =
    //   (this.recipieItem.key * (this._lerpLast - this._lerpFirst)) / 20 +
    //   this._lerpFirst;
    // this._lerpEase *= 0.01; //Fixes approximation issue (We could specify 0.22 and 0.01 in _lerpFirst/_lerpLast)
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
    this._extraScale.x = 0;
    this._extraScale.y = 0;
  }

  _resetScrollValues() {
    //Reset scroll values
    this._mouseValues.current.x = 0;
    this._mouseValues.current.y = 0;

    this._mouseValues.target.x = 0;
    this._mouseValues.target.y = 0;

    this._mouseValues.last.x = 0;
    this._mouseValues.last.y = 0;

    this._mouseValues.strength.current = 0;
    this._mouseValues.strength.target = 0;
  }

  _handleInfinityScroll() {
    if (this._mesh && this._mouseValues) {
      // x axis
      const scaleX = this._mesh.scale.x / 2;
      if (this._mouseValues.direction.x === 'left') {
        const x = this._mesh.position.x + scaleX;

        if (
          x <
          (-this._rendererBounds.width / 2) * RecipeItem3D.disappearOffset
        ) {
          this._extra.x -=
            (this._rendererBounds.width + scaleX * 2) *
            RecipeItem3D.disappearOffset;
          this._rotateMeshRandomly();
        }
      } else if (this._mouseValues.direction.x === 'right') {
        const x = this._mesh.position.x - scaleX;

        if (
          x >
          (this._rendererBounds.width / 2) * RecipeItem3D.disappearOffset
        ) {
          this._extra.x +=
            (this._rendererBounds.width + scaleX * 2) *
            RecipeItem3D.disappearOffset;
          this._rotateMeshRandomly();
        }
      }

      // y axis
      const scaleY = this._mesh.scale.y / 2;
      if (this._mouseValues.direction.y === 'up') {
        const y = this._mesh.position.y + scaleY;

        if (
          y <
          (-this._rendererBounds.height / 2) * RecipeItem3D.disappearOffset
        ) {
          this._extra.y -=
            (this._rendererBounds.height + scaleY * 2) *
            RecipeItem3D.disappearOffset;
          this._rotateMeshRandomly();
        }
      } else if (this._mouseValues.direction.y === 'down') {
        const y = this._mesh.position.y - scaleY;

        if (
          y >
          (this._rendererBounds.height / 2) * RecipeItem3D.disappearOffset
        ) {
          this._extra.y +=
            (this._rendererBounds.height + scaleY * 2) *
            RecipeItem3D.disappearOffset;
          this._rotateMeshRandomly();
        }
      }
    }
  }

  _updateScrollValues(updateInfo: UpdateInfo) {
    if (!this._mouseValues) {
      return;
    }

    //Update scroll direction
    if (this._mouseValues.current.x > this._mouseValues.last.x) {
      this._mouseValues.direction.x = 'left';
    } else {
      this._mouseValues.direction.x = 'right';
    }

    if (this._mouseValues.current.y > this._mouseValues.last.y) {
      this._mouseValues.direction.y = 'up';
    } else {
      this._mouseValues.direction.y = 'down';
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

  set targetMouse({ x, y }: Coords) {
    this._mouseValues.target.x =
      -x - (-this._domElBounds.left - this._domElBounds.width * 0.5);
    this._mouseValues.target.y =
      y - this._domElBounds.top - this._domElBounds.height * 0.5;
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

    this._updateScrollValues(updateInfo);

    this._updateX(this._mouseValues.current.x);
    this._updateY(this._mouseValues.current.y);

    this._handleInfinityScroll();

    if (this._mesh) {
      this._mesh.material.uniforms.uStrength.value =
        this._mouseValues.strength.current * 0.7;
    }
  }
}

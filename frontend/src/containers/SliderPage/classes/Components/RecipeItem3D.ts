import * as THREE from 'three';
import TWEEN, { Tween, Easing } from '@tweenjs/tween.js';

import { RecipieItemProps, UpdateInfo, MouseValues, Coords } from '../types';
import { lerp } from '../utils/lerp';
import { MediaObject3D } from './MediaObject3D';
import { getRandFloat } from '../utils/getRand';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  recipieItem: RecipieItemProps;
  domEl: HTMLElement;
  keyPosition: number;
}

interface AnimateOpacity {
  duration: number;
  delay: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class RecipeItem3D extends MediaObject3D {
  static disappearOffset = 1.05;
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
    autoSpeed: {
      x: 0,
      y: 0,
    },
  };
  _isBefore = false;
  _isAfter = false;
  _animateInTween: Tween<{
    x: number;
    y: number;
    progress: number;
  }> | null = null;
  _scaleItemTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _followTween: Tween<{ progress: number }> | null = null;
  _dropOutTween: Tween<{ progress: number; rotation: number }> | null = null;

  _isDroppingOut = false;
  _extra = { x: 0, y: 0 };
  _extraScale = { x: 0, y: 0 };
  _extraTranslate = { x: 0, y: 0 };
  _lerpEase = { current: 0.01, target: 0.01 };
  _lerpFirst = 0.2;
  _lerpQuotient = 0.85;
  _lerpLast = 0.1;
  _shouldFollow = true;
  _followProgress = 0;
  _keyPosition: number;

  constructor({ keyPosition, geometry, recipieItem, domEl }: Constructor) {
    super({ geometry });

    this.recipieItem = recipieItem;
    this._domEl = domEl;
    this._domElBounds = this._domEl.getBoundingClientRect();

    this._childEl = this._domEl.children[0] as HTMLElement;
    this._childElBounds = this._childEl.getBoundingClientRect();

    this.setColliderName('recipeItem');

    this._keyPosition = keyPosition;

    // this._lerpEase =
    //   this._lerpFirst * Math.pow(this._lerpQuotient, this._keyPosition - 1);

    if (this._mesh) {
      this._mesh.position.z = -this._keyPosition * 0.1;
    }

    // this._lerpEase =
    //   (this.recipieItem.key * (this._lerpLast - this._lerpFirst)) / 20 +
    //   this._lerpFirst;
    // this._lerpEase *= 0.01; //Fixes approximation issue (We could specify 0.22 and 0.01 in _lerpFirst/_lerpLast)
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
      Math.abs(y) <= this._rendererBounds.height / 9
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
        this._extraScale.x -
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
        this._extraScale.y -
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
    this._extraScale.x = 0;
    this._extraScale.y = 0;
    this._positionRandomly();
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
    if (this._mesh && this._mouseValues && !this._isDroppingOut) {
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

  _updateMouseValues(updateInfo: UpdateInfo) {
    if (!this._mouseValues) {
      return;
    }

    // this._mouseValues.target.y += this._mouseValues.autoSpeed.y;
    // this._mouseValues.target.x += this._mouseValues.autoSpeed.x;

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
      this._lerpEase.current * updateInfo.slowDownFactor,
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
      this._lerpEase.current * updateInfo.slowDownFactor,
    );
    this._mouseValues.current.y = lerp(
      this._mouseValues.current.y,
      this._mouseValues.target.y,
      this._lerpEase.current * updateInfo.slowDownFactor,
    );
  }

  _stopTweens() {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }
    if (this._animateInTween) {
      this._animateInTween.stop();
    }
    if (this._scaleItemTween) {
      this._scaleItemTween.stop();
    }
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

  animateFollow(destination: number, delay: number, duration: number) {
    if (this._followTween) {
      this._followTween.stop();
    }

    const isReverted = destination === 0;

    this._followTween = new TWEEN.Tween({ progress: this._followProgress })
      .to({ progress: destination }, duration)

      .easing(
        isReverted
          ? TWEEN.Easing.Exponential.InOut
          : TWEEN.Easing.Sinusoidal.InOut,
      )
      .delay(delay)
      .onUpdate(obj => {
        if (destination === 0) {
          // if (obj.progress < 0.3) {
          this._shouldFollow = false;
          // }
        } else {
          this._shouldFollow = true;
        }

        // if (destination === 0) {
        //   this._extraFollowTranslate.x =
        //     this._mouseValues.current.x * obj.progress;
        //   this._extraFollowTranslate.y =
        //     -this._mouseValues.current.y * obj.progress;
        // }

        this._followProgress = obj.progress;
      })
      .onComplete(() => {
        this._shouldFollow = true;
      });

    this._followTween.start();
  }

  animateDropOut(delay: number) {
    if (!this._mesh || this._isDroppingOut) {
      return;
    }

    if (this._dropOutTween) {
      this._dropOutTween.stop();
    }

    this._isDroppingOut = true;

    const start = this._mesh.rotation.z;
    const destination = Math.PI * 2 + start;

    this._dropOutTween = new TWEEN.Tween({ rotation: start, progress: 0 })
      .to({ rotation: destination, progress: 1 }, 700)

      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .delay(delay)
      .onUpdate(obj => {
        // this._extraScale.y =
        //   -Math.sin(obj.progress * Math.PI) * this._domElBounds.height * 1.3;

        if (this._mesh) {
          this._mesh.rotation.z = obj.rotation;
        }
      })
      .onComplete(() => {
        if (this._mesh) {
          this._mesh.rotation.z = start;
        }
        this._isDroppingOut = false;
      });

    this._dropOutTween.start();
  }

  scaleItem(
    destinationX: number,
    destinationY: number,
    delay: number,
    duration: number,
    easing: (amount: number) => number,
  ) {
    if (!this._mesh) {
      return;
    }

    this._stopTweens();

    const startX = this._mesh.scale.x;
    const startY = this._mesh.scale.y;

    this._scaleItemTween = new TWEEN.Tween({
      x: startX,
      y: startY,
    })
      .to({ x: destinationX, y: destinationY }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraScale.x = -(this._domElBounds.width - obj.x) / 2;
          this._extraScale.y = (this._domElBounds.height - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {});

    this._scaleItemTween.start();
  }

  animateIn() {
    if (!this._mesh) {
      return;
    }

    if (this._animateInTween) {
      this._animateInTween.stop();
    }

    this._rotateMeshRandomly();

    const progress = 0;

    const positionStart = this._getRandomPosition();

    const startX = this._childElBounds.width;
    const startY = this._childElBounds.height;

    const destinationX = this._mesh.scale.x;
    const destinationY = this._mesh.scale.y;

    const duration = 1400;

    this.animateOpacity({
      destination: RecipeItem3D.defaultOpacity,
      duration: duration * 0.9,
      delay: 0,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this._animateInTween = new TWEEN.Tween({
      x: startX,
      y: startY,
      progress,
    })
      .to({ x: destinationX, y: destinationY, progress: 1 }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraScale.x = -(destinationX - obj.x) / 2;
          this._extraScale.y = (destinationY - obj.y) / 2;

          this._extraTranslate.x = obj.progress * positionStart.x;
          this._extraTranslate.y = obj.progress * positionStart.y;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {});

    this._animateInTween.start();
  }

  toggleFollowing(value: boolean) {
    if (value) {
      this._lerpEase.target =
        this._lerpFirst * Math.pow(this._lerpQuotient, this._keyPosition - 1);

      this.scaleItem(
        this._domElBounds.width * 2.4,
        this._domElBounds.height * 2.4,
        this._keyPosition * 5,
        1300,
        TWEEN.Easing.Exponential.InOut,
      );
      this.animateFollow(1, this._keyPosition * 5, 1000);
    } else {
      this._lerpEase.target = 0.01;
      this._mouseValues.target.x = this._mouseValues.current.x;
      this._mouseValues.target.y = this._mouseValues.current.y;
      this._mouseValues.last.x = this._mouseValues.current.x;
      this._mouseValues.last.y = this._mouseValues.current.y;

      this.scaleItem(
        this._domElBounds.width,
        this._domElBounds.height,
        this._keyPosition * 20,
        1300,
        TWEEN.Easing.Sinusoidal.InOut,
      );
      this.animateFollow(0, this._keyPosition * 20, 1600);
    }
  }

  destroy() {
    super.destroy();
    this.dispatchEvent({ type: 'destroyed' });
  }

  onResize() {
    super.onResize();
    this._updateBounds();
    this._resetPosition();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._updateMouseValues(updateInfo);
    this._updateX(this._mouseValues.current.x);
    this._updateY(this._mouseValues.current.y);
    this._handleInfinityScroll();

    //Animate lerp
    this._lerpEase.current = lerp(
      this._lerpEase.current,
      this._lerpEase.target,
      0.01 * updateInfo.slowDownFactor,
    );

    if (this._mesh) {
      this._mesh.material.uniforms.uStrength.value =
        this._mouseValues.strength.current * this._followProgress;
    }
  }
}

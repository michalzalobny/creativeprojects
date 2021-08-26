import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { GalleryItemProps, UpdateInfo, ScrollValues } from '../types';
import { MediaObject3D } from './MediaObject3D';
import { getRandFloat } from '../utils/getRand';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  galleryItem: GalleryItemProps;
  domEl: HTMLElement;
  galleryWrapperDomEl: HTMLElement;
}

interface AnimateOpacity {
  duration: number;
  delay: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class GalleryItem3D extends MediaObject3D {
  static disappearOffset = 1.3; //Prevents from image disappearing too fast
  static defaultOpacity = 0.65;

  galleryItem: GalleryItemProps;
  _galleryWrapperDomEl: HTMLElement;
  _galleryWrapperDomElBounds: DOMRect | null = null;
  _domEl: HTMLElement;
  _domElBounds: DOMRect | null = null;
  _scrollValues: ScrollValues | null = null;
  _isBefore = false;
  _isAfter = false;
  _animateInTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  isAnimatedIn = false;

  constructor({
    geometry,
    galleryItem,
    domEl,
    galleryWrapperDomEl,
  }: Constructor) {
    super({ geometry });

    this.galleryItem = galleryItem;
    this._galleryWrapperDomEl = galleryWrapperDomEl;
    this._domEl = domEl;

    this.setColliderName('galleryItem');
  }

  _updateBounds() {
    this._domElBounds = this._domEl.getBoundingClientRect();
    this._galleryWrapperDomElBounds = this._galleryWrapperDomEl.getBoundingClientRect();
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
    if (this._mesh && this._domElBounds) {
      this._mesh.scale.x = this._domElBounds.width;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.x =
        -x +
        this._domElBounds.left -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2 -
        this._extra.x;
    }
  }

  _updateY(y: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.y =
        -y -
        this._domElBounds.top +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2 -
        this._extra.y;
    }
  }

  _rotateMeshRandomly() {
    if (this._mesh) {
      this._mesh.rotation.z = getRandFloat(-Math.PI, Math.PI) * 0.03;
    }
  }

  _handleInfinityScroll() {
    if (this._mesh && this._galleryWrapperDomElBounds && this._scrollValues) {
      // x axis
      const scaleX = this._mesh.scale.x / 2;
      if (this._scrollValues.direction.x === 'left') {
        const x = this._mesh.position.x + scaleX;

        if (
          x <
          (-this._rendererBounds.width / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.x -= this._galleryWrapperDomElBounds.width;
          this._rotateMeshRandomly();
        }
      } else if (this._scrollValues.direction.x === 'right') {
        const x = this._mesh.position.x - scaleX;

        if (
          x >
          (this._rendererBounds.width / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.x += this._galleryWrapperDomElBounds.width;
          this._rotateMeshRandomly();
        }
      }

      // y axis
      const scaleY = this._mesh.scale.y / 2;
      if (this._scrollValues.direction.y === 'up') {
        const y = this._mesh.position.y + scaleY;

        if (
          y <
          (-this._rendererBounds.height / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.y -= this._galleryWrapperDomElBounds.height;
          this._rotateMeshRandomly();
        }
      } else if (this._scrollValues.direction.y === 'down') {
        const y = this._mesh.position.y - scaleY;

        if (
          y >
          (this._rendererBounds.height / 2) * GalleryItem3D.disappearOffset
        ) {
          this._extra.y += this._galleryWrapperDomElBounds.height;
          this._rotateMeshRandomly();
        }
      }
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

    const startX = this._mesh.scale.x * 1.9;
    const startY = this._mesh.scale.y * 1.9;

    const duration = 2800;

    this.animateOpacity({
      destination: GalleryItem3D.defaultOpacity,
      duration,
      delay,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this._animateInTween = new TWEEN.Tween({
      x: startX,
      y: startY,
    })
      .to({ x: this._mesh.scale.x, y: this._mesh.scale.y }, duration)
      .delay(delay)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        if (this._mesh) {
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

    this._handleInfinityScroll();

    if (this._mesh && this._scrollValues) {
      this._mesh.material.uniforms.uStrength.value = this._scrollValues.strength.current;
    }
  }
}

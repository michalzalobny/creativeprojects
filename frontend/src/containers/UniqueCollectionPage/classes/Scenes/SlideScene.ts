import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { UpdateInfo, Bounds, AnimateProps } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { ItemScene } from './ItemScene';
import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class SlideScene extends ItemScene {
  static lerpEase = 0.07;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 2;
  static timeToSnap = 1200;

  _scroll: Scroll;
  _offsetX = {
    last: 0,
    current: 0,
    target: 0,
  };
  _snapTimeoutId: ReturnType<typeof setTimeout> | null = null;
  _activeIndex = 0;
  _targetIndex = 0;
  _scrollBoundary = 1;
  _goToIndexTween: Tween<{ progress: number }> | null = null;
  _isAutoScrolling = false;

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _performSnap = () => {
    this.animateToIndex({ destination: this._targetIndex });
  };

  _applyScrollX = (x: number) => {
    if (this._isAutoScrolling) {
      if (this._snapTimeoutId) {
        clearTimeout(this._snapTimeoutId);
      }
      return;
    }

    let newOffset = this._offsetX.target - x;

    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset >= this._scrollBoundary) {
      newOffset = this._scrollBoundary;
    }

    this._offsetX.target = newOffset;

    //Hanlde auto snap
    if (this._snapTimeoutId) {
      clearTimeout(this._snapTimeoutId);
    }

    this._snapTimeoutId = setTimeout(this._performSnap, SlideScene.timeToSnap);
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScrollX(e.x * SlideScene.mouseMultiplier);
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScrollX(e.x * SlideScene.touchMultiplier);
  };
  _onScrollWheel = (e: THREE.Event) => {
    this._applyScrollX(e.y * SlideScene.wheelMultiplier);
  };

  _onResize() {
    super._onResize();

    this._scrollBoundary =
      this._collectionWrapperRect.width -
      this._imageWrapperClientWidth -
      this._imageWrapperMarginRight / 2;
  }

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('mouse', this._onScrollMouse);
    this._scroll.addEventListener('touch', this._onScrollTouch);
    this._scroll.addEventListener('wheel', this._onScrollWheel);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('mouse', this._onScrollMouse);
    this._scroll.removeEventListener('touch', this._onScrollTouch);
    this._scroll.removeEventListener('wheel', this._onScrollWheel);
  }

  _passIntersectPoint() {
    this._items3D.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  _positionItems(updateInfo: UpdateInfo) {
    this._items3D.forEach((item, index) => {
      item.currentOffsetX = this._offsetX.current;
    });
  }

  _handleIndexClick(index: number) {
    super._handleIndexClick(index);
    this.animateToIndex({ destination: index });
  }

  _onIndexChange() {
    const el = this._items3D[this._activeIndex];

    if (!el) {
      return;
    }

    this._items3D.forEach(item => {
      if (item === el && !item.isFocused) {
        item.animateFocusIn();
      } else if (item.isFocused) {
        item.animateFocusOut();
      }
    });
  }

  _updateIndex(updateInfo: UpdateInfo) {
    this._offsetX.last = this._offsetX.current;

    this._offsetX.current = lerp(
      this._offsetX.current,
      this._offsetX.target,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );

    const prevIndex = Math.round(
      (this._offsetX.last / this._scrollBoundary) * (this._items3D.length - 1),
    );

    const currentIndex = Math.round(
      (this._offsetX.current / this._scrollBoundary) *
        (this._items3D.length - 1),
    );

    if (prevIndex !== currentIndex) {
      this._activeIndex = currentIndex;
      this._onIndexChange();
    }

    this._targetIndex = Math.round(
      (this._offsetX.target / this._scrollBoundary) *
        (this._items3D.length - 1),
    );
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passIntersectPoint();
    this._updateIndex(updateInfo);
    this._positionItems(updateInfo);
  }

  destroy() {
    super.destroy();
  }

  animateToIndex(props: AnimateProps) {
    const {
      destination,
      duration = 600,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._snapTimeoutId) {
      clearTimeout(this._snapTimeoutId);
    }

    if (this._goToIndexTween) {
      this._goToIndexTween.stop();
    }

    this._isAutoScrolling = true;

    const offset =
      (destination / (this._items3D.length - 1)) * this._scrollBoundary;

    this._goToIndexTween = new TWEEN.Tween({
      progress: this._offsetX.current,
    })
      .to({ progress: offset }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._offsetX.target = obj.progress;
      })
      .onComplete(() => {
        this._isAutoScrolling = false;
      });

    this._goToIndexTween.start();
  }

  animateIn() {
    this._items3D.forEach(item => {
      item.animateIn();
    });

    this._onIndexChange();
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }
}

import * as THREE from 'three';

import { UpdateInfo, Bounds } from '../types';
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
  static lerpEase = 0.06;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 2;
  static timeToSnap = 500;

  _scroll: Scroll;
  _offsetX = {
    last: 0,
    current: 0,
    target: 0,
  };
  _snapTimeoutId: ReturnType<typeof setTimeout> | null = null;
  _currentIndex = 0;

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _performSnap = () => {
    this.goToIndex(Math.round(this._offsetX.target));
  };

  _applyScrollX = (x: number) => {
    let newOffset = this._offsetX.target - x;
    const rightBoundary =
      this._collectionWrapperRect.width -
      this._imageWrapperClientWidth -
      this._imageWrapperMarginRight / 2;

    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset >= rightBoundary) {
      newOffset = rightBoundary;
    }

    this._offsetX.target = newOffset;

    //Hanlde auto snap
    // if (this._snapTimeoutId) {
    //   clearTimeout(this._snapTimeoutId);
    // }
    // this._snapTimeoutId = setTimeout(this._performSnap, SlideScene.timeToSnap);
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

  _onIndexChange() {
    const el = this._items3D[this._currentIndex];

    if (!el) {
      return;
    }

    this._items3D.forEach(item => {
      if (item === el) {
        item.animateFocusIn();
      } else {
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

    const unit = this._imageWrapperClientWidth + this._imageWrapperMarginRight;
    const triggerLine = unit / 2; //We move the trigger line to be at the center of the screen

    const prevIndex = Math.floor((this._offsetX.last + triggerLine) / unit);
    const currentIndex = Math.floor(
      (this._offsetX.current + triggerLine) / unit,
    );

    if (prevIndex !== currentIndex) {
      this._currentIndex = currentIndex;
      this._onIndexChange();
    }
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

  goToIndex(index: number) {
    this._offsetX.target = index;
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

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
    target: 0, //setting to 0.0001 fixes index lerp bug
  };

  _snapTimeoutId: ReturnType<typeof setTimeout> | null = null;

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
    this._offsetX.target = this._offsetX.target - x;

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

  _updateIndex(updateInfo: UpdateInfo) {
    this._offsetX.last = this._offsetX.current;

    this._offsetX.current = lerp(
      this._offsetX.current,
      this._offsetX.target,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
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

  goToIndex(index: number) {
    this._offsetX.target = index;
  }

  animateIn() {
    this._items3D.forEach(item => {
      item.animateIn();
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }
}

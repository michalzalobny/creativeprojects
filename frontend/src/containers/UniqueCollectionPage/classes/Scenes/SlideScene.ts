import * as THREE from 'three';

import { UpdateInfo, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { ItemScene } from './ItemScene';
import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';
import { CardItem3DAnimated } from '../Components/CardItem3DAnimated';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class SlideScene extends ItemScene {
  static lerpEase = 0.045;
  static wheelMultiplier = 0.425;
  static indexIncreaseMultiplier = 0.025;
  static timeToSnap = 500;

  _items3DVisible: CardItem3DAnimated[] = [];
  _scroll: Scroll;
  _indexFloat = {
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
    this.goToIndex(Math.round(this._indexFloat.target));
  };

  _applyScroll = (x: number, y: number) => {
    const minIndex = 0;
    const maxIndex = this._items3DVisible.length - 1;

    this._indexFloat.target = Math.min(
      Math.max(
        this._indexFloat.target - y * SlideScene.indexIncreaseMultiplier,
        minIndex,
      ),
      maxIndex,
    );

    //Hanlde auto snap
    if (this._snapTimeoutId) {
      clearTimeout(this._snapTimeoutId);
    }
    this._snapTimeoutId = setTimeout(this._performSnap, SlideScene.timeToSnap);
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScroll(e.x, e.y);
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScroll(e.x, e.y);
  };
  _onScrollWheel = (e: THREE.Event) => {
    this._applyScroll(
      e.x * SlideScene.wheelMultiplier,
      e.y * SlideScene.wheelMultiplier,
    );
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

  _positionItems(updateInfo: UpdateInfo) {}

  _updateIndex(updateInfo: UpdateInfo) {
    this._indexFloat.last = this._indexFloat.current;

    this._indexFloat.current = lerp(
      this._indexFloat.current,
      this._indexFloat.target,
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
    this._indexFloat.target = index;
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }
}

import * as THREE from 'three';

import { UpdateInfo, Bounds, IndexDiffs } from '../types';
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

export class StackScene extends ItemScene {
  static lerpEase = 0.04;
  static wheelMultiplier = 0.425;
  static indexIncreaseMultiplier = 0.025;

  _items3DVisible: CardItem3DAnimated[] = [];
  _scroll: Scroll;
  _indexFloat = {
    current: 0,
    target: 0,
  };
  _indexDiffs: IndexDiffs = {
    current: [],
    target: [],
  };
  _currentIndex = 0;

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _applyScroll = (x: number, y: number) => {
    const minIndex = 0;
    const maxIndex = this._items3DVisible.length - 1;

    this._indexFloat.target = Math.min(
      Math.max(
        this._indexFloat.target - y * StackScene.indexIncreaseMultiplier,
        minIndex,
      ),
      maxIndex,
    );
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScroll(e.x, e.y);
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScroll(e.x, e.y);
  };
  _onScrollWheel = (e: THREE.Event) => {
    this._applyScroll(
      e.x * StackScene.wheelMultiplier,
      e.y * StackScene.wheelMultiplier,
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

  _positionItems(updateInfo: UpdateInfo) {
    const offset = 0;
    let newIndexEased = this._items3D.length - 1;
    let smallestDiff = Number.MAX_VALUE;

    for (let i = 0; i < this._items3DVisible.length; ++i) {
      const item = this._items3DVisible[i];

      this._indexDiffs.current[i] =
        this._indexDiffs.current[i] || this._indexFloat.current - i;

      this._indexDiffs.target[i] = this._indexFloat.current - i + offset;

      const dIndex = this._indexDiffs.target[i] - this._indexDiffs.current[i];

      this._indexDiffs.current[i] += dIndex * updateInfo.slowDownFactor;

      const indexDiff = this._indexDiffs.current[i];
      if (Math.abs(indexDiff) < smallestDiff) {
        smallestDiff = Math.abs(indexDiff);
        newIndexEased = i;
      }

      const indexF = this._indexFloat.current - i;
      const cardScale = Math.max(Math.min(1, 1 - Math.abs(indexF) * 0.12), 0);

      item.stackTranslateY = -indexF * 0.9;
      item.cardScale = cardScale;
      item.position.z = cardScale * 0.01;
      item.opacity = Math.min(1.6 - Math.abs(indexF * 0.4), 1);

      if (i === 5) {
        // console.log(Math.abs(indexF));
      }
    }
  }

  _onCurrentIndexChange() {
    //Dispatch event with current index
    // this.dispatchEvent({
    //   type: 'itemchange',
    //   item: this._items3D[this.currentIndexEased],
    // });
  }

  _updateIndex(updateInfo: UpdateInfo) {
    this._indexFloat.current = lerp(
      this._indexFloat.current,
      this._indexFloat.target,
      StackScene.lerpEase * updateInfo.slowDownFactor,
    );

    const prevIndex = this._currentIndex;
    this._currentIndex = Math.round(this._indexFloat.current);
    if (prevIndex !== this._currentIndex) {
      this._onCurrentIndexChange();
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
    this._indexFloat.target = index;
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }

  set filter(filter: string) {
    const currentItem = this._items3DVisible[this._currentIndex]?.cardItem;
    this._items3DVisible = [];

    this._items3D.forEach(item => {
      if (!filter || item.cardItem.item.name === filter) {
        this._items3DVisible.push(item);
        item.slideIn();
      } else {
        item.slideOut();
      }
    });

    const restoreIndex = currentItem
      ? this._items3DVisible.findIndex(item => item.cardItem === currentItem)
      : 0;

    this.goToIndex(Math.max(restoreIndex, 0));
  }
}

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
  _indexFloat = 0;
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

    this._indexFloat = Math.min(
      Math.max(
        this._indexFloat - y * StackScene.indexIncreaseMultiplier,
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
    let offset = 0;

    for (let i = 0; i < this._items3D.length; ++i) {
      const item = this._items3D[i];

      this._indexDiffs.current[i] =
        this._indexDiffs.current[i] || this._indexFloat - i;

      this._indexDiffs.target[i] = this._indexFloat - i + offset;

      this._indexDiffs.current[i] = lerp(
        this._indexDiffs.current[i],
        this._indexDiffs.target[i],
        StackScene.lerpEase * updateInfo.slowDownFactor,
      );

      const indexDiff = this._indexDiffs.current[i];

      if (this._items3D[i].isSlidOut) {
        offset += 1;
      } else {
        const cardScale = Math.max(
          Math.min(1, 1 - Math.abs(indexDiff) * 0.12),
          0,
        );
        item.stackTranslateY = -indexDiff * 0.9;
        item.cardScale = cardScale;
        item.position.z = cardScale * 0.001;
        item.opacity = Math.min(1.6 - Math.abs(indexDiff * 0.4), 1);
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
    // this._indexFloat.current = lerp(
    //   this._indexFloat.current,
    //   this._indexFloat.target,
    //   StackScene.lerpEase * updateInfo.slowDownFactor,
    // );

    // this._indexFloat.current = this._indexFloat.target;

    const prevIndex = this._currentIndex;
    this._currentIndex = Math.round(this._indexFloat);
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
    this._indexFloat = index;
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

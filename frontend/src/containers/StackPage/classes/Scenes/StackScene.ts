import * as THREE from 'three';

import {
  UpdateInfo,
  ScrollValues,
  CardItemProps,
  Bounds,
  IndexDiffs,
} from '../types';
import { InteractiveScene } from './InteractiveScene';
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
  static autoScrollSpeed = 1;
  static wheelMultiplier = 1;

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
  _scrollValues: ScrollValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    direction: { x: 'left', y: 'up' },
    strength: {
      current: 0,
      target: 0,
    },
    autoScrollSpeed: { x: 0, y: 0 },
  };

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _resetScrollValues() {
    this._scrollValues.current.x = 0;
    this._scrollValues.current.y = 0;

    this._scrollValues.target.x = 0;
    this._scrollValues.target.y = 0;

    this._scrollValues.last.x = 0;
    this._scrollValues.last.y = 0;

    this._scrollValues.strength.current = 0;
    this._scrollValues.strength.target = 0;

    this._scrollValues.autoScrollSpeed.x = 0;
    this._scrollValues.autoScrollSpeed.y = 0;
  }

  _applyScroll = (x: number, y: number) => {
    this._scrollValues.target.x -= x;
    this._scrollValues.target.y += y;

    const minIndex = 0;
    const maxIndex = this._items3DVisible.length - 1;
    this._indexFloat.target = Math.min(
      Math.max(this._indexFloat.target - y, minIndex),
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

  _updateScrollValues(updateInfo: UpdateInfo) {
    // this._scrollValues.target.y += this._scrollValues.autoScrollSpeed.y;

    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
      this._scrollValues.autoScrollSpeed.x = StackScene.autoScrollSpeed;
    } else {
      this._scrollValues.direction.x = 'right';
      this._scrollValues.autoScrollSpeed.x = -StackScene.autoScrollSpeed;
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
      this._scrollValues.autoScrollSpeed.y = StackScene.autoScrollSpeed;
    } else {
      this._scrollValues.direction.y = 'down';
      this._scrollValues.autoScrollSpeed.y = -StackScene.autoScrollSpeed;
    }

    //Update scroll strength
    const deltaX = this._scrollValues.current.x - this._scrollValues.last.x;
    const deltaY = this._scrollValues.current.y - this._scrollValues.last.y;

    this._scrollValues.strength.target = Math.sqrt(
      deltaX * deltaX + deltaY * deltaY,
    );

    this._scrollValues.strength.current = lerp(
      this._scrollValues.strength.current,
      this._scrollValues.strength.target,
      StackScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.last.x = this._scrollValues.current.x;
    this._scrollValues.last.y = this._scrollValues.current.y;

    //lerp scroll
    this._scrollValues.current.x = lerp(
      this._scrollValues.current.x,
      this._scrollValues.target.x,
      StackScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.current.y = lerp(
      this._scrollValues.current.y,
      this._scrollValues.target.y,
      StackScene.lerpEase * updateInfo.slowDownFactor,
    );
  }

  _positionItems(updateInfo: UpdateInfo) {
    const offset = 0;
    let newIndexEased = this._items3D.length - 1;
    let smallestDiff = Number.MAX_VALUE;

    for (let i = 0; i < this._items3D.length; ++i) {
      const item = this._items3D[i];

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

      item.position.y = indexDiff * 45;
      item.position.z = -Math.abs(indexDiff * 80);
      item.opacity = Math.min(1.4 - Math.abs(indexDiff * 0.15), 1);
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
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    // const dIndex = this._indexFloat.target - this._indexFloat.current;
    // this._indexFloat.current += dIndex; // * this.scrollEasing * dt * slowDownFactor;
    // const prevIndex = this._currentIndex;
    // this._currentIndex = Math.round(this._indexFloat.current);
    // if (prevIndex !== this._currentIndex) {
    //   this._onCurrentIndexChange();
    // }
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passIntersectPoint();
    this._updateIndex(updateInfo);
    this._positionItems(updateInfo);
    this._updateScrollValues(updateInfo);
  }

  destroy() {
    super.destroy();
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._resetScrollValues();
  }

  set items(items: CardItemProps[]) {
    super.items = items;

    //Pass scrollValues to gallery elements (as a reference value for better performance)
    this._items3D.forEach(item => {
      item.scrollValues = this._scrollValues;
    });
  }

  set filter(filter: string) {
    this._items3DVisible = [];

    this._items3D.forEach(item => {
      if (!filter || item.cardItem.item.name === filter) {
        this._items3DVisible.push(item);
        item.slideIn();
      } else {
        item.slideOut();
      }
    });
  }
}

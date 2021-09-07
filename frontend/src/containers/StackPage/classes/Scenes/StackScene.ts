import * as THREE from 'three';

import { UpdateInfo, ScrollValues, CardItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { ItemScene } from './ItemScene';
import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class StackScene extends ItemScene {
  static scrollSpeed = 1;

  _scroll: Scroll;
  _scrollValues: ScrollValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    direction: { x: 'left', y: 'up' },
    strength: {
      current: 0,
      target: 0,
    },
    scrollSpeed: { x: 0, y: 0 },
  };

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _onScroll = (e: THREE.Event) => {
    this._scrollValues.target.x -= e.x;
    this._scrollValues.target.y += e.y;
  };

  _resetScrollValues() {
    //Reset scroll values
    this._scrollValues.current.x = 0;
    this._scrollValues.current.y = 0;

    this._scrollValues.target.x = 0;
    this._scrollValues.target.y = 0;

    this._scrollValues.last.x = 0;
    this._scrollValues.last.y = 0;

    this._scrollValues.strength.current = 0;
    this._scrollValues.strength.target = 0;

    this._scrollValues.scrollSpeed.x = 0;
    this._scrollValues.scrollSpeed.y = 0;
  }

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('applyscroll', this._onScroll);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('applyscroll', this._onScroll);
  }

  _passIntersectPoint() {
    this._items3D.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
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

  _updateScrollValues(updateInfo: UpdateInfo) {
    this._scrollValues.target.y += this._scrollValues.scrollSpeed.y;

    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
      this._scrollValues.scrollSpeed.x = StackScene.scrollSpeed;
    } else {
      this._scrollValues.direction.x = 'right';
      this._scrollValues.scrollSpeed.x = -StackScene.scrollSpeed;
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
      this._scrollValues.scrollSpeed.y = StackScene.scrollSpeed;
    } else {
      this._scrollValues.direction.y = 'down';
      this._scrollValues.scrollSpeed.y = -StackScene.scrollSpeed;
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

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passIntersectPoint();
    this._updateScrollValues(updateInfo);
  }

  destroy() {
    super.destroy();
  }
}

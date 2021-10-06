import * as THREE from 'three';

import { UpdateInfo, Bounds, ScrollValues, ItemProps } from '../types';
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
  static wheelMultiplier = 0.0018;
  static mouseMultiplier = 1;
  static touchMultiplier = 1;
  static groupsAmount = 3;
  static defaultDepthValue = SlideScene.groupsAmount;
  static itemsPerGroup = 16;
  static maxDepthZoom = 0.95;

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
  _depthIndex = {
    last: SlideScene.defaultDepthValue - 1,
    current: SlideScene.defaultDepthValue,
    target: SlideScene.defaultDepthValue,
  };

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _applyScroll = (x: number, y: number) => {
    this._scrollValues.target.x -= x;
    this._scrollValues.target.y += y;
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScroll(
      e.x * SlideScene.mouseMultiplier,
      e.y * SlideScene.mouseMultiplier,
    );
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScroll(
      e.x * SlideScene.touchMultiplier,
      e.y * SlideScene.touchMultiplier,
    );
  };
  _onScrollWheel = (e: THREE.Event) => {
    const newTarget =
      this._depthIndex.target - e.y * SlideScene.wheelMultiplier;
    // this._depthIndex.target = Math.min(Math.max(0, newTarget), 3);
    this._depthIndex.target = newTarget;
  };

  _onResize() {
    super._onResize();
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

  _passValues() {
    this._items3D.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  _updateIndex(updateInfo: UpdateInfo) {
    //Loops depthIndex so that it never reaches negative value
    if (this._depthIndex.current < SlideScene.defaultDepthValue) {
      this._depthIndex.current += SlideScene.defaultDepthValue;
      this._depthIndex.last += SlideScene.defaultDepthValue;
      this._depthIndex.target += SlideScene.defaultDepthValue;
    }

    this._depthIndex.last = this._depthIndex.current;

    this._depthIndex.current = lerp(
      this._depthIndex.current,
      this._depthIndex.target,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );
  }

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

    //Reset depth values
    this._depthIndex.target = SlideScene.defaultDepthValue;
    this._depthIndex.current = SlideScene.defaultDepthValue;
    this._depthIndex.last = SlideScene.defaultDepthValue - 1;
  }

  _updateScrollValues(updateInfo: UpdateInfo) {
    this._scrollValues.target.y += this._scrollValues.scrollSpeed.y;

    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
    } else {
      this._scrollValues.direction.x = 'right';
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
    } else {
      this._scrollValues.direction.y = 'down';
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
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.last.x = this._scrollValues.current.x;
    this._scrollValues.last.y = this._scrollValues.current.y;

    //lerp scroll
    this._scrollValues.current.x = lerp(
      this._scrollValues.current.x,
      this._scrollValues.target.x,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.current.y = lerp(
      this._scrollValues.current.y,
      this._scrollValues.target.y,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );
  }

  _positionGroups(updateInfo: UpdateInfo) {
    this._groups3DArray.forEach((group, key) => {
      const finalScale =
        (Math.abs(this._depthIndex.current - key) % SlideScene.groupsAmount) *
          SlideScene.maxDepthZoom +
        1; // the value goes : 1, 2, 3, 1, 2, 3, 1...
      group.scale.set(finalScale, finalScale, finalScale);
      group.position.z = finalScale * 0.1; //Places group with the biggest scale on top
    });

    this._items3D.forEach((item, key) => {
      // The value goes from 0 to 1 based on element scale
      const xO =
        (this._groups3DArray[item.groupIndex].scale.x - 1) /
        SlideScene.maxDepthZoom /
        SlideScene.groupsAmount;

      // item.opacity = 1 - Math.pow(normalizedOpacity * 2 - 1, 8);
      // item.opacity = 4 * (Math.pow(-xO, 5) + Math.pow(-xO, 2));
      item.opacity = 7 * (Math.pow(-xO, 7) + Math.pow(-xO, 4));
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passValues();
    this._updateIndex(updateInfo);
    this._updateScrollValues(updateInfo);
    this._positionGroups(updateInfo);
  }

  destroy() {
    super.destroy();
  }

  animateIn() {
    this._items3D.forEach(el => {
      el.animateOpacity({ destination: 1 });
    });
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);
    this._resetScrollValues();
  }

  setItems(items: ItemProps[]) {
    super.setItems(items);
    //Passing scrollValues as reference for better performance
    this._items3D.forEach(item => {
      item.setScrollValues(this._scrollValues);
    });
  }
}

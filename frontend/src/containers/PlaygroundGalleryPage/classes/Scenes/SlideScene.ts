import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import {
  UpdateInfo,
  Bounds,
  AnimateProps,
  ScrollValues,
  ItemProps,
} from '../types';
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
  static lerpEase = 0.07;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 2;
  static timeToSnap = 500;
  static groupsAmount = 3;
  static defaultDepthValue = SlideScene.groupsAmount;
  static itemsPerGroup = 3;
  static maxDepthZoom = 0.4;

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
  _snapTimeoutId: ReturnType<typeof setTimeout> | null = null;
  _activeIndex = 0;
  _targetIndex = 0;
  _scrollBoundary = 1;
  _goToIndexTween: Tween<{ progress: number }> | null = null;
  _isAutoScrolling = false;
  _isReady = false;
  _activeCollection = '';

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  _performSnap = () => {
    // this.animateToIndex({ destination: this._targetIndex });
  };

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
    const newTarget = this._depthIndex.target - e.y * 0.003;
    // this._depthIndex.target = Math.min(Math.max(0, newTarget), 3);
    this._depthIndex.target = newTarget;
  };

  _onResize() {
    super._onResize();

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);

    this._performSnap();
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

  _handleIndexClick(index: number) {
    if (!this._isReady) {
      return;
    }

    super._handleIndexClick(index);

    if (index === this._activeIndex) {
    } else {
      this.animateToIndex({ destination: index });
    }

    const el = this._items3D[index];

    if (!el) {
      return;
    }
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
    this._groupsArray.forEach((group, key) => {
      const finalScale =
        (Math.abs(this._depthIndex.current - key) % SlideScene.groupsAmount) *
          SlideScene.maxDepthZoom +
        1; // the value goes : 1, 2, 3, 4, 1, 2, 3, 4, 1...
      group.scale.set(finalScale, finalScale, finalScale);
      group.position.z = finalScale * 0.1; //Places group with the biggest scale on top
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

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);
  }

  animateToIndex(props: AnimateProps) {
    //Todo
    const {
      destination,
      duration = 400,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);

    if (this._goToIndexTween) this._goToIndexTween.stop();

    this._isAutoScrolling = true;

    this._goToIndexTween = new TWEEN.Tween({
      progress: this._depthIndex.target,
    })
      .to({ progress: 0 }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._depthIndex.target = obj.progress;
      })
      .onComplete(() => {
        this._isAutoScrolling = false;
      });

    this._goToIndexTween.start();
  }

  animateIn() {
    this._items3D.forEach(el => {
      el.animateIn(0);
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

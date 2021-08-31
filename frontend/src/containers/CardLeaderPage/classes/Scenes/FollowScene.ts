import * as THREE from 'three';

import { UpdateInfo, FollowItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { CardScene } from './CardScene';
import { MouseMove } from '../Singletons/MouseMove';
import { HTMLComponent } from '../HTMLComponents/HTMLComponent';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimatedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export class FollowScene extends CardScene {
  static respawnTimeout = 90; //ms

  _scroll: Scroll;
  _HTMLComponents: HTMLComponent[] = [];
  _lastAddedTime = 0;
  _canAddItems = false;
  _areItemsAnimatedIn = false;
  _setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  _setIsAnimatedIn: React.Dispatch<React.SetStateAction<boolean>>;

  constructor({
    setIsAnimatedIn,
    setIsFollowing,
    camera,
    mouseMove,
    scroll,
  }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
    this._initHtmlComponents();
    this._setIsFollowing = setIsFollowing;
    this._setIsAnimatedIn = setIsAnimatedIn;
  }

  _passMouseValues(x: number, y: number) {
    this._cardItems.forEach(item => {
      item.targetMouse = { x, y };
    });
  }

  _animateInItems() {
    super._animateInItems();
    this._canAddItems = true;

    setTimeout(() => {
      this._areItemsAnimatedIn = true;
      this._setIsAnimatedIn(true);
    }, FollowScene.respawnTimeout * this._items.length + 1500);
  }

  _onMouseDown = (e: THREE.Event) => {
    if (!this._areItemsAnimatedIn) {
      return;
    }

    this._setIsFollowing(true);

    this._cardItems.forEach((item, key) => {
      if (item.isAnimatedIn) {
        item.toggleFollowing(true);
      }
    });
  };

  _onMouseUp = (e: THREE.Event) => {
    this._setIsFollowing(false);
    this._cardItems.forEach((item, key) => {
      if (item.isAnimatedIn) {
        item.toggleFollowing(false);
      }
    });
  };

  _addListeners() {
    super._addListeners();

    this._mouseMove.addEventListener('down', this._onMouseDown);
    this._mouseMove.addEventListener('up', this._onMouseUp);
  }

  _removeListeners() {
    super._removeListeners();

    this._mouseMove.removeEventListener('down', this._onMouseDown);
    this._mouseMove.removeEventListener('up', this._onMouseUp);
  }

  _passIntersectPoint() {
    this._cardItems.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  _initHtmlComponents() {}

  _addItems() {
    if (!this._canAddItems) {
      return;
    }

    const currentTime = window.performance.now();
    const timeDifference = currentTime - this._lastAddedTime; //in ms

    if (timeDifference > FollowScene.respawnTimeout) {
      super.addItem();
      this._lastAddedTime = window.performance.now();
    }
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._HTMLComponents.forEach(el => {
      el.rendererBounds = this._rendererBounds;
    });
  }

  set items(items: FollowItemProps[]) {
    super.items = items;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passIntersectPoint();
    this._addItems();

    this._HTMLComponents.forEach(el => {
      el.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();

    this._HTMLComponents.forEach(el => {
      el.destroy();
    });
  }
}

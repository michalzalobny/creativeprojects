import * as THREE from 'three';

import { UpdateInfo, RecipieItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { RecipeScene } from './RecipeScene';
import { MouseMove } from '../Singletons/MouseMove';
import { HTMLComponent } from '../HTMLComponents/HTMLComponent';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export class StackScene extends RecipeScene {
  static respawnTimeout = 50; //ms

  _scroll: Scroll;
  _lastAddedTime = 0;
  _canAddItems = false;
  _lastRotateTime = 0;
  _canRotateItems = false;
  _HTMLComponents: HTMLComponent[] = [];
  _rotateRespawn = 15000;
  _setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;

  constructor({ setIsFollowing, camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
    this._initHtmlComponents();
    this._setIsFollowing = setIsFollowing;
  }

  _passMouseValues(x: number, y: number) {
    this._recipeItems.forEach(item => {
      item.targetMouse = { x, y };
    });
  }

  _animateInItems() {
    super._animateInItems();
    this._canAddItems = true;
  }

  _onMouseDown = (e: THREE.Event) => {
    this._canRotateItems = true;
    this._setIsFollowing(true);

    this._recipeItems.forEach((item, key) => {
      if (item.isAnimatedIn) {
        item.toggleFollowing(true);
      }
    });
  };

  _onMouseUp = (e: THREE.Event) => {
    this._canRotateItems = false;
    this._setIsFollowing(false);
    this._recipeItems.forEach((item, key) => {
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
    this._recipeItems.forEach(item => {
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

    if (timeDifference > StackScene.respawnTimeout) {
      super.addItem();
      this._lastAddedTime = window.performance.now();
    }
  }

  _rotateItems() {
    if (!this._canRotateItems) {
      return;
    }

    const currentTime = window.performance.now();
    const timeDifference = currentTime - this._lastRotateTime; //in ms

    if (timeDifference > this._rotateRespawn) {
      this._recipeItems.forEach((item, key) => {
        item.animateDropOut(key * 50);
      });

      this._lastRotateTime = window.performance.now();
    }
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._HTMLComponents.forEach(el => {
      el.rendererBounds = this._rendererBounds;
    });
  }

  set items(items: RecipieItemProps[]) {
    super.items = items;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._passIntersectPoint();

    this._addItems();
    this._rotateItems();

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

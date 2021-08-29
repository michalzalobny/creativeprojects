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
}

export class StackScene extends RecipeScene {
  _scroll: Scroll;

  _HTMLComponents: HTMLComponent[] = [];

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
    this._initHtmlComponents();
  }

  _passMouseValues(x: number, y: number) {
    this._recipeItems.forEach(item => {
      item.targetMouse = { x, y };
    });
  }

  _addListeners() {
    super._addListeners();
  }

  _removeListeners() {
    super._removeListeners();
  }

  _passIntersectPoint() {
    this._recipeItems.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  _initHtmlComponents() {}

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

import * as THREE from 'three';

import { UpdateInfo, ScrollValues, RecipieItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { RecipeScene } from './RecipeScene';
import { MouseMove } from '../Singletons/MouseMove';
import { RecipeItem3D } from '../Components/RecipeItem3D';
import { HTMLComponent } from '../HTMLComponents/HTMLComponent';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

interface ApplyScrollValues {
  x: number;
  y: number;
  multiplier?: number;
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

  _resetScrollValues() {}

  _onScrollTouchDown = () => {
    this._recipeItems.forEach(item => {
      if (item.isAnimatedIn) {
        item.animateOpacity({ delay: 0, duration: 500, destination: 1 });
      }
    });
  };

  _onScrollTouchUp = () => {
    this._recipeItems.forEach(item => {
      if (item.isAnimatedIn) {
        item.animateOpacity({
          delay: 0,
          duration: 500,
          destination: RecipeItem3D.defaultOpacity,
        });
      }
    });
  };

  _applyScrollValues({ x, y, multiplier = 1 }: ApplyScrollValues) {
    this._recipeItems.forEach(item => {
      item.targetScroll = { x: x * multiplier, y: y * multiplier };
    });
  }

  _onScrollTouch = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y });
  };

  _onScrollWheel = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y });
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y });
  };

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('touch', this._onScrollTouch);
    this._scroll.addEventListener('mouse', this._onScrollMouse);
    this._scroll.addEventListener('wheel', this._onScrollWheel);
    this._scroll.addEventListener('touchdown', this._onScrollTouchDown);
    this._scroll.addEventListener('touchup', this._onScrollTouchUp);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('touch', this._onScrollTouch);
    this._scroll.removeEventListener('mouse', this._onScrollMouse);
    this._scroll.removeEventListener('wheel', this._onScrollWheel);
    this._scroll.removeEventListener('touchdown', this._onScrollTouchDown);
    this._scroll.removeEventListener('touchup', this._onScrollTouchUp);
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

    this._resetScrollValues();
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

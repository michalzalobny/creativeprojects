import * as THREE from 'three';

import { UpdateInfo, ScrollValues, RecipieItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { RecipeScene } from './RecipeScene';
import { MouseMove } from '../Singletons/MouseMove';
import { RecipeItem3D } from '../Components/RecipeItem3D';
import { lerp } from '../utils/lerp';
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
  _HTMLComponents: HTMLComponent[] = [];

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
    this._initHtmlComponents();
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
  }

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
    this._scrollValues.target.x -= x * multiplier;
    this._scrollValues.target.y += y * multiplier;
  }

  _onScrollTouch = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y });
  };

  _onScrollWheel = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y });
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScrollValues({ x: e.x, y: e.y, multiplier: 2 });
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

    //Pass scrollValues to gallery elements (as a reference value, better performance)
    this._recipeItems.forEach(item => {
      item.scrollValues = this._scrollValues;
    });
  }

  _updateScrollValues(updateInfo: UpdateInfo) {
    // this._scrollValues.target.y += this._scrollValues.scrollSpeed.y;

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

    this._HTMLComponents.forEach(el => {
      el.update(updateInfo);
    });

    this._updateScrollValues(updateInfo);
  }

  destroy() {
    super.destroy();

    this._HTMLComponents.forEach(el => {
      el.destroy();
    });
  }
}

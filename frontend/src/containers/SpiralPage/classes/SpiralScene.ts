import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { StoryScene } from './StoryScene';
import { SpiralSpline3D } from './SpiralSpline3D';
import { UpdateInfo, Bounds } from './types';
import { Scroll } from './Scroll/Scroll';
import { lerp } from './utils/lerp';
import { MouseMove } from './MouseMove/MouseMove';
import { StoryItem3D } from './StoryItem3D';

export class SpiralScene extends StoryScene {
  static lerpEase = 0.05;
  static scrollYMultiplier = 0.008;
  static zeroProgressOffset = 0.452;
  static itemSpacing = 0.056;
  static opacityAppearStart = 0.3;
  static opacityDistance = 15;

  _spiralSpline = new SpiralSpline3D(100, 5, 1, 50);
  _scroll: Scroll;
  _currentIndexFloat = 0;
  _targetIndexFloat = 0;
  _animateSpiralInTween: Tween<{ progress: number }> | null = null;
  _animateToIndexTween: Tween<{ progress: number }> | null = null;

  constructor(
    camera: THREE.PerspectiveCamera,
    scroll: Scroll,
    mouseMove: MouseMove,
    setHoveredItem: React.Dispatch<React.SetStateAction<StoryItem3D | null>>,
  ) {
    super(camera, mouseMove, setHoveredItem);
    this._scroll = scroll;
    this._camera.position.z = this._spiralSpline.depth * 1.5;

    this._addListeners();
    this.add(this._spiralSpline);
    this._intersectiveBackground3D.setPlaneDepth(
      -this._spiralSpline.depth * 1.5,
    );
  }

  _positionItems = (updateInfo: UpdateInfo) => {
    this._storyItems.forEach((item, index) => {
      const dIndex = -(index - this._currentIndexFloat);
      const dProgress = dIndex * SpiralScene.itemSpacing;
      const splineProgress = dProgress + SpiralScene.zeroProgressOffset;
      const itemPosition = this._spiralSpline.getPointPosition(splineProgress);

      item.position.set(
        itemPosition.x + this._spiralSpline.position.x,
        itemPosition.y + this._spiralSpline.position.y,
        itemPosition.z + this._spiralSpline.position.z,
      );
      const opacity =
        1 -
        (SpiralScene.opacityAppearStart - splineProgress) *
          SpiralScene.opacityDistance;
      item.opacity = opacity;
      const scale = Math.min(Math.pow(splineProgress, 0.95), 1);
      item.scale.set(scale, scale, scale);
    });
  };

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('appliedscroll', this._onScrollApplied);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('appliedscroll', this._onScrollApplied);
  }

  _passIntersectPoint() {
    this._spiralSpline.intersectPoint = this._intersectPointLerp;

    this._storyItems.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  _animateSpiralIn(targetIndex: number) {
    super._animateSpiralIn(targetIndex);
    const startIndex = Math.min(this._storyItems.length - 1, 100);

    this._currentIndexFloat = startIndex;
    this._targetIndexFloat = startIndex;

    if (this._animateSpiralInTween) {
      this._animateSpiralInTween.stop();
    }

    this._animateSpiralInTween = new TWEEN.Tween({
      progress: this._targetIndexFloat,
    })
      .to({ progress: targetIndex }, 2500)
      .delay(0)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        this._targetIndexFloat = obj.progress;
      })
      .onComplete(() => {});

    this._animateSpiralInTween.start();
  }

  _animateToIndex(targetIndex: number) {
    super._animateToIndex(targetIndex);

    if (this._animateToIndexTween) {
      this._animateToIndexTween.stop();
    }

    const distance = Math.abs(this._targetIndexFloat - targetIndex);

    this._animateToIndexTween = new TWEEN.Tween({
      progress: this._targetIndexFloat,
    })
      .to({ progress: targetIndex }, 200 * distance)
      .delay(0)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(obj => {
        this._targetIndexFloat = obj.progress;
      })
      .onComplete(() => {});

    this._animateToIndexTween.start();
  }

  _onScrollApplied = (e: THREE.Event) => {
    const newTarget =
      this._targetIndexFloat - e.y * SpiralScene.scrollYMultiplier;

    this._targetIndexFloat = Math.min(
      Math.max(0, newTarget),
      this._storyItems.length - 1,
    );
  };

  _updateIndex(updateInfo: UpdateInfo) {
    this._currentIndexFloat = lerp(
      this._currentIndexFloat,
      this._targetIndexFloat,
      SpiralScene.lerpEase * updateInfo.slowDownFactor,
    );
  }

  set targetIndex(target: number) {
    this._targetIndexFloat = target;
  }

  set hoveredStoryItem(hoveredItem: StoryItem3D | null) {
    if (hoveredItem) {
      this._storyItems.forEach(item => {
        if (item !== hoveredItem) {
          item.animateOpacity(0.45);
        }
      });
    } else {
      this._storyItems.forEach(item => {
        if (item.isInit) {
          item.animateOpacity(1);
        }
      });
    }
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._spiralSpline.rendererBounds = this._rendererBounds;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._positionItems(updateInfo);
    this._spiralSpline.update(updateInfo);
    this._passIntersectPoint();
    this._updateIndex(updateInfo);

    this._storyItems.forEach(item => {
      item.updateScrollStrength(this._scroll);
    });
  }

  destroy() {
    super.destroy();
    this._spiralSpline.destroy();
    this.remove(this._spiralSpline);
    this._removeListeners();
  }
}

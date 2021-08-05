import * as THREE from 'three';
import { StoryScene } from './StoryScene';
import { SpiralSpline3D } from './SpiralSpline3D';
import { UpdateInfo, Bounds } from './types';
import { Scroll } from './Scroll/Scroll';
import { lerp } from './utils/lerp';
import { MouseMove } from './MouseMove/MouseMove';

export class SpiralScene extends StoryScene {
  _spiralSpline = new SpiralSpline3D(100, 5, 1, 50);
  _scroll: Scroll;
  _currentIndexFloat = 0;
  _targetYScroll = 0;
  _currentYScroll = 0;
  _lerpEase = 0.05;
  _scrollYMultiplier = 0.008;
  _zeroProgressOffset = 0.46;
  _itemSpacing = 0.056;
  _opacityAppearStart = 0.3;
  _opacityDistance = 15;

  constructor(
    camera: THREE.PerspectiveCamera,
    scroll: Scroll,
    mouseMove: MouseMove,
  ) {
    super(camera, scroll, mouseMove);
    this._scroll = scroll;
    this._camera.position.z = this._spiralSpline.depth * 1.5;
  }

  _positionItems = (updateInfo: UpdateInfo) => {
    this._currentIndexFloat = this._currentYScroll;

    this._storyItems.forEach((item, index) => {
      const dIndex = -(index - this._currentIndexFloat);
      const dProgress = dIndex * this._itemSpacing;
      const splineProgress = dProgress + this._zeroProgressOffset;
      const itemPosition = this._spiralSpline.getPointPosition(splineProgress);

      item.position.set(
        itemPosition.x + this._spiralSpline.position.x,
        itemPosition.y + this._spiralSpline.position.y,
        itemPosition.z + this._spiralSpline.position.z,
      );
      const opacity =
        1 - (this._opacityAppearStart - splineProgress) * this._opacityDistance;
      item.opacity = opacity;
      const scale = Math.min(Math.pow(splineProgress, 0.95), 1);
      item.scale.set(scale, scale, scale);
    });
  };

  _onScrollApplied = (e: THREE.Event) => {
    const newTarget = this._targetYScroll - e.y * this._scrollYMultiplier;

    this._targetYScroll = Math.min(
      Math.max(0, newTarget),
      this._storyItems.length - 1,
    );
  };

  _lerpValues(updateInfo: UpdateInfo) {
    this._currentYScroll = lerp(
      this._currentYScroll,
      this._targetYScroll,
      this._lerpEase * updateInfo.slowDownFactor,
    );
  }

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('appliedscroll', this._onScrollApplied);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('appliedscroll', this._onScrollApplied);
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._spiralSpline.rendererBounds = this._rendererBounds;
  }

  _passIntersectPoint() {
    this._spiralSpline.intersectPoint = this._intersectPointLerp;

    this._storyItems.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._positionItems(updateInfo);
    this._lerpValues(updateInfo);
    this._spiralSpline.update(updateInfo);
    this._passIntersectPoint();

    this._storyItems.forEach(item => {
      item.updateScrollStrength(this._scroll);
    });
  }

  destroy() {
    super.destroy();
    this._spiralSpline.destroy();
    this._removeListeners();
  }

  init() {
    super.init();
    this._addListeners();
    this._spiralSpline.init();
    this.add(this._spiralSpline);
    this._intersectiveBackground3D.setPlaneDepth(
      -this._spiralSpline.depth * 1.5,
    );
  }
}

import * as THREE from 'three';
import { StoryScene } from './StoryScene';
import { SpiralSpline } from './SpiralSpline';
import { UpdateInfo } from './types';
import { Scroll } from './Scroll/Scroll';
import { lerp } from './utils/lerp';
import { MouseMove } from './MouseMove/MouseMove';

export class SpiralScene extends StoryScene {
  _intersectPoint = new THREE.Vector3(0);
  _spiralSpline = new SpiralSpline(100, 5, 1, 50);
  _scroll: Scroll;
  _currentIndexFloat = 0;
  _targetYScroll = 0;
  _currentYScroll = 0;
  _lerpEase = 0.05;
  _scrollYMultiplier = 0.008;
  _zeroProgressOffset = 0.46;
  _itemSpacing = 0.056;
  _raycasterPlane: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  > | null = null;

  constructor(
    camera: THREE.PerspectiveCamera,
    scroll: Scroll,
    mouseMove: MouseMove,
  ) {
    super(camera, scroll, mouseMove);
    this._scroll = scroll;
    this._drawRaycasterPlane();
    this._camera.position.z = this._spiralSpline.depth * 1.5;
  }

  _drawRaycasterPlane() {
    this._raycasterPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      new THREE.MeshBasicMaterial(),
    );
    this._raycasterPlane.position.z = -this._spiralSpline.depth;
    this.add(this._raycasterPlane);
  }

  positionItems = (updateInfo: UpdateInfo) => {
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
      // const opacity = 1 + (0.5 - splineProgress) * 8;
      // item.setOpacity(opacity);
      const scale = Math.min(Math.pow(splineProgress, 0.6), 1);
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

  _onMouseMove = (e: THREE.Event) => {
    const currentX = (e.target as MouseMove).mouseLerp.x;
    const currentY = (e.target as MouseMove).mouseLerp.y;

    const mouseX = (currentX / this._rendererBounds.width) * 2 - 1;
    const mouseY = -(currentY / this._rendererBounds.height) * 2 + 1;

    this._raycaster.setFromCamera({ x: mouseX, y: mouseY }, this._camera);

    if (this._raycasterPlane) {
      const intersects = this._raycaster.intersectObjects([
        this._raycasterPlane,
      ]);
      if (intersects[0]) {
        this._intersectPoint = intersects[0].point;
        this._spiralSpline.intersectPoint = this._intersectPoint;
      }
    }
  };

  _addListeners() {
    this._scroll.addEventListener('appliedscroll', this._onScrollApplied);
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeListeners() {
    this._scroll.removeEventListener('appliedscroll', this._onScrollApplied);
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this.positionItems(updateInfo);
    this._lerpValues(updateInfo);
    this._spiralSpline.update(updateInfo);
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
  }
}

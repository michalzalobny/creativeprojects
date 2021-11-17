import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { UpdateInfo, Bounds, ItemProps, AnimateProps } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { ItemScene } from './ItemScene';
import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';
import { GroupScroll } from '../Utility/GroupScroll';
import { TouchPinch } from '../Singletons/TouchPinch';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class SlideScene extends ItemScene {
  static lerpEase = 0.06;
  static wheelMultiplier = 0.002;
  static groupsAmount = 3;
  static defaultDepthValue = SlideScene.groupsAmount;
  static itemsPerGroup = 16;
  static defaultDepthIndex = 0.2;

  _touchPinch = TouchPinch.getInstance();
  _scroll: Scroll;
  _groupScrolls: GroupScroll[] = [];
  _depthIndex = {
    current: SlideScene.defaultDepthIndex,
    target: SlideScene.defaultDepthIndex,
  };
  _depthTween: Tween<{ progress: number }> | null = null;

  _groupIndex = {
    last: SlideScene.groupsAmount - 1,
  };

  _ambientLight = new THREE.AmbientLight();

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;

    for (let i = 0; i < SlideScene.groupsAmount; i++) {
      this._groupScrolls.push(new GroupScroll({ scroll: this._scroll }));
    }

    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);

    //Used to lighten up the 3d models
    this.add(this._ambientLight);
  }

  _animateDepth(props: AnimateProps) {
    const {
      destination,
      duration = 500,
      delay = 0,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (this._depthTween) this._depthTween.stop();

    this._depthTween = new TWEEN.Tween({ progress: this._depthIndex.current })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._depthIndex.target = obj.progress;
        this._depthIndex.current = obj.progress;
      });

    this._depthTween.start();
  }

  _onScrollWheel = (e: THREE.Event) => {
    //Stops depth animation if any user input occurs
    if (this._depthTween) this._depthTween.stop();

    const newTarget =
      this._depthIndex.target - e.y * SlideScene.wheelMultiplier;
    this._depthIndex.target = newTarget;
  };

  _onPinch = (e: THREE.Event) => {
    //Stops depth animation if any user input occurs
    if (this._depthTween) this._depthTween.stop();

    const newTarget = this._depthIndex.target - e.distance * 0.01;
    this._depthIndex.target = newTarget;
  };

  _onResize() {
    super._onResize();
  }

  _addListeners() {
    super._addListeners();
    this._groupScrolls.forEach(el => {
      el.addListeners();
    });
    this._scroll.addEventListener('wheel', this._onScrollWheel);
    this._touchPinch.addEventListener('pinch', this._onPinch);
  }

  _removeListeners() {
    super._removeListeners();
    this._groupScrolls.forEach(el => {
      el.removeListeners();
    });
    this._scroll.removeEventListener('wheel', this._onScrollWheel);
    this._touchPinch.removeEventListener('pinch', this._onPinch);
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
      this._depthIndex.target += SlideScene.defaultDepthValue;
    }

    this._depthIndex.current = lerp(
      this._depthIndex.current,
      this._depthIndex.target,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );
  }

  _resetScrollValues() {
    this._groupScrolls.forEach(el => {
      el.resetScrollValues();
    });

    //Reset depth values
    this._depthIndex.target = SlideScene.defaultDepthIndex;
    this._depthIndex.current = SlideScene.defaultDepthIndex;
  }

  _onGroupIndexChange(newIndex: number) {
    this._groupScrolls.forEach((el, key) => {
      if (key === newIndex) {
        el.isActive = true;
      } else {
        el.isActive = false;
      }
    });
  }

  _trackGoupIndex(updateInfo: UpdateInfo) {
    const currentGroupIndex =
      Math.abs(SlideScene.groupsAmount - 1 - this._depthIndex.current) %
      SlideScene.groupsAmount;

    const flooredIndex = Math.floor(currentGroupIndex);
    const lastFlooredIndex = this._groupIndex.last;

    this._groupIndex.last = flooredIndex;

    if (flooredIndex - lastFlooredIndex !== 0)
      this._onGroupIndexChange(flooredIndex);
  }

  _positionGroups(updateInfo: UpdateInfo) {
    const scaleArray: number[] = [];
    this._groups3DArray.forEach((group, key) => {
      // the value goes from 1 to 4 in a loop
      const finalScale =
        (Math.abs(this._depthIndex.current - key) % SlideScene.groupsAmount) +
        1;

      scaleArray[key] = finalScale;
      const groupScale = finalScale * 0.8 - 0.5;
      group.scale.set(groupScale, groupScale, groupScale); //Group scale is different from final scale to be able to adjust elements scales independantly and freely
      group.position.z = finalScale * 0.1; //Places group with the biggest scale on top
    });

    this._items3D.forEach((item, key) => {
      // The value goes from 0 to 1 based on element scale
      const xO = (scaleArray[item.groupIndex] - 1) / SlideScene.groupsAmount;
      item.setOpacity(25 * (Math.pow(-xO, 7) + Math.pow(-xO, 6)));
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passValues();
    this._updateIndex(updateInfo);
    this._positionGroups(updateInfo);
    this._trackGoupIndex(updateInfo);
    this._groupScrolls.forEach(el => {
      el.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this.remove(this._ambientLight);
  }

  animateIn() {
    const depthDuration = 4200;
    const depthDelay = 300;

    this._animateDepth({
      destination: 9.2,
      delay: depthDelay,
      duration: depthDuration,
    });

    this._groupScrolls.forEach((el, key) => {
      const sign = key % 2 === 0 ? -1 : 1;
      el.animateScroll({
        destination: this._rendererBounds.height * sign * 2.36,
        duration: depthDuration * 0.8,
        delay: depthDelay + depthDuration * 0.4,
      });
    });

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
    this._items3D.forEach((item, key) => {
      item.setScrollValues(this._groupScrolls[item.groupIndex].scrollValues);
    });
  }
}

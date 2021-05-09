import TWEEN, { Group } from '@tweenjs/tween.js';

import { lerp } from './utils/lerp';
import { handleEvents } from './functions/handleEvents';
import { MOMENTUM_DAMPING } from './constants';
import { applyScroll } from './functions/applyScroll';

export enum ScrollMode {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

interface ScrollObj {
  ease: number;
  currentX: number;
  targetX: number;
  lastX: number;
  currentY: number;
  targetY: number;
  lastY: number;
  useMomentum: boolean;
  touchMomentum: number;
  lastTouchX: number;
  lastTouchY: number;
  scrollMode: ScrollMode;
  TWEEN_GROUP_SEEK: Group;
  contentWidth: number;
  contentHeight: number;
  windowWidth: number;
  windowHeight: number;
  progressRatio: number;
  isTouching: boolean;
}

export interface ScrollReturn {
  update: (time: number) => void;
  scrollObj: ScrollObj;
}

export const scrollObj: ScrollObj = {
  ease: 0.06,
  currentX: 0,
  targetX: 0,
  lastX: 0,
  currentY: 0,
  targetY: 0,
  lastY: 0,
  useMomentum: false,
  touchMomentum: 0,
  lastTouchX: 0,
  lastTouchY: 0,
  scrollMode: ScrollMode.VERTICAL,
  TWEEN_GROUP_SEEK: new TWEEN.Group(),
  contentWidth: 0,
  contentHeight: 0,
  windowWidth: 0,
  windowHeight: 0,
  progressRatio: 0,
  isTouching: false,
};

export const scroll = (): ScrollReturn => {
  const { init: initHandleEvents } = handleEvents();

  initHandleEvents();

  const update = (time: number) => {
    const deltaY = Math.abs(scrollObj.currentY - scrollObj.targetY);
    const deltaX = Math.abs(scrollObj.currentX - scrollObj.targetX);

    if ((deltaY < 0.01 && deltaY > 0) || (deltaX < 0.01 && deltaX > 0)) {
      return;
    }

    scrollObj.lastX = scrollObj.currentX;
    scrollObj.currentX = lerp(
      scrollObj.currentX,
      scrollObj.targetX,
      scrollObj.ease,
    );

    scrollObj.lastY = scrollObj.currentY;
    scrollObj.currentY = lerp(
      scrollObj.currentY,
      scrollObj.targetY,
      scrollObj.ease,
    );

    scrollObj.TWEEN_GROUP_SEEK.update(time);

    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    scrollObj.touchMomentum *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!scrollObj.useMomentum) {
      return;
    }

    if (scrollObj.touchMomentum >= 0.01 || scrollObj.touchMomentum <= -0.01) {
      applyScroll({
        verticalAmountPx: scrollObj.touchMomentum,
        horizontalAmountPx: scrollObj.touchMomentum,
      });
    }
  };

  return {
    update,
    scrollObj,
  };
};

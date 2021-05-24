import TWEEN, { Group } from '@tweenjs/tween.js';

import { lerp } from './utils/lerp';
import { handleEvents } from './functions/handleEvents';
import { MOMENTUM_DAMPING } from './constants';
import { applyScroll } from './functions/applyScroll';
import { initSeekTo, SeekTo } from './functions/seekTo';

export enum ScrollMode {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

export interface ScrollObj {
  ease: number;
  currentX: number;
  targetX: number;
  lastX: number;
  currentY: number;
  targetY: number;
  lastY: number;
  currentStrengthY: number;
  targetStrengthY: number;
  lastStrengthY: number;
  currentStrengthX: number;
  targetStrengthX: number;
  lastStrengthX: number;
  useMomentum: boolean;
  touchMomentum: number;
  lastTouchX: number;
  lastTouchY: number;
  scrollMode: ScrollMode;
  TWEEN_GROUP_SEEK: Group;
  viewportSizes: Sizes;
  contentSizes: Sizes;
  progressRatio: number;
  isTouching: boolean;
}

export interface ScrollReturn {
  update: (time: number) => void;
  destroy: () => void;
  init: () => void;
  scrollObj: ScrollObj;
  seekTo: (props: SeekTo) => void;
}

interface Sizes {
  width: number;
  height: number;
}

export const scroll = (
  contentSizes: Sizes,
  viewportSizes: Sizes,
): ScrollReturn => {
  const scrollObj: ScrollObj = {
    ease: 0.06,
    currentX: 0,
    targetX: 0,
    lastX: 0,
    currentY: 0,
    targetY: 0,
    lastY: 0,
    currentStrengthY: 0,
    targetStrengthY: 0,
    lastStrengthY: 0,
    currentStrengthX: 0,
    targetStrengthX: 0,
    lastStrengthX: 0,
    useMomentum: false,
    touchMomentum: 0,
    lastTouchX: 0,
    lastTouchY: 0,
    scrollMode: ScrollMode.VERTICAL,
    TWEEN_GROUP_SEEK: new TWEEN.Group(),
    viewportSizes: viewportSizes,
    contentSizes: contentSizes,
    progressRatio: 0,
    isTouching: false,
  };

  const {
    destroy: destroyHandleEvents,
    init: initHandleEvents,
  } = handleEvents({ scrollObj });

  const { seekTo } = initSeekTo(scrollObj);

  const init = () => {
    initHandleEvents();
  };

  const destroy = () => {
    destroyHandleEvents();
  };

  const update = (time: number) => {
    // const deltaY = Math.abs(scrollObj.currentY - scrollObj.targetY);
    // const deltaX = Math.abs(scrollObj.currentX - scrollObj.targetX);

    // if ((deltaY < 0.01 && deltaY > 0) || (deltaX < 0.01 && deltaX > 0)) {
    //   return;
    // }

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

    //Update strengthY
    scrollObj.lastStrengthY = scrollObj.currentStrengthY;
    scrollObj.currentStrengthY = lerp(
      scrollObj.currentStrengthY,
      scrollObj.targetStrengthY,
      scrollObj.ease,
    );
    scrollObj.targetStrengthY = Math.abs(scrollObj.currentY - scrollObj.lastY);

    //Update strengthX
    scrollObj.lastStrengthX = scrollObj.currentStrengthX;
    scrollObj.currentStrengthX = lerp(
      scrollObj.currentStrengthX,
      scrollObj.targetStrengthX,
      scrollObj.ease,
    );
    scrollObj.targetStrengthX = Math.abs(scrollObj.currentX - scrollObj.lastX);

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
        scrollObj,
      });
    }
  };

  return {
    update,
    init,
    destroy,
    scrollObj,
    seekTo,
  };
};

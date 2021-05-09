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
  ease: 0.05,
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

  // let isDown = false;
  // let start;

  // /**
  //  * Events.
  //  */
  // const onTouchDown = event => {
  //   isDown = true;

  //   scrollObj.position = scrollObj.current;
  //   start = event.touches ? event.touches[0].clientY : event.clientY;
  // };

  // const onTouchMove = event => {
  //   if (!isDown) return;

  //   const y = event.touches ? event.touches[0].clientY : event.clientY;
  //   const distance = (start - y) * 2;

  //   scrollObj.target = scrollObj.position + distance;
  // };

  // const onTouchUp = event => {
  //   isDown = false;
  // };

  // const onWheel = event => {
  //   const normalized = normalizeWheel(event);
  //   const speed = normalized.pixelY;

  //   scrollObj.target += speed * 0.5;
  // };

  const update = (time: number) => {
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

  // const addEventListeners = () => {
  //   window.addEventListener('mousewheel', onWheel);
  //   window.addEventListener('wheel', onWheel);

  //   window.addEventListener('mousedown', onTouchDown);
  //   window.addEventListener('mousemove', onTouchMove);
  //   window.addEventListener('mouseup', onTouchUp);

  //   window.addEventListener('touchstart', onTouchDown);
  //   window.addEventListener('touchmove', onTouchMove);
  //   window.addEventListener('touchend', onTouchUp);
  // };

  // addEventListeners();

  return {
    update,
    scrollObj,
  };
};

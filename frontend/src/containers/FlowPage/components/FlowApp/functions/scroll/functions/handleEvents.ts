import normalizeWheel from 'normalize-wheel';

import { scrollObj, ScrollMode } from '../scroll';
import { MOMENTUM_CARRY } from '../constants';
import { applyScroll } from './applyScroll';
import { appObj } from '../../app';

export const handleEvents = () => {
  const onTouchDown = (event: TouchEvent & PointerEvent) => {
    scrollObj.isTouching = true;
    scrollObj.useMomentum = false;
    scrollObj.lastTouchX = event.touches
      ? event.touches[0].clientX
      : event.clientX;
    scrollObj.lastTouchY = event.touches
      ? event.touches[0].clientY
      : event.clientY;
  };

  const onTouchMove = (event: TouchEvent & PointerEvent) => {
    if (!scrollObj.isTouching) {
      return;
    }

    const touchX = event.touches ? event.touches[0].clientX : event.clientX;
    const touchY = event.touches ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - scrollObj.lastTouchX;
    const deltaY = touchY - scrollObj.lastTouchY;

    scrollObj.lastTouchX = touchX;
    scrollObj.lastTouchY = touchY;

    scrollObj.touchMomentum *= MOMENTUM_CARRY;

    switch (scrollObj.scrollMode) {
      case ScrollMode.VERTICAL:
        scrollObj.touchMomentum += deltaY;
        break;
      case ScrollMode.HORIZONTAL:
        scrollObj.touchMomentum += deltaX;
        break;
      default:
        throw new Error('Invalid timeline mode');
    }

    applyScroll({ horizontalAmountPx: deltaX, verticalAmountPx: deltaY });
  };

  const onTouchUp = () => {
    scrollObj.isTouching = false;
    scrollObj.useMomentum = true;
  };

  const onWheel = event => {
    scrollObj.useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    applyScroll({
      horizontalAmountPx: -pixelY,
      verticalAmountPx: -pixelY,
    });
  };

  const onResize = () => {
    scrollObj.TWEEN_GROUP_SEEK && scrollObj.TWEEN_GROUP_SEEK.removeAll();
    scrollObj.useMomentum = false;

    scrollObj.contentHeight = appObj.sizes.height * 4;
    scrollObj.contentWidth = appObj.sizes.width;

    scrollObj.windowHeight = appObj.sizes.height;
    scrollObj.windowWidth = appObj.sizes.width;

    // contentHeight.current = getElHeight(contentWrapperRef);
    // contentWidth.current = getElWidth(contentWrapperRef);
    // windowHeight.current = window.innerHeight;
    // windowWidth.current = window.innerWidth;

    // if (windowWidth.current >= breakpoints.tablet) {
    //   timelineMode.current = TimelineMode.TIMELINE_MODE_HORIZONTAL;
    //   offsetY.set(0);
    //   offsetX.set(getProgressValues().currentOffset);
    // } else {
    // timelineMode.current = TimelineMode.TIMELINE_MODE_VERTICAL;
    // offsetX.set(0);
    // offsetY.set(getProgressValues().currentOffset);
    // }
  };

  const init = () => {
    window.addEventListener('mousewheel', onWheel);
    window.addEventListener('wheel', onWheel);

    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);

    window.addEventListener('resize', onResize);

    onResize();
  };

  return {
    init,
  };
};

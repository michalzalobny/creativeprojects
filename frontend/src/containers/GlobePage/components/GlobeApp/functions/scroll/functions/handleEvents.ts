import normalizeWheel from 'normalize-wheel';

import { ScrollObj, ScrollMode } from '../scroll';
import { MOMENTUM_CARRY, MOUSE_MULTIPLIER } from '../constants';
import { applyScroll } from './applyScroll';
import { getProgressValues } from './getProgressValues';

interface HandleEvents {
  scrollObj: ScrollObj;
}

export const handleEvents = ({ scrollObj }: HandleEvents) => {
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

    const deltaX =
      (touchX - scrollObj.lastTouchX) * (event.touches ? 1 : MOUSE_MULTIPLIER);
    const deltaY =
      (touchY - scrollObj.lastTouchY) * (event.touches ? 1 : MOUSE_MULTIPLIER);

    scrollObj.lastTouchX = touchX;
    scrollObj.lastTouchY = touchY;

    scrollObj.touchMomentumX *= MOMENTUM_CARRY;
    scrollObj.touchMomentumY *= MOMENTUM_CARRY;

    scrollObj.touchMomentumY += deltaY;
    scrollObj.touchMomentumX += deltaX;

    applyScroll({
      horizontalAmountPx: deltaX,
      verticalAmountPx: deltaY,
      scrollObj,
    });
  };

  const onTouchUp = () => {
    scrollObj.isTouching = false;
    scrollObj.useMomentum = true;
  };

  const onWheel = event => {
    scrollObj.useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    applyScroll({
      horizontalAmountPx: -pixelY / 2,
      verticalAmountPx: 0,
      scrollObj,
    });
  };

  const onResize = () => {
    scrollObj.TWEEN_GROUP_SEEK && scrollObj.TWEEN_GROUP_SEEK.removeAll();
    scrollObj.useMomentum = false;

    const currentOffset = getProgressValues(scrollObj).currentOffset;

    switch (scrollObj.scrollMode) {
      case ScrollMode.VERTICAL:
        scrollObj.lastX = 0;
        scrollObj.currentX = 0;
        scrollObj.targetX = 0;

        scrollObj.lastY = currentOffset;
        scrollObj.currentY = currentOffset;
        scrollObj.targetY = currentOffset;

        break;
      case ScrollMode.HORIZONTAL:
        scrollObj.lastY = 0;
        scrollObj.currentY = 0;
        scrollObj.targetY = 0;

        scrollObj.lastX = currentOffset;
        scrollObj.currentX = currentOffset;
        scrollObj.targetX = currentOffset;

        break;
      default:
        throw new Error('Invalid timeline mode');
    }
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

  const destroy = () => {
    window.removeEventListener('mousewheel', onWheel);
    window.removeEventListener('wheel', onWheel);

    window.removeEventListener('mousedown', onTouchDown);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchUp);

    window.removeEventListener('touchstart', onTouchDown);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchUp);

    window.removeEventListener('resize', onResize);
  };

  return {
    init,
    destroy,
  };
};

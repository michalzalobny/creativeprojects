import normalizeWheel from 'normalize-wheel';

import { ScrollObj } from '../Scroll';
import { MOMENTUM_CARRY, MOUSE_MULTIPLIER } from '../constants';

export class HandleEvents {
  scrollObj: ScrollObj;

  constructor(scrollObj: ScrollObj) {
    this.scrollObj = scrollObj;
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this.scrollObj.isTouching = true;
    this.scrollObj.useMomentum = false;
    this.scrollObj.lastTouch.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this.scrollObj.lastTouch.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    if (!this.scrollObj.isTouching) {
      return;
    }

    if (!this.scrollObj.applyScroll) {
      return;
    }

    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX =
      (touchX - this.scrollObj.lastTouch.x) *
      ('touches' in event ? 1 : MOUSE_MULTIPLIER);
    const deltaY =
      (touchY - this.scrollObj.lastTouch.y) *
      ('touches' in event ? 1 : MOUSE_MULTIPLIER);

    this.scrollObj.lastTouch.x = touchX;
    this.scrollObj.lastTouch.y = touchY;

    this.scrollObj.touchMomentum.x *= MOMENTUM_CARRY;
    this.scrollObj.touchMomentum.y *= MOMENTUM_CARRY;

    this.scrollObj.touchMomentum.y += deltaY;
    this.scrollObj.touchMomentum.x += deltaX;

    this.scrollObj.applyScroll.applyScrollXY({ x: deltaX, y: deltaY });
  };

  onTouchUp = () => {
    this.scrollObj.isTouching = false;
    this.scrollObj.useMomentum = true;
  };

  onWheel = (event: WheelEvent) => {
    if (!this.scrollObj.applyScroll) {
      return;
    }

    this.scrollObj.useMomentum = false;

    const { pixelY } = normalizeWheel(event);

    this.scrollObj.applyScroll.applyScrollXY({ x: -pixelY, y: -pixelY });
  };

  onResize = () => {
    this.scrollObj.useMomentum = false;
  };

  init = () => {
    window.addEventListener('wheel', this.onWheel);

    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);

    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);

    window.addEventListener('resize', this.onResize);

    this.onResize();
  };

  destroy = () => {
    window.removeEventListener('wheel', this.onWheel);

    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);

    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);

    window.removeEventListener('resize', this.onResize);
  };
}

import { MouseMoveObj } from '../types';

export class HandleEvents {
  mouseMoveObj: MouseMoveObj;

  constructor(mouseMoveObj: MouseMoveObj) {
    this.mouseMoveObj = mouseMoveObj;
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this.mouseMoveObj.isInit = true;
    this.mouseMoveObj.isTouching = true;
    this.mouseMoveObj.mouseLast.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this.mouseMoveObj.mouseLast.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    this.mouseMoveObj.isInit = true;
    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - this.mouseMoveObj.mouseLast.x;
    const deltaY = touchY - this.mouseMoveObj.mouseLast.y;

    this.mouseMoveObj.strength = deltaX * deltaX + deltaY * deltaY;

    this.mouseMoveObj.mouseLast.x = touchX;
    this.mouseMoveObj.mouseLast.y = touchY;

    this.mouseMoveObj.mouse.x += deltaX;
    this.mouseMoveObj.mouse.y += deltaY;
  };

  onTouchUp = () => {
    this.mouseMoveObj.isTouching = false;
  };

  onMouseLeave = () => {};

  init() {
    window.addEventListener('mousedown', this.onTouchDown);
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);

    window.addEventListener('touchstart', this.onTouchDown);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchUp);

    window.addEventListener('mouseleave', this.onMouseLeave);
  }

  destroy() {
    window.removeEventListener('mousedown', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);

    window.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);

    window.removeEventListener('mouseleave', this.onMouseLeave);
  }
}

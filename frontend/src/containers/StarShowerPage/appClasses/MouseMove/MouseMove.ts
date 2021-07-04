import { EventDispatcher } from 'three';

import { UpdateInfo } from '../App';
import { lerp } from './utils/lerp';

interface Mouse {
  x: number;
  y: number;
}

export class MouseMove extends EventDispatcher {
  mouseLast: Mouse = { x: 0, y: 0 };
  mouse: Mouse = { x: 0, y: 0 };
  mouseLerp: Mouse = { x: 0, y: 0 };
  isTouching = false;
  isInit = false;
  ease = 0.09;
  strength = 0;
  strengthLerp = 0;

  constructor() {
    super();
    this.addEvents();
  }

  onTouchDown = (event: TouchEvent | MouseEvent) => {
    this.isInit = true;
    this.isTouching = true;
    this.mouseLast.x =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    this.mouseLast.y =
      'touches' in event ? event.touches[0].clientY : event.clientY;
  };

  onTouchMove = (event: TouchEvent | MouseEvent) => {
    // Uncomment if should draw only when pressed
    // if (!this.isTouching) {
    //   return;
    // }
    this.isInit = true;
    const touchX =
      'touches' in event ? event.touches[0].clientX : event.clientX;
    const touchY =
      'touches' in event ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - this.mouseLast.x;
    const deltaY = touchY - this.mouseLast.y;

    this.strength = deltaX * deltaX + deltaY * deltaY;

    this.mouseLast.x = touchX;
    this.mouseLast.y = touchY;

    this.mouse.x += deltaX;
    this.mouse.y += deltaY;

    this.dispatchEvent({ type: 'mousemoved', context: this });
  };

  onTouchUp = () => {
    this.isTouching = false;
  };

  onMouseLeave = () => {};

  addEvents() {
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

  update(updateInfo: UpdateInfo) {
    const { ease, mouse, mouseLast, mouseLerp } = this;

    mouseLast.x = mouse.x;
    mouseLast.y = mouse.y;

    mouseLerp.x = lerp(mouseLerp.x, mouse.x, ease * updateInfo.slowDownFactor);
    mouseLerp.y = lerp(mouseLerp.y, mouse.y, ease * updateInfo.slowDownFactor);

    //Update strengthLerp
    this.strengthLerp = lerp(
      this.strengthLerp,
      this.strength,
      ease * updateInfo.slowDownFactor,
    );
  }
}

// //Update mouse3Ds
// mouse3D.x = (mouse.x / this.viewportSizes.width) * 2 - 1;
// mouse3D.y = -(mouse.y / this.viewportSizes.height) * 2 + 1;

// mouse3DLerp.x = (mouseLerp.x / this.viewportSizes.width) * 2 - 1;
// mouse3DLerp.y = -(mouseLerp.y / this.viewportSizes.height) * 2 + 1;

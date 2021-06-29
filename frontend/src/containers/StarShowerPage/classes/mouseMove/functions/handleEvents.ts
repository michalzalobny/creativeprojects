import { MouseMoveObj } from '../mouseMove';

interface HandleEvents {
  mouseMoveObj: MouseMoveObj;
}

export interface HandleEventsReturn {
  init: () => void;
  destroy: () => void;
}

export const handleEvents = ({
  mouseMoveObj,
}: HandleEvents): HandleEventsReturn => {
  const onTouchDown = (event: TouchEvent & PointerEvent) => {
    mouseMoveObj.isInit = true;
    mouseMoveObj.isTouching = true;
    mouseMoveObj.mouseLast.x = event.touches
      ? event.touches[0].clientX
      : event.clientX;
    mouseMoveObj.mouseLast.y = event.touches
      ? event.touches[0].clientY
      : event.clientY;
  };

  const onTouchMove = (event: TouchEvent & PointerEvent) => {
    mouseMoveObj.isInit = true;
    const touchX = event.touches ? event.touches[0].clientX : event.clientX;
    const touchY = event.touches ? event.touches[0].clientY : event.clientY;

    const deltaX = touchX - mouseMoveObj.mouseLast.x;
    const deltaY = touchY - mouseMoveObj.mouseLast.y;

    mouseMoveObj.mouseLast.x = touchX;
    mouseMoveObj.mouseLast.y = touchY;

    mouseMoveObj.mouse.x += deltaX;
    mouseMoveObj.mouse.y += deltaY;
  };

  const onTouchUp = () => {
    mouseMoveObj.isTouching = false;
  };

  const onMouseLeave = () => {};

  const init = () => {
    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);

    window.addEventListener('mouseleave', onMouseLeave);
  };

  const destroy = () => {
    window.removeEventListener('mousedown', onTouchDown);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchUp);

    window.removeEventListener('touchstart', onTouchDown);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchUp);

    window.removeEventListener('mouseleave', onMouseLeave);
  };

  return {
    init,
    destroy,
  };
};

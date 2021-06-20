import { handleEvents } from './functions/handleEvents';
import { lerp } from './utils/lerp';

import { HandleEventsReturn } from './functions/handleEvents';

interface Mouse {
  x: number;
  y: number;
}

export interface MouseMoveObj {
  mouse: Mouse;
  mouseLerp: Mouse;
  mouseLast: Mouse;
  mouse3D: Mouse;
  mouse3DLerp: Mouse;
  isTouching: boolean;
  ease: number;
}

interface MouseMoveManager {
  handleEvents: HandleEventsReturn;
}

export interface MouseMoveReturn {
  destroy: () => void;
  init: () => void;
  update: () => void;
  mouseMoveObj: MouseMoveObj;
}

interface Sizes {
  width: number;
  height: number;
}

interface MouseMove {
  viewportSizes: Sizes;
}

export const mouseMove = ({ viewportSizes }: MouseMove): MouseMoveReturn => {
  const mouseMoveObj: MouseMoveObj = {
    mouse: { x: viewportSizes.width / 2, y: viewportSizes.height / 2 },
    mouseLerp: { x: viewportSizes.width / 2, y: viewportSizes.height / 2 },
    mouseLast: { x: 0, y: 0 },
    mouse3D: { x: 0, y: 0 },
    mouse3DLerp: { x: 0, y: 0 },
    isTouching: false,
    ease: 0.09,
  };

  const mouseMoveManager: MouseMoveManager = {
    handleEvents: null,
  };

  const init = () => {
    mouseMoveManager.handleEvents = handleEvents({ mouseMoveObj });
    mouseMoveManager.handleEvents.init();
  };

  const destroy = () => {
    mouseMoveManager.handleEvents.destroy();
  };

  const update = () => {
    const {
      ease,
      mouse,
      mouse3D,
      mouse3DLerp,
      mouseLast,
      mouseLerp,
    } = mouseMoveObj;

    mouseLast.x = mouse.x;
    mouseLast.y = mouse.y;

    mouseLerp.x = lerp(mouseLerp.x, mouse.x, ease);
    mouseLerp.y = lerp(mouseLerp.y, mouse.y, ease);

    //Update mouse3Ds
    mouse3D.x = (mouse.x / viewportSizes.width) * 2 - 1;
    mouse3D.y = -(mouse.y / viewportSizes.height) * 2 + 1;

    mouse3DLerp.x = (mouseLerp.x / viewportSizes.width) * 2 - 1;
    mouse3DLerp.y = -(mouseLerp.y / viewportSizes.height) * 2 + 1;
  };

  return {
    destroy,
    init,
    update,
    mouseMoveObj,
  };
};

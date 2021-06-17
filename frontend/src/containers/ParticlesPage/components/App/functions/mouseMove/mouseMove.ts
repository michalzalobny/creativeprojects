import * as THREE from 'three';

import { handleEvents } from './functions/handleEvents';
import { lerp } from './utils/lerp';

import { HandleEventsReturn } from './functions/handleEvents';

interface Mouse {
  x: number;
  y: number;
}

interface Strength {
  current: number;
  target: number;
}

export interface MouseMoveObj {
  mouse: Mouse;
  mouseLast: Mouse;
  mouse3D: THREE.Vector2;
  mouse3DLerp: THREE.Vector2;
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
    mouseLast: { x: 0, y: 0 },
    mouse3D: new THREE.Vector2(0, 0),
    mouse3DLerp: new THREE.Vector2(0, 0),
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
    mouseMoveObj.mouseLast.x = mouseMoveObj.mouse.x;
    mouseMoveObj.mouseLast.y = mouseMoveObj.mouse.y;

    //Update mouse3Ds
    mouseMoveObj.mouse3D.x =
      (mouseMoveObj.mouse.x / viewportSizes.width) * 2 - 1;

    mouseMoveObj.mouse3D.y =
      -(mouseMoveObj.mouse.y / viewportSizes.height) * 2 + 1;

    mouseMoveObj.mouse3DLerp.x = lerp(
      mouseMoveObj.mouse3DLerp.x,
      mouseMoveObj.mouse3D.x,
      mouseMoveObj.ease,
    );

    mouseMoveObj.mouse3DLerp.y = lerp(
      mouseMoveObj.mouse3DLerp.y,
      mouseMoveObj.mouse3D.y,
      mouseMoveObj.ease,
    );
  };

  return {
    destroy,
    init,
    update,
    mouseMoveObj,
  };
};

interface Mouse {
  x: number;
  y: number;
}

export interface Sizes {
  width: number;
  height: number;
}

export interface MouseMoveObj {
  mouse: Mouse;
  mouseLerp: Mouse;
  mouseLast: Mouse;
  mouse3D: Mouse;
  mouse3DLerp: Mouse;
  isTouching: boolean;
  isInit: boolean;
  ease: number;
  strength: number;
  strengthLerp: number;
}

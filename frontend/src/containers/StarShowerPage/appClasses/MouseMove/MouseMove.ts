import { HandleEvents } from './classes/HandleEvents';
import { lerp } from './utils/lerp';
import { MouseMoveObj, Sizes } from './types';

export class MouseMove {
  viewportSizes: Sizes;
  handleEvents: HandleEvents;
  mouseMoveObj: MouseMoveObj;

  constructor(viewportSizes: Sizes) {
    this.viewportSizes = viewportSizes;

    this.mouseMoveObj = {
      mouse: {
        x: this.viewportSizes.width / 2,
        y: this.viewportSizes.height / 2,
      },
      mouseLerp: {
        x: this.viewportSizes.width / 2,
        y: this.viewportSizes.height / 2,
      },
      mouseLast: { x: 0, y: 0 },
      mouse3D: { x: 0, y: 0 },
      mouse3DLerp: { x: 0, y: 0 },
      isTouching: false,
      isInit: false,
      ease: 0.09,
      strength: 0,
      strengthLerp: 0,
    };

    this.handleEvents = new HandleEvents(this.mouseMoveObj);
  }

  init() {
    this.handleEvents.init();
  }

  destroy() {
    this.handleEvents.destroy();
  }

  update() {
    const {
      ease,
      mouse,
      mouse3D,
      mouse3DLerp,
      mouseLast,
      mouseLerp,
    } = this.mouseMoveObj;

    mouseLast.x = mouse.x;
    mouseLast.y = mouse.y;

    mouseLerp.x = lerp(mouseLerp.x, mouse.x, ease);
    mouseLerp.y = lerp(mouseLerp.y, mouse.y, ease);

    //Update strengthLerp
    this.mouseMoveObj.strengthLerp = lerp(
      this.mouseMoveObj.strengthLerp,
      this.mouseMoveObj.strength,
      ease,
    );

    //Update mouse3Ds
    mouse3D.x = (mouse.x / this.viewportSizes.width) * 2 - 1;
    mouse3D.y = -(mouse.y / this.viewportSizes.height) * 2 + 1;

    mouse3DLerp.x = (mouseLerp.x / this.viewportSizes.width) * 2 - 1;
    mouse3DLerp.y = -(mouseLerp.y / this.viewportSizes.height) * 2 + 1;
  }
}

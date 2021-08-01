import { InteractiveScene } from './InteractiveScene';
import { SpiralSpline } from './SpiralSpline';
import { UpdateInfo } from './types';

export class SpiralScene extends InteractiveScene {
  _spiralSpline = new SpiralSpline();

  constructor() {
    super();
  }

  update(updateInfo: UpdateInfo) {}
  destroy() {}

  init() {
    this._spiralSpline.position.z = this._spiralSpline.depth;
    this.add(this._spiralSpline);
  }
}

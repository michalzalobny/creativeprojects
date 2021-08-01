import * as THREE from 'three';
import { InteractiveScene } from './InteractiveScene';
import { SpiralSpline } from './SpiralSpline';
import { UpdateInfo } from './types';

export class SpiralScene extends InteractiveScene {
  spiralSpline = new SpiralSpline();

  constructor(camera: THREE.PerspectiveCamera) {
    super(camera);

    this.camera.fov = 60;
    this.camera.position.z = this.spiralSpline.depth * 1.5;
  }

  update(updateInfo: UpdateInfo) {}
  destroy() {}

  init() {
    this.spiralSpline.position.z = this.spiralSpline.depth;
    this.add(this.spiralSpline);
  }
}

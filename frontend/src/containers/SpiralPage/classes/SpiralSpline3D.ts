import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { UpdateInfo, Bounds } from './types';
import fragmentShader from './shaders/dots/fragment.glsl';
import vertexShader from './shaders/dots/vertex.glsl';
import { InteractiveObject3D } from './InteractiveObject3D';
import { getRandFloat } from './utils/getRand';

export class SpiralSpline3D extends InteractiveObject3D {
  _mesh: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _geometry: THREE.BufferGeometry | null = null;
  _radius: number;
  _loops: number;
  _density: number;
  _intersectPoint: THREE.Vector3 | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _progressTween: Tween<{ progress: number }> | null = null;
  _progress = 0.91;
  depth: number;

  constructor(radius = 105, loops = 5, density = 1, depth = 50) {
    super();
    this._radius = radius;
    this._loops = loops;
    this._density = density;
    this.depth = depth;
    this._drawSpiral();
  }

  _drawSpiral() {
    this._geometry = new THREE.BufferGeometry();

    const rotation = 2 * Math.PI;
    const thetaMax = this._loops * rotation;
    const awayStep = this._radius / thetaMax;
    const chord = this._density;
    let particlesAmount = 0;

    for (let theta = this._density; theta <= thetaMax; ) {
      const away = awayStep * theta;
      particlesAmount++;
      theta += chord / away;
    }
    let i = 0;
    const positionArray = new Float32Array(particlesAmount * 3);
    const positionArray2 = new Float32Array(particlesAmount * 3);
    const randomArray = new Float32Array(particlesAmount);

    for (let theta = this._density; theta <= thetaMax; ) {
      const away = awayStep * theta;

      const x = Math.sin(theta + rotation) * away;
      const y = Math.cos(theta + rotation) * away;

      positionArray[i * 3 + 0] = x;
      positionArray[i * 3 + 1] = y;
      positionArray[i * 3 + 2] = -this.depth;
      randomArray[i] = getRandFloat(-2, 2);

      positionArray2[i * 3 + 0] = Math.random() * x * 3;
      positionArray2[i * 3 + 1] = Math.random() * y * 3;
      positionArray2[i * 3 + 2] = -this.depth;

      theta += chord / away;
      i += 1;
    }

    this._geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3),
    );

    this._geometry.setAttribute(
      'position2',
      new THREE.BufferAttribute(positionArray2, 3),
    );

    this._material = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: true,
      uniforms: {
        uPixelRatio: { value: 1 },
        uSize: { value: 565 },
        uTime: { value: 0 },
        uProgress: { value: this._progress },
        uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    this._geometry.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(randomArray, 1),
    );

    this._mesh = new THREE.Points(this._geometry, this._material);
    this._mesh.renderOrder = -1;

    this.add(this._mesh);
  }

  static getPointPosition(
    progress: number,
    radius: number,
    loops: number,
    depth: number,
  ) {
    return {
      x: Math.sin(progress * loops * Math.PI * 2) * radius * progress,
      y: Math.cos(progress * loops * Math.PI * 2) * radius * progress,
      z: -depth,
    };
  }

  getPointPosition(progress: number) {
    return SpiralSpline3D.getPointPosition(
      progress,
      this._radius,
      this._loops,
      this.depth,
    );
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    if (this._material) {
      this._material.uniforms.uPixelRatio.value =
        (Math.min(2, window.devicePixelRatio) * this._rendererBounds.height) /
        1080;
    }
  }

  set intersectPoint(point: THREE.Vector3) {
    this._intersectPoint = point;
  }

  animateProgress(destination: number) {
    if (this._progressTween) {
      this._progressTween.stop();
    }

    this._progressTween = new TWEEN.Tween({ progress: this._progress })
      .to({ progress: destination }, 3200)
      .easing(TWEEN.Easing.Exponential.InOut)
      .delay(1500)
      .onUpdate(obj => {
        if (!this._mesh) {
          return;
        }
        this._progress = obj.progress;
        this._mesh.material.uniforms.uProgress.value = this._progress;
      });

    this._progressTween.start();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    if (this._mesh) {
      this._mesh.material.uniforms.uTime.value = updateInfo.time;
    }
    if (this._intersectPoint && this._mesh) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }

  destroy() {
    super.destroy();
    this._geometry?.dispose();
    this._material?.dispose();
    if (this._mesh) {
      this.remove(this._mesh);
    }
  }
}

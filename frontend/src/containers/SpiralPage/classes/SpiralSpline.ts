import * as THREE from 'three';

import { UpdateInfo, Bounds } from './types';
import fragmentShader from './shaders/dots/fragment.glsl';
import vertexShader from './shaders/dots/vertex.glsl';

export class SpiralSpline extends THREE.Object3D {
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

  _mesh: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _radius: number;
  _loops: number;
  _density: number;
  _intersectPoint: THREE.Vector3 | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  depth: number;

  constructor(radius = 100, loops = 5, density = 1, depth = 50) {
    super();
    this._radius = radius;
    this._loops = loops;
    this._density = density;
    this.depth = depth;

    this._drawSpiral();
  }

  _drawSpiral() {
    const geometry = new THREE.BufferGeometry();

    const rotation = 2 * Math.PI;
    const thetaMax = this._loops * rotation;
    const awayStep = this._radius / thetaMax;
    const chord = this._density;
    let amount = 0;

    for (let theta = this._density; theta <= thetaMax; ) {
      const away = awayStep * theta;
      amount++;
      theta += chord / away;
    }
    let i = 0;

    const positionArray = new Float32Array(amount * 3);
    const randomArray = new Float32Array(amount);

    for (let theta = this._density; theta <= thetaMax; ) {
      const away = awayStep * theta;

      const x = Math.sin(theta + rotation) * away;
      const y = Math.cos(theta + rotation) * away;

      positionArray[i * 3 + 0] = x;
      positionArray[i * 3 + 1] = y;
      positionArray[i * 3 + 2] = -this.depth;
      randomArray[i] = Math.random();

      theta += chord / away;
      i += 1;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3),
    );

    this._material = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: true,
      uniforms: {
        uPixelRatio: { value: 1 },
        uSize: { value: 350 },
        uTime: { value: 0 },
        uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomArray, 1));

    this._mesh = new THREE.Points(geometry, this._material);
    this._mesh.renderOrder = -1;

    this.add(this._mesh);
  }

  getPointPosition(progress: number) {
    return SpiralSpline.getPointPosition(
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

  init() {}

  update(updateInfo: UpdateInfo) {
    if (this._mesh) {
      this._mesh.material.uniforms.uTime.value = updateInfo.time;
    }
    if (this._intersectPoint && this._mesh) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }

  destroy() {}
}

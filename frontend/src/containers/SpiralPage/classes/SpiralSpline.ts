import * as THREE from 'three';

import { MouseMove } from './MouseMove/MouseMove';
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
  depth: number;
  _mouseMove: MouseMove;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _raycasterPlane: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  > | null = null;
  _raycaster: THREE.Raycaster;
  _camera: THREE.Camera;

  constructor(
    radius = 100,
    loops = 5,
    density = 1,
    depth = 50,
    mouseMove: MouseMove,
    raycaster: THREE.Raycaster,
    camera: THREE.Camera,
  ) {
    super();
    this._radius = radius;
    this._loops = loops;
    this._density = density;
    this.depth = depth;
    this._mouseMove = mouseMove;
    this._raycaster = raycaster;
    this._camera = camera;
    this._drawRaycasterPlane();
    this._drawSpiral();
  }

  _drawRaycasterPlane() {
    this._raycasterPlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1000, 1000),
      new THREE.MeshBasicMaterial(),
    );
    this._raycasterPlane.position.z = -this.depth;
    this.add(this._raycasterPlane);
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
        uPixelRatio: { value: window.devicePixelRatio },
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

  onMouseMove = (e: THREE.Event) => {
    const currentX = (e.target as MouseMove).mouseLerp.x;
    const currentY = (e.target as MouseMove).mouseLerp.y;

    const mouseX = (currentX / this._rendererBounds.width) * 2 - 1;
    const mouseY = -(currentY / this._rendererBounds.height) * 2 + 1;

    this._raycaster.setFromCamera({ x: mouseX, y: mouseY }, this._camera);

    if (this._raycasterPlane) {
      const intersects = this._raycaster.intersectObjects([
        this._raycasterPlane,
      ]);
      if (intersects[0] && this._material) {
        this._material.uniforms.uMouse3D.value = intersects[0].point;
      }
    }
  };

  _addEvents() {
    this._mouseMove.addEventListener('mousemoved', this.onMouseMove);
  }

  _removeEvents() {
    this._mouseMove.removeEventListener('mousemoved', this.onMouseMove);
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }

  init() {
    this._addEvents();
  }

  update(updateInfo: UpdateInfo) {
    if (this._mesh) {
      this._mesh.material.uniforms.uTime.value = updateInfo.time;
    }
  }

  destroy() {
    this._removeEvents();
  }
}

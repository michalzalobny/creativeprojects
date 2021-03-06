import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import fragmentShader from '../shaders/media/fragment.glsl';
import vertexShader from '../shaders/media/vertex.glsl';
import { InteractiveObject3D } from './InteractiveObject3D';
import { Bounds, UpdateInfo, AnimateProps } from '../types';

interface Constructor {
  geometry: THREE.PlaneGeometry;
}

export class MediaObject3D extends InteractiveObject3D {
  _geometry: THREE.PlaneGeometry;
  _material: THREE.ShaderMaterial | null = null;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _intersectPoint: THREE.Vector3 | null = null;
  _masterOpacity = 1;
  _tweenOpacity = 0;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _isVisible = false;

  constructor({ geometry }: Constructor) {
    super();
    this._geometry = geometry;
    this._createMesh();
  }

  _createMesh() {
    this._material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        tMap: { value: null },
        uImageSizes: { value: [0, 0] },
        uPlaneSizes: { value: [0, 0] },
        uTime: { value: 0 },
        uRandom: { value: Math.random() },
        uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
        uViewportSizes: {
          value: [this._rendererBounds.width, this._rendererBounds.height],
        },
        uStrength: { value: 0 },
        uOpacity: { value: this._tweenOpacity },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this.add(this._mesh);
  }

  animateOpacity(props: AnimateProps) {
    const {
      destination,
      duration = 500,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    if (this._mesh) this._mesh.material.uniforms.uTime.value = updateInfo.time;

    if (this._intersectPoint && this._mesh) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }

  destroy() {
    super.destroy();
    this._material?.dispose();
    if (this._mesh) {
      this.remove(this._mesh);
    }
  }

  onResize() {}

  set intersectPoint(point: THREE.Vector3) {
    this._intersectPoint = point;
  }

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;

    if (this._mesh) {
      this._mesh.material.uniforms.uViewportSizes.value = [
        this._rendererBounds.width,
        this._rendererBounds.height,
      ];
    }
  }

  setOpacity(value: number) {
    if (this._mesh) {
      this._mesh.material.uniforms.uOpacity.value = value;
      this._isVisible = value > InteractiveObject3D.visibilityThreshold;
    }
  }
}

import * as THREE from 'three';
import fragmentShader from '../shaders/media/fragment.glsl';
import vertexShader from '../shaders/media/vertex.glsl';

import { InteractiveObject3D } from './InteractiveObject3D';
import { Bounds, TextureItem, UpdateInfo } from '../types';

interface Constructor {
  geometry: THREE.PlaneGeometry;
}

export class MediaObject3D extends InteractiveObject3D {
  _geometry: THREE.PlaneGeometry;
  _material: THREE.ShaderMaterial | null = null;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _textureItem: TextureItem | null = null;
  _extra = { x: 0, y: 0 };
  _intersectPoint: THREE.Vector3 | null = null;
  _masterOpacity = 1;
  _tweenOpacity = 0;
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
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uTime: { value: 0 },
        uHovered: { value: 0 },
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

  _updateTexture() {
    if (this._material && this._textureItem && this._mesh) {
      this._material.uniforms.tMap.value = this._textureItem.texture;

      this._material.uniforms.uImageSizes.value = [
        this._textureItem.naturalWidth,
        this._textureItem.naturalHeight,
      ];
    }
  }

  set opacity(value: number) {
    this._masterOpacity = value;
  }

  _updateOpacity() {
    if (this._mesh) {
      const computedOpacity =
        Math.min(this._masterOpacity, 1) * this._tweenOpacity;

      this._mesh.material.uniforms.uOpacity.value = computedOpacity;
      this._isVisible = computedOpacity > 0;
    }
  }

  set intersectPoint(point: THREE.Vector3) {
    this._intersectPoint = point;
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;

    if (this._mesh) {
      this._mesh.material.uniforms.uViewportSizes.value = [
        this._rendererBounds.width,
        this._rendererBounds.height,
      ];
    }
  }

  set textureItem(textureItem: TextureItem) {
    this._textureItem = textureItem;
    this._updateTexture();
    this.onResize();
  }

  onResize() {}

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._updateOpacity();

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

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
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _intersectPoint: THREE.Vector3 | null = null;
  _masterOpacity = 1;
  _tweenOpacity = 0;
  _isVisible = false;
  _strength = 0;
  _randomSign = 1;
  _randomValue = 1;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _textureItem: TextureItem | null = null;
  _group: THREE.Group;

  _meshBack: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.ShaderMaterial
  > | null = null;
  _materialBack: THREE.ShaderMaterial | null = null;
  _textureItemBack: TextureItem | null = null;

  constructor({ geometry }: Constructor) {
    super();
    this._geometry = geometry;

    this._randomSign = Math.random() > 0.5 ? 1 : -1;
    this._randomValue = Math.random();

    this._group = new THREE.Group();
    this.add(this._group);
    this._createMesh();
    this._createMeshBack();
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
        uRandom: { value: this._randomValue },
        uRandomSign: { value: this._randomSign },
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
    this._group.add(this._mesh);
  }

  _createMeshBack() {
    this._materialBack = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        tMap: { value: null },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uTime: { value: 0 },
        uRandom: { value: this._randomValue },
        uRandomSign: { value: this._randomSign },
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

    this._meshBack = new THREE.Mesh(this._geometry, this._materialBack);
    this._meshBack.rotation.y = Math.PI;
    this._group.add(this._meshBack);
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

  _updateTextureBack() {
    if (this._materialBack && this._textureItemBack && this._meshBack) {
      this._materialBack.uniforms.tMap.value = this._textureItemBack.texture;

      this._materialBack.uniforms.uImageSizes.value = [
        this._textureItemBack.naturalWidth,
        this._textureItemBack.naturalHeight,
      ];
    }
  }

  _updateOpacity() {
    if (this._mesh && this._meshBack) {
      const computedOpacity =
        Math.min(this._masterOpacity, 1) * this._tweenOpacity;

      this._mesh.material.uniforms.uOpacity.value = computedOpacity;
      this._meshBack.material.uniforms.uOpacity.value = computedOpacity;
      this._isVisible = computedOpacity > 0;
    }
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._updateOpacity();

    if (this._mesh) this._mesh.material.uniforms.uTime.value = updateInfo.time;
    if (this._meshBack)
      this._meshBack.material.uniforms.uTime.value = updateInfo.time;

    if (this._mesh && this._meshBack) {
      this._mesh.material.uniforms.uStrength.value = this._strength;
      this._meshBack.material.uniforms.uStrength.value = this._strength;
    }

    if (this._intersectPoint && this._mesh && this._meshBack) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
      this._meshBack.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }

  destroy() {
    super.destroy();
    this._material?.dispose();
    if (this._mesh && this._meshBack) {
      this.remove(this._mesh);
      this.remove(this._meshBack);
    }
  }

  onResize() {}

  set intersectPoint(point: THREE.Vector3) {
    this._intersectPoint = point;
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;

    if (this._mesh && this._meshBack) {
      this._mesh.material.uniforms.uViewportSizes.value = [
        this._rendererBounds.width,
        this._rendererBounds.height,
      ];

      this._meshBack.material.uniforms.uViewportSizes.value = [
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

  set textureItemBack(textureItem: TextureItem) {
    this._textureItemBack = textureItem;
    this._updateTextureBack();
    this.onResize();
  }

  set opacity(value: number) {
    this._masterOpacity = value;
  }

  set strength(value: number) {
    this._strength = value;
  }
}

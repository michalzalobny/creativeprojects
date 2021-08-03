import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import fragmentShader from './shaders/storyItem/fragment.glsl';
import vertexShader from './shaders/storyItem/vertex.glsl';
import { UpdateInfo, Bounds } from './types';
import { Scroll } from './Scroll/Scroll';
export class StoryItem extends THREE.Object3D {
  _geometry: THREE.PlaneGeometry;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _image: HTMLImageElement | null = null;
  _intersectPoint: THREE.Vector3 | null = null;

  constructor(geometry: THREE.PlaneGeometry) {
    super();
    this._geometry = geometry;
    this._createMesh('https://source.unsplash.com/random');
  }

  _onImageLoad = () => {
    const texture = new THREE.Texture();
    texture.image = this._image;
    texture.needsUpdate = true;
    if (this._material && this._mesh && this._image) {
      this._material.uniforms.tMap.value = texture;

      this._material.uniforms.uImageSizes.value = [
        this._image.naturalWidth,
        this._image.naturalHeight,
      ];

      const isVertical = this._image.naturalHeight >= this._image.naturalWidth;

      const sizeX = isVertical ? 40 : 50;
      const sizeY = isVertical ? 50 : 30;

      this._material.uniforms.uPlaneSizes.value = [sizeX, sizeY];
      this._mesh.scale.x = sizeX;
      this._mesh.scale.y = sizeY;

      this._fadeImageIn(this._mesh);
    }
  };

  _createMesh(imageSrc: string) {
    this._image = new Image();
    this._image.src = imageSrc;
    this._image.crossOrigin = 'anonymous';

    if (this._image.complete) {
      this._onImageLoad();
    }
    this._image.addEventListener('load', this._onImageLoad);

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
        uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
        uViewportSizes: {
          value: [this._rendererBounds.width, this._rendererBounds.height],
        },
        uStrength: { value: 0 },
        uOpacity: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    this._mesh = new THREE.Mesh(this._geometry, this._material);
    this.add(this._mesh);
  }

  _fadeImageIn(mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>) {
    const tweenProgress = new TWEEN.Tween({
      progress: mesh.material.uniforms.uOpacity.value,
    })
      .to({ progress: 1 }, 2000)
      .easing(TWEEN.Easing.Sinusoidal.In)
      .onUpdate(obj => {
        mesh.material.uniforms.uOpacity.value = obj.progress;
      });

    tweenProgress.start();
  }

  set intersectPoint(point: THREE.Vector3) {
    this._intersectPoint = point;
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
    if (this._material) {
      this._material.uniforms.uViewportSizes.value = [
        this._rendererBounds.width,
        this._rendererBounds.height,
      ];
    }
  }

  update(updateInfo: UpdateInfo, scroll: Scroll) {
    if (!this._mesh) {
      return;
    }
    const strength = scroll.currentStrength.y / this._rendererBounds.height;
    this._mesh.material.uniforms.uStrength.value = strength * 20;

    this._mesh.material.uniforms.uTime.value = updateInfo.time;

    if (this._intersectPoint) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }
  destroy() {
    this._image && this._image.removeEventListener('load', this._onImageLoad);
  }
}

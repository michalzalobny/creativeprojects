import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import fragmentShader from './shaders/storyItem/fragment.glsl';
import vertexShader from './shaders/storyItem/vertex.glsl';
import { UpdateInfo, Bounds } from './types';
export class StoryItem extends THREE.Object3D {
  _geometry: THREE.PlaneGeometry;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };

  constructor(geometry: THREE.PlaneGeometry) {
    super();
    this._geometry = geometry;
  }

  _createMesh(imageSrc: string) {
    const image = new Image();
    const texture = new THREE.Texture();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
      if (this._material && this._mesh) {
        this._material.uniforms.uImageSizes.value = [
          image.naturalWidth,
          image.naturalHeight,
        ];

        const isVertical = image.naturalHeight >= image.naturalWidth;

        const sizeX = isVertical ? 30 : 50;
        const sizeY = isVertical ? 50 : 30;

        this._material.uniforms.uPlaneSizes.value = [sizeX, sizeY];
        this._mesh.scale.x = sizeX;
        this._mesh.scale.y = sizeY;

        this._fadeImageIn(this._mesh);
      }
    };

    this._material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
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
      .to({ progress: 1 }, 800)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        mesh.material.uniforms.uOpacity.value = obj.progress;
      });

    tweenProgress.start();
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }

  init() {
    this._createMesh(
      'https://images.unsplash.com/photo-1622495488268-a2f56bf10385?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    );
  }
  update(updateInfo: UpdateInfo) {}
  destroy() {}
}

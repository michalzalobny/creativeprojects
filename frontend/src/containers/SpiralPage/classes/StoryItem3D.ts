import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { StoryItemProps } from './types';

import fragmentShader from './shaders/storyItem/fragment.glsl';
import vertexShader from './shaders/storyItem/vertex.glsl';
import { UpdateInfo, Bounds } from './types';
import { Scroll } from './Scroll/Scroll';
import { InteractiveObject3D } from './InteractiveObject3D';
import { lerp } from './utils/lerp';

export class StoryItem3D extends InteractiveObject3D {
  _geometry: THREE.PlaneGeometry;
  _mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> | null = null;
  _material: THREE.ShaderMaterial | null = null;
  _texture: THREE.Texture | null = null;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _image: HTMLImageElement | null = null;
  _intersectPoint: THREE.Vector3 | null = null;
  _masterOpacity = 1;
  _tweenOpacity = 0;
  _offsetOpacity = 0;
  _isVisible = false;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _currentHoverValue = 0;
  _destinationHoverValue = 0;
  _storyItem: StoryItemProps;
  isInit = false;

  constructor(geometry: THREE.PlaneGeometry, storyItem: StoryItemProps) {
    super();
    this._geometry = geometry;
    this._storyItem = storyItem;
    this._createMesh(this._storyItem.item.image.url);
  }

  _onImageLoad = () => {
    setTimeout(() => {
      this.dispatchEvent({ type: 'loaded' });
    }, 2000);
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
        uHovered: { value: 0 },
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
    this.setColliderName('storyItem');
  }

  _updateOpacity() {
    if (this._mesh) {
      const computedOpacity =
        Math.min(this._masterOpacity, 1) * this._tweenOpacity;

      this._mesh.material.uniforms.uOpacity.value = computedOpacity;
      this._isVisible = computedOpacity > 0;
    }
  }

  _updateHover(updateInfo: UpdateInfo) {
    if (this._isHovered) {
      this._destinationHoverValue = 1;
    } else {
      this._destinationHoverValue = 0;
    }

    this._currentHoverValue = lerp(
      this._currentHoverValue,
      this._destinationHoverValue,
      0.02 * updateInfo.slowDownFactor,
    );
    if (this._mesh) {
      this._mesh.material.uniforms.uHovered.value = this._currentHoverValue;
    }
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

  set opacity(value: number) {
    this._masterOpacity = value;
  }

  animateOpacity(destination: number) {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        if (!this._mesh) {
          return;
        }

        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  onMouseOver() {
    if (this._isVisible) {
      super.onMouseOver();
      document.body.style.cursor = 'pointer';
      this.dispatchEvent({ type: 'pointerover' });
    }
  }

  onMouseOut() {
    if (this._isVisible) {
      super.onMouseOut();
      document.body.style.cursor = 'initial';
      this.dispatchEvent({ type: 'pointerleft' });
    }
  }

  onClick() {
    if (this._isVisible) {
      super.onClick();
    }
  }

  updateScrollStrength(scroll: Scroll) {
    if (this._mesh) {
      const strength = scroll.currentStrength.y / this._rendererBounds.height;
      this._mesh.material.uniforms.uStrength.value = strength * 20;
    }
  }

  init() {
    this._texture = new THREE.Texture();
    this._texture.image = this._image;
    this._texture.needsUpdate = true;
    if (this._material && this._mesh && this._image) {
      this._material.uniforms.tMap.value = this._texture;

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

      this.isInit = true;

      this.animateOpacity(1);
    }
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._updateHover(updateInfo);
    this._updateOpacity();
    if (!this._mesh) {
      return;
    }

    this._mesh.material.uniforms.uTime.value = updateInfo.time;

    if (this._intersectPoint) {
      this._mesh.material.uniforms.uMouse3D.value = this._intersectPoint;
    }
  }

  destroy() {
    super.destroy();
    this._image && this._image.removeEventListener('load', this._onImageLoad);
    this._geometry?.dispose();
    this._material?.dispose();
    if (this._mesh) {
      this.remove(this._mesh);
    }
  }
}

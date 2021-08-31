import { EventDispatcher } from 'three';
import * as THREE from 'three';

import { TextureItems } from '../types';

export class Preloader extends EventDispatcher {
  _assetsLoaded = 0;
  _images: string[] = [];
  textureItems: TextureItems = {};

  constructor() {
    super();
  }

  _preloadTextures() {
    this._images.forEach(item => {
      const texture = new THREE.Texture();
      const image = new window.Image();
      image.crossOrigin = 'anonymous';
      image.src = item;
      image.onload = () => {
        texture.image = image;
        texture.needsUpdate = true;
        this.textureItems[item] = {
          texture,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        };
        this._onAssetLoaded();
      };
    });
  }

  _onAssetLoaded() {
    this._assetsLoaded += 1;

    const loadRatio = this._assetsLoaded / this._images.length;

    if (loadRatio === 1) {
      this._onLoadingComplete();
    }
  }

  _onLoadingComplete() {
    this.dispatchEvent({ type: 'loaded' });
  }

  set images(images: string[]) {
    this._images = images;
    this._preloadTextures();
  }

  destroy() {}
}

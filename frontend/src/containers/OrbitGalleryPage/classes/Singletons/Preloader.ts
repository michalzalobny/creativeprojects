import { EventDispatcher } from 'three';
import * as THREE from 'three';

import { Textures } from '../types';

export class Preloader extends EventDispatcher {
  _assetsLoaded = 0;
  _images: string[] = [];
  textures: Textures = {};

  constructor() {
    super();
  }

  _preloadTextures() {
    this._images.forEach(item => {
      const texture = new THREE.Texture();
      const media = new window.Image();
      media.crossOrigin = 'anonymous';
      media.src = item;
      media.onload = () => {
        texture.image = media;
        this.textures[item] = texture;
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
}

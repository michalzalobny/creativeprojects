import { EventDispatcher } from 'three';
import * as THREE from 'three';

import { TextureItems, PreloadItem } from '../types';

export class Preloader extends EventDispatcher {
  _assetsLoaded = 0;
  _items: PreloadItem[] = [];
  textureItems: TextureItems = {};

  constructor() {
    super();
  }

  _preloadTextures() {
    this._items.forEach(item => {
      if (item.src === '') return this._onAssetLoaded(); //Skips loading empty entries

      if (item.type === 'image') {
        const texture = new THREE.Texture();
        const image = new window.Image();
        image.crossOrigin = 'anonymous';
        image.src = item.src;
        image.onload = () => {
          texture.image = image;
          texture.needsUpdate = true;
          this.textureItems[item.src] = {
            texture,
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
          };
          this._onAssetLoaded();
        };
      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.muted = true;
        video.loop = true;
        video.controls = true;
        // video.playsInline = true;
        video.autoplay = true;
        video.src = item.src;
        video.play();

        video.oncanplay = () => {
          const texture = new THREE.VideoTexture(video);
          this.textureItems[item.src] = {
            texture,
            naturalWidth: video.videoWidth,
            naturalHeight: video.videoHeight,
          };
          this._onAssetLoaded();
        };
      }
    });
  }

  _onAssetLoaded() {
    this._assetsLoaded += 1;

    const loadRatio = this._assetsLoaded / this._items.length;

    if (loadRatio === 1) {
      this._onLoadingComplete();
    }
  }

  _onLoadingComplete() {
    this.dispatchEvent({ type: 'loaded' });
  }

  set items(items: PreloadItem[]) {
    this._items = items;
    this._preloadTextures();
  }

  destroy() {}
}

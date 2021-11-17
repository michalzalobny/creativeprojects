import { EventDispatcher } from 'three';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three-stdlib';

import { MediaItems, PreloadItems } from '../types';

export class Preloader extends EventDispatcher {
  _assetsLoaded = 0;
  _items: PreloadItems = [];
  mediaItems: MediaItems = {};
  _gltfLoader = new GLTFLoader();

  constructor() {
    super();
  }

  _preloadTextures() {
    this._items.forEach(item => {
      //Skips loading empty or already loaded entries
      if (item === null) return this._onAssetLoaded();

      if (item.type === 'image') {
        const texture = new THREE.Texture();
        const image = new window.Image();
        image.crossOrigin = 'anonymous';
        image.src = item.src;
        image.onload = () => {
          texture.image = image;
          texture.needsUpdate = true;
          this.mediaItems[item.src] = {
            item: texture,
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
        video.playsInline = true;
        video.autoplay = true;
        video.src = item.src;
        video.play();

        video.oncanplay = () => {
          const texture = new THREE.VideoTexture(video);
          this.mediaItems[item.src] = {
            item: texture,
            naturalWidth: video.videoWidth,
            naturalHeight: video.videoHeight,
          };
          this._onAssetLoaded();
        };
      } else if (item.type === '3dmodel') {
        this._gltfLoader.load(
          item.src,
          (gltf: GLTF) => {
            this.mediaItems[item.src] = {
              item: gltf.scene,
              naturalWidth: gltf.scene.children[0].scale.x,
              naturalHeight: gltf.scene.children[0].scale.y,
            };

            this._onAssetLoaded();
          },
          progress => {},
          error => {
            console.warn('3D model loading failed', error);
            this._onAssetLoaded();
          },
        );
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

  set items(items: PreloadItems) {
    this._items = items;
    this._preloadTextures();
  }

  destroy() {}
}

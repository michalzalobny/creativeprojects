import { EventDispatcher } from 'three';
import * as THREE from 'three';
import { GLTFLoader, GLTF, DRACOLoader } from 'three-stdlib';

import modelSrc from './1.glb';
import textureSrc from './baked.jpg';

import { TextureItems } from '../types';

export class Preloader extends EventDispatcher {
  _assetsLoaded = 0;
  _images: string[] = [];
  textureItems: TextureItems = {};
  _loader: GLTFLoader;
  _dracoLoader: DRACOLoader;
  _textureLoader = new THREE.TextureLoader();

  constructor() {
    super();

    this._loader = new GLTFLoader();
    this._dracoLoader = new DRACOLoader();
    this._dracoLoader.setDecoderPath('/draco/');
    this._loader.setDRACOLoader(this._dracoLoader);

    this._loadModels();
  }

  _loadModels() {
    this._loader.load(modelSrc, (gltf: GLTF) => {
      // console.log(gltf);
      this.textureItems['scene'] = gltf.scene;
      this._onAssetLoaded();

      // this.add(mesh);
    });

    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.src = textureSrc.src;
    const texture = new THREE.Texture();
    image.onload = () => {
      texture.image = image;
      texture.flipY = false;
      texture.encoding = THREE.sRGBEncoding;
      texture.needsUpdate = true;

      this.textureItems['texture'] = texture;
      this._onAssetLoaded();
    };
  }

  _onAssetLoaded() {
    this._assetsLoaded += 1;

    const loadRatio = this._assetsLoaded / 2;

    if (loadRatio === 1) {
      this._onLoadingComplete();
    }
  }

  _onLoadingComplete() {
    this.dispatchEvent({ type: 'loaded' });
  }

  set images(images: string[]) {
    this._images = images;
  }

  destroy() {}
}

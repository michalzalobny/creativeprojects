import * as THREE from 'three';

import { UpdateInfo, Bounds, TextureItems } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class ModelScene extends InteractiveScene {
  _textureItems: TextureItems;

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _onResize() {}

  _addListeners() {
    super._addListeners();
  }

  _removeListeners() {
    super._removeListeners();
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._onResize();
  }

  animateIn() {}

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
  }

  destroy() {
    super.destroy();
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;

    console.log(this._textureItems);

    const bakedMaterial = new THREE.MeshBasicMaterial({
      map: this._textureItems['texture'],
    });

    const scene = this._textureItems.scene as THREE.Object3D;

    scene.traverse(child => {
      child.material = bakedMaterial;
    });

    // scene.scale.x = 200 * 0.9;
    // scene.scale.y = 200 * 0.9;
    // scene.scale.z = 200 * 0.9;
    // scene.rotation.y = -0.1 * Math.PI;
    // scene.rotation.x = 0.1 * Math.PI;

    this.add(scene);
    // console.log(this._textureItems);
  }
}

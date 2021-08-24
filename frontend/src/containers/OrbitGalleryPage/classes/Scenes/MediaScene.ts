import * as THREE from 'three';

import { UpdateInfo, GalleryItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { GalleryItem3D } from '../Components/GalleryItem3D';
import { Textures } from '../types';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class MediaScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _galleryItems: GalleryItem3D[] = [];
  _textures: Textures = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _onItemClick = (e: THREE.Event) => {};

  _destroyItems() {
    this._galleryItems.forEach(item => {
      item.destroy();
      this.remove(item);
      item.removeEventListener('click', this._onItemClick);
    });
    this._galleryItems = [];
  }

  set items(items: GalleryItemProps[]) {
    this._destroyItems();

    //Fetch elements DOM representations
    const elements = Array.from(
      document.querySelectorAll("[data-gallery='entry']"),
    ) as HTMLElement[];

    items &&
      items.forEach((item, key) => {
        const item3D = new GalleryItem3D({
          geometry: this._planeGeometry,
          galleryItem: item,
          domEl: elements[key],
        });
        this._galleryItems.push(item3D);
        this.add(item3D);
      });

    this._galleryItems.forEach(item => {
      item.addEventListener('click', this._onItemClick);
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }

  set textures(textures: Textures) {
    this._textures = textures;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._galleryItems.forEach(item => {
      item.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

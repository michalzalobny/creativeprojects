import * as THREE from 'three';

import { UpdateInfo, GalleryItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { GalleryItem3D } from '../Components/GalleryItem3D';
import { TextureItems } from '../types';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class MediaScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _galleryItems: GalleryItem3D[] = [];
  _textureItems: TextureItems = {};

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

  _onResize = () => {
    if (this._galleryItems) {
      this._galleryItems.forEach(item => {
        item.onResize();
      });
    }
    this._resetValues();
  };

  _resetValues() {}

  _addListeners() {
    super._addListeners();
    window.addEventListener('resize', this._onResize);
  }

  _removeListeners() {
    super._removeListeners();
    window.removeEventListener('resize', this._onResize);
  }

  set items(items: GalleryItemProps[]) {
    this._destroyItems();

    //Fetch elements DOM representations
    const elements = Array.from(
      document.querySelectorAll("[data-gallery='entry']"),
    ) as HTMLElement[];

    const galleryWrapper = Array.from(
      document.querySelectorAll("[data-gallery='wrapper']"),
    )[0] as HTMLElement;

    items &&
      items.forEach((item, key) => {
        // const matchingFigure = elements.filter(
        //   el => el.getAttribute('data-src') === item.item.image.url,
        // );

        const item3D = new GalleryItem3D({
          geometry: this._planeGeometry,
          galleryItem: item,
          domEl: elements[key],
          galleryWrapperDomEl: galleryWrapper,
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

    this._galleryItems.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;

    this._galleryItems.forEach(item => {
      item.textureItem = this._textureItems[item.galleryItem.item.image.url];
    });
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

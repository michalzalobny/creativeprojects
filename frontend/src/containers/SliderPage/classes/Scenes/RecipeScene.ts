import * as THREE from 'three';

import { UpdateInfo, RecipieItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { RecipeItem3D } from '../Components/RecipeItem3D';
import { TextureItems } from '../types';
import { getRandFloat } from '../utils/getRand';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class RecipeScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _galleryItems: RecipeItem3D[] = [];
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
  };

  _addListeners() {
    super._addListeners();
    window.addEventListener('resize', this._onResize);
  }

  _removeListeners() {
    super._removeListeners();
    window.removeEventListener('resize', this._onResize);
  }

  set items(items: RecipieItemProps[]) {
    this._destroyItems();

    //Fetch elements DOM representations
    const element = Array.from(
      document.querySelectorAll("[data-recipe='entry']"),
    )[0] as HTMLElement;

    items &&
      items.forEach((item, key) => {
        const item3D = new RecipeItem3D({
          geometry: this._planeGeometry,
          recipieItem: item,
          domEl: element,
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

    this._galleryItems.forEach((item, key) => {
      item.textureItem = this._textureItems[item.recipieItem.item.image.url];

      item.animateIn(getRandFloat(0, 1500) + 1500);
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

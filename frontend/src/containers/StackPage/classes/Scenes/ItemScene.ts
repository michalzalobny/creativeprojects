import * as THREE from 'three';

import { UpdateInfo, CardItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { CardItem3D } from '../Components/CardItem3D';
import { TextureItems } from '../types';
import { getRandFloat } from '../utils/getRand';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class ItemScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _items3D: CardItem3D[] = [];
  _textureItems: TextureItems = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _onItemClick = (e: THREE.Event) => {};

  _destroyItems() {
    this._items3D.forEach(item => {
      item.destroy();
      this.remove(item);
      item.removeEventListener('click', this._onItemClick);
    });
    this._items3D = [];
  }

  _onResize = () => {
    if (this._items3D) {
      this._items3D.forEach(item => {
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

  set items(items: CardItemProps[]) {
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

        const item3D = new CardItem3D({
          geometry: this._planeGeometry,
          cardItem: item,
          domEl: elements[key],
        });
        this._items3D.push(item3D);
        this.add(item3D);
      });

    this._items3D.forEach(item => {
      item.addEventListener('click', this._onItemClick);
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._items3D.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;

    this._items3D.forEach(el => {
      el.textureItem = this._textureItems[el.cardItem.item.image.url];
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._items3D.forEach(item => {
      item.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

import * as THREE from 'three';

import { UpdateInfo, ItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { CardItem3DAnimated } from '../Components/CardItem3DAnimated';
import { TextureItems } from '../types';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class ItemScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _items3D: CardItem3DAnimated[] = [];
  _textureItems: TextureItems = {};
  _collectionWrapper: HTMLDivElement;
  _collectionWrapperRect: DOMRect;
  _imageWrapper: HTMLDivElement | null = null;
  _imageWrapperClientWidth = 1;
  _imageWrapperMarginRight = 1;
  _groupsArray: THREE.Group[] = [];

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });

    this._collectionWrapper = Array.from(
      document.querySelectorAll('[data-playground="wrapper"]'),
    )[0] as HTMLDivElement;

    this._collectionWrapperRect = this._collectionWrapper.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
      this._groupsArray.push(new THREE.Group());
      this.add(this._groupsArray[i]);
    }
  }

  _handleIndexClick(index: number) {}

  _onItemClick = (e: THREE.Event) => {
    const indexClicked = this._items3D.findIndex(el => el === e.target);

    this._handleIndexClick(indexClicked);
  };

  _destroyItems() {
    this._items3D.forEach(item => {
      item.destroy();
      this.remove(item);
      item.removeEventListener('click', this._onItemClick);
    });
    this._items3D = [];
  }

  _onResize() {
    this._collectionWrapperRect = this._collectionWrapper.getBoundingClientRect();
    this._measureImageWrapper();
    if (this._items3D) {
      this._items3D.forEach(item => {
        item.onResize();
      });
    }

    // this._groupsArray[0].scale.set(0.5, 0.5, 0.5);
  }

  _addListeners() {
    super._addListeners();
  }

  _removeListeners() {
    super._removeListeners();
  }

  _measureImageWrapper() {
    if (this._imageWrapper) {
      this._imageWrapperClientWidth = this._imageWrapper.clientWidth;
      const elStyle = getComputedStyle(this._imageWrapper);
      this._imageWrapperMarginRight = parseFloat(elStyle.marginRight);
    }
  }

  setItems(items: ItemProps[]) {
    this._destroyItems();

    items &&
      items.forEach((item, key) => {
        //Fetch elements DOM representations
        const domEl = Array.from(
          document.querySelectorAll(`[data-playground-item="${key}"]`),
        )[0] as HTMLElement;

        const galleryDomEl = Array.from(
          document.querySelectorAll('[data-playground="wrapper"]'),
        )[0] as HTMLElement;

        if (!this._imageWrapper) {
          this._imageWrapper = domEl as HTMLDivElement;
          this._measureImageWrapper();
        }

        const item3D = new CardItem3DAnimated({
          geometry: this._planeGeometry,
          cardItem: item,
          domEl,
          galleryDomEl,
        });
        this._items3D.push(item3D);

        if (key >= 2) {
          this._groupsArray[0].add(item3D);
        } else {
          this._groupsArray[1].add(item3D);
        }
      });

    this._items3D.forEach(item => {
      item.addEventListener('click', this._onItemClick);
    });
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);

    this._items3D.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });

    this._onResize();
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;

    this._items3D.forEach(el => {
      el.textureItem = this._textureItems[el.cardItem.imageSrc];
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

import * as THREE from 'three';
import { chunk } from 'lodash';

import { UpdateInfo, ItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { Image3D } from '../Components/Medias/Image3D';
import { MediaHolder3D } from '../Components/MediaHolder3D';
import { TextureItems } from '../types';
import { SlideScene } from './SlideScene';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class ItemScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _items3D: MediaHolder3D[] = [];
  _groups3DArray: THREE.Group[] = [];
  _textureItems: TextureItems = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _handleItemClick(index: number) {
    console.log(`item index: ${index}`);
  }

  _onItemClick = (e: THREE.Event) => {
    const indexClicked = this._items3D.findIndex(el => el === e.target);

    this._handleItemClick(indexClicked);
  };

  _destroyItems() {
    this._items3D.forEach(item => {
      item.destroy();
      item.removeEventListener('click', this._onItemClick);
    });

    this._items3D = [];

    this._groups3DArray.forEach(group => {
      this.remove(group);
    });
  }

  _onResize() {
    this._items3D.forEach(item => {
      item.rendererBounds = this._rendererBounds;
      item.onResize();
    });
  }

  _addListeners() {
    super._addListeners();
  }

  _removeListeners() {
    super._removeListeners();
  }

  setItems(items: ItemProps[]) {
    this._destroyItems();

    for (let i = 0; i < SlideScene.groupsAmount; i++) {
      this._groups3DArray.push(new THREE.Group());
      this.add(this._groups3DArray[i]);
    }

    const groupedItems = chunk(items, SlideScene.itemsPerGroup);

    const galleryDomEl = Array.from(
      document.querySelectorAll('[data-playground="wrapper"]'),
    )[0] as HTMLElement;

    groupedItems.forEach((group, groupKey) => {
      group.forEach((item, itemKey) => {
        //Fetch elements DOM representations
        const domEl = Array.from(
          document.querySelectorAll(`[data-playground-item="${itemKey}"]`),
        )[0] as HTMLElement;

        if (!domEl) {
          return;
        }

        const item3D = new Image3D({
          geometry: this._planeGeometry,
          cardItem: item,
          domEl,
          galleryDomEl,
        });
        item3D.groupIndexValue = groupKey;
        this._items3D.push(item3D);
        this._groups3DArray[groupKey].add(item3D);
      });
    });

    this._items3D.forEach(item => {
      item.addEventListener('click', this._onItemClick);
    });

    this._onResize();
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);
    this._onResize();
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;

    this._items3D.forEach(el => {
      if (el.cardItem.type === 'image')
        (el as Image3D).textureItem = this._textureItems[el.cardItem.imageSrc];
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

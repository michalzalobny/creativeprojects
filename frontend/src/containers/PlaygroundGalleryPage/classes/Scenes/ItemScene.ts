import * as THREE from 'three';
import { chunk } from 'lodash';

import { appState } from '../../appState';
import { UpdateInfo, ItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { Image3D } from '../Components/Medias/Image3D';
import { Video3D } from '../Components/Medias/Video3D';
import { Model3D } from '../Components/Medias/Model3D';
import { MediaHolder3D } from '../Components/MediaHolder3D';
import { MediaItems } from '../types';
import { SlideScene } from './SlideScene';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class ItemScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _items3D: MediaHolder3D[] = [];
  _groups3DArray: THREE.Group[] = [];
  _mediaItems: MediaItems = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _handleItemClick(itemClicked: ItemProps) {
    if (appState.app && !appState.app.isModalOpened) {
      appState.app.setShowModalReact(true);
      appState.app.setModalItemReact({
        buttonHref: '',
        buttonLabel: 'button label',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        mediaSrc: itemClicked.imageSrc,
        mediaType: itemClicked.type,
      });
    }
  }

  _onItemClick = (e: THREE.Event) => {
    this._handleItemClick(e.target.cardItem);
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
      item.setRendererBounds(this._rendererBounds);
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

        if (item.type === 'image') {
          const item3D = new Image3D({
            geometry: this._planeGeometry,
            cardItem: item,
            domEl,
            galleryDomEl,
          });
          item3D.groupIndexValue = groupKey;
          this._items3D.push(item3D);
          this._groups3DArray[groupKey].add(item3D);
        } else if (item.type === 'video') {
          const item3D = new Video3D({
            geometry: this._planeGeometry,
            cardItem: item,
            domEl,
            galleryDomEl,
          });
          item3D.groupIndexValue = groupKey;
          this._items3D.push(item3D);
          this._groups3DArray[groupKey].add(item3D);
        } else if (item.type === '3dmodel') {
          const item3D = new Model3D({
            geometry: this._planeGeometry,
            cardItem: item,
            domEl,
            galleryDomEl,
          });
          item3D.groupIndexValue = groupKey;
          this._items3D.push(item3D);
          this._groups3DArray[groupKey].add(item3D);
        }
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

  set mediaItems(mediaItems: MediaItems) {
    this._mediaItems = mediaItems;

    this._items3D.forEach(el => {
      (el as Image3D).mediaItem = this._mediaItems[el.cardItem.imageSrc];
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

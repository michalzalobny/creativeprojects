import * as THREE from 'three';
import debounce from 'lodash/debounce';

import { UpdateInfo, FollowItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { CardItem3D } from '../Components/CardItem3D';
import { TextureItems } from '../types';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class CardScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _cardItems: CardItem3D[] = [];
  _items: FollowItemProps[] = [];
  _textureItems: TextureItems = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _destroyItems() {
    this._cardItems.forEach(item => {
      item.destroy();
    });
    this._cardItems = [];
  }

  _onResizeDebounced = debounce(() => {
    this._onResize();
  }, 500);

  _onResize() {
    if (this._cardItems) {
      this._cardItems.forEach(item => {
        item.onResize();
      });
    }
  }

  _addListeners() {
    super._addListeners();
    window.addEventListener('resize', this._onResizeDebounced);
  }

  _removeListeners() {
    super._removeListeners();
    window.removeEventListener('resize', this._onResizeDebounced);
  }

  _animateInItems() {}

  addItem() {
    const maxAmount = this._items.length;
    if (this._cardItems.length >= maxAmount) {
      return;
    }
    //Fetch elements DOM representations
    const element = Array.from(
      document.querySelectorAll("[data-follow='entry']"),
    )[0] as HTMLElement;

    const item3D = new CardItem3D({
      geometry: this._planeGeometry,
      followItem: this._items[this._cardItems.length],
      domEl: element,
    });

    item3D.textureItem = this._textureItems[item3D.followItem.item.image.url];
    item3D.rendererBounds = this._rendererBounds;
    this._cardItems.push(item3D);
    this.add(item3D);
    item3D.animateIn();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._cardItems.forEach(item => {
      item.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this._destroyItems();
    this._planeGeometry.dispose();
  }

  set items(items: FollowItemProps[]) {
    this._items = items;
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._cardItems.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;
    this._animateInItems();
  }
}

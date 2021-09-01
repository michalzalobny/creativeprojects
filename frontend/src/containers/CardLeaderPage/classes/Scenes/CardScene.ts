import * as THREE from 'three';
import debounce from 'lodash/debounce';

import { UpdateInfo, FollowItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { CardItem3DAnimated } from '../Components/CardItem3DAnimated';
import { TextureItems } from '../types';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class CardScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _items3D: CardItem3DAnimated[] = [];
  _items: FollowItemProps[] = [];
  _textureItems: TextureItems = {};

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _destroyItems() {
    this._items3D.forEach(item => {
      item.destroy();
    });
    this._items3D = [];
  }

  _onResizeDebounced = debounce(() => {
    this._onResize();
  }, 500);

  _onResize() {
    if (this._items3D) {
      this._items3D.forEach(item => {
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
    if (this._items3D.length >= maxAmount) {
      return;
    }
    //Fetch elements DOM representations
    const element = Array.from(
      document.querySelectorAll("[data-follow='entry']"),
    )[0] as HTMLElement;

    const item3D = new CardItem3DAnimated({
      geometry: this._planeGeometry,
      followItem: this._items[this._items3D.length],
      domEl: element,
    });

    item3D.textureItem = this._textureItems[item3D.followItem.item.image.url];
    item3D.rendererBounds = this._rendererBounds;
    this._items3D.push(item3D);
    this.add(item3D);
    item3D.animateIn();
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

  set items(items: FollowItemProps[]) {
    this._items = items;
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._items3D.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;
    this._animateInItems();
  }
}

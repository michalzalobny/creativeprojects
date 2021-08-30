import * as THREE from 'three';
import debounce from 'lodash/debounce';

import { UpdateInfo, RecipieItemProps, Bounds } from '../types';
import { InteractiveScene } from './InteractiveScene';
import { MouseMove } from '../Singletons/MouseMove';
import { RecipeItem3D } from '../Components/RecipeItem3D';
import { TextureItems } from '../types';
import { getRandInt } from '../utils/getRand';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class RecipeScene extends InteractiveScene {
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _recipeItems: RecipeItem3D[] = [];
  _trackKeyArray: number[] = [];
  _textureItems: TextureItems = {};
  _items: RecipieItemProps[] = [];

  constructor({ camera, mouseMove }: Constructor) {
    super({ camera, mouseMove });
  }

  _onItemDestroy = (e: THREE.Event) => {
    const destroyedItem = this._recipeItems.find(
      el => el === (e.target as RecipeItem3D),
    );

    if (destroyedItem) {
      destroyedItem.removeEventListener('destroyed', this._onItemDestroy);
      this.remove(destroyedItem);
      const index = this._recipeItems.indexOf(destroyedItem);
      if (index !== -1) {
        this._recipeItems.splice(index, 1);
      }
    }
  };

  _destroyItems() {
    this._recipeItems.forEach(item => {
      item.destroy();
    });
    this._recipeItems = [];
  }

  _onResizeDebounced = debounce(() => {
    this._onResize();
  }, 300);

  _onResize() {
    if (this._recipeItems) {
      this._recipeItems.forEach(item => {
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

  set items(items: RecipieItemProps[]) {
    this._items = items;
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._recipeItems.forEach(item => {
      item.rendererBounds = this._rendererBounds;
    });
  }

  set textureItems(textureItems: TextureItems) {
    this._textureItems = textureItems;
  }

  addItem() {
    const maxAmount = this._items.length;
    // const maxAmount = 1;

    const itemKey = this._trackKeyArray.length;

    if (itemKey >= maxAmount) {
      return;
    }

    this._trackKeyArray.push(itemKey);

    //Fetch elements DOM representations
    const element = Array.from(
      document.querySelectorAll("[data-recipe='entry']"),
    )[0] as HTMLElement;

    const item3D = new RecipeItem3D({
      geometry: this._planeGeometry,
      recipieItem: this._items[itemKey],
      domEl: element,
      keyPosition: maxAmount - this._trackKeyArray.length + 1,
    });

    item3D.textureItem = this._textureItems[item3D.recipieItem.item.image.url];

    item3D.rendererBounds = this._rendererBounds;
    item3D.addEventListener('destroyed', this._onItemDestroy);
    this._recipeItems.push(item3D);
    this.add(item3D);
    item3D.animateIn();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._recipeItems.forEach(item => {
      item.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

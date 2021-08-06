import * as THREE from 'three';

import { UpdateInfo, StoryItemProps, Bounds } from './types';
import { InteractiveScene } from './InteractiveScene';
import { StoryItem3D } from './StoryItem3D';
import { MouseMove } from './MouseMove/MouseMove';

export class StoryScene extends InteractiveScene {
  _storyItems: StoryItem3D[] = [];
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _setHoveredItem: React.Dispatch<React.SetStateAction<StoryItem3D | null>>;

  constructor(
    camera: THREE.PerspectiveCamera,
    mouseMove: MouseMove,
    setHoveredItem: React.Dispatch<React.SetStateAction<StoryItem3D | null>>,
  ) {
    super(camera, mouseMove);
    this._setHoveredItem = setHoveredItem;
  }

  _onItemOver = (e: THREE.Event) => {
    this._setHoveredItem(e.target);
  };
  _onItemLeft = (e: THREE.Event) => {
    this._setHoveredItem(null);
  };

  _destroyItems() {
    this._storyItems.forEach(item => {
      item.destroy();
      this.remove(item);
      item.removeEventListener('pointerover', this._onItemOver);
      item.removeEventListener('pointerleft', this._onItemLeft);
    });
    this._storyItems = [];
  }

  set items(items: StoryItemProps[]) {
    this._destroyItems();

    items &&
      items.forEach(item => {
        const item3D = new StoryItem3D(this._planeGeometry, item);
        this._storyItems.push(item3D);
        this.add(item3D);
      });

    this._storyItems.forEach(storyItem => {
      storyItem.addEventListener('pointerover', this._onItemOver);
      storyItem.addEventListener('pointerleft', this._onItemLeft);
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._storyItems.forEach(item => {
      item.rendererBounds = bounds;
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._storyItems.forEach(item => {
      item.update(updateInfo);
    });
  }

  destroy() {
    super.destroy();
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

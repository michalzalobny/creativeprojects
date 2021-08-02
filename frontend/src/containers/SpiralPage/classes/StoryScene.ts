import * as THREE from 'three';

import { UpdateInfo } from './types';

import { InteractiveScene } from './InteractiveScene';
import { StoryItem } from './StoryItem';
import { StoryItemProps } from './types';
import { Scroll } from './Scroll/Scroll';

export class StoryScene extends InteractiveScene {
  _storyItems: StoryItem[] = [];
  _planeGeometry = new THREE.PlaneGeometry(12, 18);
  _scroll: Scroll;

  constructor(camera: THREE.PerspectiveCamera, scroll: Scroll) {
    super(camera);
    this._scroll = scroll;
  }

  _destroyItems() {
    this._storyItems.forEach(item => {
      this.remove(item);
      item.destroy();
    });
    this._storyItems = [];
  }

  set items(items: StoryItemProps[]) {
    this._destroyItems();

    items &&
      items.forEach(item => {
        const item3D = new StoryItem(this._planeGeometry);
        this._storyItems.push(item3D);
        this.add(item3D);
      });
  }

  init() {}
  update(updateInfo: UpdateInfo) {}
  destroy() {
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

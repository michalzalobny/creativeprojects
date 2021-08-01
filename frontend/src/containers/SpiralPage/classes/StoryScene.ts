import * as THREE from 'three';

import { UpdateInfo } from './types';

import { InteractiveScene } from './InteractiveScene';
import { StoryItem } from './StoryItem';
import { StoryItemProps } from './types';
import { Scroll } from './Scroll/Scroll';

export class StoryScene extends InteractiveScene {
  storyItems: StoryItem[] = [];
  planeGeometry = new THREE.PlaneGeometry(30, 40);
  _scroll: Scroll;

  constructor(camera: THREE.PerspectiveCamera, scroll: Scroll) {
    super(camera);

    this._scroll = scroll;
  }

  set items(items: StoryItemProps[]) {
    this._destroyItems();

    items &&
      items.forEach(item => {
        const item3D = new StoryItem(this.planeGeometry);
        this.storyItems.push(item3D);
        this.add(item3D);
      });
  }

  _destroyItems() {
    this.storyItems.forEach(item => {
      this.remove(item);
      item.destroy();
    });
    this.storyItems = [];
  }

  init() {}
  update(updateInfo: UpdateInfo) {}
  destroy() {
    this._destroyItems();
    this.planeGeometry.dispose();
  }
}

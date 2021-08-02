import * as THREE from 'three';

import { UpdateInfo, StoryItemProps, Bounds } from './types';
import { InteractiveScene } from './InteractiveScene';
import { StoryItem } from './StoryItem';
import { Scroll } from './Scroll/Scroll';

export class StoryScene extends InteractiveScene {
  _storyItems: StoryItem[] = [];
  _planeGeometry = new THREE.PlaneGeometry(1, 1);
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
    this._storyItems.forEach(item => {
      item.rendererBounds = this._rendererBounds;
      item.init();
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._storyItems.forEach(item => {
      item.rendererBounds = bounds;
    });
  }

  init() {}
  update(updateInfo: UpdateInfo) {}
  destroy() {
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

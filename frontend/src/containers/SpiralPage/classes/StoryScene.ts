import * as THREE from 'three';

import { UpdateInfo, StoryItemProps, Bounds } from './types';
import { InteractiveScene } from './InteractiveScene';
import { StoryItem } from './StoryItem';
import { Scroll } from './Scroll/Scroll';
import { MouseMove } from './MouseMove/MouseMove';

export class StoryScene extends InteractiveScene {
  _storyItems: StoryItem[] = [];
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _scroll: Scroll;

  constructor(
    camera: THREE.PerspectiveCamera,
    scroll: Scroll,
    mouseMove: MouseMove,
  ) {
    super(camera, mouseMove);
    this._scroll = scroll;
  }

  _destroyItems() {
    this._storyItems.forEach(item => {
      item.destroy();
      this.remove(item);
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

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._storyItems.forEach(item => {
      item.rendererBounds = bounds;
    });
  }

  init() {}

  update(updateInfo: UpdateInfo) {
    this._storyItems.forEach(item => {
      item.rendererBounds = this._rendererBounds;
      item.update(updateInfo, this._scroll);
    });
  }

  destroy() {
    this._destroyItems();
    this._planeGeometry.dispose();
  }
}

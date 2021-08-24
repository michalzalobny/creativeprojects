import * as THREE from 'three';

import { UpdateInfo } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { MediaScene } from './MediaScene';
import { MouseMove } from '../Singletons/MouseMove';
import { GalleryItem3D } from '../Components/GalleryItem3D';
import { lerp } from '../utils/lerp';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class GalleryScene extends MediaScene {
  _scroll: Scroll;
  _scrollValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    strength: 0,
  };

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  set hoveredStoryItem(hoveredItem: GalleryItem3D | null) {}

  _onScroll = (e: THREE.Event) => {
    this._scrollValues.target.x -= e.x;
    this._scrollValues.target.y += e.y;
  };

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('applyscroll', this._onScroll);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('applyscroll', this._onScroll);
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    //Update scroll strength
    const deltaX = this._scrollValues.current.x - this._scrollValues.last.x;
    const deltaY = this._scrollValues.current.y - this._scrollValues.last.y;
    this._scrollValues.strength = deltaX * deltaX + deltaY * deltaY;

    this._scrollValues.last.x = this._scrollValues.current.x;
    this._scrollValues.last.y = this._scrollValues.current.y;

    //lerp scroll
    this._scrollValues.current.x = lerp(
      this._scrollValues.current.x,
      this._scrollValues.target.x,
      GalleryScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.current.y = lerp(
      this._scrollValues.current.y,
      this._scrollValues.target.y,
      GalleryScene.lerpEase * updateInfo.slowDownFactor,
    );

    //Pass scrollValues to gallery elements
    this._galleryItems.forEach(item => {
      item.scrollValues = {
        x: this._scrollValues.current.x,
        y: this._scrollValues.current.y,
        strength: this._scrollValues.strength,
      };
    });
  }

  destroy() {
    super.destroy();
  }
}

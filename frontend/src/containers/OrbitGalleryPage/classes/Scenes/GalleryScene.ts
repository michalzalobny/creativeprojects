import * as THREE from 'three';

import { UpdateInfo, DirectionX, DirectionY } from '../types';
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

interface ScrollValues {
  current: {
    x: number;
    y: number;
  };
  target: {
    x: number;
    y: number;
  };
  last: {
    x: number;
    y: number;
  };
  direction: {
    x: DirectionX;
    y: DirectionY;
  };
  strength: {
    current: number;
    target: number;
  };
  scrollSpeed: {
    x: number;
    y: number;
  };
}

export class GalleryScene extends MediaScene {
  static scrollSpeed = 1.2;

  _scroll: Scroll;
  _scrollValues: ScrollValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    direction: { x: 'left', y: 'up' },
    strength: {
      current: 0,
      target: 0,
    },
    scrollSpeed: { x: 0, y: 0 },
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

    this._scrollValues.target.y += this._scrollValues.scrollSpeed.y;

    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
      this._scrollValues.scrollSpeed.x = GalleryScene.scrollSpeed;
    } else {
      this._scrollValues.direction.x = 'right';
      this._scrollValues.scrollSpeed.x = -GalleryScene.scrollSpeed;
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
      this._scrollValues.scrollSpeed.y = GalleryScene.scrollSpeed;
    } else {
      this._scrollValues.direction.y = 'down';
      this._scrollValues.scrollSpeed.y = -GalleryScene.scrollSpeed;
    }

    //Update scroll strength
    const deltaX = this._scrollValues.current.x - this._scrollValues.last.x;
    const deltaY = this._scrollValues.current.y - this._scrollValues.last.y;

    this._scrollValues.strength.target = Math.sqrt(
      deltaX * deltaX + deltaY * deltaY,
    );

    this._scrollValues.strength.current = lerp(
      this._scrollValues.strength.current,
      this._scrollValues.strength.target,
      GalleryScene.lerpEase * updateInfo.slowDownFactor,
    );

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
        strength: this._scrollValues.strength.current,
        direction: {
          x: this._scrollValues.direction.x,
          y: this._scrollValues.direction.y,
        },
        scrollSpeed: {
          x: this._scrollValues.scrollSpeed.x,
          y: this._scrollValues.scrollSpeed.y,
        },
      };
    });
  }

  destroy() {
    super.destroy();
  }
}

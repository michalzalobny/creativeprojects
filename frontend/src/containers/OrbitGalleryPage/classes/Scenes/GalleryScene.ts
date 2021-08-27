import * as THREE from 'three';

import { UpdateInfo, ScrollValues, GalleryItemProps, Bounds } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { MediaScene } from './MediaScene';
import { MouseMove } from '../Singletons/MouseMove';
import { GalleryItem3D } from '../Components/GalleryItem3D';
import { lerp } from '../utils/lerp';
import { TitlesWrapper } from '../HTMLComponents/TitlesWrapper';
import { HTMLComponent } from '../HTMLComponents/HTMLComponent';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
  setIsPanning: React.Dispatch<React.SetStateAction<boolean>>;
}

export class GalleryScene extends MediaScene {
  static scrollSpeed = 1;

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
  _HTMLComponents: HTMLComponent[] = [];
  _titlesWrapper: TitlesWrapper | null = null;
  _setIsPanning: React.Dispatch<React.SetStateAction<boolean>>;

  constructor({ setIsPanning, camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
    this._initHtmlElements();
    this._setIsPanning = setIsPanning;
  }

  set hoveredStoryItem(hoveredItem: GalleryItem3D | null) {}

  _onScroll = (e: THREE.Event) => {
    this._scrollValues.target.x -= e.x;
    this._scrollValues.target.y += e.y;
  };

  _resetScrollValues() {
    //Reset scroll values
    this._scrollValues.current.x = 0;
    this._scrollValues.current.y = 0;

    this._scrollValues.target.x = 0;
    this._scrollValues.target.y = 0;

    this._scrollValues.last.x = 0;
    this._scrollValues.last.y = 0;

    this._scrollValues.strength.current = 0;
    this._scrollValues.strength.target = 0;

    this._scrollValues.scrollSpeed.x = 0;
    this._scrollValues.scrollSpeed.y = 0;
  }

  _onScrollTouchDown = () => {
    this._setIsPanning(true);
    this._galleryItems.forEach(item => {
      item.animatePan(1);
      if (item.isAnimatedIn) {
        item.animateOpacity({ delay: 0, duration: 500, destination: 1 });
      }
    });
  };

  _onScrollTouchUp = () => {
    this._setIsPanning(false);
    this._galleryItems.forEach(item => {
      item.animatePan(0);
      if (item.isAnimatedIn) {
        item.animateOpacity({
          delay: 0,
          duration: 500,
          destination: GalleryItem3D.defaultOpacity,
        });
      }
    });
  };

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('applyscroll', this._onScroll);
    this._scroll.addEventListener('touchdown', this._onScrollTouchDown);
    this._scroll.addEventListener('touchup', this._onScrollTouchUp);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('applyscroll', this._onScroll);
    this._scroll.removeEventListener('touchdown', this._onScrollTouchDown);
    this._scroll.removeEventListener('touchup', this._onScrollTouchUp);
  }

  _passIntersectPoint() {
    this._galleryItems.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._HTMLComponents.forEach(el => {
      el.rendererBounds = this._rendererBounds;
    });

    this._resetScrollValues();
  }

  _initHtmlElements() {
    const textsContainer = Array.from(
      document.querySelectorAll("[data-updatecss='texts-container']"),
    )[0] as HTMLElement;

    this._titlesWrapper = new TitlesWrapper({
      domEl: textsContainer,
      scrollValues: this._scrollValues,
    });

    this._HTMLComponents.push(this._titlesWrapper);
  }

  set items(items: GalleryItemProps[]) {
    super.items = items;

    //Pass scrollValues to gallery elements (as a reference value, better performance)
    this._galleryItems.forEach(item => {
      item.scrollValues = this._scrollValues;
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    this._passIntersectPoint();

    this._HTMLComponents.forEach(el => {
      el.update(updateInfo);
    });

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
  }

  destroy() {
    super.destroy();
  }
}

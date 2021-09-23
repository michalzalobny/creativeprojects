import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { UpdateInfo, Bounds, AnimateProps } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { ItemScene } from './ItemScene';
import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';
import { CardItem3DAnimated } from '../Components/CardItem3DAnimated';
import { Paragraph } from '../HTMLComponents/Paragraph';
import { Animation } from '../HTMLComponents/Animation';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class SlideScene extends ItemScene {
  static lerpEase = 0.07;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 2;
  static timeToSnap = 500;

  _scroll: Scroll;
  _offsetX = {
    last: 0,
    current: 0,
    target: 0,
    strengthTarget: 0,
    strengthCurrent: 0,
  };
  _snapTimeoutId: ReturnType<typeof setTimeout> | null = null;
  _readyTimeoutId: ReturnType<typeof setTimeout> | null = null;
  _activeIndex = 0;
  _targetIndex = 0;
  _scrollBoundary = 1;
  _goToIndexTween: Tween<{ progress: number }> | null = null;
  _isAutoScrolling = false;
  _isReady = false;
  _HTMLTitles: Animation[] = [];
  _HTMLDescriptions: Animation[] = [];
  _activeCollection = '';

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);

    const animatedDescriptions = Array.from(
      document.querySelectorAll('[data-animationel="description"]'),
    ) as HTMLElement[];

    animatedDescriptions.forEach(el => {
      const animatedParagraph = new Paragraph({ element: el });
      this._HTMLDescriptions.push(animatedParagraph);
    });

    const animatedTitles = Array.from(
      document.querySelectorAll('[data-animationel="title"]'),
    ) as HTMLElement[];

    animatedTitles.forEach(el => {
      const animatedParagraph = new Paragraph({ element: el });
      this._HTMLTitles.push(animatedParagraph);
    });
  }

  _performSnap = () => {
    this.animateToIndex({ destination: this._targetIndex });
  };

  _applyScrollX = (x: number) => {
    if (!this._isReady) {
      return;
    }

    if (this._isAutoScrolling) {
      if (this._goToIndexTween) this._goToIndexTween.stop();
      if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);
      this._isAutoScrolling = false;
    }

    let newOffset = this._offsetX.target - x;

    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset >= this._scrollBoundary) {
      newOffset = this._scrollBoundary;
    }

    this._offsetX.target = newOffset;

    //Hanlde auto snap
    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);
    this._snapTimeoutId = setTimeout(this._performSnap, SlideScene.timeToSnap);
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScrollX(e.x * SlideScene.mouseMultiplier);
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScrollX(e.x * SlideScene.touchMultiplier);
  };
  _onScrollWheel = (e: THREE.Event) => {
    this._applyScrollX(e.y * SlideScene.wheelMultiplier);
  };

  _onResize() {
    super._onResize();

    this._scrollBoundary =
      this._collectionWrapperRect.width -
      this._imageWrapperClientWidth -
      this._imageWrapperMarginRight / 2;

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);

    if (this._isReady) {
      const item = this._items3D[this._activeIndex];
      item.animateFocusIn();
    }

    this._performSnap();

    this._HTMLDescriptions.forEach(el => {
      el.onResize();
    });

    this._HTMLTitles.forEach(el => {
      el.onResize();
    });
  }

  _addListeners() {
    super._addListeners();
    this._scroll.addEventListener('mouse', this._onScrollMouse);
    this._scroll.addEventListener('touch', this._onScrollTouch);
    this._scroll.addEventListener('wheel', this._onScrollWheel);
  }

  _removeListeners() {
    super._removeListeners();
    this._scroll.removeEventListener('mouse', this._onScrollMouse);
    this._scroll.removeEventListener('touch', this._onScrollTouch);
    this._scroll.removeEventListener('wheel', this._onScrollWheel);
  }

  _passValues() {
    this._items3D.forEach(item => {
      item.intersectPoint = this._intersectPointLerp;
      item.strength = this._offsetX.strengthCurrent;
    });
  }

  _positionItems(updateInfo: UpdateInfo) {
    this._items3D.forEach((item, index) => {
      item.currentOffsetX = this._offsetX.current;
    });
  }

  _handlePreview(el: CardItem3DAnimated) {
    if (el.isRotated) {
      el.animateRotateOut();
    } else {
      el.animateRotateIn();
    }
  }

  _handleIndexClick(index: number) {
    if (!this._isReady) {
      return;
    }

    super._handleIndexClick(index);

    if (index === this._activeIndex) {
    } else {
      this.animateToIndex({ destination: index });
    }

    const el = this._items3D[index];

    if (!el) {
      return;
    }

    if (el.isFocused) {
      this._handlePreview(el);
    }
  }

  _updateActiveCollectionTitle() {
    this._HTMLDescriptions.forEach(el => {
      const elFilter = el.element.dataset.cfilter;

      if (elFilter === this._activeCollection) {
        el.animateIn();
      } else {
        el.animateOut();
      }
    });
  }

  _updateActiveItemTitle() {
    this._HTMLTitles.forEach(el => {
      const elKey = el.element.dataset.celkey;

      if (elKey === this._activeIndex.toString()) {
        el.animateIn();
      } else {
        el.animateOut();
      }
    });
  }

  _onIndexChange() {
    const el = this._items3D[this._activeIndex];

    if (!el) {
      return;
    }

    this._activeCollection = el.cardItem.item.filter.toLocaleLowerCase();

    this._updateActiveCollectionTitle();
    this._updateActiveItemTitle();

    this._items3D.forEach(item => {
      item.animateRotateOut();
      if (item === el) {
        item.animateFocusIn();
      } else if (item.isFocused) {
        item.animateFocusOut();
      }
    });
  }

  _updateIndex(updateInfo: UpdateInfo) {
    this._offsetX.last = this._offsetX.current;

    this._offsetX.current = lerp(
      this._offsetX.current,
      this._offsetX.target,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._offsetX.strengthTarget = this._offsetX.last - this._offsetX.current;

    this._offsetX.strengthCurrent = lerp(
      this._offsetX.strengthCurrent,
      this._offsetX.strengthTarget,
      SlideScene.lerpEase * updateInfo.slowDownFactor,
    );

    const prevIndex = Math.round(
      (this._offsetX.last / this._scrollBoundary) * (this._items3D.length - 1),
    );

    const currentIndex = Math.round(
      (this._offsetX.current / this._scrollBoundary) *
        (this._items3D.length - 1),
    );

    if (prevIndex !== currentIndex) {
      this._activeIndex = currentIndex;
      this._onIndexChange();
    }

    this._targetIndex = Math.round(
      (this._offsetX.target / this._scrollBoundary) *
        (this._items3D.length - 1),
    );
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    this._passValues();
    this._updateIndex(updateInfo);
    this._positionItems(updateInfo);
  }

  destroy() {
    super.destroy();

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);
    if (this._readyTimeoutId) clearTimeout(this._readyTimeoutId);
  }

  animateToIndex(props: AnimateProps) {
    const {
      destination,
      duration = 400,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._snapTimeoutId) clearTimeout(this._snapTimeoutId);

    if (this._goToIndexTween) this._goToIndexTween.stop();

    this._isAutoScrolling = true;

    const offset =
      (destination / (this._items3D.length - 1)) * this._scrollBoundary;

    this._goToIndexTween = new TWEEN.Tween({
      progress: this._offsetX.target,
    })
      .to({ progress: offset }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._offsetX.target = obj.progress;
      })
      .onComplete(() => {
        this._isAutoScrolling = false;
      });

    this._goToIndexTween.start();
  }

  animateIn() {
    const delayInterval = 40;
    this._items3D.forEach(el => {
      el.animateIn(el.cardItem.itemKeyReverse * delayInterval);
    });

    const maximumDelay = this._items3D.length * delayInterval;

    const finalTiming =
      maximumDelay +
      CardItem3DAnimated.animateReadyDelay +
      CardItem3DAnimated.animateReadyDuration * 0.25;

    this._readyTimeoutId = setTimeout(() => {
      this._onIndexChange();
      this._isReady = true;
    }, finalTiming);
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
  }
}

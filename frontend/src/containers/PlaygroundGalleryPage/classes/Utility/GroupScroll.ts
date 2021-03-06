import TWEEN, { Tween } from '@tweenjs/tween.js';

import { appState } from '../../appState';
import { Scroll } from '../Singletons/Scroll';
import { AnimateProps, ScrollValues, UpdateInfo } from '../types';
import { lerp } from '../utils/lerp';

interface Constructor {
  scroll: Scroll;
}

export class GroupScroll {
  static lerpEase = 0.06;
  static mouseMultiplier = 0.9;
  static touchMultiplier = 1;
  static inActiveScrollMultiplier = 0.89;

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
  };
  _scrollTween: Tween<{ progress: number }> | null = null;

  _isActive = false;

  constructor(props: Constructor) {
    const { scroll } = props;
    this._scroll = scroll;
  }

  _applyScroll = (x: number, y: number) => {
    //Stops scroll animations if any user input occurs
    if (this._scrollTween) this._scrollTween.stop();

    //Stop the actions if the app is not active or modal is currently opened
    if (appState.app && !appState.app.isActive) return;
    if (appState.app && appState.app.isModalOpened) return;

    //If the scroll should not be active, only the tiny amount is applied to the scroll
    const multiplier = this._isActive
      ? 1
      : GroupScroll.inActiveScrollMultiplier;

    this._scrollValues.target.x -= x * multiplier;
    this._scrollValues.target.y += y * multiplier;
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScroll(
      e.x * GroupScroll.mouseMultiplier,
      e.y * GroupScroll.mouseMultiplier,
    );
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScroll(
      e.x * GroupScroll.touchMultiplier,
      e.y * GroupScroll.touchMultiplier,
    );
  };

  _updateScrollValues(updateInfo: UpdateInfo) {
    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
    } else {
      this._scrollValues.direction.x = 'right';
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
    } else {
      this._scrollValues.direction.y = 'down';
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
      GroupScroll.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.last.x = this._scrollValues.current.x;
    this._scrollValues.last.y = this._scrollValues.current.y;

    //lerp scroll
    this._scrollValues.current.x = lerp(
      this._scrollValues.current.x,
      this._scrollValues.target.x,
      GroupScroll.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.current.y = lerp(
      this._scrollValues.current.y,
      this._scrollValues.target.y,
      GroupScroll.lerpEase * updateInfo.slowDownFactor,
    );
  }

  resetScrollValues() {
    //Reset scroll values
    this._scrollValues.current.x = 0;
    this._scrollValues.current.y = 0;

    this._scrollValues.target.x = 0;
    this._scrollValues.target.y = 0;

    this._scrollValues.last.x = 0;
    this._scrollValues.last.y = 0;

    this._scrollValues.strength.current = 0;
    this._scrollValues.strength.target = 0;
  }

  addListeners() {
    this._scroll.addEventListener('mouse', this._onScrollMouse);
    this._scroll.addEventListener('touch', this._onScrollTouch);
  }

  removeListeners() {
    this._scroll.removeEventListener('mouse', this._onScrollMouse);
    this._scroll.removeEventListener('touch', this._onScrollTouch);
  }

  update(updateInfo: UpdateInfo) {
    this._updateScrollValues(updateInfo);
  }

  animateScroll(props: AnimateProps) {
    const {
      destination,
      duration = 500,
      delay = 0,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (this._scrollTween) this._scrollTween.stop();

    this._scrollTween = new TWEEN.Tween({
      progress: this._scrollValues.current.x,
    })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._scrollValues.target.y = obj.progress;
        this._scrollValues.current.y = obj.progress;
      });

    this._scrollTween.start();
  }

  get scrollValues() {
    return this._scrollValues;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }
}

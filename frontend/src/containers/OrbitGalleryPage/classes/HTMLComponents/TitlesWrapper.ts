import TWEEN, { Tween } from '@tweenjs/tween.js';

import { ScrollValues, UpdateInfo, Bounds } from '../types';
import { HTMLComponent } from './HTMLComponent';
import { Title } from './Title';

interface Constructor {
  domEl: HTMLElement;
  scrollValues: ScrollValues;
}

export class TitlesWrapper extends HTMLComponent {
  _scrollValues: ScrollValues;
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _scaleTween: Tween<{ progress: number }> | null = null;
  _scaleMultiplier = 2;
  _titles: Title[] = [];

  constructor({ domEl, scrollValues }: Constructor) {
    super({ domEl });
    this._scrollValues = scrollValues; //Passed as a reference obj for better performance
    this._initTitles();
    this._domEl.style.transform = `translate(-50%, -50%) rotate(-90deg) scale(${this._scaleMultiplier})`;
    this.animateScale(1);
  }

  _initTitles() {
    (Array.from(this._domEl.children) as HTMLElement[]).forEach(el => {
      this._titles.push(
        new Title({
          domEl: el,
          scrollValues: this._scrollValues,
          parentEl: this._domEl,
          parentScale: this._scaleMultiplier,
        }),
      );
    });
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;

    this._titles.forEach(el => {
      el.rendererBounds = this._rendererBounds;
    });
  }

  animateScale(destination: number) {
    if (this._scaleTween) {
      this._scaleTween.stop();
    }

    this._scaleTween = new TWEEN.Tween({ progress: this._scaleMultiplier })
      .to({ progress: destination }, 2000)
      .delay(2000)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        this._scaleMultiplier = obj.progress;
        this._domEl.style.transform = `translate(-50%, -50%) rotate(-90deg) scale(${this._scaleMultiplier})`;

        this._titles.forEach(el => {
          el.parentScale = this._scaleMultiplier;
        });
      })
      .onComplete(() => {
        this._updateSizes();

        this._titles.forEach(el => {
          el.updateSizes();
        });
      });

    this._scaleTween.start();
  }

  update(updateInfo: UpdateInfo) {
    this._titles.forEach(el => {
      el.update(updateInfo);
    });
  }
}

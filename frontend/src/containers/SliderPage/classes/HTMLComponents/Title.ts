import { HTMLComponent } from './HTMLComponent';
import { ScrollValues, UpdateInfo, Bounds } from '../types';

interface Constructor {
  domEl: HTMLElement;
  scrollValues: ScrollValues;
  parentEl: HTMLElement;
  parentScale: number;
}

export class Title extends HTMLComponent {
  _scrollValues: ScrollValues;
  _parentEl: HTMLElement;
  _parentBounds: DOMRect;
  _extra = 0;
  _parentScale: number;

  constructor({ domEl, scrollValues, parentEl, parentScale }: Constructor) {
    super({ domEl });
    this._scrollValues = scrollValues; //Passed as a reference obj for better performance
    this._parentEl = parentEl;
    this._parentScale = parentScale;
    this._parentBounds = this._parentEl.getBoundingClientRect();
  }

  _updateSizes() {
    this._domEl.style.transform = ` translateX(${0}px)`;
    this._extra = 0;
    super._updateSizes();
    this._parentBounds = this._parentEl.getBoundingClientRect();
  }

  set rendererBounds(bounds: Bounds) {
    super.rendererBounds = bounds;
    this._extra = 0;
  }

  set parentScale(value: number) {
    this._parentScale = value;
  }

  updateSizes() {
    this._updateSizes();
  }

  update(updateInfo: UpdateInfo) {
    if (this._parentBounds) {
      const newTranslate = this._scrollValues.current.y * 1.3;
      const positionY = this._elBounds.y / this._parentScale;
      const height = this._elBounds.height / this._parentScale;
      const wrapperHeight = this._parentBounds.height / this._parentScale;

      this._domEl.style.transform = ` translateX(${
        newTranslate + this._extra
      }px)`;

      if (this._scrollValues.direction.y === 'up') {
        const y = positionY + height - newTranslate - this._extra;

        if (y < 0) {
          this._extra -= wrapperHeight;
        }
      } else if (this._scrollValues.direction.y === 'down') {
        const y = -newTranslate - this._extra;

        if (y > this._rendererBounds.height / this._parentScale - positionY) {
          this._extra += wrapperHeight;
        }
      }
    }
  }
}

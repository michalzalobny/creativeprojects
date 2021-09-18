import TWEEN, { Tween } from '@tweenjs/tween.js';

import { CardItemProps, AnimateProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: CardItemProps;
  domEl: HTMLElement;
}

export class CardItem3DAnimated extends CardItem3D {
  static defaultOpacity = 0.4;

  _opacityTween: Tween<{ progress: number }> | null = null;
  _translateXTween: Tween<{ translationX: number }> | null = null;
  _translateYTween: Tween<{ translationY: number }> | null = null;
  isFocused = false;

  constructor({ domEl, cardItem, geometry }: Constructor) {
    super({ domEl, geometry, cardItem });
  }

  animateOpacity(props: AnimateProps) {
    const {
      destination,
      duration = 400,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  animateTranslateX(props: AnimateProps) {
    const {
      destination,
      duration = 700,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._translateXTween) {
      this._translateXTween.stop();
    }

    this._translateXTween = new TWEEN.Tween({
      translationX: this._extraTranslate.x,
    })
      .to({ translationX: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._extraTranslate.x = obj.translationX;
      });

    this._translateXTween.start();
  }

  animateTranslateY(props: AnimateProps) {
    const {
      destination,
      duration = 700,
      delay = 0,
      easing = TWEEN.Easing.Sinusoidal.InOut,
    } = props;

    if (this._translateYTween) {
      this._translateYTween.stop();
    }

    this._translateYTween = new TWEEN.Tween({
      translationY: this._extraTranslate.y,
    })
      .to({ translationY: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._extraTranslate.y = obj.translationY;
      });

    this._translateYTween.start();
  }

  animateIn() {
    this._tweenOpacity = 0;

    this.animateOpacity({
      destination: CardItem3DAnimated.defaultOpacity,
      duration: 500,
    });
  }

  animateFocusIn() {
    if (this.isFocused) {
      return;
    }

    this.isFocused = true;

    this.animateOpacity({
      destination: 1,
      duration: 500,
    });
  }

  animateFocusOut() {
    if (!this.isFocused) {
      return;
    }

    this.isFocused = false;

    this.animateOpacity({
      destination: CardItem3DAnimated.defaultOpacity,
      duration: 500,
    });
  }
}

import TWEEN, { Tween } from '@tweenjs/tween.js';

import { CardItemProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: CardItemProps;
  domEl: HTMLElement;
}

interface AnimateProps {
  duration?: number;
  delay?: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class CardItem3DAnimated extends CardItem3D {
  _opacityTween: Tween<{ progress: number }> | null = null;
  _translateXTween: Tween<{ translationX: number }> | null = null;
  _translateYTween: Tween<{ translationY: number }> | null = null;
  isSlidOut = true;

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
      destination: 1,
      duration: 1000,
      delay: 900,
    });
  }

  slideIn() {
    if (!this.isSlidOut) {
      return;
    }

    this.isSlidOut = false;

    this.animateOpacity({
      destination: 1,
      duration: 600,
      delay: 50,
    });
    this.animateTranslateX({
      destination: 0,
      duration: 1100,
      easing: TWEEN.Easing.Exponential.Out,
    });
  }

  slideOut() {
    if (this.isSlidOut) {
      return;
    }

    const elWidth = this._domElBounds?.width || 400;

    this.isSlidOut = true;

    this.animateOpacity({
      destination: 0,
      duration: 600,
    });
    this.animateTranslateX({
      destination: -elWidth * 1.15,
      duration: 1100,
      easing: TWEEN.Easing.Exponential.Out,
    });
  }
}

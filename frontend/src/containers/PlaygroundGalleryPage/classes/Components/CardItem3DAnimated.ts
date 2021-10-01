import TWEEN, { Tween } from '@tweenjs/tween.js';

import { ItemProps, AnimateProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
  galleryDomEl: HTMLElement;
}

export class CardItem3DAnimated extends CardItem3D {
  static defaultOpacity = 1;

  _readyTween: Tween<{ progress: number }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _scaleTween: Tween<{
    x: number;
    y: number;
  }> | null = null;

  constructor({ galleryDomEl, domEl, cardItem, geometry }: Constructor) {
    super({ galleryDomEl, domEl, geometry, cardItem });
  }

  animateScale(props: AnimateProps) {
    const {
      delay = 0,
      destination = 1,
      duration,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (this._scaleTween) {
      this._scaleTween.stop();
    }

    if (!this._mesh) {
      return;
    }

    const startX = this._mesh.scale.x;
    const startY = this._mesh.scale.y;

    const destinationX = this._domElBounds.width * destination;
    const destinationY = this._domElBounds.height * destination;

    this._scaleTween = new TWEEN.Tween({
      x: startX,
      y: startY,
    })
      .to({ x: destinationX, y: destinationY }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        if (this._mesh) {
          this._scaleTranslate.x = -(this._domElBounds.width - obj.x) / 2;
          this._scaleTranslate.y = (this._domElBounds.height - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {});

    this._scaleTween.start();
  }

  animateOpacity(props: AnimateProps) {
    super.animateOpacity(props);
    const {
      destination,
      duration = 500,
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

  animateIn(delay: number) {
    this._tweenOpacity = 0;

    this.animateOpacity({
      easing: TWEEN.Easing.Exponential.InOut,
      destination: CardItem3DAnimated.defaultOpacity,
      duration: 1000,
      delay: delay,
    });
  }
}

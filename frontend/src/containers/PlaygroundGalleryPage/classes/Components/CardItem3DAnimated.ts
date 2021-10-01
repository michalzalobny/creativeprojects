import TWEEN, { Tween } from '@tweenjs/tween.js';

import { ItemProps, AnimateProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
}

export class CardItem3DAnimated extends CardItem3D {
  static defaultOpacity = 1;

  _readyTween: Tween<{ progress: number }> | null = null;
  _rotateTween: Tween<{ progress: number }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _translateXTween: Tween<{ translationX: number }> | null = null;
  _translateYTween: Tween<{ translationY: number }> | null = null;
  _scaleTween: Tween<{
    x: number;
    y: number;
  }> | null = null;

  constructor({ domEl, cardItem, geometry }: Constructor) {
    super({ domEl, geometry, cardItem });
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

  animateRotate(props: AnimateProps) {
    const {
      destination,
      duration = 1300,
      delay = 0,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (this._rotateTween) this._rotateTween.stop();

    this._rotateTween = new TWEEN.Tween({
      progress: this._rotationProgress,
    })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        this._rotationProgress = obj.progress;

        if (this._mesh) {
          this._mesh.rotation.y = this._rotationProgress * Math.PI;
        }
      });

    this._rotateTween.start();
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

  setElementScale(value: number) {
    if (this._mesh) {
      const destinationX = this._domElBounds.width * value;
      const destinationY = this._domElBounds.height * value;

      this._scaleTranslate.x = -(this._domElBounds.width - destinationX) / 2;
      this._scaleTranslate.y = (this._domElBounds.height - destinationY) / 2;

      this._mesh.scale.x = destinationX;
      this._mesh.scale.y = destinationY;
    }
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

  animateRotateIn() {
    this.isRotated = true;
    this.animateRotate({ destination: 1 });
  }

  animateRotateOut() {
    this.isRotated = false;
    this.animateRotate({ destination: 0 });
  }
}

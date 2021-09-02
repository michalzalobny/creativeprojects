import TWEEN, { Tween } from '@tweenjs/tween.js';

import { FollowItemProps } from '../types';
import { CardItem3D } from './CardItem3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  followItem: FollowItemProps;
  domEl: HTMLElement;
}

interface AnimateProps {
  duration: number;
  delay: number;
  destination?: number;
  easing?: (amount: number) => number;
}

export class CardItem3DAnimated extends CardItem3D {
  static defaultDuration = 1450;
  static defaultLerp = 0.01;

  _animateRandomPositionTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _scaleTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _followTween: Tween<{ progress: number }> | null = null;

  constructor({ domEl, followItem, geometry }: Constructor) {
    super({ domEl, geometry, followItem });
  }

  animateOpacity(props: AnimateProps) {
    const {
      destination,
      duration,
      delay,
      easing = TWEEN.Easing.Linear.None,
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

  animateFollow(props: AnimateProps) {
    const {
      destination,
      duration,
      delay,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (this._followTween) {
      this._followTween.stop();
    }

    this._followTween = new TWEEN.Tween({ progress: this._followProgress })
      .to({ progress: destination }, duration)

      .easing(easing)
      .delay(delay)
      .onUpdate(obj => {
        if (destination === 0) {
          this._shouldFollow = false;
        } else {
          this._shouldFollow = true;
        }

        this._followProgress = obj.progress;
      })
      .onComplete(() => {
        this._shouldFollow = true;
      });

    this._followTween.start();
  }

  animateScale(props: AnimateProps) {
    const {
      delay,
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
          this._extraScaleTranslate.x = -(this._domElBounds.width - obj.x) / 2;
          this._extraScaleTranslate.y = (this._domElBounds.height - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {});

    this._scaleTween.start();
  }

  animateIn() {
    if (this._mesh) {
      this._mesh.scale.x = this._childElBounds.width;
      this._mesh.scale.y = this._childElBounds.height;
    }

    this._rotateMeshRandomly();

    this.animateOpacity({
      destination: CardItem3D.defaultOpacity,
      duration: CardItem3DAnimated.defaultDuration,
      delay: 0,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this.animateScale({
      destination: 1,
      duration: CardItem3DAnimated.defaultDuration,
      delay: 0,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this._extraTranslate.x = 0;
    this._extraTranslate.y = 0;

    this.animateRandomPosition({
      delay: 0,
      duration: CardItem3DAnimated.defaultDuration,
    });
  }

  animateRandomPosition(props: AnimateProps) {
    const { delay, duration, easing = TWEEN.Easing.Exponential.InOut } = props;

    if (this._animateRandomPositionTween) {
      this._animateRandomPositionTween.stop();
    }

    const destinationPosition = this._getRandomPosition();

    this._animateRandomPositionTween = new TWEEN.Tween({
      x: this._extraTranslate.x,
      y: this._extraTranslate.y,
    })
      .to({ x: destinationPosition.x, y: destinationPosition.y }, duration)
      .easing(easing)
      .delay(delay)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraTranslate.x = obj.x;
          this._extraTranslate.y = obj.y;
        }
      });

    this._animateRandomPositionTween.start();
  }

  toggleFollowing(value: boolean) {
    if (value) {
      this.animateFollow({
        delay: this.followItem.key * 1,
        destination: 1,
        duration: CardItem3DAnimated.defaultDuration * 0.7,
      });

      this.animateScale({
        delay: this.followItem.key * 1,
        destination: 2.8,
        duration: CardItem3DAnimated.defaultDuration * 0.7,
      });
    } else {
      this._lerpEase.target = CardItem3DAnimated.defaultLerp;
      this._mouseValues.target.x = this._mouseValues.current.x;
      this._mouseValues.target.y = this._mouseValues.current.y;
      this._mouseValues.last.x = this._mouseValues.current.x;
      this._mouseValues.last.y = this._mouseValues.current.y;

      this.animateFollow({
        delay: this.followItem.key * 15,
        destination: 0,
        duration: CardItem3DAnimated.defaultDuration,
      });

      this.animateScale({
        delay: this.followItem.key * 15,
        destination: 1,
        duration: CardItem3DAnimated.defaultDuration,
      });

      this.animateRandomPosition({
        delay: 0,
        duration: CardItem3DAnimated.defaultDuration,
      });
    }
  }
}

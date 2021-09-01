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
  destination: number;
  easing?: (amount: number) => number;
}

export class CardItem3DAnimated extends CardItem3D {
  static defaultDuration = 1450;

  _animateInTween: Tween<{
    x: number;
    y: number;
    progress: number;
  }> | null = null;
  _scaleItemTween: Tween<{
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
        if (!this._mesh) {
          return;
        }

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

    const isReverted = destination === 0;

    this._followTween = new TWEEN.Tween({ progress: this._followProgress })
      .to({ progress: destination }, duration)

      .easing(
        isReverted
          ? TWEEN.Easing.Exponential.InOut
          : TWEEN.Easing.Exponential.InOut,
      )
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

  scaleItem(props: AnimateProps) {
    const {
      delay,
      destination,
      duration,
      easing = TWEEN.Easing.Exponential.InOut,
    } = props;

    if (!this._mesh) {
      return;
    }

    if (this._scaleItemTween) {
      this._scaleItemTween.stop();
    }

    const startX = this._mesh.scale.x;
    const startY = this._mesh.scale.y;

    const destinationX = this._domElBounds.width * destination;
    const destinationY = this._domElBounds.height * destination;

    this._scaleItemTween = new TWEEN.Tween({
      x: startX,
      y: startY,
    })
      .to({ x: destinationX, y: destinationY }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraScale.x = -(this._domElBounds.width - obj.x) / 2;
          this._extraScale.y = (this._domElBounds.height - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {});

    this._scaleItemTween.start();
  }

  animateIn() {
    if (!this._mesh) {
      return;
    }

    if (this._animateInTween) {
      this._animateInTween.stop();
    }

    this._rotateMeshRandomly();

    const progress = 0;

    const positionStart = this._getRandomPosition();

    const startX = this._childElBounds.width;
    const startY = this._childElBounds.height;

    const destinationX = this._domElBounds.width;
    const destinationY = this._domElBounds.height;

    this.animateOpacity({
      destination: CardItem3D.defaultOpacity,
      duration: CardItem3DAnimated.defaultDuration,
      delay: 0,
      easing: TWEEN.Easing.Exponential.InOut,
    });

    this._animateInTween = new TWEEN.Tween({
      x: startX,
      y: startY,
      progress,
    })
      .to(
        { x: destinationX, y: destinationY, progress: 1 },
        CardItem3DAnimated.defaultDuration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(obj => {
        if (this._mesh) {
          this._extraScale.x = -(destinationX - obj.x) / 2;
          this._extraScale.y = (destinationY - obj.y) / 2;

          this._extraTranslate.x = obj.progress * positionStart.x;
          this._extraTranslate.y = obj.progress * positionStart.y;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;
        }
      })
      .onComplete(() => {
        this.isAnimatedIn = true;
      });

    this._animateInTween.start();
  }

  toggleFollowing(value: boolean) {
    if (value) {
      this._lerpEase.target =
        this._lerpFirst * Math.pow(this._lerpQuotient, this.followItem.key - 1);

      this.animateFollow({
        delay: this.followItem.key * 1,
        destination: 1,
        duration: CardItem3DAnimated.defaultDuration * 0.7,
      });

      this.scaleItem({
        delay: this.followItem.key * 1,
        destination: 2,
        duration: CardItem3DAnimated.defaultDuration * 0.7,
      });
    } else {
      this._lerpEase.target = 0.01;
      this._mouseValues.target.x = this._mouseValues.current.x;
      this._mouseValues.target.y = this._mouseValues.current.y;
      this._mouseValues.last.x = this._mouseValues.current.x;
      this._mouseValues.last.y = this._mouseValues.current.y;

      this.animateFollow({
        delay: this.followItem.key * 15,
        destination: 0,
        duration: CardItem3DAnimated.defaultDuration,
      });

      this.scaleItem({
        delay: this.followItem.key * 15,
        destination: 1,
        duration: CardItem3DAnimated.defaultDuration,
      });
    }
  }
}

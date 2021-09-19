import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
  useObserver?: boolean;
}

export class Animation {
  delay: number;
  element: HTMLElement;
  target: HTMLElement;
  transformPrefix = Prefix('transform');
  isVisible = false;
  observer: void | null = null;

  constructor({ useObserver = true, element }: Constructor) {
    const { animationDelay = '0', animationTarget = null } = element.dataset;

    this.delay = Number(animationDelay);

    this.element = element;

    const specificTarget = animationTarget
      ? (element.closest(animationTarget) as HTMLElement)
      : null;

    this.target = specificTarget ? specificTarget : element;

    if (!useObserver) {
      return;
    }

    if ('IntersectionObserver' in window) {
      this.createObserver();
    }
  }

  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    }).observe(this.target);
  }

  animateIn() {
    this.isVisible = true;
  }

  animateOut() {
    this.isVisible = false;
  }
}

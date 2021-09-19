import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
}

export class Animation {
  delay: number;
  element: HTMLElement;
  target: HTMLElement | null;
  transformPrefix = Prefix('transform');
  isVisible = false;
  observer: void | null = null;

  constructor({ element }: Constructor) {
    const { animationDelay = '0', animationTarget = null } = element.dataset;

    this.delay = Number(animationDelay);

    this.element = element;

    this.target = animationTarget ? element.closest(animationTarget) : element;

    if ('IntersectionObserver' in window) {
      this.createObserver();
    }
  }

  createObserver() {
    if (!this.target) {
      return;
    }

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

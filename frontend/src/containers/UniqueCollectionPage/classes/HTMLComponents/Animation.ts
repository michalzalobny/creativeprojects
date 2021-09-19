import Prefix from 'prefix';

interface Constructor {
  element: HTMLElement;
}

export class Animation {
  delay: number;
  element: HTMLElement;
  target: HTMLElement;
  transformPrefix = Prefix('transform');
  isVisible = false;
  observer: void | null = null;

  constructor({ element }: Constructor) {
    const {
      animationdelay = '0',
      animationtarget = null,
      useobserver = false,
    } = element.dataset;

    this.delay = Number(animationdelay);

    this.element = element;

    const specificTarget = animationtarget
      ? (element.closest(animationtarget) as HTMLElement)
      : null;

    this.target = specificTarget ? specificTarget : element;

    if (!useobserver) {
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

  onResize() {}
}

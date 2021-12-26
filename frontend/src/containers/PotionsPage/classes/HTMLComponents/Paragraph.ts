import each from 'lodash/each';

import { Animation } from './Animation';

import { calculate, split } from '../utils/text';

interface Constructor {
  element: HTMLElement;
}

export class Paragraph extends Animation {
  lines: HTMLElement[] = [];
  calculatedLines: HTMLElement[][] = [];

  constructor({ element }: Constructor) {
    super({ element });

    const paragraphs = Array.from(
      element.querySelectorAll('h1, h2, p'),
    ) as HTMLElement[];

    if (paragraphs.length !== 0) {
      each(paragraphs, element => {
        split({ element });
        split({ element });

        const spans = Array.from(
          element.querySelectorAll('span span'),
        ) as HTMLElement[];

        this.lines.push(...spans);
      });
    } else {
      split({ element });
      split({ element });

      const spans = Array.from(
        element.querySelectorAll('span span'),
      ) as HTMLElement[];

      this.lines.push(...spans);
    }
    this.onResize();
  }

  animateIn() {
    super.animateIn();
    each(this.calculatedLines, (line, lineIndex) => {
      each(line, word => {
        word.style.transition = `transform 1s ${
          0.8 + lineIndex * 0.1
        }s cubic-bezier(0.77, 0, 0.175, 1)`;
        word.style[this.transformPrefix] = 'translateY(0)';
        word.style.opacity = '1';
      });
    });
  }

  animateOut() {
    super.animateOut();
    each(this.calculatedLines, (line, lineIndex) => {
      each(line, word => {
        word.style.transition = `transform 1s ${
          0.2 + lineIndex * 0.1
        }s cubic-bezier(0.77, 0, 0.175, 1)`;
        word.style[this.transformPrefix] = 'translateY(100%)';
        word.style.opacity = '1';
      });
    });
  }

  onResize() {
    super.onResize();
    this.calculatedLines = calculate(this.lines);
  }
}

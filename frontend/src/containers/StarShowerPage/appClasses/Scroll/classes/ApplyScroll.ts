import { ScrollObj } from '../Scroll';

interface ApplyScrollXY {
  x: number;
  y: number;
}

export class ApplyScroll {
  scrollObj: ScrollObj;

  constructor(scrollObj: ScrollObj) {
    this.scrollObj = scrollObj;
  }

  applyScrollXY({ x, y }: ApplyScrollXY) {
    this.applyScrollX(x);
    this.applyScrollY(y);
  }

  applyScrollX(amountPx: number) {
    const newOffsetX = this.scrollObj.target.x + amountPx;
    this.scrollObj.target.x = newOffsetX;
  }

  applyScrollY(amountPx: number) {
    const newOffsetY = this.scrollObj.target.y + amountPx;
    this.scrollObj.target.y = newOffsetY;
  }
}

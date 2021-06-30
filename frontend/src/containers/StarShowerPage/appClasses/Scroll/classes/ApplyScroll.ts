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
    const newOffsetX = this.scrollObj.targetX + amountPx;
    this.scrollObj.targetX = newOffsetX;
  }

  applyScrollY(amountPx: number) {
    const newOffsetY = this.scrollObj.targetY + amountPx;
    this.scrollObj.targetY = newOffsetY;
  }
}

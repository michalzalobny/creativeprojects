import { ScrollObj } from '../scroll';

export type ApplyScroll = {
  x: number;
  y: number;
  scrollObj: ScrollObj;
};

export const applyScroll = (props: ApplyScroll) => {
  const { scrollObj, x, y } = props;
  applyScrollY(y, scrollObj);
  applyScrollX(x, scrollObj);
};

const applyScrollX = (amountPx: number, scrollObj: ScrollObj) => {
  const newOffsetX = scrollObj.targetX + amountPx;

  scrollObj.targetX = newOffsetX;
};

const applyScrollY = (amountPx: number, scrollObj: ScrollObj) => {
  const newOffsetY = scrollObj.targetY + amountPx;

  scrollObj.targetY = newOffsetY;
};

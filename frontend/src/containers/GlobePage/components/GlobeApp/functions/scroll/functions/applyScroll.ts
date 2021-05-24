import { ScrollObj, ScrollMode } from '../scroll';
import { getProgressValues } from './getProgressValues';

export type ApplyScroll = {
  horizontalAmountPx: number;
  verticalAmountPx: number;
  scrollObj: ScrollObj;
};

export const applyScroll = (props: ApplyScroll) => {
  const { scrollObj, horizontalAmountPx, verticalAmountPx } = props;
  scrollObj.TWEEN_GROUP_SEEK.removeAll();
  applyScrollVertical(verticalAmountPx, scrollObj);
  applyScrollHorizontal(horizontalAmountPx, scrollObj);
};

const applyScrollHorizontal = (amountPx: number, scrollObj: ScrollObj) => {
  const newOffsetX = scrollObj.targetX + amountPx / 200;

  scrollObj.targetX = newOffsetX;
  scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
};

const applyScrollVertical = (amountPx: number, scrollObj: ScrollObj) => {
  const newOffsetY = scrollObj.targetY + amountPx / 200;

  if (Math.abs(newOffsetY) >= Math.PI / 2) {
    return;
  }

  scrollObj.targetY = newOffsetY;
  scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
};

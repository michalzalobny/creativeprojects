import { ScrollObj, ScrollMode } from '../sideScroll';
import { getProgressValues } from './getProgressValues';

export type ApplyScroll = {
  horizontalAmountPx: number;
  verticalAmountPx: number;
  scrollObj: ScrollObj;
};

export const applyScroll = (props: ApplyScroll) => {
  const { scrollObj, horizontalAmountPx, verticalAmountPx } = props;
  scrollObj.TWEEN_GROUP_SEEK.removeAll();
  applyScrollHorizontal(horizontalAmountPx, scrollObj);
};

//TODO : ADD BOUNDARIES AS FOR VERTICAL
const applyScrollHorizontal = (amountPx: number, scrollObj: ScrollObj) => {
  const newOffsetX = scrollObj.targetX - amountPx;

  scrollObj.targetX = newOffsetX;
  scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
};

const applyScrollVertical = (amountPx: number, scrollObj: ScrollObj) => {
  const boundary =
    scrollObj.contentSizes.height - scrollObj.viewportSizes.height;
  const newOffsetY = scrollObj.targetY + amountPx;

  if (-newOffsetY >= boundary) {
    scrollObj.targetY = -boundary;
    scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  } else if (-newOffsetY >= 0) {
    scrollObj.targetY = newOffsetY;
    scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  } else {
    scrollObj.targetY = 0;
    scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  }
};

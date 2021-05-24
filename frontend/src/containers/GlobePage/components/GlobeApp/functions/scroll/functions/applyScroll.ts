import { ScrollObj, ScrollMode } from 'utils/functions/scroll/scroll';
import { getProgressValues } from './getProgressValues';

export type ApplyScroll = {
  horizontalAmountPx: number;
  verticalAmountPx: number;
  scrollObj: ScrollObj;
};

export const applyScroll = (props: ApplyScroll) => {
  const { scrollObj, horizontalAmountPx, verticalAmountPx } = props;
  scrollObj.TWEEN_GROUP_SEEK.removeAll();
  switch (scrollObj.scrollMode) {
    case ScrollMode.VERTICAL:
      applyScrollVertical(verticalAmountPx, scrollObj);
      break;
    case ScrollMode.HORIZONTAL:
      applyScrollHorizontal(horizontalAmountPx, scrollObj);
      break;
    default:
      throw new Error('Invalid timeline mode');
  }
};

//TODO : ADD BOUNDARIES AS FOR VERTICAL
const applyScrollHorizontal = (amountPx: number, scrollObj: ScrollObj) => {
  const boundary = scrollObj.contentSizes.width - scrollObj.viewportSizes.width;
  const newOffsetX = scrollObj.targetX + amountPx;

  // if (-newOffsetX >= boundary) {
  //   scrollObj.targetX = -boundary;
  //   scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // } else if (-newOffsetX >= 0) {
  scrollObj.targetX = newOffsetX;
  scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // } else {
  //   scrollObj.targetX = 0;
  //   scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // }
};

const applyScrollVertical = (amountPx: number, scrollObj: ScrollObj) => {
  const boundary =
    scrollObj.contentSizes.height - scrollObj.viewportSizes.height;
  const newOffsetY = scrollObj.targetY + amountPx;

  // if (-newOffsetY >= boundary) {
  //   scrollObj.targetY = -boundary;
  //   scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // } else if (-newOffsetY >= 0) {
  scrollObj.targetY = newOffsetY;
  scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // } else {
  //   scrollObj.targetY = 0;
  //   scrollObj.progressRatio = getProgressValues(scrollObj).calculatedProgress;
  // }
};

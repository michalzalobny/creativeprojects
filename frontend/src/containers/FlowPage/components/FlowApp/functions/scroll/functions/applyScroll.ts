import { scrollObj, ScrollMode } from '../scroll';
import { getProgressValues } from './getProgressValues';

export type ApplyScroll = {
  horizontalAmountPx: number;
  verticalAmountPx: number;
};

export const applyScroll = (props: ApplyScroll) => {
  scrollObj.TWEEN_GROUP_SEEK.removeAll();
  const { horizontalAmountPx, verticalAmountPx } = props;
  switch (scrollObj.scrollMode) {
    case ScrollMode.VERTICAL:
      applyScrollVertical(verticalAmountPx);
      break;
    case ScrollMode.HORIZONTAL:
      applyScrollHorizontal(horizontalAmountPx);
      break;
    default:
      throw new Error('Invalid timeline mode');
  }
};

//TODO : ADD BOUNDARIES AS FOR VERTICAL
const applyScrollHorizontal = (amountPx: number) => {
  if (scrollObj.contentWidth > scrollObj.windowWidth) {
    const newOffsetX = scrollObj.targetX + amountPx;

    scrollObj.targetX = newOffsetX;
    scrollObj.progressRatio = getProgressValues().calculatedProgress;
  }
};

const applyScrollVertical = (amountPx: number) => {
  if (scrollObj.contentHeight > scrollObj.windowHeight) {
    const boundary = scrollObj.contentHeight - scrollObj.windowHeight;
    const newOffsetY = scrollObj.targetY + amountPx;

    if (-newOffsetY >= boundary) {
      scrollObj.targetY = -boundary;
      scrollObj.progressRatio = getProgressValues().calculatedProgress;
    } else if (-newOffsetY >= 0) {
      scrollObj.targetY = newOffsetY;
      scrollObj.progressRatio = getProgressValues().calculatedProgress;
    } else {
      scrollObj.targetY = 0;
      scrollObj.progressRatio = getProgressValues().calculatedProgress;
    }
  }
};

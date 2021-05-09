import { calculateProgress } from '../utils/calculateProgress';
import { getPaddedOffset } from '../utils/getPaddedOffset';
import { retrieveCurrentOffset } from '../utils/retrieveCurrentOffset';

import { ScrollMode, scrollObj } from '../scroll';

export interface ProgressValues {
  calculatedProgress: number;
  paddedOffset: number;
  currentOffset: number;
}

export const getProgressValues = (): ProgressValues => {
  let calculatedProgress;
  let paddedOffset;
  let currentOffset;
  let progressLimit;

  switch (scrollObj.scrollMode) {
    case ScrollMode.VERTICAL:
      progressLimit = scrollObj.contentHeight;
      calculatedProgress = calculateProgress(scrollObj.currentY, progressLimit); //TO CHECK target or current
      paddedOffset = getPaddedOffset(scrollObj.progressRatio, progressLimit);
      currentOffset = retrieveCurrentOffset(
        scrollObj.progressRatio,
        progressLimit,
      );
      break;
    case ScrollMode.HORIZONTAL:
      progressLimit = scrollObj.contentWidth;
      calculatedProgress = calculateProgress(scrollObj.currentX, progressLimit); //TO CHECK
      paddedOffset = getPaddedOffset(scrollObj.progressRatio, progressLimit);
      currentOffset = retrieveCurrentOffset(
        scrollObj.progressRatio,
        progressLimit,
      );
      break;
    default:
      throw new Error('Invalid timeline mode');
  }
  return {
    calculatedProgress,
    paddedOffset,
    currentOffset,
  };
};

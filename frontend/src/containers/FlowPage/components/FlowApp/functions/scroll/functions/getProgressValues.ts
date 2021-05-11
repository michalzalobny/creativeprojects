import { calculateProgress } from '../utils/calculateProgress';
import { getPaddedOffset } from '../utils/getPaddedOffset';
import { retrieveCurrentOffset } from '../utils/retrieveCurrentOffset';

import { ScrollMode, ScrollObj } from '../scroll';
import { appObj } from '../../app';

export interface ProgressValues {
  calculatedProgress: number;
  paddedOffset: number;
  currentOffset: number;
}

export const getProgressValues = (scrollObj: ScrollObj): ProgressValues => {
  let calculatedProgress;
  let paddedOffset;
  let currentOffset;
  let progressLimit;

  switch (scrollObj.scrollMode) {
    case ScrollMode.VERTICAL:
      progressLimit = scrollObj.contentHeight - appObj.sizes.height;
      calculatedProgress = calculateProgress(scrollObj.targetY, progressLimit);
      paddedOffset = getPaddedOffset(scrollObj.progressRatio, progressLimit);
      currentOffset = retrieveCurrentOffset(
        scrollObj.progressRatio,
        progressLimit,
      );
      break;
    case ScrollMode.HORIZONTAL:
      progressLimit = scrollObj.contentWidth - appObj.sizes.width;
      calculatedProgress = calculateProgress(scrollObj.targetX, progressLimit);
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

import React from 'react';
import { MotionValue } from 'framer-motion';

import { calculateProgress } from '../utils/calculateProgress';
import { getPaddedOffset } from '../utils/getPaddedOffset';
import { retrieveCurrentOffset } from '../utils/retrieveCurrentOffset';
import { TimelineMode } from '../InfiniteTimeline';

type UseProgress = {
  progressRatio: MotionValue;
  contentWidth: React.MutableRefObject<number>;
  contentHeight: React.MutableRefObject<number>;
  offsetX: MotionValue;
  offsetY: MotionValue;
  timelineMode: React.MutableRefObject<TimelineMode>;
};

export interface ProgressValues {
  calculatedProgress: number;
  paddedOffset: number;
  currentOffset: number;
}

export const useProgress = (props: UseProgress) => {
  const {
    progressRatio,
    contentHeight,
    contentWidth,
    offsetX,
    offsetY,
    timelineMode,
  } = props;

  const getProgressValues = (): ProgressValues => {
    let calculatedProgress;
    let paddedOffset;
    let currentOffset;
    let progressLimit;

    switch (timelineMode.current) {
      case TimelineMode.TIMELINE_MODE_VERTICAL:
        progressLimit = contentHeight.current;
        calculatedProgress = calculateProgress(offsetY.get(), progressLimit);
        paddedOffset = getPaddedOffset(progressRatio.get(), progressLimit);
        currentOffset = retrieveCurrentOffset(
          progressRatio.get(),
          progressLimit,
        );
        break;
      case TimelineMode.TIMELINE_MODE_HORIZONTAL:
        progressLimit = contentWidth.current;
        calculatedProgress = calculateProgress(offsetX.get(), progressLimit);
        paddedOffset = getPaddedOffset(progressRatio.get(), progressLimit);
        currentOffset = retrieveCurrentOffset(
          progressRatio.get(),
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

  return { getProgressValues };
};

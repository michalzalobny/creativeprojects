import { MotionValue } from 'framer-motion';
import React from 'react';
import { Group } from '@tweenjs/tween.js';

import { TimelineMode } from '../InfiniteTimeline';
import { ProgressValues } from './useProgress';

type UseApplyScroll = {
  timelineMode: React.MutableRefObject<TimelineMode>;
  contentWidth: React.MutableRefObject<number>;
  contentHeight: React.MutableRefObject<number>;
  windowWidth: React.MutableRefObject<number>;
  windowHeight: React.MutableRefObject<number>;
  TWEEN_GROUP_SEEK: React.MutableRefObject<Group>;
  offsetX: MotionValue;
  offsetY: MotionValue;
  progressRatio: MotionValue;
  getProgressValues: () => ProgressValues;
};

export type ApplyScroll = {
  horizontalAmountPx: number;
  verticalAmountPx: number;
};

export const useApplyScroll = (props: UseApplyScroll) => {
  const {
    timelineMode,
    contentWidth,
    contentHeight,
    windowWidth,
    windowHeight,
    offsetX,
    offsetY,
    progressRatio,
    TWEEN_GROUP_SEEK,
    getProgressValues,
  } = props;

  const applyScroll = (props: ApplyScroll) => {
    TWEEN_GROUP_SEEK.current.removeAll();
    const { horizontalAmountPx, verticalAmountPx } = props;
    switch (timelineMode.current) {
      case TimelineMode.TIMELINE_MODE_VERTICAL:
        applyScrollVertical(verticalAmountPx);
        break;
      case TimelineMode.TIMELINE_MODE_HORIZONTAL:
        applyScrollHorizontal(horizontalAmountPx);
        break;
      default:
        throw new Error('Invalid timeline mode');
    }
  };

  const applyScrollHorizontal = (amountPx: number) => {
    if (contentWidth.current > windowWidth.current) {
      const newOffsetX = offsetX.get() + amountPx;

      offsetX.set(newOffsetX);
      progressRatio.set(getProgressValues().calculatedProgress);
    }
  };

  const applyScrollVertical = (amountPx: number) => {
    if (contentHeight.current > windowHeight.current) {
      const newOffsetY = offsetY.get() + amountPx;

      offsetY.set(newOffsetY);
      progressRatio.set(getProgressValues().calculatedProgress);
    }
  };

  return {
    applyScroll,
  };
};

import React from 'react';
import { debounce } from 'lodash';
import { MotionValue } from 'framer-motion';
import { Group } from '@tweenjs/tween.js';

import { useElementSize } from 'hooks/useElementSize';
import { breakpoints } from 'utils/responsive';

import { TimelineMode } from '../InfiniteTimeline';
import { ProgressValues } from './useProgress';

type UseOnResize = {
  contentWidth: React.MutableRefObject<number>;
  useMomentum: React.MutableRefObject<boolean>;
  contentHeight: React.MutableRefObject<number>;
  windowWidth: React.MutableRefObject<number>;
  windowHeight: React.MutableRefObject<number>;
  timelineMode: React.MutableRefObject<TimelineMode>;
  contentWrapperRef: React.MutableRefObject<HTMLDivElement>;
  TWEEN_GROUP_SEEK: React.MutableRefObject<Group>;
  offsetX: MotionValue;
  offsetY: MotionValue;
  getProgressValues: () => ProgressValues;
};

export const useOnResize = (props: UseOnResize) => {
  const {
    contentHeight,
    useMomentum,
    windowHeight,
    windowWidth,
    contentWidth,
    timelineMode,
    contentWrapperRef,
    TWEEN_GROUP_SEEK,
    offsetX,
    offsetY,
    getProgressValues,
  } = props;

  const { getElHeight, getElWidth } = useElementSize();

  const onResize = () => {
    TWEEN_GROUP_SEEK.current && TWEEN_GROUP_SEEK.current.removeAll();
    useMomentum.current = false;
    contentHeight.current = getElHeight(contentWrapperRef);
    contentWidth.current = getElWidth(contentWrapperRef);
    windowHeight.current = window.innerHeight;
    windowWidth.current = window.innerWidth;

    if (windowWidth.current >= breakpoints.tablet) {
      timelineMode.current = TimelineMode.TIMELINE_MODE_HORIZONTAL;
      offsetY.set(0);
      offsetX.set(getProgressValues().currentOffset);
    } else {
      timelineMode.current = TimelineMode.TIMELINE_MODE_VERTICAL;
      offsetX.set(0);
      offsetY.set(getProgressValues().currentOffset);
    }
  };

  const onResizeDebounced = debounce(() => onResize(), 200);

  return {
    onResize,
    onResizeDebounced,
  };
};

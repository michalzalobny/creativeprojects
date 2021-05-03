import { MotionValue } from 'framer-motion';
import React from 'react';
import TWEEN, { Group } from '@tweenjs/tween.js';

import { TimelineMode } from '../InfiniteTimeline';
import { ProgressValues } from './useProgress';

type UseSeekTo = {
  timelineMode: React.MutableRefObject<TimelineMode>;
  offsetX: MotionValue;
  offsetY: MotionValue;
  useMomentum: React.MutableRefObject<boolean>;
  progressRatio: MotionValue;
  contentWidth: React.MutableRefObject<number>;
  contentHeight: React.MutableRefObject<number>;
  windowWidth: React.MutableRefObject<number>;
  windowHeight: React.MutableRefObject<number>;
  TWEEN_GROUP_SEEK: React.MutableRefObject<Group>;
  getProgressValues: () => ProgressValues;
};

export type SeekTo = {
  seekPxMobile: number;
  seekPxTablet: number;
  mobileOffset?: number;
  tabletOffset?: number;
};

export const useSeekTo = (props: UseSeekTo) => {
  const {
    progressRatio,
    timelineMode,
    offsetX,
    offsetY,
    useMomentum,
    contentHeight,
    contentWidth,
    windowHeight,
    windowWidth,
    getProgressValues,
    TWEEN_GROUP_SEEK,
  } = props;

  const seekTo = (props: SeekTo) => {
    const {
      seekPxMobile,
      seekPxTablet,
      mobileOffset = 0,
      tabletOffset = 0,
    } = props;

    useMomentum.current = false;

    let totalSeekValue;
    let boundary;
    let tweenSeek;

    switch (timelineMode.current) {
      case TimelineMode.TIMELINE_MODE_VERTICAL:
        totalSeekValue =
          seekPxMobile + mobileOffset + getProgressValues().paddedOffset;

        boundary =
          contentHeight.current -
          windowHeight.current -
          getProgressValues().paddedOffset;

        // Always stay between current boundaries
        if (-totalSeekValue > boundary) {
          totalSeekValue = -boundary;
        } else if (-totalSeekValue < -getProgressValues().paddedOffset) {
          totalSeekValue = getProgressValues().paddedOffset;
        }

        tweenSeek = new TWEEN.Tween(
          { offsetY: offsetY.get() },
          TWEEN_GROUP_SEEK.current,
        )
          .to({ offsetY: totalSeekValue }, 3000)
          .easing(TWEEN.Easing.Exponential.Out)
          .onUpdate(object => {
            offsetY.set(object.offsetY);
            progressRatio.set(getProgressValues().calculatedProgress);
          })
          .start();

        break;
      case TimelineMode.TIMELINE_MODE_HORIZONTAL:
        totalSeekValue =
          seekPxTablet + tabletOffset + getProgressValues().paddedOffset;

        boundary =
          contentWidth.current -
          windowWidth.current -
          getProgressValues().paddedOffset;

        // Always stay between current boundaries
        if (-totalSeekValue > boundary) {
          totalSeekValue = -boundary;
        } else if (-totalSeekValue < -getProgressValues().paddedOffset) {
          totalSeekValue = getProgressValues().paddedOffset;
        }

        tweenSeek = new TWEEN.Tween(
          { offsetX: offsetX.get() },
          TWEEN_GROUP_SEEK.current,
        )
          .to({ offsetX: totalSeekValue }, 3000)
          .easing(TWEEN.Easing.Exponential.Out)
          .onUpdate(object => {
            offsetX.set(object.offsetX);
            progressRatio.set(getProgressValues().calculatedProgress);
          })
          .start();

        break;
      default:
        throw new Error('Invalid timeline mode');
    }
  };
  return {
    seekTo,
  };
};

import TWEEN from '@tweenjs/tween.js';

import { ScrollObj, ScrollMode } from 'utils/functions/scroll/scroll';
import { getProgressValues } from './getProgressValues';

export type SeekTo = {
  seekPxVertical: number;
  seekPxHorizontal: number;
  verticalOffset?: number;
  horizontalOffset?: number;
};

export const initSeekTo = (scrollObj: ScrollObj) => {
  const seekTo = (props: SeekTo) => {
    const {
      seekPxVertical,
      seekPxHorizontal,
      verticalOffset = 0,
      horizontalOffset = 0,
    } = props;

    scrollObj.useMomentum = false;

    let totalSeekValue;
    let boundary;
    let tweenSeek;

    switch (scrollObj.scrollMode) {
      case ScrollMode.VERTICAL:
        totalSeekValue =
          seekPxVertical +
          verticalOffset +
          getProgressValues(scrollObj).paddedOffset;

        boundary =
          scrollObj.contentSizes.height -
          scrollObj.viewportSizes.height -
          getProgressValues(scrollObj).paddedOffset;

        // Always stay between current boundaries
        if (-totalSeekValue > boundary) {
          totalSeekValue = -boundary;
        } else if (
          -totalSeekValue < -getProgressValues(scrollObj).paddedOffset
        ) {
          totalSeekValue = getProgressValues(scrollObj).paddedOffset;
        }

        tweenSeek = new TWEEN.Tween(
          { offsetY: scrollObj.targetY },
          scrollObj.TWEEN_GROUP_SEEK,
        )
          .to({ offsetY: totalSeekValue }, 3000)
          .easing(TWEEN.Easing.Exponential.Out)
          .onUpdate(object => {
            scrollObj.targetY = object.offsetY;
            scrollObj.progressRatio = getProgressValues(
              scrollObj,
            ).calculatedProgress;
          })
          .start();

        break;
      case ScrollMode.HORIZONTAL:
        totalSeekValue =
          seekPxHorizontal +
          horizontalOffset +
          getProgressValues(scrollObj).paddedOffset;

        boundary =
          scrollObj.contentSizes.width -
          scrollObj.viewportSizes.width -
          getProgressValues(scrollObj).paddedOffset;

        // Always stay between current boundaries
        if (-totalSeekValue > boundary) {
          totalSeekValue = -boundary;
        } else if (
          -totalSeekValue < -getProgressValues(scrollObj).paddedOffset
        ) {
          totalSeekValue = getProgressValues(scrollObj).paddedOffset;
        }

        tweenSeek = new TWEEN.Tween(
          { offsetX: scrollObj.targetX },
          scrollObj.TWEEN_GROUP_SEEK,
        )
          .to({ offsetX: totalSeekValue }, 3000)
          .easing(TWEEN.Easing.Exponential.Out)
          .onUpdate(object => {
            scrollObj.targetX = object.offsetX;
            scrollObj.progressRatio = getProgressValues(
              scrollObj,
            ).calculatedProgress;
          })
          .start();

        break;
      default:
        throw new Error('Invalid timeline mode');
    }
  };

  return { seekTo };
};

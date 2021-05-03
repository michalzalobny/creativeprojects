import React from 'react';

import { MOMENTUM_CARRY } from '../constants';
import { TimelineMode } from '../InfiniteTimeline';

type UseTouchEvents = {
  timelineMode: React.MutableRefObject<TimelineMode>;
  useMomentum: React.MutableRefObject<boolean>;
  lastTouchX: React.MutableRefObject<number>;
  lastTouchY: React.MutableRefObject<number>;
  touchMomentum: React.MutableRefObject<number>;
  applyScroll: (ApplyScroll) => void;
};

export const useTouchEvents = (props: UseTouchEvents) => {
  const {
    timelineMode,
    useMomentum,
    lastTouchX,
    lastTouchY,
    touchMomentum,
    applyScroll,
  } = props;

  const onTouchStart = (event: TouchEvent) => {
    useMomentum.current = false;
    lastTouchX.current = event.touches[0].clientX;
    lastTouchY.current = event.touches[0].clientY;
  };

  const onTouchMove = (event: TouchEvent) => {
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    const deltaX = touchX - lastTouchX.current;
    const deltaY = touchY - lastTouchY.current;

    lastTouchX.current = touchX;
    lastTouchY.current = touchY;

    touchMomentum.current *= MOMENTUM_CARRY;

    switch (timelineMode.current) {
      case TimelineMode.TIMELINE_MODE_VERTICAL:
        touchMomentum.current += deltaY;
        break;
      case TimelineMode.TIMELINE_MODE_HORIZONTAL:
        touchMomentum.current += deltaX;
        break;
      default:
        throw new Error('Invalid timeline mode');
    }

    applyScroll({ horizontalAmountPx: deltaX, verticalAmountPx: deltaY });
  };

  const onTouchEnd = () => {
    useMomentum.current = true;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

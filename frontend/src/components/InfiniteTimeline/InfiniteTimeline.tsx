import React, { memo, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import TWEEN from '@tweenjs/tween.js';

import { useDisableOverscroll } from 'hooks/useDisableOverscroll';

import { MOMENTUM_DAMPING } from './constants';
import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { TimelineItemsWrapper } from './styled/TimelineItemsWrapper';
import { useApplyScroll } from './hooks/useApplyScroll';
import { useSeekTo } from './hooks/useSeekTo';
import { useTouchEvents } from './hooks/useTouchEvents';
import { useMouseWheelEvents } from './hooks/useMouseWheelEvents';
import { useOnResize } from './hooks/useOnResize';
import { useProgress } from './hooks/useProgress';

export enum TimelineMode {
  TIMELINE_MODE_VERTICAL = 'TIMELINE_MODE_VERTICAL',
  TIMELINE_MODE_HORIZONTAL = 'TIMELINE_MODE_HORIZONTAL',
}

interface InfiniteTimelineProps {
  children: JSX.Element[];
}

export const InfiniteTimeline = memo<InfiniteTimelineProps>(props => {
  const { children } = props;
  useDisableOverscroll();
  const contentWidth = useRef<number>(0);
  const contentHeight = useRef<number>(0);
  const windowWidth = useRef<number>(0);
  const windowHeight = useRef<number>(0);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const progressRatio = useMotionValue(0);
  const timelineMode = useRef<TimelineMode>(
    TimelineMode.TIMELINE_MODE_VERTICAL,
  );
  const lastTouchX = useRef<number>(0);
  const lastTouchY = useRef<number>(0);
  const useMomentum = useRef<boolean>(false);
  const touchMomentum = useRef<number>(0);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const momentumRafReference = useRef<ReturnType<typeof requestAnimationFrame>>(
    null,
  );
  const TWEEN_GROUP_SEEK = useRef(new TWEEN.Group());

  const progressRatioPercent = useTransform(
    progressRatio,
    latestProgressRatio => {
      if (latestProgressRatio <= 0) {
        return Math.abs((latestProgressRatio % 1) * 100);
      } else {
        return Math.abs(
          ((Math.ceil(latestProgressRatio) - latestProgressRatio) % 1) * 100,
        );
      }
    },
  );

  // Hooks

  const { getProgressValues } = useProgress({
    contentHeight,
    contentWidth,
    offsetX,
    offsetY,
    progressRatio,
    timelineMode,
  });

  const { applyScroll } = useApplyScroll({
    contentHeight,
    contentWidth,
    offsetX,
    offsetY,
    timelineMode,
    windowHeight,
    windowWidth,
    progressRatio,
    getProgressValues,
    TWEEN_GROUP_SEEK,
  });

  const { seekTo } = useSeekTo({
    offsetX,
    offsetY,
    timelineMode,
    useMomentum,
    progressRatio,
    windowHeight,
    windowWidth,
    contentHeight,
    contentWidth,
    getProgressValues,
    TWEEN_GROUP_SEEK,
  });

  const { onTouchEnd, onTouchMove, onTouchStart } = useTouchEvents({
    applyScroll,
    useMomentum,
    timelineMode,
    lastTouchX,
    lastTouchY,
    touchMomentum,
  });

  const { onMouseWheel } = useMouseWheelEvents({ useMomentum, applyScroll });

  const { onResizeDebounced, onResize } = useOnResize({
    timelineMode,
    useMomentum,
    windowWidth,
    windowHeight,
    contentWidth,
    contentHeight,
    contentWrapperRef,
    offsetX,
    offsetY,
    TWEEN_GROUP_SEEK,
    getProgressValues,
  });

  useEffect(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('wheel', onMouseWheel, { passive: true });
    window.addEventListener('resize', onResizeDebounced);
    onResize();
    momentumRafReference.current = requestAnimationFrame(updateMomentum);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', onMouseWheel);
      window.removeEventListener('resize', onResizeDebounced);
      cancelAnimationFrame(momentumRafReference.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMomentum = time => {
    TWEEN_GROUP_SEEK.current.update(time);

    momentumRafReference.current = requestAnimationFrame(updateMomentum);
    const timeFactor = Math.min(Math.max(time / (1000 / time), 1), 4);
    touchMomentum.current *= Math.pow(MOMENTUM_DAMPING, timeFactor);

    if (!useMomentum.current) {
      return;
    }

    if (touchMomentum.current >= 0.01 || touchMomentum.current <= -0.01) {
      applyScroll({
        verticalAmountPx: touchMomentum.current,
        horizontalAmountPx: touchMomentum.current,
      });
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <TimelineItemsWrapper ref={contentWrapperRef}>
          {React.Children.toArray(children).map(child =>
            React.cloneElement(child as React.ReactElement, {
              offsetY,
              offsetX,
              seekTo,
              contentWidth,
              contentHeight,
              timelineMode,
            }),
          )}
        </TimelineItemsWrapper>
      </ContentWrapper>
      <motion.div
        style={{
          width: progressRatioPercent,
          height: 2,
          backgroundColor: 'red',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 20,
        }}
      />
    </Wrapper>
  );
});

InfiniteTimeline.displayName = 'InfiniteTimeline';

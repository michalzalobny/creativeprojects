import React, { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { useWindowSize } from 'hooks/useWindowSize';
import TWEEN from '@tweenjs/tween.js';

import { lerp } from './utils/lerp';

import { Wrapper } from './styled/Wrapper';

export interface ParallaxProps {
  offsetXMultiplier?: number;
  offsetYMultiplier?: number;
  stiffness?: number;
  damping?: number;
  children?: React.ReactChild;
  refElement?: React.MutableRefObject<HTMLElement>;
  shouldResetPosition?: boolean;
}

const LERP_EASE = 0.06;
const DEFAULT_FPS = 60;
const DT_FPS = 1000 / DEFAULT_FPS;

export const Parallax = (props: ParallaxProps) => {
  const {
    children,
    offsetXMultiplier = 0.2,
    offsetYMultiplier = 0.2,
    refElement,
    shouldResetPosition,
  } = props;

  const rafId = useRef<number | null>(null);
  const lastFrameTime = useRef<number | null>(null);
  const isResumed = useRef(true);

  const { windowSizeRef } = useWindowSize();
  const currentXMv = useMotionValue(0);
  const currentYMv = useMotionValue(0);

  const targetX = useRef(0);
  const targetY = useRef(0);

  const resumeAppFrame = () => {
    rafId.current = window.requestAnimationFrame(renderOnFrame);
    isResumed.current = true;
  };

  const renderOnFrame = (time: number) => {
    rafId.current = window.requestAnimationFrame(renderOnFrame);

    if (isResumed.current || !lastFrameTime.current) {
      lastFrameTime.current = window.performance.now();
      isResumed.current = false;
      return;
    }

    TWEEN.update(time);

    const delta = time - lastFrameTime.current;
    let slowDownFactor = delta / DT_FPS;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    lastFrameTime.current = time;

    const newX = lerp(
      currentXMv.get(),
      targetX.current,
      LERP_EASE * slowDownFactor,
    );
    currentXMv.set(newX);

    const newY = lerp(
      currentYMv.get(),
      targetY.current,
      LERP_EASE * slowDownFactor,
    );
    currentYMv.set(newY);
  };

  const stopAppFrame = () => {
    if (rafId.current) {
      window.cancelAnimationFrame(rafId.current);
    }
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      stopAppFrame();
    } else {
      resumeAppFrame();
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    let referenceElWidth = 0;
    let referenceElHeight = 0;
    let relativeMousePositionX = 0;
    let relativeMousePositionY = 0;

    if (refElement) {
      referenceElWidth = refElement.current.clientWidth;
      referenceElHeight = refElement.current.clientHeight;
      relativeMousePositionX =
        event.clientX - refElement.current.getBoundingClientRect().x;
      relativeMousePositionY =
        event.clientY - refElement.current.getBoundingClientRect().y;
    } else {
      referenceElWidth = windowSizeRef.current.width;
      referenceElHeight = windowSizeRef.current.height;
      relativeMousePositionX = event.clientX;
      relativeMousePositionY = event.clientY;
    }

    const offsetRatioX =
      -(relativeMousePositionX - referenceElWidth / 2) * offsetXMultiplier;

    const offsetRatioY =
      -(relativeMousePositionY - referenceElHeight / 2) * offsetYMultiplier;

    targetX.current = offsetRatioX;
    targetY.current = offsetRatioY;
  };

  const onMouseOut = () => {
    if (shouldResetPosition) {
      targetX.current = 0;
      targetY.current = 0;
    }
  };

  useEffect(() => {
    resumeAppFrame();
    let refElementCurrent;

    window.addEventListener('visibilitychange', onVisibilityChange);
    if (refElement) {
      refElementCurrent = refElement.current;
      refElementCurrent.addEventListener('mousemove', onMouseMove);
      refElementCurrent.addEventListener('mouseout', onMouseOut);
    } else {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      stopAppFrame();
      window.removeEventListener('visibilitychange', onVisibilityChange);
      if (refElement) {
        refElementCurrent.removeEventListener('mousemove', onMouseMove);
        refElementCurrent.removeEventListener('mouseout', onMouseOut);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseout', onMouseOut);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Wrapper style={{ x: currentXMv, y: currentYMv }}>{children}</Wrapper>;
};

import React, { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { useWindowSize } from 'hooks/useWindowSize';
import sync, { cancelSync } from 'framesync';

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

export const Parallax = React.memo<ParallaxProps>(props => {
  const {
    children,
    offsetXMultiplier = 0.2,
    offsetYMultiplier = 0.2,
    refElement,
    shouldResetPosition,
  } = props;

  const { windowSizeRef } = useWindowSize();
  const currentXMv = useMotionValue(0);
  const currentYMv = useMotionValue(0);

  const targetX = useRef(0);
  const targetY = useRef(0);

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

  const mySync = sync.update(() => {
    const newX = lerp(currentXMv.get(), targetX.current, LERP_EASE);
    currentXMv.set(newX);

    const newY = lerp(currentYMv.get(), targetY.current, LERP_EASE);
    currentYMv.set(newY);
  }, true);

  useEffect(() => {
    let refElementCurrent = undefined;

    if (refElement) {
      refElementCurrent = refElement.current;
      refElementCurrent.addEventListener('mousemove', onMouseMove);
      refElementCurrent.addEventListener('mouseout', onMouseOut);
    } else {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      cancelSync.update(mySync);
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

  return (
    <Wrapper style={{ x: currentXMv, y: currentYMv }}>
      {React.Children.toArray(children)}
    </Wrapper>
  );
});

Parallax.displayName = 'Parallax';

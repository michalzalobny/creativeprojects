import React, { useEffect } from 'react';
import { useSpring } from 'framer-motion';
import { useWindowSize } from 'hooks/useWindowSize';

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

export const Parallax = React.memo<ParallaxProps>(props => {
  const {
    children,
    offsetXMultiplier = 0.2,
    offsetYMultiplier = 0.2,
    stiffness = 300,
    damping = 50,
    refElement,
    shouldResetPosition,
  } = props;

  const { windowHeight, windowWidth } = useWindowSize();
  const springX = useSpring(0, {
    stiffness,
    damping,
    restDelta: 0.01,
    restSpeed: 0.01,
  });
  const springY = useSpring(0, {
    stiffness,
    damping,
    restDelta: 0.01,
    restSpeed: 0.01,
  });

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
      referenceElWidth = windowWidth;
      referenceElHeight = windowHeight;
      relativeMousePositionX = event.clientX;
      relativeMousePositionY = event.clientY;
    }

    const offsetRatioX =
      -(relativeMousePositionX - referenceElWidth / 2) * offsetXMultiplier;

    const offsetRatioY =
      -(relativeMousePositionY - referenceElHeight / 2) * offsetYMultiplier;

    springX.set(offsetRatioX);
    springY.set(offsetRatioY);
  };

  const onMouseOut = () => {
    if (shouldResetPosition) {
      springY.set(0);
      springX.set(0);
    }
  };

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
      if (refElement) {
        refElementCurrent.removeEventListener('mousemove', onMouseMove);
        refElementCurrent.removeEventListener('mouseout', onMouseOut);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseout', onMouseOut);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight, windowWidth]);

  return (
    <Wrapper style={{ x: springX, y: springY }}>
      {React.Children.toArray(children)}
    </Wrapper>
  );
});

Parallax.displayName = 'Parallax';

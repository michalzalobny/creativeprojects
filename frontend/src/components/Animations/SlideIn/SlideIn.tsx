import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollMotionValues } from 'framer-motion';

import { useScroll } from 'hooks/useScroll';

import { Wrapper } from './styled/Wrapper';

interface SlideInProps {
  slideSize?: string;
  children: JSX.Element;
  slideDirection?: 'x' | 'y';
  triggerOnce?: boolean;
  scrollValues?: ScrollMotionValues;
}

export const SlideIn = memo<SlideInProps>(props => {
  const {
    slideSize = '10vh',
    slideDirection = 'y',
    children,
    scrollValues = null,
    triggerOnce = false,
  } = props;

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: triggerOnce,
  });

  const { scrollingUp } = useScroll({ scrollValues });

  const slideVerticalVariants = {
    initial: {
      opacity: 0,
      y: scrollingUp ? `-${slideSize}` : slideSize,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: scrollingUp ? `-${slideSize}` : slideSize,
      opacity: 0,
    },
  };

  const slideHorizontalVariants = {
    initial: {
      opacity: 0,
      x: !scrollingUp ? `-${slideSize}` : slideSize,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: !scrollingUp ? `-${slideSize}` : slideSize,
      opacity: 0,
    },
  };

  return (
    <>
      <Wrapper
        ref={ref}
        variants={
          slideDirection === 'y'
            ? slideVerticalVariants
            : slideHorizontalVariants
        }
        animate={!scrollValues ? '' : inView ? 'animate' : 'initial'}
      >
        {children}
      </Wrapper>
    </>
  );
});

SlideIn.displayName = 'SlideIn';

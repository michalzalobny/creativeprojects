import React, { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useTransform,
  useSpring,
  motion,
  ScrollMotionValues,
} from 'framer-motion';

import { useWindowSize } from 'hooks/useWindowSize';

import { Wrapper } from './styled/Wrapper';

interface ParallaxScrollProps {
  speed?: number;
  children: JSX.Element;
  scrollValues: ScrollMotionValues;
}

export const ParallaxScroll = memo<ParallaxScrollProps>(props => {
  const { scrollValues, children, speed = -0.2 } = props;

  const { windowSize } = useWindowSize();
  const { windowHeight } = windowSize;

  const topValue = React.useRef(0);
  const myRef = React.useRef(null);
  const parallaxYBlueprint = React.useRef(0);
  const inViewBlueplrint = React.useRef(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inViewBlueplrint.current = inView;
  }, [inView]);

  const parallaxY = useTransform(scrollValues.scrollY, latest => {
    if (inViewBlueplrint.current) {
      parallaxYBlueprint.current = (latest - topValue.current) * speed;
    }
    return parallaxYBlueprint.current;
  });

  const springMv = useSpring(parallaxY, {
    damping: 200,
    stiffness: 1000,
    mass: 1,
  });

  const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  };

  React.useEffect(() => {
    const finalTopValue = getOffsetTop(myRef.current) - windowHeight;

    //This checking prevents from "jumping" content bugs where the topValue is negative
    if (finalTopValue < 0) {
      topValue.current = 0;
    } else {
      topValue.current = finalTopValue;
    }
  }, [windowHeight]);

  return (
    <>
      <motion.div style={{ width: '100%', height: '100%' }} ref={myRef}>
        <Wrapper
          ref={ref}
          style={{ y: springMv, width: '100%', height: '100%' }}
        >
          {children}
        </Wrapper>
      </motion.div>
    </>
  );
});

ParallaxScroll.displayName = 'ParallaxScroll';

//Use case:

//Inline
/* <ParallaxScroll scrollValues={globalState.scrollValues}>
  <h1 style={{ background: 'red', padding: 50 }}>{pageData.name}5</h1>
</ParallaxScroll>; */

//Absolute:
/* <div
  style={{
    width: '100%',
    height: 600,
    background: 'blue',
    position: 'relative',
  }}
>
  <ParallaxScroll speed={-0.8} scrollValues={globalState.scrollValues}>
    <div
      style={{
        padding: 50,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      test
    </div>
  </ParallaxScroll>
</div> */

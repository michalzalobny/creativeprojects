import React, { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { revealVariants, notInitVariants } from './framerPresets';
import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { MeasureWrapper } from './styled/MeasureWrapper';
import { RevealWrapper } from './styled/RevealWrapper';

interface Sizes {
  width: number;
  height: number;
}

interface SlideItemWithKeyProps {
  itemKey: number | string;
  children?: React.ReactNode;
  reverseAnimation?: boolean;
  isInit?: boolean;
}

export const SlideItemWithKey = memo<SlideItemWithKeyProps>(props => {
  const { isInit = true, itemKey, reverseAnimation, children } = props;
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<Sizes>({
    width: 50,
    height: 50,
  });

  const WPNRef = useRef(0);

  useEffect(() => {
    if (!itemKey) {
      return;
    }

    contentWrapperRef.current &&
      setSizes({
        width: contentWrapperRef.current.clientWidth,
        height: contentWrapperRef.current.clientHeight,
      });
  }, [itemKey]);

  useEffect(() => {
    const onResize = () => {
      contentWrapperRef.current &&
        setSizes({
          width: contentWrapperRef.current.clientWidth,
          height: contentWrapperRef.current.clientHeight,
        });
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    WPNRef.current = Math.ceil(window.performance.now());
  }, [itemKey]);

  return (
    <>
      <Wrapper style={{ height: sizes.height, width: '100%' }}>
        <MeasureWrapper
          key={itemKey.toString() + WPNRef.current.toString()}
          ref={contentWrapperRef}
        >
          {children}
        </MeasureWrapper>
        <AnimatePresence custom={reverseAnimation} exitBeforeEnter={false}>
          <ContentWrapper key={itemKey.toString() + WPNRef.current.toString()}>
            <RevealWrapper
              custom={reverseAnimation}
              variants={isInit ? revealVariants : notInitVariants}
            >
              {children}
            </RevealWrapper>
          </ContentWrapper>
        </AnimatePresence>
      </Wrapper>
    </>
  );
});

SlideItemWithKey.displayName = 'SlideItemWithKey';

import React, { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { revealVariants } from './framerPresets';
import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { MeasureWrapper } from './styled/MeasureWrapper';
import { RevealWrapper } from './styled/RevealWrapper';

interface Sizes {
  width: number;
  height: number;
}

interface SlideWithKeyProps {
  itemKey: number | string;
  children?: React.ReactNode;
  reverseAnimation?: boolean;
}

export const SlideWithKey = memo<SlideWithKeyProps>(props => {
  const { itemKey, reverseAnimation, children } = props;

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<Sizes>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
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

  return (
    <>
      <Wrapper style={{ height: sizes.height }}>
        <MeasureWrapper key={itemKey} ref={contentWrapperRef}>
          {children}
        </MeasureWrapper>
        <AnimatePresence custom={reverseAnimation} exitBeforeEnter={false}>
          <ContentWrapper key={itemKey}>
            <RevealWrapper custom={reverseAnimation} variants={revealVariants}>
              {children}
            </RevealWrapper>
          </ContentWrapper>
        </AnimatePresence>
      </Wrapper>
    </>
  );
});

SlideWithKey.displayName = 'SlideWithKey';

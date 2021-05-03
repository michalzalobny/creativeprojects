import React, { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import XRegExp from 'xregexp';

import { getLocalizedText } from 'utils/i18n';

import { revealVariants } from './framerPresets';
import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { WordWrapper } from './styled/WordWrapper';
import { LettersContainer } from './styled/LettersContainer';
import { MeasureWrapper } from './styled/MeasureWrapper';

interface Sizes {
  width: number;
  height: number;
}

interface SlideTextWithKeyProps {
  text: string;
  itemKey: number | string;
  children?: React.ReactNode;
  reverseAnimation?: boolean;
}

export const SlideTextWithKey = memo<SlideTextWithKeyProps>(props => {
  const { text, itemKey, reverseAnimation, children } = props;

  const myExp = XRegExp(
    '((([\\p{L}\\p{Nd}\\p{P}]\\s)+[\\p{L}\\p{Nd}\\p{P}]+)|([\\p{L}\\p{Nd}\\p{P}]{2,}))',
    'gu'
  );
  const wordsArray = XRegExp.match(text, myExp) as string[];

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
          {wordsArray.map((word, key) => {
            return (
              <WordWrapper key={word + itemKey + key}>
                <LettersContainer>{word}</LettersContainer>
              </WordWrapper>
            );
          })}
        </MeasureWrapper>
        <AnimatePresence custom={reverseAnimation} exitBeforeEnter={false}>
          <ContentWrapper key={itemKey}>
            {wordsArray.map((word, key) => {
              return (
                <WordWrapper key={word + itemKey + key}>
                  <LettersContainer
                    custom={reverseAnimation}
                    variants={revealVariants}
                  >
                    {word}
                  </LettersContainer>
                </WordWrapper>
              );
            })}
          </ContentWrapper>
        </AnimatePresence>
      </Wrapper>
    </>
  );
});

SlideTextWithKey.displayName = 'SlideTextWithKey';

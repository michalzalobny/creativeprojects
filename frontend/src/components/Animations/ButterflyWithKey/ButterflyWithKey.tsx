import React, { memo, useState, useEffect, useRef } from 'react';

import { reveal } from './framerPresets';
import { LetterWrapper } from './styled/LetterWrapper';
import { LettersContainer } from './styled/LettersContainer';
import { TextWrapper } from './styled/TextWrapper';
import { BlueprintContainer } from './styled/BlueprintContainer';
import { Wrapper } from './styled/Wrapper';
import { AnimatePresence } from 'framer-motion';
import { MeasureWrapper } from './styled/MeasureWrapper';
import { ContentWrapper } from './styled/ContentWrapper';

interface ButterflyWithKeyProps {
  text: string;
}

interface Sizes {
  width: number;
  height: number;
}

export const ButterflyWithKey = memo<ButterflyWithKeyProps>(props => {
  const { text } = props;

  const STAGGER_HOVERED = 0.025;

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
  }, [text]);

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
      <Wrapper>
        <ContentWrapper style={{ width: sizes.width, height: sizes.height }}>
          <MeasureWrapper key={text} ref={contentWrapperRef}>
            <TextWrapper>
              <LettersContainer
                transition={{
                  staggerChildren: STAGGER_HOVERED,
                }}
                aria-label={text}
              >
                {text.split('').map((char, index) => {
                  return (
                    <LetterWrapper
                      {...reveal}
                      isSpace={char === ' '}
                      aria-hidden="true"
                      key={index + char}
                    >
                      {char}
                    </LetterWrapper>
                  );
                })}
              </LettersContainer>
            </TextWrapper>
          </MeasureWrapper>
          <AnimatePresence>
            <TextWrapper absolute key={text}>
              <LettersContainer
                transition={{
                  staggerChildren: STAGGER_HOVERED,
                }}
                aria-label={text}
              >
                {text.split('').map((char, index) => {
                  return (
                    <LetterWrapper
                      {...reveal}
                      isSpace={char === ' '}
                      aria-hidden="true"
                      key={index + char}
                    >
                      {char}
                    </LetterWrapper>
                  );
                })}
              </LettersContainer>
            </TextWrapper>
          </AnimatePresence>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

ButterflyWithKey.displayName = 'ButterflyWithKey';

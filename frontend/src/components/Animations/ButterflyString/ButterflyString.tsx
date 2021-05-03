import React, { memo, useState } from 'react';

import { reveal, revealReverse } from './framerPresets';
import { LetterWrapper } from './styled/LetterWrapper';
import { LettersContainer } from './styled/LettersContainer';
import { TextWrapper } from './styled/TextWrapper';
import { BlueprintContainer } from './styled/BlueprintContainer';
import { Wrapper } from './styled/Wrapper';

interface ButterflyStringProps {
  text: string;
}

export const ButterflyString = memo<ButterflyStringProps>(props => {
  const { text } = props;

  const STAGGER_HOVERED = 0.025;
  const STAGGER_OUT = 0.01;

  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TextWrapper animate={isHovered ? 'animate' : 'initial'}>
          <LettersContainer
            transition={{
              staggerChildren: isHovered ? STAGGER_HOVERED : STAGGER_OUT,
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

          <BlueprintContainer>
            <LettersContainer
              transition={{
                staggerChildren: isHovered ? STAGGER_HOVERED : STAGGER_OUT,
              }}
              style={{
                transition: 'opacity 0.3s',
                opacity: isHovered ? 0.4 : 1,
              }}
              aria-label={text}
            >
              {text.split('').map((char, index) => {
                return (
                  <LetterWrapper
                    {...revealReverse}
                    isSpace={char === ' '}
                    aria-hidden="true"
                    key={index + char}
                  >
                    {char}
                  </LetterWrapper>
                );
              })}
            </LettersContainer>
          </BlueprintContainer>
        </TextWrapper>
      </Wrapper>
    </>
  );
});

ButterflyString.displayName = 'ButterflyString';

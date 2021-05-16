import React, { memo } from 'react';
import XRegExp from 'xregexp';

import { reveal } from './framerPresets';
import { LetterWrapper } from './styled/LetterWrapper';
import { LettersContainer } from './styled/LettersContainer';
import { TextWrapper } from './styled/TextWrapper';
import { Wrapper } from './styled/Wrapper';
import { WordWrapper } from './styled/WordWrapper';

interface RevealButterflyStringProps {
  text: string;
  shouldAnimate: boolean;
}

export const RevealButterflyString = memo<RevealButterflyStringProps>(props => {
  const { shouldAnimate, text } = props;

  const myExp = XRegExp(
    '((([\\p{L}\\p{Nd}\\p{P}]\\s)+[\\p{L}\\p{Nd}\\p{P}]+)|([\\p{L}\\p{Nd}\\p{P}]{2,}))',
    'gu',
  );
  const wordsArray = XRegExp.match(text, myExp) as string[];

  return (
    <>
      <Wrapper>
        <TextWrapper>
          <LettersContainer
            animate={shouldAnimate ? 'animate' : 'initial'}
            aria-label={text}
            transition={{
              staggerChildren: !shouldAnimate ? 0 : 0.04,
            }}
          >
            {wordsArray.map((word, key) => (
              <WordWrapper key={word + key}>
                {word.split('').map((char, index) => {
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
              </WordWrapper>
            ))}
          </LettersContainer>
        </TextWrapper>
      </Wrapper>
    </>
  );
});

RevealButterflyString.displayName = 'RevealButterflyString';

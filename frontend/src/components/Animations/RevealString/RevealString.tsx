import React, { memo } from 'react';
import XRegExp from 'xregexp';

import { LetterWrapper } from './styled/LetterWrapper';
import { LettersContainer } from './styled/LettersContainer';
import { LetterContainer } from './styled/LetterContainer';
import { WordWrapper } from './styled/WordWrapper';

interface RevealStringProps {
  text: string;
}

export const RevealString = memo<RevealStringProps>(props => {
  const { text } = props;
  const myExp = XRegExp(
    '((([\\p{L}\\p{Nd}\\p{P}]\\s)+[\\p{L}\\p{Nd}\\p{P}]+)|([\\p{L}\\p{Nd}\\p{P}]{2,}))',
    'gu',
  );
  const wordsArray = XRegExp.match(text, myExp) as string[];

  return (
    <>
      <LettersContainer aria-label={text}>
        {wordsArray.map((word, key) => {
          return (
            <WordWrapper key={word + key}>
              {word.split('').map((char, index) => {
                return (
                  <LetterContainer key={index + char}>
                    <LetterWrapper isSpace={char === ' '} aria-hidden="true">
                      {char}
                    </LetterWrapper>
                  </LetterContainer>
                );
              })}
            </WordWrapper>
          );
        })}
      </LettersContainer>
    </>
  );
});

RevealString.displayName = 'RevealString';

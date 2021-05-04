import React, { memo } from 'react';
import { Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Text } from './styled/Text';

export interface ContinueGameProps {
  variants?: Variants;
  transition?: Transition;
  animate?: string;
  whileTap?: unknown;
  onClick?: () => void;
}

export const ContinueGame = memo<ContinueGameProps>(props => {
  const { children, ...rest } = props;
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...rest}
      >
        <ContentWrapper animate={isHovered ? 'animate' : 'initial'}>
          <Text>BEAT IT!</Text>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

ContinueGame.displayName = 'ContinueGame';

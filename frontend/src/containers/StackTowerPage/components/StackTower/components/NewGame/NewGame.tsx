import React, { memo } from 'react';
import { Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Text } from './styled/Text';

export interface NewGameProps {
  variants?: Variants;
  transition?: Transition;
  animate?: string;
  whileTap?: unknown;
  onClick?: () => void;
}

export const NewGame = memo<NewGameProps>(props => {
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
          <Text>START THE GAME</Text>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

NewGame.displayName = 'NewGame';

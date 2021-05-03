import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { DotsWrapper } from './styled/DotsWrapper';
import { Dot } from './styled/Dot';
import { DotContainer } from './styled/DotContainer';

interface NavDotsProps {
  seekTo: (offset: number) => void;
  items: JSX.Element[];
  currentIndex: number;
  dotSize?: number;
}

export const NavDots = memo<NavDotsProps>(props => {
  const { seekTo, items, currentIndex, dotSize = 6, ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <DotsWrapper>
          {items.map((item, i) => (
            <DotContainer onClick={() => seekTo(i)} key={item.key}>
              <Dot
                animate={i === currentIndex ? 'animate' : 'initial'}
                size={dotSize}
              />
            </DotContainer>
          ))}
        </DotsWrapper>
      </Wrapper>
    </>
  );
});

NavDots.displayName = 'NavDots';

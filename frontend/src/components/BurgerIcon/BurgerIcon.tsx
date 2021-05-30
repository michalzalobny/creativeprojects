import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { bottomVariants, topVariants } from './framerPresets';
import { MenuBar } from './styled/MenuBar';
import { CircleBackground } from './styled/CircleBackground';
import { BarsWrapper } from './styled/BarsWrapper';

export interface BurgerIconProps {
  isOpen: boolean;
  barColor: string;
}

export const BurgerIcon = memo<BurgerIconProps>(props => {
  const { barColor, isOpen: isMenuOpen, ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <BarsWrapper>
            <MenuBar
              barColor={barColor}
              variants={topVariants}
              animate={isMenuOpen ? 'animate' : 'initial'}
              top
            />
            <MenuBar
              barColor={barColor}
              variants={bottomVariants}
              animate={isMenuOpen ? 'animate' : 'initial'}
              bottom
            />
          </BarsWrapper>

          <CircleBackground />
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

BurgerIcon.displayName = 'BurgerIcon';

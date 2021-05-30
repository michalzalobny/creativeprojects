import React, { memo, useState } from 'react';

import { MenuItem } from 'components/MenuItem/MenuItem';

import { Wrapper } from './styled/Wrapper';
import { ButtonWrapper } from './styled/ButtonWrapper';
import { LinksWrapper } from './styled/LinksWrapper';
import { BurgerIconComp } from './styled/BurgerIconComp';
import { BackgroundComp } from './styled/BackgroundComp';
import { MenuItemComp } from './styled/MenuItemComp';

export interface ToggleMenuProps {
  links: MenuItem[];
  barColor: string;
}

const MENU_SIZE = 55;
const MENU_POS = 20;

export const ToggleMenu = memo<ToggleMenuProps>(props => {
  const { barColor, links, ...rest } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Wrapper animate={showMenu ? 'animate' : 'initial'} {...rest}>
        <ButtonWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onClick={() => setShowMenu(prev => !prev)}
        >
          <BurgerIconComp
            size={MENU_SIZE}
            pos={MENU_POS}
            barColor={barColor}
            isOpen={showMenu}
          />
        </ButtonWrapper>
        <LinksWrapper
          offsetPadding={MENU_POS + MENU_SIZE}
          animate={showMenu ? 'animate' : 'initial'}
        >
          {links.map((link, key) => {
            return <MenuItemComp key={link.label} itemContent={link} />;
          })}
          <BackgroundComp
            size={MENU_SIZE}
            pos={MENU_POS}
            animate={showMenu ? 'animate' : 'initial'}
          />
        </LinksWrapper>
      </Wrapper>
    </>
  );
});

ToggleMenu.displayName = 'ToggleMenu';
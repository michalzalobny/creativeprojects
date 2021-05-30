import React, { memo, useState } from 'react';
import Link from 'next/link';

import { Wrapper } from './styled/Wrapper';
import { ButtonWrapper } from './styled/ButtonWrapper';
import { LinksWrapper } from './styled/LinksWrapper';
import { LinkItem } from './styled/LinkItem';
import { BurgerIconComp } from './styled/BurgerIconComp';
import { BackgroundComp } from './styled/BackgroundComp';

type MenuItem = {
  label: string;
  href: string;
};

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
        <LinksWrapper animate={showMenu ? 'animate' : 'initial'}>
          {links.map((link, key) => {
            return (
              <Link href={link.href} passHref key={link.label}>
                <LinkItem>{link.label}</LinkItem>
              </Link>
            );
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

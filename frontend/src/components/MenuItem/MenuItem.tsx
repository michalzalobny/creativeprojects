import React, { memo, useState } from 'react';
import Link from 'next/link';

import { LinkItem } from './styled/LinkItem';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';

export type MenuItem = {
  label: string;
  href: string;
};

export interface MenuItemProps {
  itemContent: MenuItem;
}

export const MenuItem = memo<MenuItemProps>(props => {
  const { itemContent, ...rest } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <LinkWrapper animate={isHovered ? 'animate' : 'initial'}>
          <Link href={itemContent.href} passHref>
            <LinkItem>{itemContent.label}</LinkItem>
          </Link>
        </LinkWrapper>
      </Wrapper>
    </>
  );
});

MenuItem.displayName = 'MenuItem';

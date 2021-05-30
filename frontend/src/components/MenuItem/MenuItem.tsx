import React, { memo } from 'react';

import Link from 'next/link';
import { LinkItem } from './styled/LinkItem';

import { Wrapper } from './styled/Wrapper';

export type MenuItem = {
  label: string;
  href: string;
};

export interface MenuItemProps {
  itemContent: MenuItem;
}

export const MenuItem = memo<MenuItemProps>(props => {
  const { itemContent, ...rest } = props;

  return (
    <>
      <Wrapper {...rest}>
        <Link href={itemContent.href} passHref>
          <LinkItem>{itemContent.label}</LinkItem>
        </Link>
      </Wrapper>
    </>
  );
});

MenuItem.displayName = 'MenuItem';

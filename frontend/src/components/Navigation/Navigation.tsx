import React, { memo } from 'react';
import Link from 'next/link';

import { Wrapper } from './styled/Wrapper';
import { LinkItem } from './styled/LinkItem';

interface NavigationProps {}

export const Navigation = memo<NavigationProps>(props => {
  const { children } = props;
  return (
    <>
      <Wrapper>
        <Link href="/" passHref>
          <LinkItem>Landing page</LinkItem>
        </Link>
        <Link href="/stack-tower" passHref>
          <LinkItem>Stack tower</LinkItem>
        </Link>
      </Wrapper>
    </>
  );
});

Navigation.displayName = 'Navigation';

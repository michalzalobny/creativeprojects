import React, { memo } from 'react';
import Link from 'next/link';

import { Wrapper } from './styled/Wrapper';

interface NavigationProps {}

export const Navigation = memo<NavigationProps>(props => {
  const { children } = props;
  return (
    <>
      <Wrapper>
        <Link href="/" passHref>
          <a>Landing</a>
        </Link>
        <Link href="/reveal/10" passHref>
          <a>reveal</a>
        </Link>
        <Link href="/infinite-timeline" passHref>
          <a>infinite timeline</a>
        </Link>
        <Link href="/timeline" passHref>
          <a>timeline</a>
        </Link>
      </Wrapper>
    </>
  );
});

Navigation.displayName = 'Navigation';

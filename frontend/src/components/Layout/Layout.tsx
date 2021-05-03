import React, { memo } from 'react';

import { CookieInfo } from 'components/CookieInfo/CookieInfo';
import { Navigation } from 'components/Navigation/Navigation';

interface LayoutProps {}

export const Layout = memo<LayoutProps>(props => {
  return (
    <>
      <CookieInfo />
      <Navigation />
    </>
  );
});

Layout.displayName = 'Layout';

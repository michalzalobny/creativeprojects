import React, { memo } from 'react';

import { Navigation } from 'components/Navigation/Navigation';

interface LayoutProps {}

export const Layout = memo<LayoutProps>(props => {
  return (
    <>
      <Navigation />
    </>
  );
});

Layout.displayName = 'Layout';

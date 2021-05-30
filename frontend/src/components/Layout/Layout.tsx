import React, { memo } from 'react';

import { ToggleMenuComp } from './styled/ToggleMenuComp';

interface LayoutProps {}

export const Layout = memo<LayoutProps>(props => {
  return (
    <>
      <ToggleMenuComp
        barColor="#fff"
        links={[
          { label: 'test', href: '/' },
          { label: 'test2', href: '/' },
        ]}
      />
    </>
  );
});

Layout.displayName = 'Layout';

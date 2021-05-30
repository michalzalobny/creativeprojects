import React, { memo } from 'react';

import { ToggleMenuComp } from './styled/ToggleMenuComp';

interface LayoutProps {}

export const Layout = memo<LayoutProps>(props => {
  return (
    <>
      <ToggleMenuComp
        barColor="#fff"
        links={[
          { label: 'Stack Tower Game', href: '/stack-tower' },
          { label: 'Point Cloud Globe', href: '/globe' },
          { label: 'Flow Page', href: '/flow' },
        ]}
      />
    </>
  );
});

Layout.displayName = 'Layout';

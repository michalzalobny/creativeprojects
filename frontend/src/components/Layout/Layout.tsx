import React from 'react';

import { InfoFooterComp } from './styled/InfoFooterComp';
import { Wrapper } from './styled/Wrapper';

interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  return (
    <>
      <Wrapper>
        <InfoFooterComp />
      </Wrapper>
    </>
  );
};

import React from 'react';
import { useRouter } from 'next/router';

import { InfoFooterComp } from './styled/InfoFooterComp';
import { Wrapper } from './styled/Wrapper';
import { BackButton } from './styled/BackButton';
import { BackWrapper } from './styled/BackWrapper';

interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Wrapper>
        <InfoFooterComp />
      </Wrapper>
      {router.pathname !== '/' && (
        <BackWrapper>
          <BackButton />
        </BackWrapper>
      )}
    </>
  );
};

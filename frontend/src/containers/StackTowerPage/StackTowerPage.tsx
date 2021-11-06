import React from 'react';
import dynamic from 'next/dynamic';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { PageProps } from './data';
import { Layout } from 'components/Layout/Layout';

const StackTower = dynamic(
  () =>
    import('./components/StackTower/StackTower').then(mod => mod.StackTower),
  {
    ssr: false,
  },
);

export default function StackTowerPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        <CanvasWrapper>
          <StackTower />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}

import React from 'react';
import dynamic from 'next/dynamic';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Head } from 'utils/seo/Head';

const GravityObjects = dynamic(
  () => import('./components/StackTower/StackTower'),
  { ssr: false },
);

interface Props {}

export default function StackTowerPage(props: Props) {
  return (
    <>
      {/* <Head /> */}
      <Wrapper>
        <CanvasWrapper>
          <GravityObjects />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}

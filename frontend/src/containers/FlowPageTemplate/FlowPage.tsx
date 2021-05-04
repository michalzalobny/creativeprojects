import React from 'react';
import dynamic from 'next/dynamic';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { PageProps } from './data';

const FlowApp = dynamic(
  () => import('./components/FlowApp/FlowApp').then(mod => mod.FlowApp),
  {
    ssr: false,
  },
);

export default function FlowPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Wrapper>
        <CanvasWrapper>
          <FlowApp />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}

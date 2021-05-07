import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { PageProps } from './data';
import { FlowPhotosApp } from './components/FlowPhotosApp/FlowPhotosApp';

export default function FlowPhotosPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Wrapper>
        <CanvasWrapper>
          <FlowPhotosApp />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}

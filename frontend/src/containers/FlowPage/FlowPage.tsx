import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { PageProps } from './data';
import { FlowApp } from './components/FlowApp/FlowApp';

export default function FlowPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Wrapper>
        <CanvasWrapper>
          <FlowApp pageData={props.pageData} />
        </CanvasWrapper>
      </Wrapper>
    </>
  );
}

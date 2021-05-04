import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { PageProps } from './data';
import { FlowApp } from './components/FlowApp/FlowApp';

export default function FlowPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Wrapper>
        <FlowApp pageData={props.pageData} />
      </Wrapper>
    </>
  );
}

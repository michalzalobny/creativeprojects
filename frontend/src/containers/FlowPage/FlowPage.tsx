import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { PageProps } from './data';
import { FlowApp } from './components/FlowApp/FlowApp';
import { Layout } from 'components/Layout/Layout';

export default function FlowPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        <Layout allProjects={props.allProjectsData} />
        <FlowApp pageData={props.pageData} />
      </Wrapper>
    </>
  );
}

import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { PageProps } from './data';
import { GlobeApp } from './components/GlobeApp/GlobeApp';
import { Layout } from 'components/Layout/Layout';

export default function GlobePage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />
      <Wrapper>
        <GlobeApp />
      </Wrapper>
    </>
  );
}

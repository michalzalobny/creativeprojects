import React from 'react';

import { Head } from 'utils/seo/Head';

import { Wrapper } from './styled/Wrapper';
import { PageProps } from './data';
import { App } from './components/App/App';
import { Layout } from 'components/Layout/Layout';

export default function ParticlesPage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />
      <Wrapper>
        <App />
      </Wrapper>
    </>
  );
}

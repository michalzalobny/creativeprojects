import React from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { Wrapper } from './styled/Wrapper';
import { PageProps } from './data';
import { GlobeApp } from './components/GlobeApp/GlobeApp';

export default function GlobePage(props: PageProps) {
  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        <GlobeApp />
      </Wrapper>
    </>
  );
}

import React from 'react';
import Link from 'next/link';

import { Head } from 'utils/seo/Head';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <Link href={'/bubbles'}>Bubbles</Link>
      </Wrapper>
    </>
  );
}

import React from 'react';
import Link from 'next/link';

import { Head } from 'utils/seo/Head';

import { TestPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';

export default function TestPage(props: TestPageProps) {
  const { pageData } = props;

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <Link passHref href={'/'}>
          <LinkWrapper>Go to main</LinkWrapper>
        </Link>
      </Wrapper>
    </>
  );
}

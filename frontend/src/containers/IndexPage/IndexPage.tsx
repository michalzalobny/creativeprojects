import React from 'react';
import Link from 'next/link';

import { Head } from 'utils/seo/Head';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <Link passHref href={'/bubbles'}>
          <LinkWrapper>Bubbles</LinkWrapper>
        </Link>
        <Link passHref href={'/motion-circle'}>
          <LinkWrapper>Motion circle</LinkWrapper>
        </Link>
        <Link passHref href={'/star-shower'}>
          <LinkWrapper>Star shower</LinkWrapper>
        </Link>
      </Wrapper>
    </>
  );
}

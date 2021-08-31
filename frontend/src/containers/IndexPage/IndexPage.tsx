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
        <Link passHref href={'/test'}>
          <LinkWrapper>Test</LinkWrapper>
        </Link>
        <Link passHref href={'/bubbles'}>
          <LinkWrapper>Bubbles</LinkWrapper>
        </Link>
        <Link passHref href={'/motion-circle'}>
          <LinkWrapper>Motion circle</LinkWrapper>
        </Link>
        <Link passHref href={'/stack-tower'}>
          <LinkWrapper>Stack tower</LinkWrapper>
        </Link>
        <Link passHref href={'/spiral'}>
          <LinkWrapper>Spiral page</LinkWrapper>
        </Link>
        <Link passHref href={'/orbit-gallery'}>
          <LinkWrapper>Orbit Gallery page</LinkWrapper>
        </Link>
        <Link passHref href={'/card-leader'}>
          <LinkWrapper>Card leader</LinkWrapper>
        </Link>
        <div style={{ width: '100%', height: '50vh', background: '#d5edf1' }} />
      </Wrapper>
    </>
  );
}

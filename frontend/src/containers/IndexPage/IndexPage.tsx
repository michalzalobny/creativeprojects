import React from 'react';
import Link from 'next/link';

import { Head } from 'utils/seo/Head';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';
import { LinkComp } from './styled/LinkComp';
import { LinksWrapper } from './styled/LinksWrapper';
import { ContentWrapper } from './styled/ContentWrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <ContentWrapper>
          <LinksWrapper>
            <LinkComp label="michal.zalobny@gmail.com" linkHref="" isMail />
            <LinkComp
              isExternal
              label="LinkedIn"
              linkHref="https://www.linkedin.com/in/michal-zalobny-1a8257204/"
            />
            <LinkComp
              isExternal
              label="Github"
              linkHref="https://github.com/javusScriptus/creativeprojects/tree/master/frontend/src/containers"
            />
          </LinksWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

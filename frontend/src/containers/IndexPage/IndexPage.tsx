import React from 'react';

import { Head } from 'utils/seo/Head';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { LinkComp } from './styled/LinkComp';
import { LinksWrapper } from './styled/LinksWrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Description } from './styled/Description';
import { Name } from './styled/Name';
import { InfoWrapper } from './styled/InfoWrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <ContentWrapper>
          <InfoWrapper>
            <Name>Michal Zalobny</Name>
            <Description>Creative Web Developer</Description>
          </InfoWrapper>

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

import React from 'react';
import { useRouter } from 'next/router';

import { Head } from 'utils/seo/Head';
import { getLocalizedText } from 'utils/i18n';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { LinkComp } from './styled/LinkComp';
import { LinksWrapper } from './styled/LinksWrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Description } from './styled/Description';
import { Name } from './styled/Name';
import { InfoWrapper } from './styled/InfoWrapper';
import { ProjectsWrapper } from './styled/ProjectsWrapper';
import { MenuItemComp } from './styled/MenuItemComp';

export default function IndexPage(props: IndexPageProps) {
  const { allProjectsData, pageData } = props;

  const router = useRouter();

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
          <ProjectsWrapper>
            {allProjectsData.map(el => (
              <MenuItemComp
                isExternal={el.isExternal}
                href={el.urlSlug}
                imageSrc={el.localizedHead.ogImage.url}
                label={getLocalizedText(
                  el.localizedHead.localizedTitle,
                  router.locale,
                )}
                key={getLocalizedText(
                  el.localizedHead.localizedTitle,
                  router.locale,
                )}
              />
            ))}
          </ProjectsWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

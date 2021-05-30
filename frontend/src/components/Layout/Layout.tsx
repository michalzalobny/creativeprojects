import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { ProjectData } from 'utils/types/strapi/ProjectData';
import { getLocalizedText } from 'utils/i18n';

import { ToggleMenuComp } from './styled/ToggleMenuComp';
import { Wrapper } from './styled/Wrapper';

interface LayoutProps {
  allProjects: ProjectData[];
}

export const Layout = memo<LayoutProps>(props => {
  const { locale } = useRouter();
  return (
    <>
      <Wrapper>
        <ToggleMenuComp
          barColor="#fff"
          links={props.allProjects.map((project, key) => {
            return {
              label: getLocalizedText(project.localizedName, locale),
              href: project.urlSlug,
              imageSrc: project.localizedHead.ogImage.url,
              key: project.localizedHead.ogImage.url,
            };
          })}
        />
      </Wrapper>
    </>
  );
});

Layout.displayName = 'Layout';

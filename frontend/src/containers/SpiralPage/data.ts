import { GetStaticProps } from 'next';

import { HeadProps } from 'utils/seo/Head';
import { ISR_TIMEOUT } from 'utils/functions/getIsrTimeout';
import { getLocalizedText } from 'utils/i18n';
import { ProjectData } from 'utils/types/strapi/ProjectData';
import { getProjectData } from 'utils/functions/strapi/getProjectData';
import { getAllProjectsData } from 'utils/functions/strapi/getAllProjectsData';

export interface PageProps {
  head: HeadProps;
  projectData: ProjectData;
  allProjectsData: ProjectData[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    throw new Error('No locale provided in getStaticProps function');
  }
  const projectData = (await getProjectData('spiral')) as ProjectData;
  const allProjectsData = await getAllProjectsData();
  const projectHead = projectData.localizedHead;

  const head = {
    title: getLocalizedText(projectHead.localizedTitle, locale),
    description: getLocalizedText(projectHead.localizedDescription, locale),
    ogType: projectHead.ogType,
    ogImage: projectHead.ogImage,
  };

  return {
    props: {
      allProjectsData,
      projectData,
      head,
    },
    revalidate: ISR_TIMEOUT,
  };
};

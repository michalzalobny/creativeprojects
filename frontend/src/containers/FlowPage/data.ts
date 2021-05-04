import { GetStaticProps } from 'next';
import { gql } from 'apollo-boost';

import { cmsApiClient } from 'utils/functions/getCmsApiClient';
import { HeadProps } from 'utils/seo/Head';
import { ISR_TIMEOUT } from 'utils/functions/getIsrTimeout';
import { getLocalizedText } from 'utils/i18n';
import { ProjectData } from 'utils/types/strapi/ProjectData';
import { getProjectData } from 'utils/functions/strapi/getProjectData';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

export interface PageData {
  name: string;
  flowItems: CreativeItem[];
  asideDescription: string;
}

export interface PageProps {
  head: HeadProps;
  projectData: ProjectData;
  pageData: PageData;
}

async function getPageData(locale: string) {
  return cmsApiClient
    .query({
      query: gql`
      {
        flowPages(where: { language: { code: "${locale}" } }) {
          name,
          flowItems{
            name,
            image{
              formats,
              url
            },
            description
          },
          asideDescription
        }
      }
    `,
    })
    .then(response => response.data.flowPages[0]);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const projectData = (await getProjectData('flow')) as ProjectData;
  const projectHead = projectData.localizedHead;
  const pageData = await getPageData(locale);

  const head = {
    title: getLocalizedText(projectHead.localizedTitle, locale),
    description: getLocalizedText(projectHead.localizedDescription, locale),
    ogType: projectHead.ogType,
    ogImage: projectHead.ogImage,
  };

  return {
    props: {
      projectData,
      head,
      pageData,
    },
    revalidate: ISR_TIMEOUT,
  };
};

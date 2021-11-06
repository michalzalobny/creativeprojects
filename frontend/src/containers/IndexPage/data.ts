import { GetStaticProps } from 'next';
import { gql } from 'apollo-boost';

import { HeadProps } from 'utils/seo/Head';

import { ProjectData } from 'utils/types/strapi/ProjectData';
import { getAllProjectsData } from 'utils/functions/strapi/getAllProjectsData';
import { cmsApiClient } from 'utils/functions/getCmsApiClient';
import { ISR_TIMEOUT } from 'utils/functions/getIsrTimeout';

interface PageData {
  head: HeadProps;
  name: string;
}

export interface IndexPageProps {
  pageData: PageData;
  allProjectsData: ProjectData[];
}

async function getPageData(locale: string) {
  return cmsApiClient
    .query({
      query: gql`
      {
        indexPages(where: { language: { code: "${locale}" } }) {
          head {
            title,
            description,
            ogType,
            ogImage {
              url
            }
          },
          name
        }
      }
    `,
    })
    .then(response => response.data.indexPages[0]);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const pageData = await getPageData(locale);
  const allProjectsData = await getAllProjectsData();

  return {
    props: {
      allProjectsData,
      pageData,
    },
    revalidate: ISR_TIMEOUT,
  };
};

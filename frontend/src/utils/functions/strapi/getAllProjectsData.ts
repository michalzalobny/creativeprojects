import { gql } from 'apollo-boost';

import { cmsApiClient } from 'utils/functions/getCmsApiClient';
import { ProjectData } from 'utils/types/strapi/ProjectData';

export async function getAllProjectsData() {
  return cmsApiClient
    .query({
      query: gql`
        {
          projects {
            localizedName {
              language {
                code
              }
              text
            }
            urlSlug
            isExternal
            localizedHead {
              ogType
              ogImage {
                formats
                url
              }
              localizedDescription {
                language {
                  code
                }
                text
              }
              localizedTitle {
                language {
                  code
                }
                text
              }
            }
          }
        }
      `,
    })
    .then(response => response.data.projects as ProjectData[]);
}

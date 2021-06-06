import { gql } from 'apollo-boost';

import { cmsApiClient } from 'utils/functions/getCmsApiClient';

export async function getProjectData(urlSlug: string) {
  return cmsApiClient
    .query({
      query: gql`
      {
        projects(where: { urlSlug: "${urlSlug}"  }) {
          localizedName{
            language{
              code
            }
            text
          },
          urlSlug,
          localizedHead{
            ogType,
            ogImage{
              formats,
              url
            },
            localizedDescription{
              language{
                code
              }
              text
            },
            localizedTitle{
              language{
                code
              }
              text
            },
          },
          creativeItems{
            name,
            image{
              formats,
              url
            },
            description
          },
        }
      }
    `,
    })
    .then(response => response.data.projects[0]);
}

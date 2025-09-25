import { fetchAPI } from 'lib/graphql-api/api'

const MAX_NUM = 100
export async function getDonors() {
  const data = await fetchAPI(
    `query getDonors {
        donors(first: ${MAX_NUM}) {
        edges {
            node {
                title
                donorFields {
                  description
                  descriptionMn
                  nameMn
                  image {
                    node {
                        mediaItemUrl
                      }                    
                  }
                }
              }
            }
          }
        }
`,
    {},
  )

  return data?.donors?.edges || []
}

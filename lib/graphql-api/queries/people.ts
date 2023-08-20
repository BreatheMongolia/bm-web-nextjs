import { fetchAPI } from 'lib/graphql-api/api'

const MAX_NUM = 100
export async function getPeople() {
  const data = await fetchAPI(
    `query getPeople {
        people(first: ${MAX_NUM}) {
        edges {
            node {
            title
            featuredImage {
                node {
                mediaItemUrl
                }
            }
            customFields {
                nameMn
                role
                roleMn
                description
                descriptionMn
                memberSince
                memberSinceMn
                featured
                linkedin
            }
            }
        }
    }
}
`,
    {},
  )

  return data?.people?.edges || []
}

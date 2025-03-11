import { fetchAPI } from "../api"

export async function getPolicies(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllPolicies {
      newses(first: 1000) {
        edges {
          node {
            databaseId
            slug
            title
        }
      }
    }
  }
    `,
  )
  // parse the data into news objects
  if (data && data.newses && data.newses.edges) {
    if (data.newses.edges.length > 0) {
      return data.newses.edges.map(x => x.node as any)
    }
  }
  return []
}

export async function getPolicyLandingPageSettings(): Promise<any> {
    const data = await fetchAPI(
      `query getPolicyLandingPageSettings {
        newsPageSettings {
          newsLanding {
            description
            descriptionMn
            title
            titleMn
            image {
              mediaItemUrl
            }
            imageMn {
              mediaItemUrl
              }
            }
          }
        }
      `,
    )
    return data.newsPageSettings.newsLanding || []
  }
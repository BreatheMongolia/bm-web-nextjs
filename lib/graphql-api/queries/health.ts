import { News } from 'graphql/generated'
import { fetchAPI } from 'lib/graphql-api/api'

export async function getHealthPage() {
  const data = await fetchAPI(
    `
      query GetHealthPageSettings {
        healthPageSettings {
          healthPage {
            body
            bodyMn
            title
            titleMn
            diagramTextBottom
            diagramTextBottomMn
            diagramTextTop
            diagramTextTopMn
            healthSocialMediaShare {
              description
              descriptionMn
              image {
                mediaItemUrl
              }
              imageMn {
                mediaItemUrl
              }
              title
              titleMn
            }
          }
        }
      }
    `
  )

  return data.healthPageSettings.healthPage || []
}

export async function getHealthNews(): Promise<News[]> {
  const data = await fetchAPI(
    `
    query getHealthNews {
      newses(where: {categoryName: "health"}) {
        edges {
          node {
            databaseId
            dateGmt
            desiredSlug
            slug
            customFields {
              titleMn
              title
              sourceLink
              sourceName
              sourceNameMn
              sourceLanguage
              newsLandingPageFeatured
              newsContentType
              featuredImage {
                image {
                  mediaDetails {
                    sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                      sourceUrl
                      name
                    }
                  }
                }
                imageMn {
                  mediaDetails {
                    sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                      sourceUrl
                      name
                    }
                  }
                }
                caption
                captionMn
              }
            }
            categories {
              nodes {
                categoryCustomFields {
                  name
                  nameMn
                  fieldGroupName
                }
                categoryId
                id
                slug
              }
            }
            featuredImage {
              node {
                mediaItemUrl
                mediaDetails {
                  sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                    name
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  )
  // parse the data into news objects
  if (data && data.newses && data.newses.edges) {
    if (data.newses.edges.length > 0) {
      return data.newses.edges.map(x => x.node as News)
    }
  }
  return []
}
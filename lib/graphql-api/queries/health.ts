import { News } from 'graphql/generated'
import { fetchAPI } from 'lib/graphql-api/api'

export async function getHealthPage() {
  const data = await fetchAPI(
    `
      query GetHealthPageSettings {
        healthPageSettings {
          healthPage {
            healthTitle
            healthTitleMn
            healthBody
            healthBodyMn
            diagramTextBottom
            diagramTextBottomMn
            diagramTextTop
            diagramTextTopMn
            healthSocialMediaShare {
              description
              descriptionMn
              image {
                node {
                  mediaItemUrl
                }
              }
              imageMn {
                node {
                  mediaItemUrl
                }
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
            newsCustomFields {
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
                  node {
                    mediaDetails {
                      sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                        sourceUrl
                        name
                      }
                    }
                  } 
                }
                imageMn {
                  node {
                    mediaDetails {
                      sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                        sourceUrl
                        name
                      }
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
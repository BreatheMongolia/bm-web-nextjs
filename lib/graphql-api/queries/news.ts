import { News, NewsIdType } from 'graphql/generated'
import { fetchAPI } from 'lib/graphql-api/api'

export async function getNewsFull(id, idType: NewsIdType = NewsIdType.Slug): Promise<News> {
  const data = await fetchAPI(
    `
    query news($id: ID!, $idType: NewsIdType!) {
      news(id: $id, idType: $idType) {
        databaseId
        desiredSlug
        slug
        dateGmt
        
        customFields {
          authors {
            authorLink
            authorName
            authorNameMn
          }
          title
          titleMn
          body
          bodyMn
          featuredImage {
            image {
              mediaDetails {
                sizes(include: MEDIUM_LARGE) {
                  name
                  sourceUrl
                }
              }
            }
            imageMn {
              mediaDetails {
                sizes(include: MEDIUM_LARGE) {
                  name
                  sourceUrl
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
            mediaDetails {
              sizes(include: MEDIUM_LARGE) {
                name
                sourceUrl
              }
            }
          }
        }
      }
    } 
    `,
    {
      variables: { id, idType },
    },
  )

  return data.news
}

export async function getNewsPostSlugs(): Promise<News[]> {
  const data = await fetchAPI(
    `
    query getAllNews {
      newses(first: 1000) {
        edges {
          node {
            databaseId
            desiredSlug
            slug
            dateGmt
          }
        }
      }
    }
    `,
  )
  return data.newses && data.newses.edges ? data.newses.edges.map(x => x.node as News) : []
}

export async function getNewsPosts(): Promise<News[]> {
  const data = await fetchAPI(
    `
    query getAllNews {
      newses(first: 1000) {
        edges {
          node {
            databaseId
            desiredSlug
            slug
            dateGmt
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
  return data.newses && data.newses.edges ? data.newses.edges.map(x => x.node as News) : []
}

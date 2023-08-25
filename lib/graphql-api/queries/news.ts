import { News, NewsIdType, Page, PageIdType } from 'graphql/generated'
import { fetchAPI } from 'lib/graphql-api/api'

// Landing Page
export async function getFeaturedNews(): Promise<News[]> {
  const data = await fetchAPI(
    `query getFeaturedNews {
      page(id: "/news/", idType: URI) {
        id
        slug
        uri
        customFields {
          featuredNews {
            ... on News {
              databaseId
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
                        name
                        sourceUrl
                      }
                    }
                  }
                  imageMn {
                    mediaDetails {
                      sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                        name
                        sourceUrl
                      }
                    }
                  }
                }
              }
              featuredImage {
                node {
                  id
                  mediaDetails {
                    sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                      name
                      sourceUrl
                    }
                  }
                }
              }
              categories {
                nodes {
                  categoryCustomFields {
                    name
                    nameMn
                    fieldGroupName
                  }
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

  if (data?.page) {
    const page = data.page as Page
    return page.customFields?.featuredNews || []
  }

  return []
}

export async function getNewsPosts(): Promise<News[]> {
  const data = await fetchAPI(
    `
    query getAllNews {
      newses(first: 1000) {
        edges {
          node {
            databaseId
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
  // parse the data into news objects
  if (data && data.newses && data.newses.edges) {
    if (data.newses.edges.length > 0) {
      return data.newses.edges.map(x => x.node as News)
    }
  }
  return []
}
// Detail Pages

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
          excerpt
          excerptMn
          featuredImage {
            image {
              mediaDetails {
                sizes(include: [MEDIUM, MEDIUM_LARGE, LARGE]) {
                  name
                  sourceUrl
                }
              }
            }
            imageMn {
              mediaDetails {
                sizes(include: [MEDIUM,MEDIUM_LARGE, LARGE]) {
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
              sizes(include: [MEDIUM, MEDIUM_LARGE, LARGE]) {
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

export async function getLastThree(): Promise<News[]> {
  const data = await fetchAPI(
    `
    query getLatestNews {
      newses(where: { orderby: { order: DESC, field: DATE } }, first: 3) {
        edges {
          node {
            databaseId
            slug
            date
            dateGmt
            customFields {
              titleMn
              title
              sourceLink
              sourceName
              sourceNameMn
              sourceLanguage
              newsContentType
              featuredImage {
                image {
                  mediaItemUrl
                  mediaDetails {
                    sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                      name
                      sourceUrl
                    }
                  }
                }
                imageMn {
                  mediaItemUrl
                  mediaDetails {
                    sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                      name
                      sourceUrl
                    }
                  }
                }
                caption
                captionMn
              }
            }
            featuredImage {
              node {
                id
                mediaItemUrl
                mediaDetails {
                  sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                    name
                    sourceUrl
                  }
                }
              }
            }
            categories {
              nodes {
                categoryCustomFields {
                  name
                  nameMn
                  fieldGroupName
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

export async function getNewsBannerImages(id: string, idType: PageIdType = PageIdType.Uri): Promise<Page> {
  const data = await fetchAPI(
    `query getFeaturedNews($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
            news_general_fields {
              banner {
                fieldGroupName
                bannerImage {
                  mediaItemUrl
                  mediaDetails {
                    sizes(include: _1536X1536) {
                      height
                      width
                      sourceUrl
                    }
                  }
                }
                bannerImageMn {
                  mediaItemUrl
                  mediaDetails {
                    sizes(include: _1536X1536) {
                      height
                      width
                      sourceUrl
                    }
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

  return data.page
}

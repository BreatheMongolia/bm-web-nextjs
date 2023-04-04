import { News, NewsIdType, PostIdType } from 'graphql/generated'

const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

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

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    },
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    },
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId ? Number(slug) === postPreview.id : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    query getFeaturedNews {
      page(id: "/", idType: URI) {
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
                      sizes(include: MEDIUM_LARGE) {
                        name
                        sourceUrl
                      }
                    }
                  }
                  imageMn {
                    mediaDetails {
                      sizes(include: MEDIUM_LARGE) {
                        sourceUrl
                        name
                      }
                    }
                  }
                }
              }
              featuredImage {
                node {
                  id
                  mediaDetails {
                    sizes(include: MEDIUM_LARGE) {
                      sourceUrl
                      name
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
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}

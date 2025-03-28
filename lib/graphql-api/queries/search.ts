import { fetchAPI } from 'lib/graphql-api/api'

const MAX_NUM = 100
export async function getSearchData() {
  const data = await fetchAPI(
    `query GET_SEARCH_DATA {
    contentNodes(where: {orderby: {field: MODIFIED, order: DESC}}, first: 1) {
      edges {
        node {
          modified
          modifiedGmt
        }
      }
    }
    takeActions(first: ${MAX_NUM}) {
        edges {
            node {
            databaseId
            slug
            dateGmt
            takeActionCustomFields {
                additionalResources {
                title
                titleMn
                url
                urlMn
                }
                introductionText
                introductionTextMn
                pledgeContent
                pledgeContentMn
                titleMn
                title
                excerpt
                excerptMn
                typeOfAction {
                  nodes {
                        ... on ActionType {
                          actionTypeCustomFields {
                            name
                            nameMn
                          }
                        }
                      }
                }
                listOfPhotos {
                  nodes {
                    mediaItemUrl
                    caption
                  } 
                }
                listOfVideos {
                videoLink
                }
                listOfSubSections {
                title
                titleMn
                bodyMn
                body
                }
            }
            featuredImage {
                node {
                mediaItemUrl
                }
            }
            }
        }
    }
    persons(first: ${MAX_NUM}) {
        edges {
          node {
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            personCustomFields {
              nameMn
              role
              roleMn
              description
              descriptionMn
              linkedin
            }
          }
        }
      }
    newses(first: ${MAX_NUM}) {
        edges {
        node {
            databaseId
            slug
            dateGmt
            newsCustomFields {
            titleMn
            title
            body
            bodyMn
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
            featuredImage {
              node {
                  id
                  mediaItemUrl
              }
            }
            categories {
            nodes {
                categoryCustomFields {
                name
                nameMn
                }
            }
            }
        }
        }
    }
  }`,
    {},
  )

  return data || {}
}

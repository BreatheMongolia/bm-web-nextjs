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
            customFields {
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
                customFields {
                    name
                    nameMn
                }
                }
                listOfPhotos {
                mediaItemUrl
                caption
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
            customFields {
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
                fieldGroupName
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

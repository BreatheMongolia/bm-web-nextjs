import { fetchAPI } from "../api"

export async function getPolicies(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllPolicies {
      policies(first: 1000) {
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
        policyTrackingPageSettings {
          policyPage {
            description
            descriptionMn
            title
            titleMn
            featuredNews {
              nodes {
                ... on News {
                  databaseId
                  dateGmt
                  slug
                  desiredSlug
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
                              name
                              sourceUrl
                            }
                          }
                        }
                      }
                      imageMn {
                        node {
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
                      slug
                      categoryCustomFields {
                        name
                        nameMn
                      }
                    }
                  }
                }
              }
            }
            featuredTakeActions {
              nodes {
                ... on TakeAction {
                  databaseId
                  slug
                  dateGmt
                  featuredImage {
                    node {
                      mediaItemUrl
                      mediaDetails {
                        sizes(include: MEDIUM) {
                          height
                          width
                          sourceUrl
                        }
                      }
                    }
                  }
                  takeActionCustomFields {
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
                    title
                    titleMn
                  }
                }
              }
            }
            policySocialMediaShare {
              description
              descriptionMn
              image {
                node {
                  mediaItemUrl
                }
              }
              title
              titleMn
              imageMn {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    `,
    )
    return data.policyTrackingPageSettings.policyPage || []
  }
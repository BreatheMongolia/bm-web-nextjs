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
            policyPageCustomFields {
              title
              titleMn
              name
              nameMn
              initiatedDate
              sourceUrl
              summary
              summaryMn
            }
            policyStatuses {
              edges {
                node {
                  slug
                  policyStatusCustomFields {
                    name
                    nameMn
                  }
                }
              }
            }
            documentTypes {
              edges {
                node {
                  slug
                  documentTypeCustomFields {
                    name
                    nameMn
                  }
                }
              }
            }
            topics {
              edges {
                node {
                  slug
                  topicCustomFields {
                    name
                    nameMn
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
  // parse the data into policy objects
  if (data && data.policies && data.policies.edges) {
    if (data.policies.edges.length > 0) {
      return data.policies.edges.map(x => x.node as any)
    }
  }
  return []
}

export async function getDocumentTypes(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllDocumentTypes {
      documentTypes {
        edges {
          node {
            slug
            documentTypeCustomFields {
              name
              nameMn
            }
          }
        }
      }
    }
    `,
  )
  // parse the data into types objects
  if (data && data.documentTypes && data.documentTypes.edges) {
    if (data.documentTypes.edges.length > 0) {
      return data.documentTypes.edges.map(x => x.node as any)
    }
  }
  return []
}

export async function getPolicyStatus(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllPolicyStatus {
      policyStatuses {
        edges {
          node {
            slug
            policyStatusCustomFields {
              name
              nameMn
            }
          }
        }
      }
    }
    `,
  )
  // parse the data into status objects
  if (data && data.policyStatuses && data.policyStatuses.edges) {
    if (data.policyStatuses.edges.length > 0) {
      return data.policyStatuses.edges.map(x => x.node as any)
    }
  }
  return []
}

export async function getPolicyTopics(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllPolicyTopics {
      topics {
        edges {
          node {
            slug
            topicCustomFields {
              name
              nameMn
            }
          }
        }
      }
    }
    `,
  )
  // parse the data into topics objects
  if (data && data.topics && data.topics.edges) {
    if (data.topics.edges.length > 0) {
      return data.topics.edges.map(x => x.node as any)
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
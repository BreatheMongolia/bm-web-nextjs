import { Policy, PolicyIdType } from "graphql/generated"
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
  if (data && data.policies && data.policies.edges) {
    if (data.policies.edges.length > 0) {
      return data.policies.edges.map(x => x.node as any)
    }
  }
  return []
}

// TODO
export async function getPolicyDetails(id: string, idType: PolicyIdType = PolicyIdType.Slug): Promise<Policy> {
  const data = await fetchAPI(
    `query getPolicyDetails($id: ID!, $idType: PolicyIdType!) {
      policy(id: $id, idType: $idType) {
        policyPageCustomFields {
          name
          nameMn
          downloadUrl
          downloadUrlMn
          furtherReading
          furtherReadingMn
          initiatedDate
          sourceUrl
          summary
          summaryMn
          title
          titleMn
          updates
          updatesMn
          recommendedAction(first: 10) {
            edges {
              node {
                slug
                ... on TakeAction {
                  databaseId
                  slug
                  dateGmt
                  takeActionCustomFields {
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
                  }
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
                  
                }
              }
            }
          }
        }
        policyStatus(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        documentTypes(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        topics(first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
    `,
    {
      variables: { id, idType },
    },
  ).catch(err => console.error('Failed to fetch policy', err))
  return data
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
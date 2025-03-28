import { Page } from 'graphql/generated'
import { fetchAPI } from 'lib/graphql-api/api'

const QUERY_LIMIT = 100

export async function getAccomplishments(): Promise<any> {
  const data = await fetchAPI(
    `{
        accomplishments(where: { orderby: { field: DATE, order: DESC }}, first: ${QUERY_LIMIT}) {
          edges {
            node {
              id 
              accomplishmentCustomFields {
                date
                image {
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
                category
                categoryMn
                title
                titleMn
                description
                descriptionMn
              }
            }
          }
        }
      }
    `,
    {},
  ) 

  return data?.accomplishments?.edges || []
}

export async function getReports(): Promise<any> {
  const data = await fetchAPI(
    `query GetReports {
        reports {
          edges {
            node {
              reportCustomFields {
                pdfFile {
                  node {
                    mediaItemUrl
                  } 
                }
                pdfFileMn {
                  node {
                    mediaItemUrl
                  }
                }
                title
                titleMn
              }
              databaseId
            }
          }
        }
      }
    `,
    {},
  )

  return data?.reports?.edges || []
}

export async function getInfoSettings(): Promise<any> {
  const data = await fetchAPI(
    `query GetInfoSettings {
      aboutUsPageSettings {
        aboutUs {
          info {
            description
            descriptionMn
            title
            titleMn
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
          }
        }
      }
    }
    `,
    {},
  )
  return data?.aboutUsPageSettings.aboutUs?.info || []

}

export async function getImpactSettings(): Promise<any> {
  const data = await fetchAPI(
    `query GetImpactSettings {
      aboutUsPageSettings {
        aboutUs {
          ourWork {
            description
            descriptionMn
            title
            titleMn
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
          }
        }
      }
    }
  `,
    {},
  )
  return data?.aboutUsPageSettings.aboutUs?.ourWork || []

}

export async function getOurStorySettings(): Promise<any> {
  const data = await fetchAPI(
    `query GetOurStorySettings {
      aboutUsPageSettings {
        aboutUs {
          ourStory {
            description
            descriptionMn
            title
            titleMn
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
          }
        }
      }
    }
    `,
    {},
  )
  return data?.aboutUsPageSettings.aboutUs?.ourStory || []

}

export async function getOurTeamSettings(): Promise<any> {
  const data = await fetchAPI(
    `query GetOurTeamSettings {
      aboutUsPageSettings {
        aboutUs {
          ourTeam {
            description
            descriptionMn
            title
            titleMn
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
          }
        }
      }
    }
  `,
    {},
  )
  return data?.aboutUsPageSettings.aboutUs?.ourTeam || []

}

export async function getSupportUsSettings(): Promise<any> {
  const data = await fetchAPI(
    `query GetSupportUsSettings {
      aboutUsPageSettings {
        aboutUs {
          supportUs {
            description
            descriptionMn
            title
            titleMn
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
          }
        }
      }
    }
    `,
    {},
  )
  return data?.aboutUsPageSettings.aboutUs?.supportUs || []

}

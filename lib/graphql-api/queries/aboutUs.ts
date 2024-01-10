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
              customFields {
                date
                image {
                  mediaItemUrl
                  mediaDetails {
                    sizes(include: MEDIUM) {
                        height
                        width
                        sourceUrl
                    }
                    }
                }
                category
                categoryMn
                title
                titleMn
                description
                descriptionMn
                fieldGroupName
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
              customFields {
                pdfFile {
                  mediaItemUrl
                }
                pdfFileMn {
                  mediaItemUrl
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

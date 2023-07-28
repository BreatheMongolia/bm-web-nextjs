import { fetchAPI } from 'lib/graphql-api/api'
import { TakeAction, TakeActionIdType } from 'graphql/generated'

<<<<<<< HEAD
export async function getTakeActionsDetail(id: string, idType: TakeActionIdType = TakeActionIdType.Uri): Promise<TakeAction> {
=======
export async function getTakeActionsDetail(
  id: string,
  idType: TakeActionIdType = TakeActionIdType.Slug,
): Promise<Page> {
>>>>>>> 331999d1e27b0da72012dc82a7e7ca2794914084
  const data = await fetchAPI(
    `query GetTakeActionById($id: ID!, $idType: TakeActionIdType!) {
      takeAction(id: $id,idType: $idType) {
          ${TakeActionGQLQuerySections.takeActionDetail}
        }
      }
    `,
    {
      variables: { id, idType },
    },
  )

  return data.takeAction
}

export async function getTakeActionsLatest() {
  const data = await fetchAPI(
    `query getLatestTakeActions {
      takeActions(where: { orderby: { order: DESC, field: DATE } }, first: 100) {
        edges {
          node {
            ${TakeActionGQLQuerySections.takeAction}
            }
          }
        }
      }
    `,
  )

  return data.takeActions?.edges || []
}

export async function getFeaturedTakeActions(id: string, idType: TakeActionIdType = TakeActionIdType.Uri): Promise<TakeAction> {
  const data = await fetchAPI(
    `query page($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
              customFields {
                  ${TakeActionGQLQuerySections.featuredTakeAction}
              }
          }
      }
    `,
    {
      variables: { id, idType },
    },
  )
  return data.page?.customFields?.featuredTakeActionsLanding || []
}

export async function getTakeActionSlugs(): Promise<TakeAction[]> {
  const data = await fetchAPI(
    `query getAllTakeActions {
      takeActions(first: 100) {
        edges {
          node {
            databaseId
            slug
            dateGmt
          }
        }
      }
    }
    `,
  )
  return data.takeActions && data.takeActions.edges ? data.takeActions.edges.map(x => x.node as TakeAction) : []
}

const TakeActionGQLQuerySections = {
  featuredTakeAction: `
    featuredTakeActionsLanding {
      ... on TakeAction {
        databaseId
        dateGmt
        customFields {
          titleMn
          title
          typeOfAction {
            customFields {
              name
              nameMn
            }
          }
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  `,
  takeAction: `
      databaseId
      date
      dateGmt
      customFields {
        titleMn
        title
        typeOfAction {
          customFields {
            name
            nameMn
          }
        }
      }
      featuredImage {
        node {
          id
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
    `,
  takeActionDetail: `
    databaseId
    dateGmt
    totalPledges
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    customFields {
      additionalResources {
        title
        titleMn
        url
        urlMn
      }
      introductionText
      introductionTextMn
      pledgeTitle
      pledgeTitleMn
      pledgeContent
      pledgeContentMn
      titleMn
      title
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
    }`,
}

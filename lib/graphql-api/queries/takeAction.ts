import { fetchAPI } from 'lib/graphql-api/api'
<<<<<<< HEAD
import { Page, PageIdType, TakeAction } from 'graphql/generated'

export async function getTakeActionsDetail(id): Promise<Page> {
  const data = await fetchAPI(
    `query GetTakeActionById($id: [ID]) {
      takeActions(where: { in: $id }) {
        edges {
          node {
            ${TakeActionGQLQuerySections.takeActionDetail}
            }
          }
=======
import { Page, PageIdType, TakeAction, TakeActionIdType } from 'graphql/generated'

export async function getTakeActionsDetail(id: string, idType: TakeActionIdType = TakeActionIdType.Uri): Promise<Page> {
  const data = await fetchAPI(
    `query GetTakeActionById($id: ID!, $idType: TakeActionIdType!) {
      takeAction(id: $id,idType: $idType) {
          ${TakeActionGQLQuerySections.takeActionDetail}
>>>>>>> 69ddde1bff350c6b04f9bb9aaf6b292ce07930ae
        }
      }
    `,
    {
<<<<<<< HEAD
      variables: { id },
    },
  )
  return data.takeActions.edges[0].node || {}
=======
      variables: { id, idType },
    },
  )
  return data.takeAction || {}
>>>>>>> 69ddde1bff350c6b04f9bb9aaf6b292ce07930ae
}

export async function getTakeActionsLatest() {
  const data = await fetchAPI(
    `query getLatestTakeActions {
      takeActions(where: { orderby: { order: DESC, field: DATE } }, first: 9) {
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

export async function getFeaturedTakeActions(id: string, idType: PageIdType = PageIdType.Uri): Promise<Page> {
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
    `
    query getAllTakeActions {
      takeActions(first: 1000) {
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
  return data.takeActions && data.takeActions.edges ? data.takeActions.edges.map(x => x.node as TakeAction) : []
}

const TakeActionGQLQuerySections = {
  featuredTakeAction: `
    featuredTakeActionsLanding {
      ... on TakeAction {
        databaseId
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

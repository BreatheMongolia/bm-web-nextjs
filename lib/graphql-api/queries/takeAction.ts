import { fetchAPI } from 'lib/graphql-api/api'
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
        }
      }
    `,
    {
      variables: { id },
    },
  )
  return data.takeActions.edges[0].node || {}
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

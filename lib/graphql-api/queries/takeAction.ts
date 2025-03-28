import { fetchAPI } from 'lib/graphql-api/api'
import { TakeAction, TakeActionIdType } from 'graphql/generated'

export async function getTakeActionsFeedback(
  id: string,
  idType: TakeActionIdType = TakeActionIdType.DatabaseId,
): Promise<TakeAction> {
  const data = await fetchAPI(
    `query GetTakeActionFeedback($id: ID!, $idType: TakeActionIdType!) {
      takeAction(id: $id,idType: $idType) {
          ${TakeActionGQLQuerySections.takeActionFeedback}
        }
      }
    `,
    {
      variables: { id, idType },
    },
  )

  return data.takeAction?.customFields?.userFeedbacks || []
}

export async function getTakeActionsDetail(
  id: string,
  idType: TakeActionIdType = TakeActionIdType.Slug,
): Promise<TakeAction> {
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
        nodes {
          ${TakeActionGQLQuerySections.takeAction}
          }
        }
      }
    `,
  )
  return data.takeActions?.edges || []
}

export async function getTakeActionText() {
  const data = await fetchAPI(
    `query getTakeActionTexts {
      takeActionSettings {
        takeActionTexts {
          waysToGive {
            title
            url
            }
          waysToGiveMn {
            title
            url
            }
          whatYouCanDo
          whatYouCanDoMn
          whatYouCanDoText
          whatYouCanDoTextMn
          donationTitleMn
          donationTitle
          donationTextMn
          donationText
          disclaimerTextMn
          disclaimerText
          }
        }
      }
    `,
  )

  return data.takeActionSettings?.takeActionTexts || []
}

export async function getFeaturedTakeActions(
  id: string,
  idType: TakeActionIdType = TakeActionIdType.Uri,
): Promise<TakeAction> {
  const data = await fetchAPI(
    `query page($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
              homePage {
                  ${TakeActionGQLQuerySections.featuredTakeAction}
              }
          }
      }
    `,
    {
      variables: { id, idType },
    },
  )
  return data.page?.homePage || []
}

export async function getTakeActionLandingPageSettings(): Promise<any> {
  const data = await fetchAPI(
    `query getTakeActionLandingPageSettings {
      takeActionSettings {
        takeActionTexts {
          landingPage {
            description
            descriptionMn
            title
            titleMn
            landingPageImage {
              node {
                mediaItemUrl
              }
            }
            landingPageImageMn {
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
  return data.takeActionSettings.takeActionTexts?.landingPage || []
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
        nodes {
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
              }
            }
          }
        }
      }
      bannerTextLeft
      bannerTextLeftMn
      bannerTextRight {
        categoryText
        categoryTextMn
      }
      takeActionsBanner {
        node {
          mediaItemUrl
        }
      }
      takeActionsBannerMn {
        node {
          mediaItemUrl
        }
      }
  `,
  takeAction: `
      databaseId
      slug
      date
      dateGmt
      takeActionCustomFields {
        titleMn
        title
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
  takeActionFeedback: `customFields {
      userFeedbacks {
        value
      }
    }`,
  takeActionDetail: `
    databaseId
    dateGmt
    totalPledges
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    takeActionCustomFields {
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
    }`,
}

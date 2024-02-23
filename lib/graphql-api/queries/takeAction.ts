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

export async function getTakeActionText() {
  const data = await fetchAPI(
    `query getTakeActionTexts {
      takeActionSettings {
        TakeActionTexts {
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

  return data.takeActionSettings?.TakeActionTexts || []
}

export async function getFeaturedTakeActions(
  id: string,
  idType: TakeActionIdType = TakeActionIdType.Uri,
): Promise<TakeAction> {
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
  return data.page?.customFields || []
}

export async function getTakeActionLandingPageSettings(): Promise<any> {
  const data = await fetchAPI(
    `query getTakeActionLandingPageSettings {
      takeActionSettings {
        TakeActionTexts {
          landingPage {
            description
            descriptionMn
            title
            titleMn
            landingPageImage {
              mediaItemUrl
            }
            landingPageImageMn {
              mediaItemUrl
              }
            }
          }
        }
      }
    `,
  )
  return data.takeActionSettings.TakeActionTexts?.landingPage || []
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
        slug
        dateGmt
        customFields {
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
        }
        featuredImage {
          node {
            mediaItemUrl
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
      mediaItemUrl
    }
    takeActionsBannerMn {
      mediaItemUrl
    }
  `,
  takeAction: `
      databaseId
      slug
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

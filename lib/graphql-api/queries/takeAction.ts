import { fetchAPI } from 'lib/graphql-api/api'
import { TakeAction, TakeActionIdType } from 'graphql/generated'

export async function getTakeActionsPage(id: string, idType: TakeActionIdType = TakeActionIdType.Uri): Promise<TakeAction> {
  const data = await fetchAPI(
    `
      query takeAction($id: ID!, $idType: TakeActionIdType!) {
          takeAction(id: $id, idType: $idType) {
              title
              dateGmt
              customFields {
                  ${TakeActionGQLQuerySections.takeActionPosts}
              }
          }
      }
    `,
    {
      variables: { id, idType },
    },
  )
  return data.takeAction
}
const TakeActionGQLQuerySections = {
  takeActionPosts: `
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
    `,
}
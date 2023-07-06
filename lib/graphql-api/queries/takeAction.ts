import { fetchAPI } from 'lib/graphql-api/api'
import { Page, PageIdType } from 'graphql/generated'

export async function getTakeActionsPage(id: string, idType: PageIdType = PageIdType.Uri): Promise<Page> {
  const data = await fetchAPI(
    `
      query page($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
              title
              dateGmt
              customFields {
                  ${TakeActionGQLQuerySections.takeAction}
              }
              totalPledges
          }
      }
    `,
    {
      variables: { id, idType },
    },
  )
  return data.page
}
const TakeActionGQLQuerySections = {
  takeAction: `
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
    `,
}

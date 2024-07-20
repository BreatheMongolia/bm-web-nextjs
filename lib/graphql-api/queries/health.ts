import { fetchAPI } from 'lib/graphql-api/api'

export async function getHealthPage() {
  const data = await fetchAPI(
    `
      query GetHealthPageSettings {
        healthPageSettings {
          healthPage {
            body
            bodyMn
            title
            titleMn
            healthSocialMediaShare {
              description
              descriptionMn
              image {
                mediaItemUrl
              }
              imageMn {
                mediaItemUrl
              }
              title
              titleMn
            }
          }
        }
      }
    `
  )

  return data.healthPageSettings.healthPage || []
}
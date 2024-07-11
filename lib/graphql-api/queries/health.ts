import { fetchAPI } from 'lib/graphql-api/api'

export async function getHealthPage() {
  const data = await fetchAPI(
    `
    `
  )

  return data.page
}
const API_URL = process.env.WORDPRESS_API_URL

export async function fetchAPI(query = '', { variables, apiUrl }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // TODO: Change API_URL
  // WPGraphQL Plugin must be enabled
  const res = await fetch(apiUrl ?? API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

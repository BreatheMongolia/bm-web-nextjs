import { fetchAPI } from 'lib/graphql-api/api'

export async function getStories() {
    const data = await fetchAPI(
        `query getStories {
            stories(where: { orderby: { order: DESC, field: DATE } }, first: 100) {
                edges {
                    node {
                        id
                        storyCustomFields {
                            title
                            titleMn
                            description
                            descriptionMn
                        }
                    }
                }
            }
        }`,
        {},
    )
    return data?.stories?.edges || []
}

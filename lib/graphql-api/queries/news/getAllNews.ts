import { gql } from '@apollo/client'

export const newsCategoryFields = gql`
  fragment NewsCategoryFields on News {
    categoryCustomFields {
      name
      nameMn
      fieldGroupName
    }
    categoryId
    id
    slug
  }
`

export const GET_ALL_NEWS = gql`
  query getAllNews {
    newses(first: 500) {
      edges {
        node {
          databaseId
          dateGmt
          customFields {
            titleMn
            title
            sourceLink
            sourceName
            sourceNameMn
            sourceLanguage
            newsLandingPageFeatured
            newsContentType
            featuredImage {
              image {
                mediaDetails {
                  sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                    sourceUrl
                    name
                  }
                }
              }
              imageMn {
                mediaDetails {
                  sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                    sourceUrl
                    name
                  }
                }
              }
              caption
              captionMn
            }
          }
          categories {
            nodes {
              ...NewsCategoryFields
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              mediaDetails {
                sizes(include: [MEDIUM, MEDIUM_LARGE]) {
                  name
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`
export const GET_NEWS_CATEGORIES = gql`
  query getCategory($categoriesId: [ID]) {
    categories(where: { exclude: [199, 208], include: $categoriesId }) {
      edges {
        node {
          ...NewsCategoryFields
        }
      }
    }
  }
`

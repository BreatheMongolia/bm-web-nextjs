import { fetchAPI } from 'lib/graphql-api/api'
import { Page, PageIdType, MediaItemSizeEnum } from 'graphql/generated'
import { RecommendationType } from 'lib/air-pollution-map/types'

const HomePageGQLQuerySections = {
  banner: `
        # home page banner
        bannerTextLeft
        bannerTextLeftMn
        bannerTextRight {
            categoryText
            categoryTextMn
        }
        banners {
            bannerImageUrl
            bannerImage {
              node {
                  id
                  mediaItemUrl
                  dateGmt
                  mediaDetails {
                      sizes(include: ${MediaItemSizeEnum['1536X1536']}) {
                          height
                          width
                          sourceUrl
                      }
                  }
              }
            }
        }
    `,
  ourPartners: `
        # partner logos
        partnersLogosTitle
        partnersLogosTitleMn
        partnersLogos {
            partnersLogosUrls
            partnersLogosImage {
              node {
                  databaseId
                  mediaItemUrl
                  dateGmt
              } 
            }
        }
    `,
  featuredNews: `
    # featured news
    featuredNews {
        nodes {
          ... on News {
            databaseId
            desiredSlug
            slug
            dateGmt
            newsCustomFields {
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
                  node {
                    mediaDetails {
                      sizes(include: MEDIUM_LARGE) {
                        name
                        sourceUrl
                      }
                    }
                  }
                }
                imageMn {
                  node {
                    mediaDetails {
                      sizes(include: MEDIUM_LARGE) {
                        sourceUrl
                        name
                      }
                    }
                  }
                }
              }
            }
            categories {
              nodes {
                categoryCustomFields {
                  name
                  nameMn
                }
              }
            }
          }
        }
      }
    `,
  featuredTakeActions: `
    # featured take actions
    featuredTakeActions {
        nodes {
          ... on TakeAction {
            databaseId
            slug
            dateGmt
            featuredImage {
              node {
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
            takeActionCustomFields {
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
              title
              titleMn
            }
          }
        }
      }
    `,
  featuredPolicies: `
    # featured policies
    policySection {
        policyDescriptionEn
        policyDescriptionMn
        featuredPolicies {
          nodes {
            ... on Policy {
              databaseId
              slug
              dateGmt
              policyPageCustomFields {
                name
                nameMn
                summary
                summaryMn
                title
                titleMn
              }
              topics {
                nodes {
                  slug
                  topicCustomFields {
                    name
                    nameMn
                  }
                }
              }
              documentTypes {
                nodes {
                  slug
                  documentTypeCustomFields {
                    name
                    nameMn
                  }
                }
              }
              policyStatuses {
                nodes {
                  slug
                  policyStatusCustomFields {
                    name
                    nameMn
                  }
                }
              }
            }
          }
        }
        policyImageEn {
          cursor
          node {
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
        policyImageMn {
          cursor
          node {
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
      }
    `,
  healthSection: `
    # health section
    healthSection{
        healthDescriptionEn
        healthDescriptionMn
        healthImageEn {
          cursor
          node {
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
        healthImageMn {
          cursor
          node {
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
      }
  `,
  joinBm: `
    # join bm
    joinBreatheMongoliaTitle
      joinBreatheMongoliaTitleMn
      joinBreatheMongoliaDescription
      joinBreatheMongoliaDescriptionMn
      joinBreatheMongoliaImageSlider {
        sliderImageLink
        sliderImage {
          node {
            databaseId
            mediaItemUrl
          }
        }
      }
      countriesInfoText {
        customTextMn
        customText
        infoIcon {
          node {
            databaseId
            mediaItemUrl
          }
        }
      }
    `,
  ourWork: `
    # campaign
    campaignAndOurWorkTitle
    campaignAndOurWorkTitleMn
    campaignAndOurWorkSlider {
      campaignCategoryText
      campaignCategoryTextMn
      campaignCatgeoryUrl
      campaignTitle
      campaignTitleMn
      campaignDescription
      campaignDescriptionMn
      campaignDate
      volunteerImage {
        node {
          id
          mediaItemUrl
          mediaDetails {
            sizes(include: MEDIUM_LARGE) {
              height
              width
              sourceUrl
            }
          }
        }
      }
    }
    `,
  map: `
    # map
    mapTitle
    mapTitleMn
    mapDescription
    mapDescriptionMn
    `,
}

export async function getHomePage(id: string, idType: PageIdType = PageIdType.Uri): Promise<Page> {
  const data = await fetchAPI(
    `
        query page($id: ID!, $idType: PageIdType!) {
            page(id: $id, idType: $idType) {
                title
                dateGmt
                homePage {
                    ${HomePageGQLQuerySections.banner}
                    ${HomePageGQLQuerySections.ourPartners}
                    ${HomePageGQLQuerySections.featuredNews}
                    ${HomePageGQLQuerySections.joinBm}
                    ${HomePageGQLQuerySections.ourWork}
                    ${HomePageGQLQuerySections.featuredTakeActions}
                    ${HomePageGQLQuerySections.map}
                    ${HomePageGQLQuerySections.featuredPolicies}
                    ${HomePageGQLQuerySections.healthSection}
                }
            }
        }
        `,
    {
      variables: { id, idType },
    },
  )

  return data.page
}

export async function getBannerText(): Promise<Page> {
  const data = await fetchAPI(
    `query homeBanner {
        page(id: "/", idType: URI) {
          homePage {
            bannerTextLeft
            bannerTextLeftMn
            bannerTextRight {
              categoryText
              categoryTextMn
            }
          }
        }
      }`,
  )

  return data.page.homePage
}

export async function getVolunteers(): Promise<Page> {
  const data = await fetchAPI(
    `query volunteerPositions {
        volunteerPositions(first: 5) {
          nodes {
            content
            volunteerCustomFields {
              link {
                title
                url
                target
              }
              position
              positionMn
            }
            databaseId
            date
            title
          }
        }
      }
        `,
    {},
  )

  return data.volunteerPositions.nodes
}

export async function getHomeLandingPageSettings(): Promise<any> {
  const data = await fetchAPI(
    `query getHomeLandingPageSettings {
      homePageSettings {
        homePage {
          socialMediaShare {
            description
            descriptionMn
            title
            titleMn
            image {
              node {
                mediaItemUrl
              }
            }
            imageMn {
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
  return data.homePageSettings.homePage?.socialMediaShare || []
}

export async function getRecommendationSettings(): Promise<RecommendationType> {
  const data = await fetchAPI(
    `query GetRecommendations {
      recommendedActionsSettings {
        mapRecommendations {
          recommendations {
            airQuality
            sensorType
            description
            descriptionMn
            advices {
              icon {
                node {
                  mediaItemUrl
                }
              }
              comment
              commentMn
              takeAction {
                nodes {
                  ... on TakeAction {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  )
  return data.recommendedActionsSettings?.mapRecommendations.recommendations || []
}

export async function getProjectUrls(): Promise<any> {
  const data = await fetchAPI(
    `query getProjectUrls {
      homePageSettings {
        homePage {
          projects {
            title
            titleMn
            url
            }
          }
        }
      }
    `,
  )
  return data.homePageSettings.homePage?.projects || []
}

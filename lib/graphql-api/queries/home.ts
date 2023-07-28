import { fetchAPI } from 'lib/graphql-api/api'
import { Page, PageIdType, MediaItemSizeEnum } from 'graphql/generated'

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
    `,
  ourPartners: `
        # partner logos
        partnersLogosTitle
        partnersLogosTitleMn
        partnersLogos {
            partnersLogosUrls
            partnersLogosImage {
                databaseId
                mediaItemUrl
                dateGmt
            }
        }
    `,
  featuredNews: `
    # featured news
    featuredNews {
        ... on News {
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
                            sizes(include: MEDIUM_LARGE) {
                            name
                            sourceUrl
                            }
                        }
                    }
                    imageMn {
                        mediaDetails {
                            sizes(include: MEDIUM_LARGE) {
                                sourceUrl
                                name
                            }
                        }
                    }
                }
            }
            featuredImage {
                node {
                    id
                    mediaDetails {
                        sizes(include: MEDIUM_LARGE) {
                            sourceUrl
                            name
                        }
                    }
                }
            }
            categories {
                nodes {
                    categoryCustomFields {
                        name
                        nameMn
                        fieldGroupName
                    }
                }
            }
        }
    }
    `,
  featuredTakeActions: `
    # featured take actions
    featuredTakeActions {
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
            customFields {
                typeOfAction {
                    customFields {
                        name
                        nameMn
                    }
                }
            title
            titleMn
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
            databaseId
            mediaItemUrl
        }
    }
    countriesInfoText {
        customTextMn
        customText
        infoIcon {
            databaseId
            mediaItemUrl
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
                customFields {
                    ${HomePageGQLQuerySections.banner}
                    ${HomePageGQLQuerySections.ourPartners}
                    ${HomePageGQLQuerySections.featuredNews}
                    ${HomePageGQLQuerySections.joinBm}
                    ${HomePageGQLQuerySections.ourWork}
                    ${HomePageGQLQuerySections.featuredTakeActions}
                    ${HomePageGQLQuerySections.map}
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

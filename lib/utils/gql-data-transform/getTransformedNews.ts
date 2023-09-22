import { News } from 'graphql/generated'
import { getTranslated } from '../getTranslated'
import { getImage } from '../getImage'

// util function
export function getTransformedNews(news: News, language: 'en' | 'mn') {
  return {
    id: news.databaseId,
    desiredSlug: news.desiredSlug,
    slug: news.slug,
    sourceLink: news.customFields?.sourceLink,
    dateGmt: news.dateGmt,
    title:
      getTranslated(news.customFields?.title, news.customFields?.titleMn, language) !== null
        ? getTranslated(news.customFields?.title, news.customFields?.titleMn, language)
        : '',
    sourceName:
      getTranslated(news.customFields?.sourceName, news.customFields?.sourceNameMn, language) !== null
        ? getTranslated(news.customFields?.sourceName, news.customFields?.sourceNameMn, language)
        : '',
    sourceLanguage: news.customFields?.sourceLanguage,
    homePageFeatured: news.customFields?.homePageFeatured,
    categories: news?.categories?.nodes?.map((cat: any) => {
      return {
        name:
          getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, language) !== null
            ? getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, language)
            : '',
      }
    }),
    newsContentType: news.customFields?.newsContentType,
    featuredImageSmall: getImage(
      news.customFields?.featuredImage.image?.mediaDetails,
      news.customFields?.featuredImage.imageMn?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'medium_large',
    ),
    featuredImageBig: getImage(
      news.customFields?.featuredImage.image?.mediaDetails,
      news.customFields?.featuredImage.imageMn?.mediaDetails,
      news.featuredImage?.node?.mediaDetails,
      'medium_large',
    ),
  }
}

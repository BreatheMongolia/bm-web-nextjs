import { News } from 'graphql/generated'
import { getTranslated } from '../getTranslated'
import { getImage } from '../getImage'

// util function
export function getTransformedNews(news: News, language: 'en' | 'mn') {
  return {
    id: news.databaseId,
    desiredSlug: news.desiredSlug,
    slug: news.slug,
    sourceLink: news.newsCustomFields?.sourceLink,
    dateGmt: news.dateGmt,
    title:
      getTranslated(news.newsCustomFields?.title, news.newsCustomFields?.titleMn, language) !== null
        ? getTranslated(news.newsCustomFields?.title, news.newsCustomFields?.titleMn, language)
        : '',
    sourceName:
      getTranslated(news.newsCustomFields?.sourceName, news.newsCustomFields?.sourceNameMn, language) !== null
        ? getTranslated(news.newsCustomFields?.sourceName, news.newsCustomFields?.sourceNameMn, language)
        : '',
    sourceLanguage: news.newsCustomFields?.sourceLanguage,
    categories: news?.categories?.nodes?.map((cat: any) => {
      return {
        name:
          getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, language) !== null
            ? getTranslated(cat.categoryCustomFields?.name, cat.categoryCustomFields?.nameMn, language)
            : '',
      }
    }),
    newsContentType: news.newsCustomFields?.newsContentType,
    featuredImageSmall: getImage(
      news.newsCustomFields?.featuredImage.image?.node?.mediaDetails,
      news.newsCustomFields?.featuredImage.imageMn?.node?.mediaDetails,
      null,
      'medium',
    ),
    featuredImageBig:
      getImage(
        news.newsCustomFields?.featuredImage.image?.node?.mediaDetails,
        news.newsCustomFields?.featuredImage.imageMn?.node?.mediaDetails,
        null,
        'medium_large',
      )
  }
}

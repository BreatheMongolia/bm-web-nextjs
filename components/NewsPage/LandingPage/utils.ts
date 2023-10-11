import { News, Page } from 'graphql/generated'
import { getImage } from 'lib/utils/getImage'
import { getTranslated } from 'lib/utils/getTranslated'

// const getallNewsFeatured = (page: Page): News[] => {
//   const featuredNewsNode = page?.customFields?.featuredNews || []
//   if (featuredNewsNode?.length === 0) {
//     return []
//   }
//   const allNews: News[] = []
//   featuredNewsNode.map((news) => {
//     allNews.push({
//       id: news.databaseId,
//       sourceLink: news.customFields.sourceLink,
//       title:
//         getTranslated(news.customFields.title, news.customFields.titleMn) !== null
//           ? getTranslated(news.customFields.title, news.customFields.titleMn)
//           : '',
//       sourceName:
//         getTranslated(news.customFields.sourceName, news.customFields.sourceNameMn) !== null
//           ? getTranslated(news.customFields.sourceName, news.customFields.sourceNameMn)
//           : '',
//       sourceLanguage: news.customFields.sourceLanguage,
//       newsLandingPageFeatured: news.customFields.newsLandingPageFeatured,
//       categories: news?.categories?.nodes.map((cat: any) => {
//         return {
//           id: cat.categoryId,
//           idString: cat.id,
//           name:
//             getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn) !== null
//               ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn)
//               : '',
//         }
//       }),
//       newsContentType: news.customFields.newsContentType,
//       featuredImageSmall: getImage(
//         news.customFields.featuredImage.image?.mediaDetails,
//         news.customFields.featuredImage.imageMn?.mediaDetails,
//         news.featuredImage?.node?.mediaDetails,
//         'medium',
//       ),
//       featuredImageBig: getImage(
//         news.customFields.featuredImage.image?.mediaDetails,
//         news.customFields.featuredImage.imageMn?.mediaDetails,
//         news.featuredImage?.node?.mediaDetails,
//         'medium_large',
//       ),
//     })
//   })
//   return allNews
// }

//   const getCategory = (data: Category[]) => {
//     if (data.length === 0) {
//       return []
//     }
//     const allCategory: Category[] = []
//     data.map((cat: any) => {
//       allCategory.push({
//         id: cat.node.categoryId,
//         idString: cat.id,
//         name: cat.node.categoryCustomFields.name,
//         nameMn: cat.node.categoryCustomFields.nameMn
//       })
//     })
//     return allCategory
//   }

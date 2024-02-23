import Head from 'next/head'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SearchBar from 'components/SearchPage/SearchBar'
import News from 'components/SearchPage/News'
import TakeActions from 'components/SearchPage/TakeActions'
import Teams from 'components/SearchPage/Teams'
import { GetServerSideProps } from 'next'
import { getSearchData } from 'lib/graphql-api/queries/search'
import { useRouter } from 'next/router'
import { getTranslated } from 'lib/utils/getTranslated'
import { getImage } from 'lib/utils/getImage'
import { getNewsBannerImages } from 'lib/graphql-api/queries/news'
import { getBannerText } from 'lib/graphql-api/queries/home'
import { getBannerTextRight } from 'lib/utils/getBannerTextRight'

const SearchPage = ({ data, locale, banner }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { s } = router.query
  const searchValue: string = s?.toString() ?? ''

  const pageBanner =
    i18n.language === 'en'
      ? {
        imageUrl: banner.bannerImage.mediaItemUrl,
        leftText: banner.bannerTextLeft,
        rightText: getBannerTextRight(banner.bannerTextRight, 'categoryText'),
      }
      : {
        imageUrl: banner.bannerImageMn.mediaItemUrl,
        leftText: banner.bannerTextLeftMn,
        rightText: getBannerTextRight(banner.bannerTextRight, 'categoryTextMn'),
      }

  if (searchValue === '') {
    return (
      <div>
        <Head>
          <title>{`Search Results - Breathe Mongolia`}</title>
        </Head>
        <div>
          <PageImageBanner
            imageUrls={[{ mediaItemUrl: pageBanner.imageUrl }]}
            bottomText={{
              left: pageBanner.leftText,
              right: pageBanner.rightText,
            }}
          />
          <div className="search-page-container">
            <SearchBar value={searchValue} count={0} />
          </div>
        </div>
      </div>
    )
  }

  function getLatestNews(data: any[]) {
    if (data.length === 0) {
      return []
    }
    const newsData: any[] = []

    data.map((news: any) => {
      console.log('news', news)
      newsData.push({
        id: news.node.databaseId,
        slug: news.node.slug,
        sourceLink: news.node.customFields.sourceLink,
        title:
          getTranslated(news.node.customFields.title, news.node.customFields.titleMn) !== null
            ? getTranslated(news.node.customFields.title, news.node.customFields.titleMn)
            : '',
        sourceName:
          getTranslated(news.node.customFields.sourceName, news.node.customFields.sourceNameMn) !== null
            ? getTranslated(news.node.customFields.sourceName, news.node.customFields.sourceNameMn)
            : '',
        body: getTranslated(news.node.customFields.body, news.node.customFields.bodyMn),
        sourceLanguage: news.node.customFields.sourceLanguage,
        newsLandingPageFeatured: news.node.customFields.newsLandingPageFeatured,
        categories: news?.node?.categories?.nodes.map((cat: any) => {
          return {
            name:
              getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn) !== null
                ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn)
                : '',
          }
        }),
        newsContentType: news.node.customFields.newsContentType,
        featuredImageSmall: getImage(
          news.node.customFields.featuredImage.image?.mediaDetails,
          news.node.customFields.featuredImage.imageMn?.mediaDetails,
          news.node.featuredImage?.node?.mediaDetails,
          'medium',
        ),
        featuredImageBig: getImage(
          news.node.customFields.featuredImage.image?.mediaDetails,
          news.node.customFields.featuredImage.imageMn?.mediaDetails,
          news.node.featuredImage?.node?.mediaDetails,
          'medium_large',
        ),
        featuredImage: news.node.featuredImage?.node.mediaItemUrl,
      })
    })
    return newsData
  }

  const getTransformedTakeActions = (data: any[]) => {
    if (data.length === 0) {
      return []
    }
    const takeActions: any[] = []

    data.map((takeAction: any) =>
      takeActions.push({
        id: takeAction.node.databaseId,
        slug: takeAction.node.slug,
        date: takeAction.node.dateGmt,
        title:
          getTranslated(takeAction.node.customFields.title, takeAction.node.customFields.titleMn) !== null
            ? getTranslated(takeAction.node.customFields.title, takeAction.node.customFields.titleMn, locale)
            : '',
        excerpt:
          getTranslated(takeAction.node.customFields.excerpt, takeAction.node.customFields.excerptMn) !== null
            ? getTranslated(takeAction.node.customFields.excerpt, takeAction.node.customFields.excerptMn, locale)
            : '',
        additionalResources:
          takeAction.node.customFields.additionalResources != null
            ? takeAction.node.customFields.additionalResources.map(
              (resource: { title: string; titleMn: string; url: string; urlMn: string }) => {
                return {
                  title: getTranslated(resource.title, resource.titleMn),
                  url: getTranslated(resource.url, resource.urlMn, locale),
                }
              },
            )
            : [],
        pledgeContent: getTranslated(
          takeAction.node.customFields.pledgeContent,
          takeAction.node.customFields.pledgeContentMn,
          locale,
        ),
        introductionText: getTranslated(
          takeAction.node.customFields.introductionText,
          takeAction.node.customFields.introductionTextMn,
          locale,
        ),
        listOfPhotos: takeAction.node.customFields.listOfPhotos,
        listOfSubSections: takeAction.node.customFields.listOfSubSections,
        listOfVideos: takeAction.node.customFields.listOfVideos,
        typeOfAction: takeAction.node.customFields.typeOfAction?.map(
          (type: { customFields: { name: string; nameMn: string } }) =>
            getTranslated(type.customFields.name, type.customFields.nameMn, locale),
        ),
        featuredImage: takeAction.node.featuredImage?.node.mediaItemUrl,
      }),
    )
    return takeActions
  }

  function getTransformedPeople(PplData: string | any[]) {
    const people = []

    for (let i = 0; i < PplData.length; i++) {
      people.push({
        name: getTranslated(PplData[i].node.title, PplData[i].node.customFields.nameMn, locale),
        imgSrc: PplData[i].node.featuredImage.node.mediaItemUrl,
        role: getTranslated(PplData[i].node.customFields.role, PplData[i].node.customFields.roleMn, locale),
        description: getTranslated(
          PplData[i].node.customFields.description,
          PplData[i].node.customFields.descriptionMn,
          locale,
        ),
        linkedin: PplData[i].node.customFields.linkedin,
      })
    }
    return people
  }

  const newses: any[] = data ? getLatestNews(data.newses.edges) : []
  const takeActions: any[] = data ? getTransformedTakeActions(data.takeActions.edges) : []
  const people: any[] = data ? getTransformedPeople(data.people.edges) : []

  const filteredNews =
    searchValue === ''
      ? newses
      : newses.filter(
        item =>
          item.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          item.body?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )

  const newFilteredTakeActions =
    searchValue === ''
      ? takeActions
      : takeActions.filter(
        takeAction =>
          takeAction.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          takeAction.pledgeContent?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          takeAction.excerpt?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )

  const filteredPeople =
    searchValue === ''
      ? people
      : people.filter(
        item =>
          item.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          item.description?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )

  const count = filteredNews.length + filteredPeople.length + newFilteredTakeActions.length

  console.log(filteredNews)

  return (
    <div>
      <Head>
        <title>{`Search Results - Breathe Mongolia`}</title>
      </Head>
      <div>
        <PageImageBanner
          imageUrls={[{ mediaItemUrl: pageBanner.imageUrl }]}
          bottomText={{
            left: pageBanner.leftText,
            right: pageBanner.rightText,
          }}
        />
        <div className="search-page-container">
          <SearchBar value={searchValue} count={count} />

          <News data={filteredNews} />
          <TakeActions takeActions={newFilteredTakeActions} />
          <Teams people={filteredPeople} />
        </div>
      </div>
    </div>
  )
}

export default SearchPage

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  const data: any = await getSearchData()
  const bannerImageData = await getNewsBannerImages('/news')
  const bannerTextData = await getBannerText()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['nav', 'footer', 'search', 'common'])),
      locale,
      data,
      banner: {
        ...bannerImageData.news_general_fields.banner,
        ...bannerTextData,
      },
    },
  }
}

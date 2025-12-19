import Head from 'next/head'
import { PageImageBanner } from 'components/generic/PageImageBanner'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SearchBar from 'components/SearchPage/SearchBar'
import News from 'components/SearchPage/News'
import TakeActions from 'components/SearchPage/TakeActions'
import Teams from 'components/SearchPage/Teams'
import Policies from 'components/SearchPage/Policies'
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
        imageUrl: banner.bannerimage?.node.mediaItemUrl,
        leftText: banner.bannerTextLeft,
        rightText: getBannerTextRight(banner.bannerTextRight, 'categoryText'),
      }
      : {
        imageUrl: banner.bannerimageMn?.node.mediaItemUrl,
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
      newsData.push({
        id: news.node.databaseId,
        slug: news.node.slug,
        sourceLink: news.node.newsCustomFields.sourceLink,
        title:
          getTranslated(news.node.newsCustomFields.title, news.node.newsCustomFields.titleMn) !== null
            ? getTranslated(news.node.newsCustomFields.title, news.node.newsCustomFields.titleMn)
            : '',
        sourceName:
          getTranslated(news.node.newsCustomFields.sourceName, news.node.newsCustomFields.sourceNameMn) !== null
            ? getTranslated(news.node.newsCustomFields.sourceName, news.node.newsCustomFields.sourceNameMn)
            : '',
        body: getTranslated(news.node.newsCustomFields.body, news.node.newsCustomFields.bodyMn),
        sourceLanguage: news.node.newsCustomFields.sourceLanguage,
        newsLandingPageFeatured: news.node.newsCustomFields.newsLandingPageFeatured,
        categories: news?.node?.categories?.nodes.map((cat: any) => {
          return {
            name:
              getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn) !== null
                ? getTranslated(cat.categoryCustomFields.name, cat.categoryCustomFields.nameMn)
                : '',
          }
        }),
        newsContentType: news.node.newsCustomFields.newsContentType,
        featuredImageSmall: getImage(
          news.node.newsCustomFields.featuredImage.image?.mediaDetails,
          news.node.newsCustomFields.featuredImage.imageMn?.mediaDetails,
          news.node.featuredImage?.node?.mediaDetails,
          'medium',
        ),
        featuredImageBig: getImage(
          news.node.newsCustomFields.featuredImage.image?.mediaDetails,
          news.node.newsCustomFields.featuredImage.imageMn?.mediaDetails,
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
          getTranslated(takeAction.node.takeActionCustomFields.title, takeAction.node.takeActionCustomFields.titleMn) !== null
            ? getTranslated(takeAction.node.takeActionCustomFields.title, takeAction.node.takeActionCustomFields.titleMn, locale)
            : '',
        excerpt:
          getTranslated(takeAction.node.takeActionCustomFields.excerpt, takeAction.node.takeActionCustomFields.excerptMn) !== null
            ? getTranslated(takeAction.node.takeActionCustomFields.excerpt, takeAction.node.takeActionCustomFields.excerptMn, locale)
            : '',
        additionalResources:
          takeAction.node.takeActionCustomFields.additionalResources != null
            ? takeAction.node.takeActionCustomFields.additionalResources.map(
              (resource: { title: string; titleMn: string; url: string; urlMn: string }) => {
                return {
                  title: getTranslated(resource.title, resource.titleMn),
                  url: getTranslated(resource.url, resource.urlMn, locale),
                }
              },
            )
            : [],
        pledgeContent: getTranslated(
          takeAction.node.takeActionCustomFields.pledgeContent,
          takeAction.node.takeActionCustomFields.pledgeContentMn,
          locale,
        ),
        introductionText: getTranslated(
          takeAction.node.takeActionCustomFields.introductionText,
          takeAction.node.takeActionCustomFields.introductionTextMn,
          locale,
        ),
        listOfPhotos: takeAction.node.takeActionCustomFields.listOfPhotos,
        listOfSubSections: takeAction.node.takeActionCustomFields.listOfSubSections,
        listOfVideos: takeAction.node.takeActionCustomFields.listOfVideos,
        typeOfAction: takeAction.node.takeActionCustomFields.typeOfAction?.nodes?.map(
          (type: { actionTypeCustomFields: { name: string; nameMn: string } }) =>
            getTranslated(type.actionTypeCustomFields.name, type.actionTypeCustomFields.nameMn, locale),
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
        name: getTranslated(PplData[i].node.title, PplData[i].node.personCustomFields.nameMn, locale),
        imgSrc: PplData[i].node.featuredImage.node.mediaItemUrl,
        role: getTranslated(PplData[i].node.personCustomFields.role, PplData[i].node.personCustomFields.roleMn, locale),
        description: getTranslated(
          PplData[i].node.personCustomFields.description,
          PplData[i].node.personCustomFields.descriptionMn,
          locale,
        ),
        linkedin: PplData[i].node.personCustomFields.linkedin,
      })
    }
    return people
  }

  function getTransformedPolicies(policyData: any[]) {
    if (policyData.length === 0) return []

    return policyData.map((policy: any) => ({
      databaseId: policy.node.databaseId,
      slug: policy.node.slug,
      dateGmt: policy.node.policyPageCustomFields.initiatedDate,
      policyPageCustomFields: {
        title: policy.node.policyPageCustomFields.title,
        titleMn: policy.node.policyPageCustomFields.titleMn,
      },
      topics: policy.node.topics,
      // Store all searchable text for filtering
      searchableText: {
        title: policy.node.policyPageCustomFields.title || '',
        titleMn: policy.node.policyPageCustomFields.titleMn || '',
        name: policy.node.policyPageCustomFields.name || '',
        nameMn: policy.node.policyPageCustomFields.nameMn || '',
        summary: policy.node.policyPageCustomFields.summary || '',
        summaryMn: policy.node.policyPageCustomFields.summaryMn || '',
        updates: policy.node.policyPageCustomFields.updates || '',
        updatesMn: policy.node.policyPageCustomFields.updatesMn || '',
        furtherReading: policy.node.policyPageCustomFields.furtherReading || '',
        furtherReadingMn: policy.node.policyPageCustomFields.furtherReadingMn || '',
      },
    }))
  }

  const newses: any[] = data ? getLatestNews(data.newses.edges) : []
  const takeActions: any[] = data ? getTransformedTakeActions(data.takeActions.edges) : []
  const people: any[] = data ? getTransformedPeople(data.persons.edges) : []
  const policies: any[] = data ? getTransformedPolicies(data.policies.edges) : []

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

  const filteredPolicies =
    searchValue === ''
      ? policies
      : policies.filter(policy =>
        Object.values(policy.searchableText).some((text: string) =>
          text?.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      )

  const count = filteredPolicies.length + filteredNews.length + filteredPeople.length + newFilteredTakeActions.length

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

          <Policies data={filteredPolicies} />
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
  try {
    const data: any = await getSearchData()
    const bannerImageData = await getNewsBannerImages('/news')
    const bannerTextData = await getBannerText()

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['nav', 'footer', 'search', 'common', 'policy'])),
        locale,
        data,
        banner: {
          ...bannerImageData.newsGeneralFields.banner,
          ...bannerTextData,
        },
      },
      revalidate: 60 * 5, // every 5 minutes
    }
  } catch (error) {
    console.error('Error generating search page:', error)
    return {
      notFound: true,
      revalidate: 60,
    }
  }
}

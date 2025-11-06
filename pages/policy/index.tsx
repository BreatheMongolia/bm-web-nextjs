import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getTranslated } from 'lib/utils/getTranslated'
import {
  getPolicies,
  getDocumentTypes,
  getPolicyStatus,
  getPolicyTopics,
  getPolicyLandingPageSettings,
} from 'lib/graphql-api/queries/policy'
import { H2 } from '@/components/generic/Typography'
import { NewsCarousel, TakeActionCarousel } from '@/components/HomePage'
import { PolicySection } from '@/components/PolicyPage/PolicySection'
import { useMediaQuery } from 'react-responsive'

const PolicyPage = ({
  policies,
  documentTypeOptions,
  policyStatusOptions,
  documentTopicOptions,
  title,
  description,
  socialShare,
  featuredNews,
  featuredTakeActions,
  locale,
}) => {
  const isMobile = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })

  return (
    <div id="policy">
      <Head>
        <title>{socialShare.title}</title>
        <meta name="description" content={socialShare.description} />
        <meta property="og:title" content={socialShare.title} />
        <meta property="og:image" content={socialShare.image} />
      </Head>
      <div className="lg:container px-4 w-full mx-auto flex flex-col gap-16 pt-5 md:pt-10">
        <div className="flex flex-col">
          <H2 title={title} />
          <h3 className="mb-5 font-semibold text-base sm:text-xl text-zinc-800">{description}</h3>
          <PolicySection
            policies={policies}
            documentTypeOptions={documentTypeOptions}
            policyStatusOptions={policyStatusOptions}
            documentTopicOptions={documentTopicOptions}
          />
        </div>
        <NewsCarousel featuredNews={featuredNews} />
        <TakeActionCarousel takeActionPosts={featuredTakeActions} locale={locale} />
      </div>
    </div>
  )
}

export default PolicyPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // fetch the data
  const policies = await getPolicies()
  const documentTypes = await getDocumentTypes()
  const policyStatuses = await getPolicyStatus()
  const topics = await getPolicyTopics()
  const data = await getPolicyLandingPageSettings()

  const documentTypeOptions = documentTypes.map(type => ({
    label: getTranslated(type.documentTypeCustomFields.name, type.documentTypeCustomFields.nameMn, locale),
    value: type.slug,
  }))

  const documentTopicOptions = topics.map(topic => ({
    label: getTranslated(topic.topicCustomFields.name, topic.topicCustomFields.nameMn, locale),
    value: topic.slug,
  }))

  const policyStatusOptions = policyStatuses.map(status => ({
    label: getTranslated(status.policyStatusCustomFields.name, status.policyStatusCustomFields.nameMn, locale),
    value: status.slug,
  }))

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'nav', 'footer', 'map', 'news', 'common', 'policy'])),
      policies: policies,
      documentTypeOptions: documentTypeOptions,
      policyStatusOptions: policyStatusOptions,
      documentTopicOptions: documentTopicOptions,
      locale,
      title: getTranslated(data.title, data.titleMn, locale),
      description: getTranslated(data.description, data.descriptionMn, locale),
      socialShare: data.policySocialMediaShare,
      featuredNews: data?.featuredNews?.nodes || [],
      featuredTakeActions: data?.featuredTakeActions?.nodes || [],
    },
    revalidate: 60 * 5, // every 5 minutes
  }
}

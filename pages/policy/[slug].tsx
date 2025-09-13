import { H2 } from '@/components/generic/Typography'
import { TakeActionCarousel } from '@/components/HomePage'
import { ShareButton } from '@/components/NewsPage/DetailPage/ShareButton'
import { ArrowLeftIcon, ArrowDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { TakeAction } from 'graphql/generated'
import { getPolicies, getPolicyDetails } from 'lib/graphql-api/queries/policy'
import { getTranslated } from 'lib/utils/getTranslated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { BackBtn } from '@/components/TakeActionPage'
import { RelatedPoliciesList, PolicyLoading, PolicyError } from '@/components/PolicyPage'
import { transformPolicy, translateList } from 'lib/utils/policy'

interface LocalizedContent {
  en: string
  mn: string
}

interface Policy {
  title: LocalizedContent
  description: LocalizedContent
  summary: LocalizedContent
  updates: LocalizedContent
  furtherReading: LocalizedContent
  dateApproved: string
  fileMn?: string
  fileEn?: string
  sourceUrl?: string
  topics: string[]
  documentTypes: string[]
  status: string[]
  recommendedActions: TakeAction[]
  relatedPolicies: RelatedPolicy[]
}

interface RelatedPolicy {
  databaseId: string
  dateGmt: string
  policyPageCustomFields: {
    title: string
    titleMn: string
  }
  topics?: {
    edges: Array<{ node: { name: string } }>
  }
}

interface PolicyPostPageProps {
  policy: Policy | null
  locale: string
  slug: string
  error?: string
}

export default function PolicyPostPage({ policy, locale, slug, error }: PolicyPostPageProps) {
  const router = useRouter()
  const { t } = useTranslation('policy')

  // Loading state
  if (router.isFallback) {
    return <PolicyLoading />
  }

  // Error state
  if (error || !policy) {
    return (
      <PolicyError 
        error={error} 
        onRetry={() => router.reload()}
      />
    )
  }


  const title = getTranslated(policy.title.en, policy.title.mn, locale)
  const description = getTranslated(policy.description.en, policy.description.mn, locale)
  const summary = getTranslated(policy.summary.en, policy.summary.mn, locale)
  const updates = getTranslated(policy.updates.en, policy.updates.mn, locale)
  const furtherReading = getTranslated(policy.furtherReading.en, policy.furtherReading.mn, locale)
  const topics = translateList(policy.topics || [], locale)
  const documentTypes = translateList(policy.documentTypes || [], locale)
  const status = translateList(policy.status || [], locale)
  const relatedPolicies = policy.relatedPolicies

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Link */}
      <Link href="/policy" className="flex items-center text-bm-blue hover:underline mb-4">
        <BackBtn title={t('backToPolicy')} href='/policy' />
      </Link>

      {/* Title and Share buttons */}
      <div className="mb-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <H2 title={title} />
          <div className="subSection">
            <ShareButton
              url={`https://breathemongolia.org/policy/${slug}`}
              title={title}
              bottom={false}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-1">
          <H2 title={title} />
          <div className="flex justify-end">
            <div className="subSection !pb-2 !pt-0">
              <ShareButton
                url={`https://breathemongolia.org/policy/${slug}`}
                title={title}
                bottom={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="mb-8">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          {/* Header Row */}
          <div className="bg-bm-blue text-white font-bold uppercase grid grid-cols-[repeat(5,minmax(0,1fr))] rounded-lg">
            <div className="py-3 px-4">{t('tableHeaders.name')}</div>
            <div className="py-3 px-4">{t('tableHeaders.type')}</div>
            <div className="py-3 px-4">{t('tableHeaders.topic')}</div>
            <div className="py-3 px-4">{t('tableHeaders.status')}</div>
            <div className="py-3 px-4">{t('tableHeaders.dateApproved')}</div>
          </div>

          {/* Data Row */}
          <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] py-6 text-sm">
            <div className="px-4">{description}</div>
            <div className="px-4">{documentTypes.join(', ') || '—'}</div>
            <div className="px-4">{topics.join(', ') || '—'}</div>
            <div className="px-4">{status.join(', ') || '—'}</div>
            <div className="px-4">{policy.dateApproved || '—'}</div>
          </div>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden bg-gray-50 rounded-lg p-4 space-y-4">
          {/* Metadata Items */}
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
            <span className="font-semibold text-gray-700">{t('tableHeaders.type')}:</span>
            <span className="text-gray-600">{documentTypes.join(', ') || '—'}</span>
            
            <span className="font-semibold text-gray-700">{t('tableHeaders.topic')}:</span>
            <span className="text-gray-600">{topics.join(', ') || '—'}</span>
            
            <span className="font-semibold text-gray-700">{t('tableHeaders.status')}:</span>
            <span className="text-gray-600">{status.join(', ') || '—'}</span>
            
            <span className="font-semibold text-gray-700">{t('tableHeaders.dateApproved')}:</span>
            <span className="text-gray-600">{policy.dateApproved || '—'}</span>
          </div>
        </div>
      </div>

      <div className="md:hidden border-b border-gray-500 my-3"></div>

      {/* Action Buttons */}
      <div className="my-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          {policy.sourceUrl && (
            <a
              href={policy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bm-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bm-blue/90"
            >
              {t('source')}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          )}
          {policy.fileMn && (
            <a
              href={policy.fileMn}
              download
              className="bg-bm-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bm-blue/90"
            >
              {t('downloadMn')}
              <ArrowDownIcon className="w-5 h-5" />
            </a>
          )}
          {policy.fileEn && (
            <a
              href={policy.fileEn}
              download
              className="bg-bm-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bm-blue/90"
            >
              {t('downloadEn')}
              <ArrowDownIcon className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {/* First Row - Source Button */}
          {policy.sourceUrl && (
            <a
              href={policy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-bm-blue text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-bm-blue/90"
            >
              {t('source')}
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          )}
          
          {/* Second Row - Download Buttons */}
          {(policy.fileMn || policy.fileEn) && (
            <div className="grid grid-cols-2 gap-3">
              {policy.fileMn && (
                <a
                  href={policy.fileMn}
                  download
                  className="bg-bm-blue text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-bm-blue/90"
                >
                  {t('downloadMn')}
                  <ArrowDownIcon className="w-5 h-5" />
                </a>
              )}
              {policy.fileEn && (
                <a
                  href={policy.fileEn}
                  download
                  className="bg-bm-blue text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-bm-blue/90"
                >
                  {t('downloadEn')}
                  <ArrowDownIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <H2 title={t('summaryTitle')} trailingLineColor="blue" className="!text-lg" />
      <div
        className="text-gray-700 leading-relaxed prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: summary }}
      />

      {/* Updates */}
      <H2 title={t('updatesTitle')} trailingLineColor="blue" className="!text-lg" />
      <div
        className="text-gray-700 leading-relaxed prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: updates }}
      />

      {/* Further Reading */}
      <H2 title={t('furtherReadingTitle')} trailingLineColor="blue" className="!text-lg" />
      <div
        className="text-bm-blue leading-relaxed policy-list-content mb-8"
        dangerouslySetInnerHTML={{ __html: furtherReading }}
      />

      {/* Related Policies */}
      {relatedPolicies && relatedPolicies.length > 0 && (
        <>
          <H2 title={t('relatedPoliciesTitle')} trailingLineColor="blue" className="!text-lg" />
          <RelatedPoliciesList policies={relatedPolicies} locale={locale} />
        </>
      )}

      <TakeActionCarousel takeActionPosts={policy.recommendedActions as TakeAction[]} locale={locale} />
    </div>
  )
}



export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const policies = await getPolicies()

  const paths = locales?.flatMap(locale =>
    policies.map(p => ({
      params: { slug: p.slug },
      locale,
    }))
  ) ?? []

  return {
    paths,
    fallback: true,
  }
}



export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  
  try {
    const policy = await getPolicyDetails(slug)

    if (!policy) {
      return { notFound: true }
    }

    const transformedPolicy = transformPolicy(policy);

    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'policy', 'nav', 'footer', 'home'])),
        policy: transformedPolicy,
        locale,
        slug
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching policy:', error)
    
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'policy', 'nav', 'footer', 'home'])),
        policy: null,
        locale,
        slug,
        error: 'Failed to load policy data. Please try again later.'
      },
      revalidate: 60,
    }
  }
}





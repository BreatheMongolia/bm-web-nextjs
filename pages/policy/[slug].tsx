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
import { tr } from 'date-fns/locale'

interface PolicyPostPageProps {
  policy: any,
  locale: string,
  slug: string
}

export default function PolicyPostPage({ policy, locale, slug }: PolicyPostPageProps) {
  const router = useRouter()
  const { t } = useTranslation('policy')

  if (router.isFallback) return <p>Loading...</p>

  console.log('policy in component', policy)

  const title = getTranslated(policy.title.en, policy.title.mn, locale)
  const description = getTranslated(policy.description.en, policy.description.mn, locale)
  const summary = getTranslated(policy.summary.en, policy.summary.mn, locale)
  const updates = getTranslated(policy.updates.en, policy.updates.mn, locale)
  const furtherReading = getTranslated(policy.furtherReading.en, policy.furtherReading.mn, locale)
  const topics = translateList(policy.topics || [], locale)
  const documentTypes = translateList(policy.documentTypes || [], locale)
  const status = translateList(policy.status || [], locale)
  const relatedPolicies = policy.relatedPolicies

  console.log('relatedPolicies', relatedPolicies)
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Link */}
      <Link href="/policy" className="flex items-center text-bm-blue hover:underline mb-4">
        <BackBtn title={t('backToPolicy')} />
      </Link>

      {/* Title and Share buttons */}
      <div className="flex justify-between items-center mb-8">
        <H2 title={title} />
        <div className="subSection">
          <ShareButton
            url={`https://breathemongolia.org/policy/${slug}`}
            title={title}
            bottom={false}
          />
        </div>
      </div>

      {/* Metadata Table */}
      <div className="mb-8">
        {/* Header Row */}
        <div className="bg-bm-blue text-white text-center font-bold uppercase grid grid-cols-[repeat(5,minmax(0,1fr))] rounded-lg">
          <div className="py-3 px-4">{t('tableHeaders.name')}</div>
          <div className="py-3 px-4">{t('tableHeaders.type')}</div>
          <div className="py-3 px-4">{t('tableHeaders.topic')}</div>
          <div className="py-3 px-4">{t('tableHeaders.status')}</div>
          <div className="py-3 px-4">{t('tableHeaders.dateApproved')}</div>
        </div>

        {/* Data Row */}
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] py-6 text-center text-sm">
          <div className="px-4">{description}</div>
          <div className="px-4">{documentTypes.join(', ') || '—'}</div>
          <div className="px-4">{topics.join(', ') || '—'}</div>
          <div className="px-4">{status.join(', ') || '—'}</div>
          <div className="px-4">{policy.dateApproved || '—'}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 my-6">
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

      {/* Summary */}
      <H2 title={t('summaryTitle')} trailingLineColor="blue" />
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: summary }}
      />

      {/* Updates */}
      <H2 title={t('updatesTitle')} trailingLineColor="blue" />
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: updates }}
      />

      {/* Further Reading */}
      <H2 title={t('furtherReadingTitle')} trailingLineColor="blue" />
      <div
        className="text-bm-blue leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: furtherReading }}
      />

      {/* Related Policies */}
      <H2 title={t('relatedPoliciesTitle')} trailingLineColor="blue" />
      {relatedPolicies && (
        <div className="">
          {relatedPolicies.map((policy: any) => (
            <PolicyCard key={policy.databaseId} policy={policy} locale={locale} />
          ))}
        </div>
      )}

      <TakeActionCarousel takeActionPosts={policy.recommendedActions as TakeAction[]} locale={locale} />
    </div>
  )
}

const PolicyCard = ({ policy, locale }: any) => {
  const { title, titleMn } = policy.policyPageCustomFields
  const { topics, dateGmt } = policy
  const dateApproved = formatDate(dateGmt)
  const transformedTopics = translateList((topics?.edges || []).map((e: any) => e.node.name), locale)

  console.log(transformedTopics)
  return (
    <div className="mb-4">
      <div
        className="text-bm-blue leading-relaxed prose max-w-none mb-3"
        dangerouslySetInnerHTML={{ __html: getTranslated(title, titleMn, locale) }}
      />
      <div className='flex justify-between items-center'>
        <div className='bg-gray-200 rounded-lg text-xs px-4 py-2'>Батлагдсан: {dateApproved}</div>
        <div>
          {transformedTopics.map((topic: any) => (
            <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-lg mr-2">{topic}</span>
          ))}
        </div>
      </div>
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
  const policy = await getPolicyDetails(slug)

  const transformedPolicy = transformPolicy(policy);

  if (!policy) return { notFound: true }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'policy', 'nav', 'footer', 'home'])),
      policy: transformedPolicy,
      locale,
      slug
    },
    revalidate: 60,
  }
}

export function transformPolicy(raw: any) {
  const f = raw.policy.policyPageCustomFields;

  return {
    title: {
      en: f.title,
      mn: f.titleMn,
    },
    description: {
      en: f.name,
      mn: f.nameMn,
    },
    summary: {
      en: f.summary,
      mn: f.summaryMn,
    },
    updates: {
      en: f.updates,
      mn: f.updatesMn,
    },
    furtherReading: {
      en: f.furtherReading,
      mn: f.furtherReadingMn,
    },
    dateApproved: formatDate(f.initiatedDate),
    fileMn: f.downloadUrlMn,
    fileEn: f.downloadUrl,
    sourceUrl: f.sourceUrl,
    topics: (raw.policy.topics?.edges || []).map((e: any) => e.node.name),
    documentTypes: (raw.policy.documentTypes?.edges || []).map((e: any) => e.node.name),
    status: (raw.policy.policyStatus?.edges || []).map((e: any) => e.node.name),
    recommendedActions: (f.recommendedAction?.edges || []).map((e: any) => e.node),
    relatedPolicies: (f.relatedPolicies?.edges || []).map((e: any) => e.node),
  }
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-CA') // e.g. "2016-04-09"
}

function splitLocalizedValue(value: string, locale: string): string {
  const [en, mn] = value.split(' / ')
  return locale === 'mn' ? (mn || en) : en
}

function translateList(items: string[], locale: string): string[] {
  return items.map(item => splitLocalizedValue(item, locale))
}




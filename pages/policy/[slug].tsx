import { TakeActionCarousel } from '@/components/HomePage'
import { ArrowLeftIcon, ArrowDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { TakeAction } from 'graphql/generated'
import { getPolicies, getPolicyDetails } from 'lib/graphql-api/queries/policy'
import { getTranslated } from 'lib/utils/getTranslated'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import React from 'react'

interface PolicyPostPageProps {
  policy: any,
  locale: string
}

export default function PolicyPostPage({ policy, locale }: PolicyPostPageProps) {
  const router = useRouter()

  if (router.isFallback) return <p>Loading...</p>

  console.log('policy in component', policy)

  function splitLocalizedValue(value: string, locale: string): string {
    const [en, mn] = value.split(' / ')
    return locale === 'mn' ? (mn || en) : en
  }
  
  function translateList(items: string[], locale: string): string[] {
    return items.map(item => splitLocalizedValue(item, locale))
  }

  const title = getTranslated(policy.title.en, policy.title.mn, locale)
  const description = getTranslated(policy.description.en, policy.description.mn, locale)
  const summary = getTranslated(policy.summary.en, policy.summary.mn, locale)
  const updates = getTranslated(policy.updates.en, policy.updates.mn, locale)
  const furtherReading = getTranslated(policy.furtherReading.en, policy.furtherReading.mn, locale)
  const topics = translateList(policy.topics || [], locale)
  const documentTypes = translateList(policy.documentTypes || [], locale)
  const status = translateList(policy.status || [], locale)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Link */}
      <Link href="/policy" className="flex items-center text-bm-blue hover:underline mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to Policy Page
      </Link>
  
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
  
      {/* Metadata Table */}
      <div className="mb-8">
        {/* Header Row */}
        <div className="bg-bm-blue text-white text-center font-bold uppercase grid grid-cols-[repeat(5,minmax(0,1fr))] rounded-lg">
          <div className="py-3 px-4">Нэр</div>
          <div className="py-3 px-4">Төрөл</div>
          <div className="py-3 px-4">Сэдэв</div>
          <div className="py-3 px-4">Төлөв</div>
          <div className="py-3 px-4">Батлагдсан</div>
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
            Эх сурвалж
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        )}
        {policy.fileMn && (
          <a
            href={policy.fileMn}
            download
            className="bg-bm-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bm-blue/90"
          >
            Download (MNG)
            <ArrowDownIcon className="w-5 h-5" />
          </a>
        )}
        {policy.fileEn && (
          <a
            href={policy.fileEn}
            download
            className="bg-bm-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bm-blue/90"
          >
            Download (EN)
            <ArrowDownIcon className="w-5 h-5" />
          </a>
        )}
      </div>
  
      {/* Summary */}
      <div className="flex items-center gap-4 mt-10 mb-4">
        <h2 className="text-2xl font-semibold whitespace-nowrap">Summary</h2>
        <div className="flex-grow h-0.5 rounded-lg bg-bm-blue" />
      </div>
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
  
      {/* Updates */}
      <div className="flex items-center gap-4 mt-10 mb-4">
        <h2 className="text-2xl font-semibold whitespace-nowrap">Updates</h2>
        <div className="flex-grow h-0.5 rounded-lg bg-bm-blue" />
      </div>
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: updates }}
      />
  
      {/* Further Reading */}
      <div className="flex items-center gap-4 mt-10 mb-4">
        <h2 className="text-2xl font-semibold whitespace-nowrap">Further Reading</h2>
        <div className="flex-grow h-0.5 rounded-lg bg-bm-blue" />
      </div>
      <div
        className="text-bm-blue leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: furtherReading }}
      />

      <TakeActionCarousel takeActionPosts={policy.recommendedActions as TakeAction[]} locale={locale} />
    </div>
  )  
}

// recommendedActions: [
//   {
//     slug: 'ger-insulation',
//     databaseId: 3374,
//     dateGmt: '2022-10-03T07:47:29',
//     takeActionCustomFields: [Object],
//     featuredImage: [Object]
//   },
//   {
//     slug: 'how-to-minimize-vehicle-emissions',
//     databaseId: 2200,
//     dateGmt: '2021-05-21T00:33:05',
//     takeActionCustomFields: [Object],
//     featuredImage: [Object]
//   },
//   {
//     slug: 'test',
//     databaseId: 2127,
//     dateGmt: '2021-04-20T17:08:35',
//     takeActionCustomFields: [Object],
//     featuredImage: [Object]
//   }
// ]

// takeActionPosts [
//   {
//     databaseId: 2309,
//     slug: 'use-air-purifier',
//     dateGmt: '2021-12-13T01:55:40',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: 'Use Air Purifier ',
//       titleMn: 'Агаар цэвэршүүлэгч хэрэглэж хэвшицгээе'
//     }
//   },
//   {
//     databaseId: 3477,
//     slug: 'house-insulation',
//     dateGmt: '2022-10-12T13:00:59',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: "Let's insulate our house!",
//       titleMn: 'Байшингаа дулаалцгаая!'
//     }
//   },
//   {
//     databaseId: 2200,
//     slug: 'how-to-minimize-vehicle-emissions',
//     dateGmt: '2021-05-21T00:33:05',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: 'How to minimize vehicle emissions',
//       titleMn: 'Хэрхэн автомашиныхаа утааг багасгах вэ?'
//     }
//   },
//   {
//     databaseId: 2127,
//     slug: 'test',
//     dateGmt: '2021-04-20T17:08:35',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: 'Protect myself and others from cigarette smoke ',
//       titleMn: 'Би гэр бүлийнхнийгээ тамхины хороос хамгаалахыг амлаж байна. '
//     }
//   },
//   {
//     databaseId: 2172,
//     slug: 'test-shijir',
//     dateGmt: '2021-04-28T00:41:08',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: 'Ride a Bicycle',
//       titleMn: 'Дугуй унацгаая'
//     }
//   },
//   {
//     databaseId: 2163,
//     slug: 'wear-a-mask',
//     dateGmt: '2021-04-26T12:44:42',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: "Let's wear a mask",
//       titleMn: 'Маскаа зүүцгээе'
//     }
//   },
//   {
//     databaseId: 2300,
//     slug: 'prevent-co-poisoning',
//     dateGmt: '2021-12-13T01:47:22',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: 'Prevent CO poisoning ',
//       titleMn: 'Угаарын хийн хордлогоос сэргийлье'
//     }
//   },
//   {
//     databaseId: 3374,
//     slug: 'ger-insulation',
//     dateGmt: '2022-10-03T07:47:29',
//     featuredImage: { node: [Object] },
//     takeActionCustomFields: {
//       typeOfAction: [Object],
//       title: "Let's insulate our gers",
//       titleMn: 'Гэрээ дулаалцгаая'
//     }
//   }
// ]


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

  console.log('raw policy', policy)

  const transformedPolicy = transformPolicy(policy);

  console.log('transformed policy', transformedPolicy)

  if (!policy) return { notFound: true }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'policy', 'nav', 'footer', 'home'])),
      policy: transformedPolicy,
      locale
    },
    revalidate: 60,
  }
}

export function transformPolicy(raw: any) {
  const f = raw.policy.policyPageCustomFields;
  console.log("f", f)

  console.log("raw recomennded action", f.recommendedAction)

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
  }
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-CA') // e.g. "2016-04-09"
}




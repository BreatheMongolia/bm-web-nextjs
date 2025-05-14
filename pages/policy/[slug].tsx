import { ArrowLeftIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
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

  const title = getTranslated(policy.title.en, policy.title.mn, locale)
  const description = getTranslated(policy.description.en, policy.description.mn, locale)
  const summary = getTranslated(policy.summary.en, policy.summary.mn, locale)
  const updates = getTranslated(policy.updates.en, policy.updates.mn, locale)
  const furtherReading = getTranslated(policy.furtherReading.en, policy.furtherReading.mn, locale)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back Link */}
      <Link href="/policy" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to Policy Page
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>

      {/* Metadata Table */}
      <div className="overflow-x-auto bg-blue-50 rounded-md">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-blue-100 text-blue-900 font-semibold">
            <tr>
              <th className="px-4 py-2">НЭР</th>
              <th className="px-4 py-2">ТӨРӨЛ</th>
              <th className="px-4 py-2">СЭДЭВ</th>
              <th className="px-4 py-2">ТӨЛӨВ</th>
              <th className="px-4 py-2">БАТЛАГДСАН</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">{description}</td>
              <td className="px-4 py-2">{policy.documentTypes?.join(', ')}</td>
              <td className="px-4 py-2">{policy.topics?.join(', ')}</td>
              <td className="px-4 py-2">{policy.status?.join(', ')}</td>
              <td className="px-4 py-2">{policy.dateApproved}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 my-6">
        {policy.sourceUrl && (
          <a
            href={policy.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          >
            Эх сурвалж ↗
          </a>
        )}
        {policy.fileMn && (
          <a
            href={policy.fileMn}
            download
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <ArrowDownIcon className="w-4 h-4" />
            Download (MNG)
          </a>
        )}
        {policy.fileEn && (
          <a
            href={policy.fileEn}
            download
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <ArrowDownIcon className="w-4 h-4" />
            Download (EN)
          </a>
        )}
      </div>

      {/* Summary */}
      <h2 className="text-xl font-semibold border-t pt-6 mt-10 mb-2">Summary</h2>
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: summary }}
      />

      {/* Updates */}
      <h2 className="text-xl font-semibold border-t pt-6 mt-10 mb-2">Updates</h2>
      <div
        className="text-gray-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: updates }}
      />

      {/* Further Reading */}
      <h2 className="text-xl font-semibold border-t pt-6 mt-10 mb-2">Further Reading</h2>
      <div
        className="text-blue-700 leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: furtherReading }}
      />
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

  console.log('policy', transformedPolicy)

  if (!policy) return { notFound: true }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'policy, nav', 'footer'])),
      policy: transformedPolicy,
      locale
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
  }
}

function formatDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-CA') // e.g. "2016-04-09"
}




import { getTranslated } from 'lib/utils/getTranslated'
import { formatDate, translateList } from 'lib/utils/policy'

interface PolicyCardProps {
  policy: {
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
  locale: string
}

export const PolicyEntry = ({ policy, locale }: PolicyCardProps) => {
  const { title, titleMn } = policy.policyPageCustomFields
  const { topics, dateGmt } = policy
  const dateApproved = formatDate(dateGmt)
  const transformedTopics = translateList((topics?.edges || []).map((e: any) => e.node.name), locale)

  return (
    <div className="pb-2 mb-4 border-b-2 border-gray-200 last:border-b-0">
      <div
        className="text-bm-blue leading-relaxed prose max-w-none mb-3"
        dangerouslySetInnerHTML={{ __html: getTranslated(title, titleMn, locale) }}
      />
      <div className='flex justify-between items-center'>
        <div className='bg-gray-200 rounded-lg text-xs px-4 py-2'>Батлагдсан: {dateApproved}</div>
        <div>
          {transformedTopics.map((topic: string, index: number) => (
            <span key={index} className="bg-policy-tag-bg text-policy-tag-text text-sm px-4 py-1 rounded-lg mr-2">{topic}</span>
          ))}
        </div>
      </div>
    </div>
  )
}


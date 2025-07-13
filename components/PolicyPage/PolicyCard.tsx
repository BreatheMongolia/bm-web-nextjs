import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'
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
  const [isTagsExpanded, setIsTagsExpanded] = useState(false)
  const { t } = useTranslation('policy')
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
        <div className='bg-gray-200 rounded-lg text-xs px-4 py-2'>{t('approvedOn')}: {dateApproved}</div>
        
        {/* Desktop: Always show tags */}
        <div className="hidden md:flex">
          {transformedTopics.map((topic: string, index: number) => (
            <span key={index} className="bg-policy-tag-bg text-policy-tag-text text-sm px-4 py-1 rounded-lg mr-2">{topic}</span>
          ))}
        </div>
        
        {/* Mobile: Collapsible tags */}
        <div className="md:hidden">
          {transformedTopics.length > 0 && (
            <button
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className="flex items-center gap-1 text-policy-tag-text hover:text-blue-700 transition-colors"
            >
              {isTagsExpanded ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile: Expandable tags section */}
      {isTagsExpanded && (
        <div className="md:hidden mt-3 flex flex-wrap gap-2">
          {transformedTopics.map((topic: string, index: number) => (
            <span key={index} className="bg-policy-tag-bg text-policy-tag-text text-sm px-3 py-1 rounded-lg">{topic}</span>
          ))}
        </div>
      )}
    </div>
  )
}


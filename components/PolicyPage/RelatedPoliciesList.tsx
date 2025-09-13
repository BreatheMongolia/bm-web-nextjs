import { useState } from 'react'
import { EllipsisHorizontalIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'
import { PolicyEntry } from './PolicyCard'

interface RelatedPoliciesListProps {
  policies: Array<{
    databaseId: string
    dateGmt: string
    policyPageCustomFields: {
      title: string
      titleMn: string
    }
    topics?: {
      edges: Array<{ node: { name: string } }>
    }
  }>
  locale: string
}

export const RelatedPoliciesList = ({ policies, locale }: RelatedPoliciesListProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation('policy')
  const maxInitialItems = 4
  
  const shouldShowExpandButton = policies.length > maxInitialItems
  const visiblePolicies = isExpanded ? policies : policies.slice(0, maxInitialItems)
  const remainingCount = policies.length - maxInitialItems

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      {visiblePolicies.map((policy) => (
        <PolicyEntry key={policy.databaseId} policy={policy} locale={locale} />
      ))}
      
      {shouldShowExpandButton && (
        <div className="mt-4 text-center">
          {!isExpanded ? (
            <button
              onClick={handleToggleExpand}
              className="flex flex-col items-center justify-center text-bm-blue hover:text-blue-600 transition-colors mx-auto"
            >
              <EllipsisHorizontalIcon className="w-12 h-12" />
              <span className="text-sm font-semibold">
                {t('expand')} (+{remainingCount})
              </span>
            </button>
          ) : (
            <button
              onClick={handleToggleExpand}
              className="flex flex-col items-center justify-center gap-1 text-bm-blue hover:text-blue-600 transition-colors text-sm font-medium mx-auto"
            >
              <ChevronUpIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">{t('collapse')}</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
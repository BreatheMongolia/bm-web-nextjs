import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { PolicyEntry } from 'components/PolicyPage/PolicyCard'

const Policies: FC<{ data: any[] }> = ({ data: policyData }) => {
  const { t, i18n } = useTranslation(['search', 'policy'])
  if (policyData.length === 0) return null

  const [isExpanded, setIsExpanded] = useState(false)
  const initialDisplayCount = 5
  const shouldShowToggle = policyData.length > initialDisplayCount

  const displayedPolicies = isExpanded ? policyData : policyData.slice(0, initialDisplayCount)

  return (
    <div className="policy-section mb-16">
      <h1 className="search-title">{t('policyTitle')}</h1>

      <div className="policy-results">
        {displayedPolicies.map((policy: any, index: number) => (
          <PolicyEntry
            key={policy.databaseId || index}
            policy={policy}
            locale={i18n.language}
          />
        ))}
      </div>

      {shouldShowToggle && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-bm-blue hover:text-blue-700 font-semibold text-sm transition-colors flex items-center gap-2"
          >
            {isExpanded ? t('policy:collapse') : t('policy:seeMore')}
            {isExpanded ? ' ▲' : ' ▼'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Policies

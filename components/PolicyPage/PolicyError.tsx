import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface PolicyErrorProps {
  error?: string
  onRetry?: () => void
}

export const PolicyError = ({ error, onRetry }: PolicyErrorProps) => {
  const { t } = useTranslation('policy')

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Policy Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {error || "Sorry, we couldn't find the policy you're looking for. It may have been moved or no longer exists."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 bg-bm-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Try Again
            </button>
          )}
          
          <Link
            href="/policy"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('backToPolicy')}
          </Link>
        </div>
      </div>
    </div>
  )
}
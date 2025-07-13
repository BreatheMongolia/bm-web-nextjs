export const PolicyLoading = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      {/* Back Link Skeleton */}
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Title and Share Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
        <div className="w-10 h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Metadata Skeleton */}
      <div className="mb-8">
        {/* Desktop Table Skeleton */}
        <div className="hidden md:block">
          <div className="bg-gray-200 rounded-lg p-4 mb-2">
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile List Skeleton */}
        <div className="md:hidden bg-gray-100 rounded-lg p-4 space-y-4">
          {/* Approved Date Skeleton */}
          <div className="text-center">
            <div className="w-20 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="w-24 h-6 bg-gray-200 rounded mx-auto"></div>
          </div>
          
          {/* Metadata Items Skeleton */}
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-center gap-3 my-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-32 h-10 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Content Sections Skeleton */}
      {[...Array(3)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {/* Section Title */}
          <div className="w-48 h-6 bg-gray-200 rounded mb-4"></div>
          {/* Section Content */}
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-4 bg-gray-200 rounded"></div>
            ))}
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
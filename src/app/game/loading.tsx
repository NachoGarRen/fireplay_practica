export default function Loading() {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
  
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
  
              <div className="mb-6 h-96 bg-gray-200 rounded"></div>
  
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
  
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
  
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
  
                <div className="flex gap-2 mb-6">
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
  
                <div className="border-t pt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`}
    />
  )
}

interface TodosLoadingStateProps {
  message?: string
}

export function TodosLoadingState({
  message = 'Loading todos...',
}: TodosLoadingStateProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <LoadingSpinner size="lg" />
        <div className="text-lg text-gray-600">{message}</div>
      </div>
    </div>
  )
}

interface TodosErrorStateProps {
  error: Error
  onRetry?: () => void
}

export function TodosErrorState({ error, onRetry }: TodosErrorStateProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-red-500 text-center">
          <div className="text-lg font-medium mb-2">Error loading todos</div>
          <div className="text-sm">{error.message}</div>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

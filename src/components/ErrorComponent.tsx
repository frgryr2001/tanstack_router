import { Link } from '@tanstack/react-router'

interface ErrorComponentProps {
  error?: Error
  title?: string
  message?: string
  backTo?: string
  backLabel?: string
  showError?: boolean
}

export function ErrorComponent({
  error,
  title = 'Something went wrong',
  message = 'Please try refreshing the page or contact support if the problem persists',
  backTo = '/',
  backLabel = '← Back to Home',
  showError = true,
}: ErrorComponentProps) {
  return (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="text-red-500 text-6xl mb-4">⚠️</div>

        {/* Title */}
        <div className="text-red-500 text-xl font-semibold mb-4">{title}</div>

        {/* Error Message */}
        {showError && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 text-sm font-medium mb-2">
              Error Details:
            </p>
            <p className="text-red-600 text-sm">{error.message}</p>
          </div>
        )}

        {/* General Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            🔄 Refresh Page
          </button>

          <Link
            to={backTo}
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Specialized error components for common use cases
export function NotFoundError() {
  return (
    <ErrorComponent
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      backLabel="← Back to Home"
      showError={false}
    />
  )
}

export function NetworkError({ error }: { error?: Error }) {
  return (
    <ErrorComponent
      error={error}
      title="Network Error"
      message="Failed to load data. Please check your internet connection and try again."
      showError={true}
    />
  )
}

export function ApiError({
  error,
  backTo,
  backLabel,
}: {
  error?: Error
  backTo?: string
  backLabel?: string
}) {
  return (
    <ErrorComponent
      error={error}
      title="Failed to load data"
      message="There was a problem loading the requested data. Please try again."
      backTo={backTo}
      backLabel={backLabel}
      showError={true}
    />
  )
}

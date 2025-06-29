interface PendingComponentProps {
  title?: string
  message?: string
  icon?: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'gray'
  size?: 'sm' | 'md' | 'lg'
}

export function PendingComponent({
  title = 'Loading...',
  message = 'Please wait while we load your data',
  icon = '⏳',
  color = 'blue',
  size = 'md',
}: PendingComponentProps) {
  const colorClasses = {
    blue: 'border-blue-500',
    orange: 'border-orange-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
  }

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const titleSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const messageSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto">
        {/* Loading Spinner */}
        <div
          className={`inline-block animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${colorClasses[color]} mb-4`}
        ></div>

        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Title */}
        <div
          className={`${titleSizeClasses[size]} font-semibold text-gray-700 mb-2`}
        >
          {title}
        </div>

        {/* Message */}
        <p className={`text-gray-500 ${messageSizeClasses[size]}`}>{message}</p>
      </div>
    </div>
  )
}

// Specialized pending components for common use cases
export function LoadingData({ type = 'data' }: { type?: string }) {
  return (
    <PendingComponent
      title={`Loading ${type}...`}
      message={`Fetching ${type} from the server`}
      icon="📊"
      color="blue"
    />
  )
}

export function LoadingMeals() {
  return (
    <PendingComponent
      title="Loading delicious meals..."
      message="Fetching meal data from TheMealDB API"
      icon="🍽️"
      color="orange"
    />
  )
}

export function LoadingMealDetail() {
  return (
    <PendingComponent
      title="Loading meal details..."
      message="Fetching delicious details from TheMealDB"
      icon="👨‍🍳"
      color="orange"
      size="lg"
    />
  )
}

export function LoadingEmployees() {
  return (
    <PendingComponent
      title="Loading employees..."
      message="Fetching employee data from the server"
      icon="👥"
      color="blue"
    />
  )
}

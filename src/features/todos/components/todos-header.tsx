interface TodosHeaderProps {
  title?: string
  subtitle?: string
  showTimestamp?: boolean
}

export function TodosHeader({
  title = '✅ Todo Management',
  subtitle = 'Manage your tasks and track your progress',
  showTimestamp = true,
}: TodosHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>
      {showTimestamp && (
        <div className="text-sm text-gray-500">
          Page rendered at: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import personsApi from '@/api'
import { ErrorComponent } from '@/components/ErrorComponent'
import { LoadingEmployees } from '@/components/PendingComponent'

export const Route = createFileRoute('/employees')({
  component: EmployeesComponent,
  loader: async () => {
    console.log(
      '🚀 TanStack Router: Loader called at:',
      new Date().toLocaleTimeString(),
    )
    const data = await personsApi.getAll()
    console.log(
      '📦 TanStack Router: Loader finished at:',
      new Date().toLocaleTimeString(),
    )
    return data
  },
  errorComponent: ({ error }) => (
    <ErrorComponent
      error={error}
      title="Failed to load employees"
      message="Please try refreshing the page"
      showError={true}
    />
  ),
  pendingComponent: LoadingEmployees,
  // Cache Control Options:
  staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh (no refetch)
  gcTime: 1000 * 60 * 10, // 10 minutes - how long to keep in memory when not in use

  // Additional cache control options:
  // staleTime: 0,           // Always stale (always refetch)
  // staleTime: Infinity,    // Never stale (never refetch unless manually invalidated)
  // gcTime: 0,              // Remove from memory immediately when not in use
  // gcTime: Infinity,       // Keep in memory forever
})

function EmployeesComponent() {
  const employees = Route.useLoaderData()
  const componentRenderTime = new Date().toLocaleTimeString()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
        <div className="text-sm text-gray-500">
          Component rendered at: {componentRenderTime}
        </div>
      </div>

      {/* Cache Control Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          🔄 Cache Configuration & Testing
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">Stale Time:</span>
            <span className="text-blue-600 ml-2">
              5 minutes (data stays fresh)
            </span>
          </div>
          <div>
            <span className="font-medium text-blue-700">GC Time:</span>
            <span className="text-blue-600 ml-2">
              10 minutes (memory retention)
            </span>
          </div>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800 text-sm font-medium mb-1">
            🧪 How to test caching:
          </p>
          <ol className="text-yellow-700 text-sm space-y-1 ml-4 list-decimal">
            <li>Navigate to another page (About)</li>
            <li>Come back to this page within 5 minutes</li>
            <li>Check browser console for API calls</li>
            <li>Notice no loading spinner or API call</li>
          </ol>
        </div>
        <p className="text-blue-600 text-sm mt-2">
          📊 Open browser DevTools Console to see detailed cache logs!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={employee.avatar}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-gray-600 text-sm">{employee.jobTitle}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Email:</span> {employee.email}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Department:</span>{' '}
                {employee.department}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Phone:</span> {employee.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

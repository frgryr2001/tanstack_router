import { Link, createFileRoute } from '@tanstack/react-router'
import mealApi from '@/api/meal'
import { ApiError } from '@/components/ErrorComponent'
import { LoadingMealDetail } from '@/components/PendingComponent'

export const Route = createFileRoute('/meals/$mealId/')({
  component: MealDetailComponent,
  loader: async ({ params }) => {
    const data = await mealApi.getMealById(params.mealId)

    return data
  },
  errorComponent: ({ error }) => (
    <ApiError error={error} backTo="/meals" backLabel="← Back to Meals" />
  ),
  pendingComponent: LoadingMealDetail,
  notFoundComponent: () => (
    <ApiError
      error={new Error('Meal not found')}
      backTo="/meals"
      backLabel="← Back to Meals"
    />
  ),
  // Cache settings for meal details
  staleTime: 1000 * 60 * 15, // 15 minutes - meal details change less frequently
  gcTime: 1000 * 60 * 60, // 1 hour - keep meal details longer in memory
})

function MealDetailComponent() {
  const meal = Route.useLoaderData()
  const { mealId } = Route.useParams()
  console.log('mealId', mealId)

  const componentRenderTime = new Date().toLocaleTimeString()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/meals"
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium"
          >
            ← Back to Meals
          </Link>
          <div className="text-sm text-gray-500">
            Rendered at: {componentRenderTime}
          </div>
        </div>

        {/* Cache Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            🎯 Meal Detail Cache
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-700">Meal ID:</span>
              <span className="text-blue-600 ml-2">{mealId}</span>
            </div>
            <div>
              <span className="font-medium text-blue-700">Cache Time:</span>
              <span className="text-blue-600 ml-2">15 minutes</span>
            </div>
            <div>
              <span className="font-medium text-blue-700">Memory Time:</span>
              <span className="text-blue-600 ml-2">1 hour</span>
            </div>
          </div>
        </div>

        {/* Meal Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={meal.thumbnail}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{meal.name}</h1>
              <div className="flex items-center gap-4 text-lg">
                <span className="bg-orange-500 px-3 py-1 rounded-full">
                  {meal.category}
                </span>
                <span className="bg-blue-500 px-3 py-1 rounded-full">
                  🌍 {meal.area}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🥘 Ingredients
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({meal.ingredients.length})
                </span>
              </h2>
              <div className="space-y-3">
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-800">
                      {ingredient.name}
                    </span>
                    <span className="text-orange-600 font-medium">
                      {ingredient.measure || 'To taste'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags & Links */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📝 Details
              </h3>

              {/* Tags */}
              {meal.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Link */}
              {meal.youtube && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Video:</h4>
                  <a
                    href={meal.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    📺 Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                👨‍🍳 Instructions
              </h2>
              <div className="prose prose-gray max-w-none">
                {meal.instructions.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back to meals footer */}
        <div className="text-center mt-12">
          <Link
            to="/meals"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
          >
            ← Back to All Meals
          </Link>
        </div>
      </div>
    </div>
  )
}

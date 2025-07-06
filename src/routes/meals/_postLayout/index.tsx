import { Link, createFileRoute } from '@tanstack/react-router'
import type { ProcessedMeal } from '@/api/meal'

import { NetworkError } from '@/components/ErrorComponent'
import { LoadingMeals } from '@/components/PendingComponent'
import { mealsQueryOptions } from '@/features/meals/query/mealsQueryOptions'

export const Route = createFileRoute('/meals/_postLayout/')({
  component: MealsComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(mealsQueryOptions),
  errorComponent: ({ error }) => <NetworkError error={error} />,
  pendingComponent: LoadingMeals,
  preload: false,
})

function MealsComponent() {
  const meals = Route.useLoaderData()
  const componentRenderTime = new Date().toLocaleTimeString()

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🍽️ Meals from TheMealDB
        </h1>
        <div className="text-sm text-gray-500">
          Component rendered at: {componentRenderTime}
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}

interface MealCardProps {
  meal: ProcessedMeal
}

function MealCard({ meal }: MealCardProps) {
  return (
    <Link
      to="/meals/$mealId"
      params={{
        mealId: String(meal.id),
      }}
      className="block bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => {
        console.log('🔗 Navigating to meal detail:', meal.id, meal.name)
      }}
    >
      {/* Meal Image */}
      <div className="relative h-48">
        <img
          src={meal.thumbnail}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {meal.category}
          </span>
        </div>
      </div>

      {/* Meal Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {meal.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">🌍 {meal.area}</span>
          {meal.youtube && (
            <a
              href={meal.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-700 text-sm"
              onClick={(e) => {
                e.stopPropagation() // Prevent card navigation when clicking YouTube link
                console.log('🎥 Opening YouTube for:', meal.name)
              }}
            >
              📺 YouTube
            </a>
          )}
        </div>

        {/* Tags */}
        {meal.tags.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {meal.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
              {meal.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{meal.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Instructions Preview */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {meal.instructions}
        </p>

        {/* Ingredients Count */}
        <div className="text-sm text-gray-500 border-t pt-2">
          🥘 {meal.ingredients.length} ingredients
        </div>
      </div>
    </Link>
  )
}

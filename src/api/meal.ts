import invariant from 'tiny-invariant'
import { notFound } from '@tanstack/react-router'

export interface Meal {
  idMeal: string
  strMeal: string
  strDrinkAlternate?: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags?: string
  strYoutube?: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string
  strIngredient11?: string
  strIngredient12?: string
  strIngredient13?: string
  strIngredient14?: string
  strIngredient15?: string
  strIngredient16?: string
  strIngredient17?: string
  strIngredient18?: string
  strIngredient19?: string
  strIngredient20?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
  strMeasure11?: string
  strMeasure12?: string
  strMeasure13?: string
  strMeasure14?: string
  strMeasure15?: string
  strMeasure16?: string
  strMeasure17?: string
  strMeasure18?: string
  strMeasure19?: string
  strMeasure20?: string
  strSource?: string
  strImageSource?: string
  strCreativeCommonsConfirmed?: string
  dateModified?: string
}

export interface MealResponse {
  meals: Array<Meal> | null
}

// Processed meal interface for easier display
export interface ProcessedMeal {
  id: string
  name: string
  category: string
  area: string
  instructions: string
  thumbnail: string
  tags: Array<string>
  youtube?: string
  ingredients: Array<{
    name: string
    measure: string
  }>
}

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Validate BASE_URL at module load time
invariant(BASE_URL.startsWith('https://'), 'BASE_URL must be a valid HTTPS URL')

export const mealApi = {
  // Get all meals (using search by first letter 'a' as a workaround since there's no "get all" endpoint)
  getAllMeals: async (): Promise<Array<ProcessedMeal>> => {
    console.log(
      '📡 Meal API: getAllMeals() called at:',
      new Date().toLocaleTimeString(),
    )

    try {
      // TheMealDB doesn't have a "get all" endpoint, so we'll get meals by letter 'a'
      const response = await fetch(`${BASE_URL}/search.php?f=a`)

      invariant(
        response.ok,
        `Failed to fetch meals: ${response.status} ${response.statusText}`,
      )

      const data: MealResponse = await response.json()

      console.log(
        '✅ Meal API: getAllMeals() returned',
        data.meals?.length ?? 0,
        'meals at:',
        new Date().toLocaleTimeString(),
      )

      if (!data.meals) {
        console.warn('⚠️ API returned null meals array')
        return []
      }

      // Validate meals array
      invariant(
        Array.isArray(data.meals),
        'Invalid response: meals should be an array but got ' +
          typeof data.meals,
      )

      // Process meals to clean up the data structure
      return data.meals.map((meal, index) => {
        try {
          return processMeal(meal)
        } catch (error) {
          console.error(`❌ Failed to process meal at index ${index}:`, error)
          throw new Error(
            `Failed to process meal at index ${index}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          )
        }
      })
    } catch (error) {
      console.error('❌ Meal API error:', error)
      // Re-throw with more context if it's not already an invariant error
      if (
        error instanceof Error &&
        error.message.includes('Invariant failed')
      ) {
        throw error
      }
      throw new Error(
        `Meal API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  },

  // Get meal detail by ID
  getMealById: async (id: string): Promise<ProcessedMeal> => {
    // Validate input
    invariant(id, 'Meal ID is required')
    invariant(typeof id === 'string', 'Meal ID must be a string')
    invariant(id.trim().length > 0, 'Meal ID cannot be empty')

    try {
      const response = await fetch(
        `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
      )

      invariant(
        response.ok,
        `Failed to fetch meal detail: ${response.status} ${response.statusText}`,
      )

      const data: MealResponse = await response.json()

      // TheMealDB returns null when meal not found
      if (!data.meals || data.meals.length === 0) {
        throw new Error(`Meal with ID "${id}" not found`)
      }

      // Validate response structure
      invariant(
        Array.isArray(data.meals),
        'Invalid response: meals should be an array but got ' +
          typeof data.meals,
      )

      invariant(
        data.meals.length === 1,
        `Expected 1 meal for ID "${id}" but got ${data.meals.length}`,
      )

      const meal = data.meals[0]

      try {
        return processMeal(meal)
      } catch (error) {
        console.error(`❌ Failed to process meal with ID "${id}":`, error)
        // throw new Error(
        //   `Failed to process meal with ID "${id}": ${error instanceof Error ? error.message : 'Unknown error'}`,
        // )
        throw notFound()
      }
    } catch (error) {
      console.error(`❌ Meal API error for ID "${id}":`, error)

      // Re-throw with more context if it's not already an invariant error
      if (
        error instanceof Error &&
        error.message.includes('Invariant failed')
      ) {
        throw error
      }

      //   throw new Error(
      //     `Meal API request failed for ID "${id}": ${error instanceof Error ? error.message : 'Unknown error'}`,
      //   )
      throw notFound()
    }
  },
}

// Helper function to process raw meal data
function processMeal(meal: Meal): ProcessedMeal {
  // Validate required meal properties
  invariant(meal.idMeal, 'Meal must have an ID')
  invariant(meal.strMeal, 'Meal must have a name')
  invariant(meal.strCategory, 'Meal must have a category')
  invariant(meal.strArea, 'Meal must have an area')
  invariant(meal.strInstructions, 'Meal must have instructions')
  invariant(meal.strMealThumb, 'Meal must have a thumbnail')

  // Extract ingredients and measures
  const ingredients: Array<{ name: string; measure: string }> = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string
    const measure = meal[`strMeasure${i}` as keyof Meal] as string

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      })
    }
  }

  // Validate we have at least one ingredient
  invariant(
    ingredients.length > 0,
    `Meal "${meal.strMeal}" must have at least one ingredient`,
  )

  const processedMeal: ProcessedMeal = {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()) : [],
    youtube: meal.strYoutube,
    ingredients,
  }

  // Final validation of processed meal
  invariant(processedMeal.id, 'Processed meal must have an ID')
  invariant(processedMeal.name, 'Processed meal must have a name')
  invariant(
    processedMeal.thumbnail.startsWith('http'),
    'Meal thumbnail must be a valid URL',
  )

  return processedMeal
}

export default mealApi

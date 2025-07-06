import { queryOptions } from '@tanstack/react-query'
import mealApi from '@/api/meal'
import { initialKeys } from '@/utils/query-key-factory'

const mealsQueryKey = initialKeys('meals')

export const mealsQueryOptions = queryOptions({
  queryKey: mealsQueryKey.all,
  queryFn: () => mealApi.getAllMeals(),
})

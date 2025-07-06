import { queryOptions } from '@tanstack/react-query'
import { todosApi } from '@/api/todos'
import { initialKeys } from '@/utils/query-key-factory'

const todosQueryKey = initialKeys('todos')

export const todosQueryOptions = {
  // Get all todos with pagination
  all: (limit: number = 30, skip: number = 0) =>
    queryOptions({
      queryKey: todosQueryKey.list(`limit:${limit},skip:${skip}`),
      queryFn: () => todosApi.getAllTodos(limit, skip),
    }),

  // Get a single todo by ID
  byId: (id: number) =>
    queryOptions({
      queryKey: todosQueryKey.detail(id),
      queryFn: () => todosApi.getTodoById(id),
    }),

  // Get a random todo
  random: () =>
    queryOptions({
      queryKey: [...todosQueryKey.all, 'random'] as const,
      queryFn: () => todosApi.getRandomTodo(),
    }),

  // Get todos by user ID
  byUserId: (userId: number) =>
    queryOptions({
      queryKey: todosQueryKey.list(`userId:${userId}`),
      queryFn: () => todosApi.getTodosByUserId(userId),
    }),
}

import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type {
  CreateTodoRequest,
  DeleteTodoResponse,
  Todo,
  UpdateTodoRequest,
} from '@/api/todos'
import { todosApi } from '@/api/todos'
import { initialKeys } from '@/utils/query-key-factory'

const todosQueryKey = initialKeys('todos')

// Alternative approach using mutationOptions for better type safety
export const createTodoMutationOptions = (
  queryClient: QueryClient,
): UseMutationOptions<Todo, Error, CreateTodoRequest> => ({
  mutationFn: (todoData: CreateTodoRequest) => todosApi.createTodo(todoData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: todosQueryKey.all })
  },
})

export const updateTodoMutationOptions = (
  queryClient: QueryClient,
): UseMutationOptions<
  Todo,
  Error,
  { id: number; todoData: UpdateTodoRequest }
> => ({
  mutationFn: ({ id, todoData }: { id: number; todoData: UpdateTodoRequest }) =>
    todosApi.updateTodo(id, todoData),
  onSuccess: (updatedTodo: Todo) => {
    queryClient.invalidateQueries({ queryKey: todosQueryKey.all })
    queryClient.setQueryData(todosQueryKey.detail(updatedTodo.id), updatedTodo)
  },
})

export const deleteTodoMutationOptions = (
  queryClient: QueryClient,
): UseMutationOptions<DeleteTodoResponse, Error, number> => ({
  mutationFn: (id: number) => todosApi.deleteTodo(id),
  onSuccess: (deletedTodo: DeleteTodoResponse) => {
    queryClient.invalidateQueries({ queryKey: todosQueryKey.all })
    queryClient.removeQueries({
      queryKey: todosQueryKey.detail(deletedTodo.id),
    })
  },
})

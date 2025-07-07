import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type {
  CreateTodoRequest,
  DeleteTodoResponse,
  Todo,
  UpdateTodoRequest,
} from '@/api/todos'
import { todosApi } from '@/api/todos'
import { showToast } from '@/components/ui/use-toast'
import { initialKeys } from '@/utils/query-key-factory'

const todosQueryKey = initialKeys('todos')

// Alternative approach using mutationOptions for better type safety
export const createTodoMutationOptions = (): UseMutationOptions<
  Todo,
  Error,
  CreateTodoRequest
> => ({
  mutationFn: (todoData: CreateTodoRequest) => todosApi.createTodo(todoData),
  meta: {
    invalidates: [todosQueryKey.all],
    callBack: (newData) => {
      showToast.success(
        'Todo created',
        `"${newData.todo}" was successfully created`,
      )
    },
  },
})

export const updateTodoMutationOptions = (): UseMutationOptions<
  Todo,
  Error,
  { id: number; todoData: UpdateTodoRequest }
> => ({
  mutationFn: ({ id, todoData }: { id: number; todoData: UpdateTodoRequest }) =>
    todosApi.updateTodo(id, todoData),
  meta: {
    invalidates: [todosQueryKey.all],
    callBack: (todoUpdated) => {
      showToast.success(
        'Todo updated',
        `"${todoUpdated.todo}" Was successfully updated`,
      )
    },
  },
})

export const deleteTodoMutationOptions = (): UseMutationOptions<
  DeleteTodoResponse,
  Error,
  number
> => ({
  mutationFn: (id: number) => todosApi.deleteTodo(id),

  meta: {
    invalidates: [todosQueryKey.all],
    callBack: (deletedTodo) => {
      showToast.success(
        'Todo deleted',
        `"${deletedTodo.todo}" was successfully deleted`,
      )
    },
  },
})

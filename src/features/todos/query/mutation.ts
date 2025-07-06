import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createTodoMutationOptions,
  deleteTodoMutationOptions,
  updateTodoMutationOptions,
} from './todosMutationOptions'

// Custom hooks for todos mutations
export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(createTodoMutationOptions(queryClient))
}

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateTodoMutationOptions(queryClient))
}

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteTodoMutationOptions(queryClient))
}

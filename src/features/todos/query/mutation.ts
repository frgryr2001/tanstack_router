import { useMutation } from '@tanstack/react-query'
import {
  createTodoMutationOptions,
  deleteTodoMutationOptions,
  updateTodoMutationOptions,
} from './todosMutationOptions'

// Custom hooks for todos mutations
export const useCreateTodoMutation = () => {
  return useMutation(createTodoMutationOptions())
}

export const useUpdateTodoMutation = () => {
  return useMutation(updateTodoMutationOptions())
}

export const useDeleteTodoMutation = () => {
  return useMutation(deleteTodoMutationOptions())
}

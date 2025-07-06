import { useQuery } from '@tanstack/react-query'
import { todosQueryOptions } from './todosQueryOptions'

// Custom hooks for todos queries
export const useTodosQuery = (limit: number = 30, skip: number = 0) => {
  return useQuery(todosQueryOptions.all(limit, skip))
}

export const useTodoByIdQuery = (id: number) => {
  return useQuery(todosQueryOptions.byId(id))
}

export const useRandomTodoQuery = () => {
  return useQuery(todosQueryOptions.random())
}

export const useTodosByUserIdQuery = (userId: number) => {
  return useQuery(todosQueryOptions.byUserId(userId))
}

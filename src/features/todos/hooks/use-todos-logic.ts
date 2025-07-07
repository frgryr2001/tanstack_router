import { useEffect, useMemo, useReducer } from 'react'
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../query/mutation'
import { useTodosQuery } from '../query/query'
import { LIMIT } from '../constants'
import { initialTodosState, todosReducer } from './use-todos-reducer'
import type { CreateTodoRequest, Todo, UpdateTodoRequest } from '@/api/todos'
import { showToast } from '@/components/ui/use-toast'

export function useTodosLogic() {
  const [state, dispatch] = useReducer(todosReducer, initialTodosState)

  // Fetch todos from API
  const {
    data: todosData,
    isLoading,
    error,
    refetch,
    isPlaceholderData,
  } = useTodosQuery(LIMIT, (state.currentPage - 1) * LIMIT)

  // Mutation hooks
  const createTodoMutation = useCreateTodoMutation()
  const updateTodoMutation = useUpdateTodoMutation()
  const deleteTodoMutation = useDeleteTodoMutation()

  // Sync API data with local state
  useEffect(() => {
    if (todosData?.todos) {
      dispatch({ type: 'SET_TODOS', payload: todosData.todos })
    }
  }, [todosData])

  // Calculate pagination from API data
  const totalItems = todosData?.total || 0
  const totalPages = Math.ceil(totalItems / LIMIT)

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      const matchesSearch = todo.todo
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase())
      const matchesStatus =
        state.filterStatus === 'all' ||
        (state.filterStatus === 'completed' && todo.completed) ||
        (state.filterStatus === 'pending' && !todo.completed)
      return matchesSearch && matchesStatus
    })
  }, [state.todos, state.searchTerm, state.filterStatus])

  // Enhanced actions with API integration
  const actions = {
    // Local state actions
    setTodos: (todos: Array<Todo>) =>
      dispatch({ type: 'SET_TODOS', payload: todos }),
    setCurrentPage: (page: number) =>
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
    setSearchTerm: (term: string) =>
      dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setFilterStatus: (status: 'all' | 'completed' | 'pending') =>
      dispatch({ type: 'SET_FILTER_STATUS', payload: status }),
    setCreateDialogOpen: (open: boolean) =>
      dispatch({ type: 'SET_CREATE_DIALOG_OPEN', payload: open }),
    setEditDialogOpen: (open: boolean) =>
      dispatch({ type: 'SET_EDIT_DIALOG_OPEN', payload: open }),
    setSelectedTodo: (todo: Todo | null) =>
      dispatch({ type: 'SET_SELECTED_TODO', payload: todo }),
    openEditDialog: (todo: Todo) =>
      dispatch({ type: 'OPEN_EDIT_DIALOG', payload: todo }),

    // API-integrated actions
    createTodo: async (todoData: CreateTodoRequest) => {
      try {
        const newTodo = await createTodoMutation.mutateAsync(todoData)
        dispatch({ type: 'ADD_TODO', payload: newTodo })
      } catch (err) {
        console.error('Failed to create todo:', err)
        throw err
      }
    },

    updateTodo: async (id: number, todoData: UpdateTodoRequest) => {
      try {
        const updatedTodo = await updateTodoMutation.mutateAsync({
          id,
          todoData,
        })
        dispatch({ type: 'UPDATE_TODO', payload: updatedTodo })
      } catch (err) {
        console.error('Failed to update todo:', err)
        throw err
      }
    },

    deleteTodo: async (id: number) => {
      try {
        await deleteTodoMutation.mutateAsync(id)
        dispatch({ type: 'DELETE_TODO', payload: id })
      } catch (err) {
        console.error('Failed to delete todo:', err)
        throw err
      }
    },

    toggleComplete: async (id: number) => {
      const todo = state.todos.find((t) => t.id === id)
      if (!todo) return

      try {
        // Optimistic update
        dispatch({ type: 'TOGGLE_COMPLETE', payload: id })

        // API call
        await updateTodoMutation.mutateAsync({
          id,
          todoData: { completed: !todo.completed },
        })
      } catch (err) {
        // Revert optimistic update on error
        dispatch({ type: 'TOGGLE_COMPLETE', payload: id })
        showToast.error('Failed to update todo', 'Please try again')
        console.error('Failed to toggle todo completion:', err)
        throw err
      }
    },
  }

  return {
    state,
    filteredTodos,
    isPlaceholderData,
    totalPages,
    totalItems,
    actions,
    isLoading,
    refetch,
    error,
    // Mutation states for UI feedback
    mutations: {
      create: {
        isLoading: createTodoMutation.isPending,
        error: createTodoMutation.error,
      },
      update: {
        isLoading: updateTodoMutation.isPending,
        error: updateTodoMutation.error,
      },
      delete: {
        isLoading: deleteTodoMutation.isPending,
        error: deleteTodoMutation.error,
      },
    },
  }
}

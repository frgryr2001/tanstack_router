import type { Todo } from '@/api/todos'

export interface TodosState {
  todos: Array<Todo>
  currentPage: number
  searchTerm: string
  filterStatus: 'all' | 'completed' | 'pending'
  isCreateDialogOpen: boolean
  isEditDialogOpen: boolean
  selectedTodo: Todo | null
}

export type TodosAction =
  | { type: 'SET_TODOS'; payload: Array<Todo> }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_COMPLETE'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_FILTER_STATUS'; payload: 'all' | 'completed' | 'pending' }
  | { type: 'SET_CREATE_DIALOG_OPEN'; payload: boolean }
  | { type: 'SET_EDIT_DIALOG_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_TODO'; payload: Todo | null }
  | { type: 'OPEN_EDIT_DIALOG'; payload: Todo }

export const initialTodosState: TodosState = {
  todos: [],
  currentPage: 1,
  searchTerm: '',
  filterStatus: 'all',
  isCreateDialogOpen: false,
  isEditDialogOpen: false,
  selectedTodo: null,
}

export function todosReducer(
  state: TodosState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      }

    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        isCreateDialogOpen: false,
      }

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
        isEditDialogOpen: false,
        selectedTodo: null,
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      }

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      }

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1, // Reset to first page when searching
      }

    case 'SET_FILTER_STATUS':
      return {
        ...state,
        filterStatus: action.payload,
        currentPage: 1, // Reset to first page when filtering
      }

    case 'SET_CREATE_DIALOG_OPEN':
      return {
        ...state,
        isCreateDialogOpen: action.payload,
      }

    case 'SET_EDIT_DIALOG_OPEN':
      return {
        ...state,
        isEditDialogOpen: action.payload,
        selectedTodo: action.payload ? state.selectedTodo : null,
      }

    case 'SET_SELECTED_TODO':
      return {
        ...state,
        selectedTodo: action.payload,
      }

    case 'OPEN_EDIT_DIALOG':
      return {
        ...state,
        selectedTodo: action.payload,
        isEditDialogOpen: true,
      }

    default:
      return state
  }
}

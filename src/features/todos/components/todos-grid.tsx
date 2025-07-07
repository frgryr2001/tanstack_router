import { TodoCard } from './todo-card'
import type { Todo } from '@/api/todos'
import { cn } from '@/lib/utils'

interface TodosGridProps {
  todos: Array<Todo>
  onToggleComplete: (id: number) => Promise<void>
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => Promise<void>
  loadingStates?: {
    toggleComplete?: Set<number>
    delete?: Set<number>
  }
  isPlaceholderData?: boolean
}

export function TodosGrid({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  isPlaceholderData,
  loadingStates,
}: TodosGridProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No todos found</div>
        <p className="text-gray-500">
          Try adjusting your search terms or create your first todo to get
          started
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8', {
        'opacity-50 pointer-events-none': isPlaceholderData,
        'animate-pulse': isPlaceholderData && todos.length > 0,
      })}
    >
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

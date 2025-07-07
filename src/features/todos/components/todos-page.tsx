import { useOnline } from '../hooks/use-online'
import { useTodosLogic } from '../hooks/use-todos-logic'
import { TodosErrorState, TodosLoadingState } from './loading-states'
import { TodoEditDialog } from './todo-edit-dialog'
import { TodosFilters } from './todos-filters'
import { TodosGrid } from './todos-grid'
import { TodosHeader } from './todos-header'
import { TodosPagination } from './todos-pagination'

export function TodosPage() {
  const {
    state,
    filteredTodos,
    totalPages,
    actions,
    isLoading,
    error,
    isPlaceholderData,
  } = useTodosLogic()

  if (isLoading) {
    return <TodosLoadingState />
  }

  if (error) {
    return <TodosErrorState error={error} />
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <TodosHeader />

      {/* Filters and Actions */}
      <TodosFilters
        searchTerm={state.searchTerm}
        filterStatus={state.filterStatus}
        isCreateDialogOpen={state.isCreateDialogOpen}
        onSearchChange={actions.setSearchTerm}
        onFilterChange={actions.setFilterStatus}
        onCreateDialogChange={actions.setCreateDialogOpen}
      />

      {/* Todos Grid */}
      <TodosGrid
        todos={filteredTodos}
        isPlaceholderData={isPlaceholderData}
        onToggleComplete={actions.toggleComplete}
        onEdit={actions.openEditDialog}
        onDelete={actions.deleteTodo}
      />

      {/* Pagination */}
      <TodosPagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        onPageChange={actions.setCurrentPage}
      />

      {/* Edit Dialog */}
      <TodoEditDialog
        isOpen={state.isEditDialogOpen}
        onOpenChange={actions.setEditDialogOpen}
        todo={state.selectedTodo}
      />
    </div>
  )
}

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { TodoCard } from './todo-card'
import type { Todo } from '@/api/todos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Mock data for demonstration
const mockTodos: Array<Todo> = [
  {
    id: 1,
    todo: 'Do something nice for someone I care about',
    completed: true,
    userId: 26,
  },
  {
    id: 2,
    todo: 'Memorize the fifty states and their capitals',
    completed: false,
    userId: 48,
  },
  { id: 3, todo: 'Watch a classic movie', completed: false, userId: 4 },
  {
    id: 4,
    todo: 'Contribute code or a monetary donation to an open-source software project',
    completed: false,
    userId: 48,
  },
  { id: 5, todo: "Solve a Rubik's cube", completed: false, userId: 31 },
  {
    id: 6,
    todo: 'Bake pastries for me and neighbor',
    completed: false,
    userId: 39,
  },
  { id: 7, todo: 'Go see a Broadway production', completed: false, userId: 32 },
  {
    id: 8,
    todo: 'Write a thank you letter to an influential person in my life',
    completed: true,
    userId: 13,
  },
  {
    id: 9,
    todo: 'Invite some friends over for a game night',
    completed: false,
    userId: 47,
  },
  {
    id: 10,
    todo: 'Have a football scrimmage with some friends',
    completed: false,
    userId: 19,
  },
]

export function TodosPage() {
  const [todos, setTodos] = useState<Array<Todo>>(mockTodos)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'pending'
  >('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const itemsPerPage = 6
  const totalItems = 150 // Mock total from API
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Filter todos based on search and status
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && todo.completed) ||
      (filterStatus === 'pending' && !todo.completed)
    return matchesSearch && matchesStatus
  })

  const handleToggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo)
    setIsEditDialogOpen(true)
  }

  const getStatusStats = () => {
    const completed = todos.filter((todo) => todo.completed).length
    const pending = todos.filter((todo) => !todo.completed).length
    return { completed, pending, total: todos.length }
  }

  const stats = getStatusStats()

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ✅ Todo Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your tasks and track your progress
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Page rendered at: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            size="sm"
          >
            Completed
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
            size="sm"
          >
            Pending
          </Button>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Todo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Todo</DialogTitle>
              <DialogDescription>
                Add a new task to your todo list.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p>Todo form would go here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Todos Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {filteredTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No todos found</div>
          <p className="text-gray-500">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Create your first todo to get started'}
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = index + 1
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(pageNum)
                    }}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Make changes to your todo item.
            </DialogDescription>
          </DialogHeader>
          {selectedTodo && (
            <div className="p-4">
              <p>Todo edit form would go here</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

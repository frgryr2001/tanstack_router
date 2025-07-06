import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Edit,
  Trash2,
  User,
} from 'lucide-react'
import type { Todo } from '@/api/todos'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/todos/$todoId')({
  component: TodoDetailComponent,
})

// Mock data for demonstration
const mockTodo: Todo = {
  id: 1,
  todo: 'Do something nice for someone I care about',
  completed: true,
  userId: 26,
}

function TodoDetailComponent() {
  const { todoId } = Route.useParams()
  const navigate = useNavigate()

  // In a real app, you'd fetch the todo based on the todoId
  const todo = mockTodo
  const componentRenderTime = new Date().toLocaleTimeString()

  const handleEdit = () => {
    // Navigate to edit page or open edit dialog
    console.log('Edit todo:', todo.id)
  }

  const handleDelete = () => {
    // Delete todo and navigate back
    console.log('Delete todo:', todo.id)
    navigate({ to: '/todos' })
  }

  const handleToggleComplete = () => {
    // Toggle completion status
    console.log('Toggle complete:', todo.id)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/todos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Todos
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Todo Details</h1>
            <p className="text-gray-600 mt-1">Todo ID: {todoId}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Component rendered at: {componentRenderTime}
        </div>
      </div>

      {/* Todo Details Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {todo.completed ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <Circle className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <CardTitle
                  className={`text-xl ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.todo}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={todo.completed ? 'default' : 'secondary'}>
                    {todo.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleComplete}
              >
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Todo Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">User ID:</span>
              <span className="font-medium">{todo.userId}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Created:</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Status:</span>
              <span className="font-medium">
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleToggleComplete}
            >
              {todo.completed ? (
                <Circle className="h-4 w-4 mr-2" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Todo
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Todo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Description Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{todo.todo}</p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import type { Todo } from '@/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TodoCardProps {
  todo: Todo
  onToggleComplete: (id: number) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

export function TodoCard({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo.id)}
            />
            <div className="flex-1">
              <CardTitle
                className={`text-sm ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.todo}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={todo.completed ? 'default' : 'secondary'}>
                  {todo.completed ? 'Completed' : 'Pending'}
                </Badge>
                <span className="text-xs text-gray-500">
                  User {todo.userId}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onEdit(todo)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(todo.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  )
}

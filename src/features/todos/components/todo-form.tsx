import { useEffect, useState } from 'react'
import type { Todo } from '@/api/todos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface TodoFormProps {
  todo?: Todo
  onSubmit: (todo: Todo | Omit<Todo, 'id'>) => void
}

export function TodoForm({ todo, onSubmit }: TodoFormProps) {
  const [formData, setFormData] = useState({
    todo: '',
    completed: false,
    userId: 1,
  })

  useEffect(() => {
    if (todo) {
      setFormData({
        todo: todo.todo,
        completed: todo.completed,
        userId: todo.userId,
      })
    }
  }, [todo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      // Update existing todo
      onSubmit({
        ...todo,
        ...formData,
      })
    } else {
      // Create new todo
      onSubmit(formData)
    }

    // Reset form if creating new todo
    if (!todo) {
      setFormData({
        todo: '',
        completed: false,
        userId: 1,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="todo">Task Description</Label>
        <Input
          id="todo"
          value={formData.todo}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, todo: e.target.value }))
          }
          placeholder="Enter your task..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          type="number"
          value={formData.userId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              userId: parseInt(e.target.value) || 1,
            }))
          }
          min="1"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="completed"
          checked={formData.completed}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, completed: checked as boolean }))
          }
        />
        <Label htmlFor="completed">Mark as completed</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">{todo ? 'Update Todo' : 'Create Todo'}</Button>
      </div>
    </form>
  )
}

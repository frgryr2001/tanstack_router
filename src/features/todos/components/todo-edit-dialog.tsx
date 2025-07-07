import type { Todo } from '@/api/todos'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface TodoEditDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  todo: Todo | null
}

export function TodoEditDialog({
  isOpen,
  onOpenChange,
  todo,
}: TodoEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Make changes to your todo item.</DialogDescription>
        </DialogHeader>
        {todo && (
          <div className="p-4">
            <p>Todo edit form would go here</p>
            <p className="text-sm text-gray-500 mt-2">Editing: {todo.todo}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface TodosFiltersProps {
  searchTerm: string
  filterStatus: 'all' | 'completed' | 'pending'
  isCreateDialogOpen: boolean
  onSearchChange: (value: string) => void
  onFilterChange: (status: 'all' | 'completed' | 'pending') => void
  onCreateDialogChange: (open: boolean) => void
}

export function TodosFilters({
  searchTerm,
  filterStatus,
  isCreateDialogOpen,
  onSearchChange,
  onFilterChange,
  onCreateDialogChange,
}: TodosFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => onFilterChange('all')}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={filterStatus === 'completed' ? 'default' : 'outline'}
          onClick={() => onFilterChange('completed')}
          size="sm"
        >
          Completed
        </Button>
        <Button
          variant={filterStatus === 'pending' ? 'default' : 'outline'}
          onClick={() => onFilterChange('pending')}
          size="sm"
        >
          Pending
        </Button>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={onCreateDialogChange}>
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
  )
}

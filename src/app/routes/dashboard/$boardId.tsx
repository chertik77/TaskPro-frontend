import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { TaskContracts } from '@/entities/task'

import { Board } from '@/widgets/kanban-board'

export const Route = createFileRoute('/dashboard/$boardId')({
  component: Board,
  validateSearch: TaskContracts.TaskSearchSchema,
  search: { middlewares: [stripSearchParams({ search: '' })] }
})

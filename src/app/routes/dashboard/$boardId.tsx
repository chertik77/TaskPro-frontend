import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { Board } from '@/widgets/kanban-board'

import { TaskContracts } from '@/entities/task'

export const Route = createFileRoute('/dashboard/$boardId')({
  component: Board,
  validateSearch: TaskContracts.TaskSearchSchema,
  search: {
    middlewares: [
      stripSearchParams({
        search: '',
        priority: [],
        deadline: [],
        labels: []
      })
    ]
  }
})

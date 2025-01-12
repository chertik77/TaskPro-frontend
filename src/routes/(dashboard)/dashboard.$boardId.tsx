import type { Deadline, Priority } from 'features/kanban/shared/constants'

import { createFileRoute } from '@tanstack/react-router'

import { Board } from 'features/kanban/board/components'

type BoardRouteParams = {
  deadline?: Deadline
  priority?: Priority
}

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: (search): BoardRouteParams => ({
    priority: search?.priority as Priority,
    deadline: search?.deadline as Deadline
  }),
  loaderDeps: ({ search: { priority, deadline } }) => ({ priority, deadline })
})

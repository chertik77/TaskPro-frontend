import { createFileRoute } from '@tanstack/react-router'

import { Board } from 'features/kanban/board/components'

export const Route = createFileRoute('/dashboard/$boardId')({
  component: Board
})

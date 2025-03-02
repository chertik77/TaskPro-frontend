import { createLazyFileRoute } from '@tanstack/react-router'

import { EmptyBoard } from '@/blocks/kanban-board'

export const Route = createLazyFileRoute('/(dashboard)/dashboard/')({
  component: EmptyBoard
})

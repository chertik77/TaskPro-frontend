import { EmptyBoard } from '@/features/kanban/board/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: EmptyBoard
})

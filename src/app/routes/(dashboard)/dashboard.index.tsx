import { createFileRoute } from '@tanstack/react-router'

import { EmptyBoard } from '@/blocks/board'

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: EmptyBoard
})

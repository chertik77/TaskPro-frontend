import { createFileRoute } from '@tanstack/react-router'

import { EmptyBoard } from '@/features/board/components'

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: EmptyBoard
})

import { CardContracts } from '@/entities/card'
import { createFileRoute } from '@tanstack/react-router'

import { Board } from '@/blocks/kanban-board'

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: CardContracts.CardSearchSchema
})

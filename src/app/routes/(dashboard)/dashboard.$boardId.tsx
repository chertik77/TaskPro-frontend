import { createFileRoute } from '@tanstack/react-router'

import { CardContracts } from '@/entities/card'

import { Board } from '@/blocks/kanban-board'

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: CardContracts.CardSearchSchema
})

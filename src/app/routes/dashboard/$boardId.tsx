import { createFileRoute } from '@tanstack/react-router'

import { CardContracts } from '@/entities/card'

import { Board } from '@/widgets/kanban-board'

export const Route = createFileRoute('/dashboard/$boardId')({
  component: Board,
  validateSearch: CardContracts.CardSearchSchema
})
